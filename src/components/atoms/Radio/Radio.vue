<script setup lang="ts">
import { computed, useId, ref } from 'vue'
import { cn } from '@/lib/utils'
import { baselineOffset } from '@/lib/opticalAlign'

type RadioSize = 'sm' | 'md' | 'lg'
type RadioColor = 'primary' | 'secondary' | 'neutral' | 'danger'

interface Props {
  modelValue: string | number
  value: string | number
  size?: RadioSize
  color?: RadioColor
  disabled?: boolean
  readonly?: boolean
  label?: string
  description?: string
  error?: string
  name?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'primary',
  disabled: false,
  readonly: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const inputId = useId()
const inputRef = ref<HTMLInputElement | null>(null)
const isChecked = computed(() => props.modelValue === props.value)
const hasError = computed(() => !!props.error)

function handleChange() {
  if (!props.disabled && !props.readonly) {
    emit('update:modelValue', props.value)
  }
}

// Size maps
const outerSizeClass: Record<RadioSize, string> = {
  sm: 'size-4', // 16px
  md: 'size-5', // 20px
  lg: 'size-6', // 24px
}

const innerSizeClass: Record<RadioSize, string> = {
  sm: 'size-2',
  md: 'size-2.5',
  lg: 'size-3',
}

const labelTextClass: Record<RadioSize, string> = {
  sm: 'text-xs', // 12px
  md: 'text-sm', // 14px
  lg: 'text-base', // 16px
}

const descTextClass: Record<RadioSize, string> = {
  sm: 'text-[11px]',
  md: 'text-xs',
  lg: 'text-sm',
}

// Baseline alignment: (BoxHeight - FontSize) / 2
const boxHeights: Record<RadioSize, number> = { sm: 16, md: 20, lg: 24 }
const fontSizes: Record<RadioSize, number> = { sm: 12, md: 14, lg: 16 }
const offsetClass = computed(() => ({
  sm: `mt-[${baselineOffset(boxHeights.sm, fontSizes.sm)}px]`,
  md: `mt-[${baselineOffset(boxHeights.md, fontSizes.md)}px]`,
  lg: `mt-[${baselineOffset(boxHeights.lg, fontSizes.lg)}px]`,
}))

const outerStyle = computed(() => {
  const colorVar = `var(--color-${props.color})`

  const borderColor = isChecked.value
    ? hasError.value
      ? 'var(--color-danger)'
      : colorVar
    : hasError.value
      ? 'var(--color-danger)'
      : 'var(--color-border-strong)'

  return {
    borderColor,
    backgroundColor: 'var(--color-surface)',
  }
})

const outerClasses = computed(() =>
  cn(
    'shrink-0 inline-flex items-center justify-center rounded-full',
    'border-2 transition-all duration-150 ease-out',
    outerSizeClass[props.size],
    !isChecked.value &&
      !hasError.value &&
      !props.disabled &&
      'group-hover:[border-color:var(--color-neutral)]',
    props.disabled && 'opacity-50'
  )
)

const innerStyle = computed(() => {
  if (!isChecked.value) return { backgroundColor: 'transparent' }
  const colorVar = `var(--color-${props.color})`
  return {
    backgroundColor: hasError.value ? 'var(--color-danger)' : colorVar,
  }
})

const innerClasses = computed(() =>
  cn(
    'rounded-full transition-all duration-150 ease-out',
    innerSizeClass[props.size],
    isChecked.value ? 'scale-100' : 'scale-0'
  )
)

const labelStyle = computed(() => ({
  color: hasError.value ? 'var(--color-danger)' : 'var(--color-text-primary)',
}))

const descriptionStyle = { color: 'var(--color-text-secondary)' }

const errorStyle = { color: 'var(--color-danger)' }

const focusRingVar = computed(() =>
  hasError.value
    ? 'var(--ring-danger)'
    : `0 0 0 2px var(--color-surface), 0 0 0 4px var(--color-${props.color})`
)

defineExpose({
  el: inputRef,
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
})
</script>

<template>
  <div :class="cn('inline-flex flex-col gap-1', disabled && 'cursor-not-allowed')">
    <label
      :for="inputId"
      :class="
        cn(
          'relative flex items-start gap-2.5',
          disabled ? 'cursor-not-allowed' : readonly ? 'cursor-default' : 'cursor-pointer group'
        )
      "
    >
      <!-- Hidden native input -->
      <input
        ref="inputRef"
        :id="inputId"
        type="radio"
        class="sr-only peer"
        :name="name"
        :value="value"
        :checked="isChecked"
        :disabled="disabled"
        :aria-invalid="hasError || undefined"
        :aria-describedby="description || error ? `${inputId}-desc` : undefined"
        @change="handleChange"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
      />

      <!-- Visual radio button -->
      <span
        :class="outerClasses"
        :style="[outerStyle, { '--focus-ring': focusRingVar }]"
        aria-hidden="true"
      >
        <span :class="innerClasses" :style="innerStyle" />
      </span>

      <!-- Text content -->
      <span v-if="label || description" :class="cn('flex flex-col gap-1', offsetClass[size])">
        <span
          v-if="label"
          :class="
            cn(
              labelTextClass[size],
              'font-medium leading-none transition-colors',
              disabled && 'opacity-50'
            )
          "
          :style="labelStyle"
        >
          {{ label }}
        </span>
        <span
          v-if="description && !error"
          :id="`${inputId}-desc`"
          :class="cn(descTextClass[size], disabled && 'opacity-50')"
          :style="descriptionStyle"
        >
          {{ description }}
        </span>
      </span>
    </label>

    <!-- Error message -->
    <p v-if="error" :id="`${inputId}-desc`" class="text-sm ml-7" :style="errorStyle">
      {{ error }}
    </p>
  </div>
</template>

<style scoped>
.peer:focus-visible ~ span {
  outline: none;
  box-shadow: var(--focus-ring, 0 0 0 2px var(--color-surface), 0 0 0 4px var(--color-primary));
}
</style>
