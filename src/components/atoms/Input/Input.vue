<script setup lang="ts">
defineOptions({ inheritAttrs: false })

import { computed, useId, ref } from 'vue'
import { cn } from '@/lib/utils'
import { RiCloseLine, RiEyeLine, RiEyeOffLine } from '@remixicon/vue'

type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
type InputSize = 'sm' | 'md' | 'lg'

interface Props {
  modelValue: string
  type?: InputType
  size?: InputSize
  label?: string
  placeholder?: string
  helperText?: string
  error?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  clearable?: boolean
  counter?: boolean
  maxlength?: number
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  size: 'md',
  disabled: false,
  readonly: false,
  required: false,
  clearable: false,
  counter: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  clear: []
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
  keyup: [event: KeyboardEvent]
}>()

const autoId = useId()
const inputId = computed(() => props.id ?? autoId)
const inputRef = ref<HTMLInputElement | null>(null)
const showPassword = ref(false)
const hasError = computed(() => !!props.error)
const charCount = computed(() => props.modelValue?.length ?? 0)
const isPassword = computed(() => props.type === 'password')
const effectiveType = computed(() => {
  if (isPassword.value) return showPassword.value ? 'text' : 'password'
  return props.type
})

const showClear = computed(
  () => props.clearable && !!props.modelValue && !props.disabled && !props.readonly
)

function handleInput(e: Event) {
  const value = (e.target as HTMLInputElement).value
  emit('update:modelValue', value)
}

function handleClear() {
  emit('update:modelValue', '')
  emit('clear')
}

// ── Design System Metrics ──

const heightClass: Record<InputSize, string> = {
  sm: 'min-h-8',
  md: 'min-h-10', // 40px comfortable
  lg: 'min-h-12', // 48px accessible
}

const textSizeClass: Record<InputSize, string> = {
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base',
}

const prefixPadClasses: Record<InputSize, string> = {
  sm: 'pl-[12px] pr-[6px]',
  md: 'pl-[14px] pr-[8px]',
  lg: 'pl-[16px] pr-[10px]',
}

const suffixPadClasses: Record<InputSize, string> = {
  sm: 'pl-[6px] pr-[12px]',
  md: 'pl-[8px] pr-[14px]',
  lg: 'pl-[10px] pr-[16px]',
}

const plClasses: Record<InputSize, string> = {
  sm: 'pl-3',
  md: 'pl-3.5',
  lg: 'pl-4',
}

const prClasses: Record<InputSize, string> = {
  sm: 'pr-3',
  md: 'pr-3.5',
  lg: 'pr-4',
}

const pyClasses: Record<InputSize, string> = {
  sm: 'py-1.5',
  md: 'py-2',
  lg: 'py-2.5',
}

const compactInsetClasses: Record<InputSize, string> = {
  sm: 'pl-1.5',
  md: 'pl-2',
  lg: 'pl-2.5',
}

const iconSizePx: Record<InputSize, string> = {
  sm: '14',
  md: '16',
  lg: '18',
}

const rightActionInsetClass: Record<InputSize, string> = {
  sm: 'pr-[3px]',
  md: 'pr-[6px]',
  lg: 'pr-[9px]',
}

const radiusOffsetPx: Record<InputSize, number> = {
  sm: 10,
  md: 9,
  lg: 8,
}

const radiusClass: Record<InputSize, string> = {
  sm: 'rounded-[max(0px,calc(var(--radius-2xl)-10px))]',
  md: 'rounded-[max(0px,calc(var(--radius-2xl)-9px))]',
  lg: 'rounded-[max(0px,calc(var(--radius-2xl)-8px))]',
}

const prefixRadiusStyle = computed(() => {
  const r = `max(0px, calc(var(--radius-2xl) - ${radiusOffsetPx[props.size]}px))`
  return `${r} 0 0 ${r}`
})

const suffixRadiusStyle = computed(() => {
  const r = `max(0px, calc(var(--radius-2xl) - ${radiusOffsetPx[props.size]}px))`
  return `0 ${r} ${r} 0`
})

