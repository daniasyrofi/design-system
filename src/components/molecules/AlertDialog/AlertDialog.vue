<script setup lang="ts">
import { ref, watch, onBeforeUnmount, nextTick, useId } from 'vue'
import { cn } from '@/lib/utils'
import Button from '@/components/atoms/Button/Button.vue'

type AlertDialogVariant = 'default' | 'danger'

interface Props {
  /** Controls open/close state. Supports v-model. */
  modelValue: boolean
  /** Dialog title text. */
  title?: string
  /** Supporting description text. */
  description?: string
  /** Confirm button label. @default 'Confirm' */
  confirmLabel?: string
  /** Cancel button label. @default 'Cancel' */
  cancelLabel?: string
  /** Semantic variant affecting the confirm button color. @default 'default' */
  variant?: AlertDialogVariant
  /** Shows a loading spinner on the confirm button. @default false */
  loading?: boolean
  /** Disables the confirm button. @default false */
  confirmDisabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
  variant: 'default',
  loading: false,
  confirmDisabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  /** Fired when the user confirms the action. */
  confirm: []
  /** Fired when the user cancels. */
  cancel: []
}>()

const titleId = useId()
const descId = useId()
const panelRef = ref<HTMLElement | null>(null)
let previousFocus: HTMLElement | null = null

function cancel() {
  emit('update:modelValue', false)
  emit('cancel')
}

function confirm() {
  emit('confirm')
}

// Focus trap (no Escape close — AlertDialog requires explicit action)
function handleKeydown(e: KeyboardEvent) {
  if (e.key !== 'Tab' || !panelRef.value) return
  const focusable = Array.from(
    panelRef.value.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
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

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      previousFocus = document.activeElement as HTMLElement | null
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleKeydown)
      nextTick(() => {
        // Focus cancel button by default (safer default for destructive dialogs)
        const cancelBtn = panelRef.value?.querySelector<HTMLElement>('[data-cancel]')
        cancelBtn?.focus()
      })
    } else {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeydown)
      nextTick(() => previousFocus?.focus())
    }
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', handleKeydown)
})

const confirmButtonVariant = props.variant === 'danger' ? 'danger' : 'primary'
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
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-[12px]"
        aria-hidden="false"
      >
        <Transition
          enter-active-class="transition duration-[--duration-slow] ease-[--ease-out]"
          enter-from-class="opacity-0 scale-[0.96]"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-[--duration-normal] ease-[--ease-in]"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-[0.98]"
          appear
        >
          <div
            ref="panelRef"
            :class="cn('ds-alert-dialog-panel w-full max-w-[400px] flex flex-col gap-4')"
            role="alertdialog"
            aria-modal="true"
            :aria-labelledby="title || $slots.title ? titleId : undefined"
            :aria-describedby="description || $slots.description ? descId : undefined"
            tabindex="-1"
          >
            <!-- Body -->
            <div class="flex flex-col gap-2 px-6 pt-6">
              <h2
                v-if="title || $slots.title"
                :id="titleId"
                class="text-base font-semibold leading-snug"
                style="color: var(--color-text-primary)"
              >
                <slot name="title">{{ title }}</slot>
              </h2>
              <p
                v-if="description || $slots.description"
                :id="descId"
                class="text-sm leading-relaxed"
                style="color: var(--color-text-secondary)"
              >
                <slot name="description">{{ description }}</slot>
              </p>
              <slot />
            </div>

            <!-- Footer actions -->
            <div
              class="flex items-center justify-end gap-2 px-6 py-4 border-t"
              style="
                border-color: var(--color-border-subtle);
                background-color: var(--color-neutral-light);
                border-bottom-left-radius: inherit;
                border-bottom-right-radius: inherit;
              "
            >
              <slot name="actions">
                <Button variant="outline" size="sm" data-cancel @click="cancel">
                  {{ cancelLabel }}
                </Button>
                <Button
                  :variant="confirmButtonVariant"
                  size="sm"
                  :loading="loading"
                  :disabled="confirmDisabled"
                  @click="confirm"
                >
                  {{ confirmLabel }}
                </Button>
              </slot>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.ds-alert-dialog-panel {
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow:
    var(--shadow-2xl),
    inset 0 0 0 1px var(--color-border-subtle);
}
</style>
