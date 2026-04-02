<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

export interface SegmentOption {
  /** Display label. */
  label:      string
  /** Unique value used for v-model. */
  value:      string
  /** Icon component (e.g. from @remixicon/vue). */
  icon?:      object
  /** Disables this individual segment. */
  disabled?:  boolean
}

type SegmentSize = 'sm' | 'md' | 'lg'

interface Props {
  /** Currently selected value. Supports v-model. */
  modelValue:  string
  /** Array of segment options. */
  options:     SegmentOption[]
  /** Visual size. @default 'md' */
  size?:       SegmentSize
  /** Disables all segments. @default false */
  disabled?:   boolean
  /** Make each segment fill equal width. @default false */
  fullWidth?:  boolean
}

const props = withDefaults(defineProps<Props>(), {
  size:      'md',
  disabled:  false,
  fullWidth: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const sizeClasses: Record<SegmentSize, string> = {
  sm: 'text-xs px-2.5 py-1 gap-1',
  md: 'text-sm px-3 py-1.5 gap-1.5',
  lg: 'text-sm px-4 py-2 gap-2',
}

const iconSizeMap: Record<SegmentSize, number> = { sm: 12, md: 14, lg: 16 }

const trackClasses = computed(() =>
  cn(
    'inline-flex items-center rounded-[var(--radius-md)] p-0.5',
    props.fullWidth && 'flex w-full',
  )
)

function select(value: string, optDisabled?: boolean) {
  if (props.disabled || optDisabled) return
  emit('update:modelValue', value)
}
</script>

<template>
  <div
    :class="trackClasses"
    role="group"
    :style="{
      backgroundColor: 'var(--color-neutral-light)',
      border:          '1px solid var(--color-border)',
    }"
  >
    <button
      v-for="opt in options"
      :key="opt.value"
      type="button"
      role="radio"
      :aria-checked="modelValue === opt.value"
      :disabled="disabled || opt.disabled"
      :class="cn(
        'relative inline-flex items-center justify-center font-medium rounded-[calc(var(--radius-md)-2px)] transition-all duration-[--duration-fast] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-1',
        sizeClasses[size],
        fullWidth && 'flex-1',
        modelValue === opt.value
          ? 'text-[--color-text-primary]'
          : 'text-[--color-text-secondary] hover:text-[--color-text-primary]',
        (disabled || opt.disabled) && 'opacity-40 cursor-not-allowed pointer-events-none',
      )"
      :style="modelValue === opt.value
        ? { backgroundColor: 'var(--color-surface)', boxShadow: 'var(--shadow-sm)' }
        : {}"
      @click="select(opt.value, opt.disabled)"
    >
      <component
        :is="opt.icon"
        v-if="opt.icon"
        :size="iconSizeMap[size]"
        aria-hidden="true"
      />
      {{ opt.label }}
    </button>
  </div>
</template>
