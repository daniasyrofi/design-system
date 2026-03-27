<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { RiAddLine, RiSubtractLine } from '@remixicon/vue'
import Button from '@/components/atoms/Button/Button.vue'

type Size = 'sm' | 'md' | 'lg'

interface Props {
  modelValue: number
  min?: number
  max?: number
  step?: number
  size?: Size
  disabled?: boolean
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: Infinity,
  step: 1,
  size: 'md',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const canDecrement = computed(() => props.modelValue - props.step >= props.min)
const canIncrement = computed(() => props.modelValue + props.step <= props.max)

function decrement() {
  if (!canDecrement.value || props.disabled) return
  emit('update:modelValue', Math.max(props.min, props.modelValue - props.step))
}

function increment() {
  if (!canIncrement.value || props.disabled) return
  emit('update:modelValue', Math.min(props.max, props.modelValue + props.step))
}

function handleInput(e: Event) {
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

const btnSize: Record<Size, 'xs' | 'sm' | 'md'> = {
  sm: 'xs',
  md: 'sm',
  lg: 'md',
}
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label
      v-if="label"
      class="text-sm font-medium"
      style="color: var(--color-text-heading);"
    >
      {{ label }}
    </label>

    <div
      :class="cn(
        'ds-number-input',
        'flex items-center rounded-[var(--radius-lg)] border overflow-hidden',
        'transition-all duration-200 ease-out',
        heightClass[size],
        disabled && 'opacity-50 cursor-not-allowed',
      )"
    >
      <!-- Decrement -->
      <Button
        variant="ghost"
        icon-only
        :size="btnSize[size]"
        :disabled="disabled || !canDecrement"
        class="shrink-0 rounded-none! border-none!"
        aria-label="Decrease value"
        @click="decrement"
      >
        <template #icon>
          <RiSubtractLine :size="iconPx[size]" />
        </template>
      </Button>

      <!-- Value display -->
      <input
        type="number"
        :value="modelValue"
        :min="min"
        :max="max === Infinity ? undefined : max"
        :step="step"
        :disabled="disabled"
        :class="cn(
          'ds-number-input__value flex-1 min-w-0 text-center font-semibold bg-transparent outline-none border-none tabular-nums',
          textClass[size],
          disabled && 'cursor-not-allowed',
        )"
        @input="handleInput"
      />

      <!-- Increment -->
      <Button
        variant="ghost"
        icon-only
        :size="btnSize[size]"
        :disabled="disabled || !canIncrement"
        class="shrink-0 rounded-none! border-none!"
        aria-label="Increase value"
        @click="increment"
      >
        <template #icon>
          <RiAddLine :size="iconPx[size]" />
        </template>
      </Button>
    </div>
  </div>
</template>

<style scoped>
.ds-number-input {
  background-color: var(--color-surface);
  border-color: var(--color-border);
}

.ds-number-input:hover:not([class*="opacity-50"]) {
  border-color: var(--color-border-strong);
}

.ds-number-input:focus-within {
  border-color: var(--color-text-primary);
  box-shadow: 0 0 0 1px var(--color-text-primary);
}

.ds-number-input__value {
  color: var(--color-text-primary);
}

/* Hide native spinner */
.ds-number-input__value::-webkit-outer-spin-button,
.ds-number-input__value::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.ds-number-input__value[type="number"] {
  -moz-appearance: textfield;
}
</style>