// Wrapper controls the background, border, and focus rings.
// We use a flex container so prefix/suffix panels can stretch fully to the top and bottom.
const wrapperClasses = computed(() =>
  cn(
    'ds-input-wrapper',
    'relative flex items-center w-full transition-colors duration-200 ease-out',
    radiusClass[props.size], 'border outline-none overflow-hidden',
    heightClass[props.size],
    hasError.value && 'ds-input-wrapper--error',
    props.disabled && 'ds-input-wrapper--disabled cursor-not-allowed',
    props.readonly && 'ds-input-wrapper--readonly'
  )
)

defineExpose({
  el: inputRef,
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
})
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full text-left">
    <!-- Label -->
    <label
      v-if="label"
      :for="inputId"
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

    <!-- Interactive Input Container -->
    <div :class="wrapperClasses">
      <!-- Prefix Area (Background filled block e.g. "https://") -->
      <div
        v-if="$slots.prefix"
        data-testid="input-prefix-panel"
        :class="
          cn(
            'flex items-center self-stretch text-sm font-medium select-none whitespace-nowrap',
            prefixPadClasses[size]
          )
        "
        :style="{
          borderRight: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-bg-subtle)',
          color: 'var(--color-text-secondary)',
          borderRadius: prefixRadiusStyle,
        }"
      >
        <slot name="prefix" />
      </div>

      <!-- Leading Icon (Inside the input area) -->
      <div
        v-if="$slots.leading"
        :class="cn('flex items-center shrink-0 select-none', plClasses[size])"
        :style="{ color: 'var(--color-text-tertiary)' }"
      >
        <slot name="leading" />
      </div>

      <!-- Native Input -->
      <input
        ref="inputRef"
        :id="inputId"
        :type="effectiveType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :maxlength="maxlength"
        :aria-invalid="hasError || undefined"
        :aria-describedby="helperText || error ? `${inputId}-hint` : undefined"
        :class="
          cn(
            'ds-input-native',
            'flex-1 w-full bg-transparent outline-none focus-visible:outline-none h-full min-w-0 border-none focus:ring-0 focus-visible:ring-0',
            textSizeClass[size],
            pyClasses[size],
            !$slots.prefix && !$slots.leading ? plClasses[size] : compactInsetClasses[size],
            !$slots.suffix && !$slots.trailing && !showClear && !isPassword ? prClasses[size] : '',
            disabled && 'cursor-not-allowed',
            readonly && 'cursor-default'
          )
        "
        v-bind="$attrs"
        @input="handleInput"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
        @keydown="emit('keydown', $event)"
        @keyup="emit('keyup', $event)"
      />

      <!-- Right Side Controls (Clear, Password Toggle, Trailing, Suffix) -->
      <div
        :class="
          cn(
            'flex items-center self-stretch shrink-0 gap-1',
            !$slots.suffix && (showClear || isPassword || $slots.trailing) && rightActionInsetClass[size]
          )
        "
      >
        <!-- Clear Button -->
        <button
          v-if="showClear"
          type="button"
          aria-label="Clear input"
          @click="handleClear"
          class="ds-input-action-btn flex items-center justify-center p-1.5 rounded-md transition-colors outline-none"
        >
          <RiCloseLine :size="iconSizePx[size]" />
        </button>

        <!-- Password Visibility Toggle -->
        <button
          v-if="isPassword"
          type="button"
          :aria-label="showPassword ? 'Hide password' : 'Show password'"
          @click="showPassword = !showPassword"
          class="ds-input-action-btn flex items-center justify-center p-1.5 rounded-md transition-colors outline-none"
        >
          <RiEyeOffLine v-if="showPassword" :size="iconSizePx[size]" />
          <RiEyeLine v-else :size="iconSizePx[size]" />
        </button>

        <!-- Trailing Icon -->
        <div
          v-if="$slots.trailing"
          :class="cn('flex items-center select-none', compactInsetClasses[size], prClasses[size])"
          :style="{ color: 'var(--color-text-tertiary)' }"
        >
          <slot name="trailing" />
        </div>

        <!-- Suffix Area (Background filled block e.g. ".com") -->
        <div
          v-if="$slots.suffix"
        :class="
          cn(
            'flex items-center self-stretch text-sm font-medium select-none whitespace-nowrap',
            suffixPadClasses[size]
          )
        "
          :style="{
            borderLeft: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-bg-subtle)',
            color: 'var(--color-text-secondary)',
            borderRadius: suffixRadiusStyle,
          }"
        >
          <slot name="suffix" />
        </div>
      </div>
    </div>

    <!-- Feedback Area (Helper text, Error, Counter) -->
    <div
      v-if="helperText || error || (counter && maxlength)"
      class="flex items-start justify-between gap-4 mt-1"
    >
      <!-- Message -->
      <p
        v-if="error"
        :id="`${inputId}-hint`"
        class="text-[13px] leading-snug font-medium animate-in fade-in slide-in-from-top-1"
        :style="{ color: 'var(--color-danger)' }"
      >
        {{ error }}
      </p>
      <p
        v-else-if="helperText"
        :id="`${inputId}-hint`"
        class="text-[13px] leading-snug"
        :style="{ color: 'var(--color-text-secondary)' }"
      >
        {{ helperText }}
      </p>
      <span v-else></span>

      <!-- Counter -->
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
/*
 * Component-level CSS override tokens — set on the component root or any ancestor:
 *   <Input style="--input-bg: #fafff4; --input-border-focus: green;" />
 *
 * --input-bg            default: var(--color-surface)
 * --input-border        default: var(--color-border)
 * --input-text          default: var(--color-text-primary)
 * --input-placeholder   default: var(--color-text-tertiary)
 * --input-border-focus  default: var(--color-text-primary)
 * --input-border-error  default: var(--color-danger)
 */

