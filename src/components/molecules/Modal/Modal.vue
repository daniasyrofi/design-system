<script setup lang="ts">
import { computed, watch, onBeforeUnmount, ref, nextTick, useId } from 'vue'
import { cn } from '@/lib/utils'
import { RiCloseLine } from '@remixicon/vue'
import Button from '@/components/atoms/Button/Button.vue'

type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'
type ScrollBehavior = 'inside' | 'outside'

interface Props {
  /** Controls the open/closed state of the modal. Supports v-model. */
  modelValue: boolean
  /** Visual size/max-width of the modal. @default 'md' */
  size?: ModalSize
  /** Disables the close button when false. @default true */
  closable?: boolean
  /** Closes the modal when clicking the backdrop overlay. @default true */
  closeOnOverlay?: boolean
  /** Prevents closing the modal through any user action (escape, overlay, close button). @default false */
  preventClose?: boolean
  /** Determines if scrolling happens inside the modal panel or on the page body. @default 'inside' */
  scrollBehavior?: ScrollBehavior
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  closable: true,
  closeOnOverlay: true,
  preventClose: false,
  scrollBehavior: 'inside',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const titleId = useId()
const descId = useId()
const panelRef = ref<HTMLElement | null>(null)
let previousFocus: HTMLElement | null = null

// ── Size map ─────────────────────────────────────────────────────────────────

const sizeMap: Record<ModalSize, string> = {
  sm: 'max-w-[400px]',
  md: 'max-w-[560px]',
  lg: 'max-w-[720px]',
  xl: 'max-w-[900px]',
  full: 'max-w-full mx-4',
}

// ── Close logic ──────────────────────────────────────────────────────────────

function close() {
  if (props.preventClose) return
  emit('update:modelValue', false)
}

function handleOverlayClick() {
  if (props.closeOnOverlay) close()
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    close()
    return
  }

  // Focus trap
  if (e.key === 'Tab' && panelRef.value) {
    const focusable = panelRef.value.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
    if (focusable.length === 0) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault()
        last.focus()
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }
}

// ── Body scroll lock & focus management ──────────────────────────────────────

function lockBody() {
  document.body.style.overflow = 'hidden'
}

function unlockBody() {
  document.body.style.overflow = ''
}

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      previousFocus = document.activeElement as HTMLElement | null
      lockBody()
      document.addEventListener('keydown', handleKeydown)
      nextTick(() => {
        // Focus first focusable element inside panel, or the panel itself
        const focusable = panelRef.value?.querySelector<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        if (focusable) {
          focusable.focus()
        } else {
          panelRef.value?.focus()
        }
      })
    } else {
      unlockBody()
      document.removeEventListener('keydown', handleKeydown)
      nextTick(() => previousFocus?.focus())
    }
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  unlockBody()
  document.removeEventListener('keydown', handleKeydown)
})

// ── Computed styles ──────────────────────────────────────────────────────────

const overlayClasses = computed(() =>
  cn(
    'fixed inset-0 z-50',
    'bg-black/30 backdrop-blur-[12px]',
    props.scrollBehavior === 'outside'
      ? 'overflow-y-auto w-full h-full'
      : 'flex items-center justify-center p-4'
  )
)

defineExpose({
  el: panelRef,
  open: () => { emit('update:modelValue', true) },
  close: () => { if (!props.preventClose) emit('update:modelValue', false) },
})

const panelClasses = computed(() =>
  cn(
    'ds-modal-panel relative w-full',
    'flex flex-col',
    sizeMap[props.size],
    props.scrollBehavior === 'outside' ? 'mx-auto my-8' : 'max-h-[calc(100vh-4rem)]',
    props.size === 'full' && 'min-h-[calc(100vh-2rem)]'
  )
)
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-[--duration-normal] ease-[--ease-default]"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-[--duration-normal] ease-[--ease-default]"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="modelValue" :class="overlayClasses" @click.self="handleOverlayClick">
        <!-- Panel -->
        <Transition
          enter-active-class="transition duration-[--duration-slow] ease-[--ease-out]"
          enter-from-class="opacity-0 translate-y-4 scale-[0.97]"
          enter-to-class="opacity-100 translate-y-0 scale-100"
          leave-active-class="transition duration-[--duration-normal] ease-[--ease-in]"
          leave-from-class="opacity-100 translate-y-0 scale-100"
          leave-to-class="opacity-0 translate-y-2 scale-[0.98]"
          appear
        >
          <div
            ref="panelRef"
            :class="panelClasses"
            role="dialog"
            aria-modal="true"
            :aria-labelledby="$slots.title || $slots.header ? titleId : undefined"
            :aria-describedby="$slots.description ? descId : undefined"
            tabindex="-1"
            :data-state="modelValue ? 'open' : 'closed'"
          >
            <!-- Header -->
            <div
              v-if="$slots.header || $slots.title || closable"
              class="flex items-start gap-4 px-6 pt-6 pb-3 relative border-b"
              style="border-color: var(--color-border-subtle)"
            >
              <slot name="header">
                <div class="flex-1 min-w-0 flex flex-col gap-1">
                  <h2
                    v-if="$slots.title"
                    :id="titleId"
                    class="text-lg font-semibold text-[--color-text-primary] leading-snug"
                  >
                    <slot name="title" />
                  </h2>
                  <p
                    v-if="$slots.description"
                    :id="descId"
                    class="text-sm text-[--color-text-secondary]"
                  >
                    <slot name="description" />
                  </p>
                </div>
              </slot>

              <!-- Close button -->
              <slot name="close-button">
                <Button
                  v-if="closable && !preventClose"
                  variant="ghost"
                  size="sm"
                  icon-only
                  class="shrink-0 size-7"
                  aria-label="Close dialog"
                  @click="close"
                >
                  <template #icon>
                    <RiCloseLine :size="'16'" />
                  </template>
                </Button>
              </slot>
            </div>

            <!-- Body -->
            <div
              :class="
                cn(
                  'px-6 pb-6',
                  $slots.header || $slots.title || $slots.description ? 'pt-3' : 'pt-6',
                  scrollBehavior === 'inside' && 'max-h-[60vh] overflow-y-auto'
                )
              "
            >
              <slot />
            </div>

            <!-- Footer -->
            <div
              v-if="$slots.footer"
              class="flex items-center justify-end gap-3 px-6 py-3 border-t"
              style="
                border-color: var(--color-border-subtle);
                background-color: var(--color-neutral-light);
                border-bottom-left-radius: inherit;
                border-bottom-right-radius: inherit;
              "
            >
              <slot name="footer" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.ds-modal-panel {
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow:
    var(--shadow-2xl),
    inset 0 0 0 1px var(--color-border-subtle);
}
</style>
