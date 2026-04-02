<script setup lang="ts">
import { computed, useId } from 'vue'
import { cn } from '@/lib/utils'
import { Icons } from '@/lib/icons'

type CheckboxSize  = 'sm' | 'md' | 'lg'
type CheckboxColor = 'primary' | 'secondary' | 'neutral' | 'danger'
type CheckboxValue = boolean | 'indeterminate'

interface Props {
  modelValue:   CheckboxValue
  size?:        CheckboxSize
  color?:       CheckboxColor
  disabled?:    boolean
  readonly?:    boolean
  label?:       string
  description?: string
  error?:       string
  name?:        string
  value?:       string
}

const props = withDefaults(defineProps<Props>(), {
  size:     'md',
  color:    'primary',
  disabled: false,
  readonly: false,
})

const emit = defineEmits<{ 'update:modelValue': [value: CheckboxValue] }>()

const inputId = useId()

const isChecked       = computed(() => props.modelValue === true)
const isIndeterminate = computed(() => props.modelValue === 'indeterminate')
const isActive        = computed(() => isChecked.value || isIndeterminate.value)
const hasError        = computed(() => !!props.error)

function handleChange(e: Event) {
  if (props.readonly) return
  const target = e.target as HTMLInputElement
  if (props.modelValue === 'indeterminate') {
    emit('update:modelValue', true)
  } else {
    emit('update:modelValue', target.checked)
  }
}

const boxSizeClass: Record<CheckboxSize, string> = {
  sm: 'size-4',    // 16px
  md: 'size-5',    // 20px
  lg: 'size-6',    // 24px
}

const iconSizePx: Record<CheckboxSize, string> = {
  sm: '12',
  md: '14',
  lg: '16',
}

const labelTextClass: Record<CheckboxSize, string> = {
  sm: 'text-xs',   // 12px
  md: 'text-sm',   // 14px
  lg: 'text-base', // 16px
}

const descTextClass: Record<CheckboxSize, string> = {
  sm: 'text-[11px]',
  md: 'text-xs',
  lg: 'text-sm',
}

// Math for baseline alignment: (BoxHeight - LineHeight) / 2
// Assumes text uses leading-none (LineHeight = FontSize)
const offsetClass: Record<CheckboxSize, string> = {
  sm: 'mt-[2px]',  // (16 - 12)/2 = 2px
  md: 'mt-[3px]',  // (20 - 14)/2 = 3px
  lg: 'mt-[4px]',  // (24 - 16)/2 = 4px
}

const boxClasses = computed(() =>
  cn(
    'checkbox-box relative shrink-0 inline-flex items-center justify-center',
    'border-2 transition-colors duration-200 ease-out',
    boxSizeClass[props.size],
    props.disabled && 'opacity-50 cursor-not-allowed',
  )
)

const boxStyle = computed(() => {
  const styles: Record<string, string> = {
    borderRadius: 'var(--radius-sm)',
  }

  const colorVar = `var(--color-${props.color})`

  if (isActive.value) {
    if (hasError.value) {
      styles.backgroundColor = 'var(--color-danger)'
      styles.borderColor = 'var(--color-danger)'
    } else {
      styles.backgroundColor = colorVar
      styles.borderColor = colorVar
      // Scaling caused sub-pixel jitter in the adjacent label text during transitions!
    }
  } else {
    if (hasError.value) {
      styles.backgroundColor = 'var(--color-danger-light)'
      styles.borderColor = 'var(--color-danger)'
    } else {
      styles.backgroundColor = 'var(--color-surface)'
      styles.borderColor = 'var(--color-border-strong)'
    }
  }

  return styles
})

const focusRingVar = computed(() =>
  hasError.value ? 'var(--ring-danger)' : `0 0 0 2px var(--color-surface), 0 0 0 4px var(--color-${props.color})`
)
</script>

<template>
  <div :class="cn('inline-flex flex-col gap-1', disabled && 'cursor-not-allowed')">
    <label
      :class="cn(
        'checkbox-label relative flex items-start gap-2.5',
        disabled ? 'cursor-not-allowed' : readonly ? 'cursor-default' : 'cursor-pointer',
      )"
      :data-active="isActive || undefined"
      :data-error="hasError || undefined"
      :data-disabled="disabled || undefined"
    >
      <!-- Hidden native input -->
      <input
        :id="inputId"
        type="checkbox"
        class="sr-only peer"
        :name="name"
        :value="value"
        :checked="isChecked"
        :indeterminate="isIndeterminate"
        :disabled="disabled"
        :aria-checked="isIndeterminate ? 'mixed' : isChecked"
        :aria-invalid="hasError || undefined"
        :aria-describedby="description || error ? `${inputId}-desc` : undefined"
        @change="handleChange"
      />

      <!-- Visual box with Absolute SVG Icons to prevent sub-pixel layout shifts -->
      <span
        :class="boxClasses"
        :style="[boxStyle, { '--focus-ring': focusRingVar }]"
        aria-hidden="true"
      >
        <span
          v-if="isChecked"
          :class="cn(
            'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out',
            isChecked ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'
          )"
          :style="{
            color: 'var(--color-text-inverse)',
            width: iconSizePx[size] + 'px',
            height: iconSizePx[size] + 'px',
            display: 'flex'
          }"
          v-html="Icons.Check"
        />
        <span
          v-if="isIndeterminate"
          :class="cn(
            'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out',
            isIndeterminate ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'
          )"
          :style="{
            color: 'var(--color-text-inverse)',
            width: iconSizePx[size] + 'px',
            height: iconSizePx[size] + 'px',
            display: 'flex'
          }"
          v-html="Icons.Subtract"
        />
      </span>

      <!-- Text content -->
      <span
        v-if="label || description"
        :class="cn('flex flex-col gap-1', offsetClass[size])"
      >
        <span
          v-if="label"
          :class="cn(
            labelTextClass[size],
            'font-medium leading-none transition-colors overflow-hidden truncate',
            disabled && 'opacity-50',
          )"
          :style="{
            color: hasError
              ? 'var(--color-danger)'
              : 'var(--color-text-primary)',
          }"
        >
          {{ label }}
        </span>
        <span
          v-if="description && !error"
          :id="`${inputId}-desc`"
          :class="cn(descTextClass[size], disabled && 'opacity-50')"
          :style="{ color: 'var(--color-text-secondary)' }"
        >
          {{ description }}
        </span>
      </span>
    </label>

    <!-- Error message -->
    <p
      v-if="error"
      :id="`${inputId}-desc`"
      class="text-sm ml-7"
      :style="{ color: 'var(--color-danger)' }"
    >
      {{ error }}
    </p>
  </div>
</template>

<style scoped>
/* Focus ring via peer-focus-visible on the hidden input */
.peer:focus-visible ~ .checkbox-box {
  box-shadow: var(--focus-ring);
  outline: none;
}

/* Hover: darken border on unchecked, non-error, non-disabled checkboxes */
.checkbox-label:not([data-active]):not([data-error]):not([data-disabled]):hover .checkbox-box {
  border-color: var(--color-neutral-hover);
}
</style>