/* ── Wrapper base ── */
.ds-input-wrapper {
  background-color: var(--input-bg, var(--color-surface));
  border-color: var(--input-border, var(--color-border));
}

.ds-input-wrapper:hover:not(.ds-input-wrapper--disabled):not(.ds-input-wrapper--readonly):not(
    :focus-within
  ) {
  border-color: var(--color-border-strong);
}

.ds-input-wrapper:focus-within:not(.ds-input-wrapper--error) {
  border-color: var(--input-border-focus, var(--color-text-primary));
  box-shadow: 0 0 0 1px var(--input-border-focus, var(--color-text-primary));
}

/* ── Error state ── */
.ds-input-wrapper--error {
  border-color: var(--input-border-error, var(--color-danger));
}

.ds-input-wrapper--error:focus-within {
  box-shadow: 0 0 0 1px var(--input-border-error, var(--color-danger));
}

/* ── Disabled state ── */
.ds-input-wrapper--disabled {
  opacity: 0.5;
  background-color: var(--color-bg-subtle);
}

/* ── Readonly state ── */
.ds-input-wrapper--readonly {
  background-color: var(--color-bg-subtle);
}

/* ── Native input ── */
.ds-input-native {
  color: var(--input-text, var(--color-text-primary));
}

.ds-input-native::placeholder {
  color: var(--input-placeholder, var(--color-text-tertiary));
}

.ds-input-native:focus,
.ds-input-native:focus-visible,
.ds-input-native:focus-within {
  outline: none !important;
  box-shadow: none !important;
  border-color: transparent !important;
  --tw-ring-shadow: none !important;
  --tw-ring-color: transparent !important;
}

/* ── Webkit Autofill Override ── */
.ds-input-native:-webkit-autofill,
.ds-input-native:-webkit-autofill:hover,
.ds-input-native:-webkit-autofill:focus,
.ds-input-native:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 1000px var(--color-surface) inset !important;
  -webkit-text-fill-color: var(--color-text-primary) !important;
  border-radius: inherit;
  background-clip: padding-box;
}

.ds-input-wrapper--disabled .ds-input-native {
  color: var(--color-text-disabled);
}

/* ── Action buttons (clear, password toggle) ── */
.ds-input-action-btn {
  color: var(--color-text-tertiary);
}

.ds-input-action-btn:hover {
  color: var(--color-text-primary);
  background-color: var(--color-neutral-light);
}

.ds-input-action-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 1px var(--color-secondary);
  border-radius: var(--radius-sm);
}
</style>
