<script setup lang="ts">
import { ref, computed, useId } from 'vue'
import { cn } from '@/lib/utils'
import { RiAddLine, RiSubtractLine } from '@remixicon/vue'

type Size = 'sm' | 'md' | 'lg'

interface Props {
  /** The current numeric value. Supports v-model. */
  modelValue: number
  /** Minimum allowed value. @default 0 */
  min?: number
  /** Maximum allowed value. @default Infinity */
  max?: number
  /** Number to increment/decrement by. @default 1 */
  step?: number
  /** Visual size of the input. @default 'md' */
  size?: Size
  /** Disables the input and buttons. @default false */
  disabled?: boolean
  /** Shows value but prevents editing. @default false */
  readonly?: boolean
  /** Optional label text displayed above the input. */
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: Infinity,
  step: 1,
  size: 'md',
  disabled: false,
  readonly: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
  keyup: [event: KeyboardEvent]
}>()

const canDecrement = computed(() => props.modelValue - props.step >= props.min)
const canIncrement = computed(() => props.modelValue + props.step <= props.max)

function decrement() {
  if (!canDecrement.value || props.disabled || props.readonly) return
  emit('update:modelValue', Math.max(props.min, props.modelValue - props.step))
}

function increment() {
  if (!canIncrement.value || props.disabled || props.readonly) return
  emit('update:modelValue', Math.min(props.max, props.modelValue + props.step))
}

function handleInput(e: Event) {
  if (props.readonly) return
  const val = parseFloat((e.target as HTMLInputElement).value)
  if (!isNaN(val)) {
    emit('update:modelValue', Math.max(props.min, Math.min(props.max, val)))
  }
}

const heightClass: Record<Size, string> = {
  sm: 'h-8',
  md: 'h-10',
  lg: 'h-12',
}

const textClass: Record<Size, string> = {
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base',
}

const iconPx: Record<Size, string> = {
  sm: '14',
  md: '16',
  lg: '18',
}

const inputId = useId()

const btnWidthClass: Record<Size, string> = {
  sm: 'w-8',
  md: 'w-10',
  lg: 'w-12',
}

const inputRef = ref<HTMLInputElement | null>(null)

defineExpose({
  el: inputRef,
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
})
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label
      v-if="label"
      :for="inputId"
      :class="cn('text-sm font-medium select-none', disabled && 'opacity-50')"
      style="color: var(--color-text-heading)"
    >
      {{ label }}
    </label>

    <div
      :class="
        cn(
          'ds-number-input',
          'flex items-stretch rounded-[var(--radius-lg)] border overflow-hidden',
          'transition-colors duration-200 ease-out',
          heightClass[size],
          disabled && 'ds-number-input--disabled',
          readonly && 'ds-number-input--readonly'
        )
      "
    >
      <!-- Decrement -->
      <button
        type="button"
        :disabled="disabled || readonly || !canDecrement"
        :class="
          cn(
            'ds-number-btn ds-number-btn--left',
            'shrink-0 flex items-center justify-center',
            'transition-all duration-200 ease-out',
            'active:scale-[0.97]',
            btnWidthClass[size]
          )
        "
        aria-label="Decrease value"
        @click="decrement"
      >
        <RiSubtractLine :size="iconPx[size]" />
      </button>

      <!-- Value display -->
      <input
        :id="inputId"
        ref="inputRef"
        type="number"
        :value="modelValue"
        :min="min"
        :max="max === Infinity ? undefined : max"
        :step="step"
        :disabled="disabled"
        :readonly="readonly"
        :class="
          cn(
            'ds-number-input__value flex-1 min-w-0 text-center font-semibold bg-transparent outline-none border-none tabular-nums',
            textClass[size],
            disabled && 'cursor-not-allowed',
            readonly && 'cursor-default select-none'
          )
        "
        @input="handleInput"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
        @keydown="emit('keydown', $event)"
        @keyup="emit('keyup', $event)"
      />

      <!-- Increment -->
      <button
        type="button"
        :disabled="disabled || readonly || !canIncrement"
        :class="
          cn(
            'ds-number-btn ds-number-btn--right',
            'shrink-0 flex items-center justify-center',
            'transition-all duration-200 ease-out',
            'active:scale-[0.97]',
            btnWidthClass[size]
          )
        "
        aria-label="Increase value"
        @click="increment"
      >
        <RiAddLine :size="iconPx[size]" />
      </button>
    </div>
  </div>
</template>

<style scoped>
/* ── Container ── */
.ds-number-input {
  background-color: var(--color-surface);
  border-color: var(--color-border);
}

.ds-number-input:hover:not(.ds-number-input--disabled):not(:focus-within) {
  border-color: var(--color-border-strong);
}

.ds-number-input:focus-within {
  border-color: var(--color-text-primary);
  box-shadow: 0 0 0 1px var(--color-text-primary);
}

.ds-number-input--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.ds-number-input--readonly {
  background-color: var(--color-bg-subtle);
}

/* ── Value input ── */
.ds-number-input__value {
  color: var(--color-text-primary);
}

.ds-number-input__value:focus,
.ds-number-input__value:focus-visible {
  outline: none;
}

.ds-number-input__value::-webkit-outer-spin-button,
.ds-number-input__value::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.ds-number-input__value[type='number'] {
  -moz-appearance: textfield;
}

/* ── Buttons (ghost style, mirroring Button atom's ghost variant) ── */
.ds-number-btn {
  background-color: transparent;
  color: var(--color-text-secondary);
  border: none;
  cursor: pointer;
}

.ds-number-btn:hover:not(:disabled) {
  background-color: var(--color-neutral-light);
  color: var(--color-text-heading);
}

.ds-number-btn:focus,
.ds-number-btn:focus-visible {
  outline: none;
}

.ds-number-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Rounded corners matching the container radius */
.ds-number-btn--left {
  border-radius: calc(var(--radius-lg) - 1px) 0 0 calc(var(--radius-lg) - 1px);
}

.ds-number-btn--right {
  border-radius: 0 calc(var(--radius-lg) - 1px) calc(var(--radius-lg) - 1px) 0;
}
</style>
