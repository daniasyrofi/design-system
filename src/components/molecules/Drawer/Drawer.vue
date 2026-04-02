<script setup lang="ts">
import { computed, watch, onBeforeUnmount, ref, nextTick, useId } from 'vue'
import { RiCloseLine } from '@remixicon/vue'
import Button from '@/components/atoms/Button/Button.vue'

type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom'
type DrawerSize      = 'sm' | 'md' | 'lg' | 'xl' | 'full'

interface Props {
  /** Controls the open/closed state. Supports v-model. */
  modelValue:      boolean
  /** Side from which the drawer slides in. @default 'right' */
  placement?:      DrawerPlacement
  /** Width (left/right) or height (top/bottom) of the drawer. @default 'md' */
  size?:           DrawerSize
  /** Shows the close button. @default true */
  closable?:       boolean
  /** Closes the drawer when clicking the backdrop. @default true */
  closeOnOverlay?: boolean
  /** Prevents any user-initiated close. @default false */
  preventClose?:   boolean
}

const props = withDefaults(defineProps<Props>(), {
  placement:      'right',
  size:           'md',
  closable:       true,
  closeOnOverlay: true,
  preventClose:   false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const titleId    = useId()
const panelRef   = ref<HTMLElement | null>(null)
let previousFocus: HTMLElement | null = null

// ── Size maps ─────────────────────────────────────────────────────────────────

const sideSize: Record<DrawerSize, string> = {
  sm:   '320px',
  md:   '400px',
  lg:   '540px',
  xl:   '720px',
  full: '100%',
}

const panelStyle = computed(() => {
  const isVertical = props.placement === 'top' || props.placement === 'bottom'
  return isVertical
    ? { height: sideSize[props.size], width: '100%' }
    : { width: sideSize[props.size], height: '100%' }
})

// ── Placement: enter/leave transition classes ─────────────────────────────────

const translateFrom: Record<DrawerPlacement, string> = {
  left:   '-translate-x-full',
  right:  'translate-x-full',
  top:    '-translate-y-full',
  bottom: 'translate-y-full',
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
  if (e.key === 'Tab' && panelRef.value) {
    const focusable = panelRef.value.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
    if (!focusable.length) return
    const first = focusable[0]
    const last  = focusable[focusable.length - 1]
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus() }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus() }
    }
  }
}

// ── Body scroll lock & focus ──────────────────────────────────────────────────

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      previousFocus = document.activeElement as HTMLElement | null
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleKeydown)
      nextTick(() => {
        const focusable = panelRef.value?.querySelector<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        focusable ? focusable.focus() : panelRef.value?.focus()
      })
    } else {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeydown)
      nextTick(() => previousFocus?.focus())
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', handleKeydown)
})

// ── Panel position classes ────────────────────────────────────────────────────

const positionClass: Record<DrawerPlacement, string> = {
  left:   'inset-y-0 left-0',
  right:  'inset-y-0 right-0',
  top:    'inset-x-0 top-0',
  bottom: 'inset-x-0 bottom-0',
}
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition
      enter-active-class="transition duration-[--duration-normal] ease-[--ease-default]"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-[--duration-normal] ease-[--ease-default]"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 bg-black/30 backdrop-blur-[6px]"
        @click.self="handleOverlayClick"
      >
        <!-- Panel -->
        <Transition
          enter-active-class="transition duration-[--duration-slow] ease-[--ease-out]"
          :enter-from-class="`${translateFrom[placement]} opacity-0`"
          enter-to-class="translate-x-0 translate-y-0 opacity-100"
          leave-active-class="transition duration-[--duration-normal] ease-[--ease-in]"
          leave-from-class="translate-x-0 translate-y-0 opacity-100"
          :leave-to-class="`${translateFrom[placement]} opacity-0`"
          appear
        >
          <div
            ref="panelRef"
            class="ds-drawer absolute flex flex-col"
            :class="positionClass[placement]"
            :style="panelStyle"
            role="dialog"
            aria-modal="true"
            :aria-labelledby="$slots.title ? titleId : undefined"
            tabindex="-1"
          >
            <!-- Header -->
            <div
              v-if="$slots.title || closable"
              class="flex items-center justify-between shrink-0 px-5 py-4 border-b"
              style="border-color: var(--color-border-subtle);"
            >
              <h2
                v-if="$slots.title"
                :id="titleId"
                class="text-base font-semibold"
                style="color: var(--color-text-heading);"
              >
                <slot name="title" />
              </h2>
              <div v-else class="flex-1" />

              <slot name="close-button">
                <Button
                  v-if="closable && !preventClose"
                  variant="ghost"
                  size="sm"
                  icon-only
                  class="shrink-0 size-7"
                  aria-label="Close drawer"
                  @click="close"
                >
                  <template #icon>
                    <RiCloseLine size="16" />
                  </template>
                </Button>
              </slot>
            </div>

            <!-- Body -->
            <div class="flex-1 overflow-y-auto px-5 py-5">
              <slot />
            </div>

            <!-- Footer -->
            <div
              v-if="$slots.footer"
              class="shrink-0 flex items-center justify-end gap-3 px-5 py-4 border-t"
              style="border-color: var(--color-border-subtle); background-color: var(--color-neutral-light);"
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
.ds-drawer {
  background-color: var(--color-surface);
  box-shadow: var(--shadow-2xl), inset 0 0 0 1px var(--color-border-subtle);
}
</style>
