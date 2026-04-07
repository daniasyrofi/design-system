<script setup lang="ts">
import { computed, useId, ref, watch, nextTick, onMounted } from 'vue'
import { cn } from '@/lib/utils'

type TextareaSize = 'sm' | 'md' | 'lg'
type TextareaResize = 'none' | 'vertical' | 'both'

interface Props {
  modelValue: string
  size?: TextareaSize
  label?: string
  placeholder?: string
  helperText?: string
  error?: string
  rows?: number
  maxRows?: number
  autoResize?: boolean
  disabled?: boolean
  readonly?: boolean
  counter?: boolean
  maxlength?: number
  required?: boolean
  resize?: TextareaResize
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  rows: 3,
  autoResize: true,
  disabled: false,
  readonly: false,
  required: false,
  counter: false,
  resize: 'none',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
  keyup: [event: KeyboardEvent]
}>()

const autoId = useId()
const textareaId = computed(() => autoId)
const textareaEl = ref<HTMLTextAreaElement | null>(null)
const hasError = computed(() => !!props.error)
const charCount = computed(() => props.modelValue?.length ?? 0)

// ── Auto-resize ─────────────────────────────────────────────────────────

function recalcHeight() {
  const el = textareaEl.value
  if (!el || !props.autoResize) return

  el.style.height = 'auto'

  let newHeight = el.scrollHeight

  if (props.maxRows) {
    const lineHeight = parseInt(getComputedStyle(el).lineHeight) || 20
    const paddingTop = parseInt(getComputedStyle(el).paddingTop) || 0
    const paddingBottom = parseInt(getComputedStyle(el).paddingBottom) || 0
    const maxHeight = props.maxRows * lineHeight + paddingTop + paddingBottom
    newHeight = Math.min(newHeight, maxHeight)
  }

  el.style.height = `${newHeight}px`
}

function handleInput(e: Event) {
  const value = (e.target as HTMLTextAreaElement).value
  emit('update:modelValue', value)
  if (props.autoResize) {
    nextTick(recalcHeight)
  }
}

watch(
  () => props.modelValue,
  () => {
    nextTick(recalcHeight)
  }
)

onMounted(() => {
  nextTick(recalcHeight)
})

// ── Size maps ────────────────────────────────────────────────────────────

const textSizeClass: Record<TextareaSize, string> = {
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base',
}

const paddingClass: Record<TextareaSize, string> = {
  sm: 'px-3 py-2',
  md: 'px-3.5 py-2.5',
  lg: 'px-4 py-3',
}

// Golden formula: applied_radius = max(0, base_radius - vertical_padding)
const radiusClass: Record<TextareaSize, string> = {
  sm: 'rounded-[max(0px,calc(var(--radius-2xl)-8px))]',   // 20-8=12px
  md: 'rounded-[max(0px,calc(var(--radius-2xl)-10px))]',  // 20-10=10px
  lg: 'rounded-[max(0px,calc(var(--radius-2xl)-12px))]',  // 20-12=8px
}

const resizeStyle = computed(() => {
  if (props.autoResize) return 'resize: none;'
  return `resize: ${props.resize};`
})

const wrapperClasses = computed(() =>
  cn(
    'ds-textarea-wrapper',
    'relative w-full overflow-hidden transition-all duration-200 ease-out',
    radiusClass[props.size], 'border outline-none',
    hasError.value && 'ds-textarea-wrapper--error',
    props.disabled && 'ds-textarea-wrapper--disabled cursor-not-allowed',
    props.readonly && 'ds-textarea-wrapper--readonly'
  )
)

const textareaClasses = computed(() =>
  cn(
    'ds-textarea-native',
    'block w-full bg-transparent outline-none focus-visible:outline-none border-none focus:ring-0 focus-visible:ring-0',
    textSizeClass[props.size],
    paddingClass[props.size],
    'leading-relaxed',
    props.disabled && 'cursor-not-allowed',
    props.readonly && 'cursor-default'
  )
)

