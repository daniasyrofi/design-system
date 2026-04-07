<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { cn } from '@/lib/utils'
import { RiSendPlaneFill } from '@remixicon/vue'
import { Spinner } from '@/components/atoms/Spinner'

interface Props {
  /** The current text content of the input. Supports v-model. @default '' */
  modelValue?: string
  /** Placeholder text shown when the input is empty. @default 'Type a message...' */
  placeholder?: string
  /** Disables editing and submission. @default false */
  disabled?: boolean
  /** Maximum number of visible text rows before scrolling. @default 5 */
  maxRows?: number
  /** Shows a loading spinner on the send button, preventing submission. @default false */
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'Type a message...',
  disabled: false,
  maxRows: 5,
  loading: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  submit: [value: string]
}>()

const textareaRef = ref<HTMLTextAreaElement | null>(null)
const lineHeight = 24 // approx line height in px

const canSubmit = computed(
  () => props.modelValue.trim().length > 0 && !props.loading && !props.disabled
)

const containerClass = computed(() =>
  cn(
    'ds-chat-input border border-[--color-border]',
    'transition-all duration-[--duration-normal] ease-[--ease-default]',
    'hover:border-[--color-border-strong]',
    props.disabled && 'opacity-50 pointer-events-none'
  )
)

function resizeTextarea() {
  const el = textareaRef.value
  if (!el) return
  el.style.height = 'auto'
  const maxHeight = lineHeight * props.maxRows
  el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`
}

function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
  nextTick(resizeTextarea)
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    if (canSubmit.value) {
      emit('submit', props.modelValue)
    }
  }
}

watch(
  () => props.modelValue,
  () => {
    nextTick(resizeTextarea)
  }
)

onMounted(() => {
  nextTick(resizeTextarea)
})
</script>

<template>
  <div :class="containerClass">
    <!-- Textarea -->
    <textarea
      ref="textareaRef"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      rows="1"
      :class="
        cn(
          'block w-full resize-none bg-transparent px-4 pt-3 pb-1',
          'text-body-sm text-[--color-text-primary] placeholder:text-[--color-text-tertiary]',
          'outline-none border-none',
          'scrollbar-thin'
        )
      "
      :style="{ maxHeight: `${lineHeight * maxRows}px`, lineHeight: `${lineHeight}px` }"
      @input="handleInput"
      @keydown="handleKeydown"
    />

    <!-- Actions bar -->
    <div class="flex items-center justify-between px-3 py-2">
      <!-- Left actions -->
      <div class="flex items-center gap-1">
        <slot name="actions-start" />
      </div>

      <!-- Right actions -->
      <div class="flex items-center gap-1">
        <slot name="actions-end">
          <button
            type="button"
            :disabled="!canSubmit"
            :class="
              cn(
                'ds-chat-send flex items-center justify-center size-8',
                'transition-all duration-[--duration-fast] ease-[--ease-default]',
                'cursor-pointer',
                canSubmit
                  ? 'bg-[--color-primary] text-[--color-text-inverse] hover:bg-[--color-primary-hover] shadow-sm hover:shadow-md active:scale-95'
                  : 'bg-[--color-neutral-subtle] text-[--color-text-tertiary] cursor-not-allowed'
              )
            "
            aria-label="Send message"
            @click="canSubmit && emit('submit', modelValue)"
          >
            <Spinner v-if="loading" size="xs" />
            <RiSendPlaneFill v-else size="16" />
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ds-chat-input {
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
}
.ds-chat-input:focus-within {
  border-color: var(--color-primary);
  box-shadow:
    var(--shadow-sm),
    0 0 0 2px var(--color-primary-subtle);
}
.ds-chat-send {
  border-radius: var(--radius-full);
}
</style>