defineExpose({
  el: textareaEl,
  focus: () => textareaEl.value?.focus(),
  blur: () => textareaEl.value?.blur(),
})
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <!-- Label -->
    <label
      v-if="label"
      :for="textareaId"
      :class="cn('text-sm font-medium select-none flex items-center', disabled && 'opacity-50')"
      :style="{ color: 'var(--color-text-heading)' }"
    >
      {{ label }}
      <span
        v-if="required"
        class="ml-1 font-bold inline-block"
        :style="{ color: 'var(--color-danger)' }"
        aria-hidden="true"
        >*</span
      >
    </label>

    <!-- Textarea wrapper -->
    <div :class="wrapperClasses">
      <textarea
        :id="textareaId"
        ref="textareaEl"
        :value="modelValue"
        :placeholder="placeholder"
        :rows="rows"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :maxlength="maxlength"
        :style="resizeStyle"
        :aria-invalid="hasError || undefined"
        :aria-describedby="helperText || error ? `${textareaId}-hint` : undefined"
        :class="textareaClasses"
        v-bind="$attrs"
        @input="handleInput"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
        @keydown="emit('keydown', $event)"
        @keyup="emit('keyup', $event)"
      />
    </div>

    <!-- Bottom row: helper/error + counter -->
    <div
      v-if="helperText || error || (counter && maxlength)"
      class="flex items-start justify-between gap-4 mt-1"
    >
      <p
        v-if="error"
        :id="`${textareaId}-hint`"
        class="text-[13px] leading-snug font-medium animate-in fade-in slide-in-from-top-1"
        :style="{ color: 'var(--color-danger)' }"
      >
        {{ error }}
      </p>
      <p
        v-else-if="helperText"
        :id="`${textareaId}-hint`"
        class="text-[13px] leading-snug"
        :style="{ color: 'var(--color-text-secondary)' }"
      >
        {{ helperText }}
      </p>
      <span v-else />

      <span
        v-if="counter && maxlength"
        :class="cn('text-[13px] font-medium shrink-0 tabular-nums')"
        :style="{
          color: charCount >= maxlength ? 'var(--color-danger)' : 'var(--color-text-tertiary)',
        }"
      >
        {{ charCount }}/{{ maxlength }}
      </span>
    </div>
  </div>
</template>

<style scoped>
/* ── Wrapper base ── */
.ds-textarea-wrapper {
  background-color: var(--color-surface);
  border-color: var(--color-border);
  box-shadow: var(--shadow-xs);
}

.ds-textarea-wrapper:hover:not(.ds-textarea-wrapper--disabled):not(.ds-textarea-wrapper--readonly) {
  border-color: var(--color-border-strong);
}

.ds-textarea-wrapper:focus-within:not(.ds-textarea-wrapper--error) {
  border-color: var(--color-text-primary);
  box-shadow: 0 0 0 1px var(--color-text-primary);
}

/* ── Error state ── */
.ds-textarea-wrapper--error {
  border-color: var(--color-danger);
}

.ds-textarea-wrapper--error:focus-within {
  border-color: var(--color-danger);
  box-shadow: var(--ring-danger);
}

/* ── Disabled state ── */
.ds-textarea-wrapper--disabled {
  opacity: 0.5;
  background-color: var(--color-bg-subtle);
}

/* ── Readonly state ── */
.ds-textarea-wrapper--readonly {
  background-color: var(--color-bg-subtle);
}

/* ── Native textarea ── */
.ds-textarea-native {
  color: var(--color-text-primary);
}

.ds-textarea-native::placeholder {
  color: var(--color-text-tertiary);
}

.ds-textarea-native:focus,
.ds-textarea-native:focus-visible,
.ds-textarea-native:focus-within {
  outline: none !important;
  box-shadow: none !important;
  border-color: transparent !important;
  --tw-ring-shadow: none !important;
  --tw-ring-color: transparent !important;
}

.ds-textarea-wrapper--disabled .ds-textarea-native {
  color: var(--color-text-disabled);
}
</style>
