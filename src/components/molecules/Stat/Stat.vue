<script setup lang="ts">
import { computed } from 'vue'

type StatTrend = 'up' | 'down' | 'neutral'
type StatSize  = 'sm' | 'md' | 'lg'

interface Props {
  /** Short descriptive label above the value. */
  label:        string
  /** The primary metric value to display. */
  value:        string | number
  /** Change delta shown next to the value (e.g. '+12%' or 3.5). */
  delta?:       string | number
  /** Direction of the delta trend. @default 'neutral' */
  trend?:       StatTrend
  /** Optional supporting text below the value row. */
  description?: string
  /** Visual size. @default 'md' */
  size?:        StatSize
}

const props = withDefaults(defineProps<Props>(), {
  trend: 'neutral',
  size:  'md',
})

const trendColor = computed(() => {
  if (props.trend === 'up')   return 'var(--color-success)'
  if (props.trend === 'down') return 'var(--color-danger)'
  return 'var(--color-text-secondary)'
})

const trendArrow = computed(() => {
  if (props.trend === 'up')   return '↑'
  if (props.trend === 'down') return '↓'
  return '→'
})

const valueSizeClass: Record<StatSize, string> = {
  sm: 'text-2xl',
  md: 'text-3xl',
  lg: 'text-4xl',
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <!-- Label -->
    <p class="text-sm font-medium" style="color: var(--color-text-secondary);">
      <slot name="label">{{ label }}</slot>
    </p>

    <!-- Value + delta row -->
    <div class="flex items-baseline gap-2 flex-wrap">
      <span
        :class="['font-bold tabular-nums leading-none', valueSizeClass[size]]"
        style="color: var(--color-text-primary);"
      >
        <slot name="value">{{ value }}</slot>
      </span>

      <span
        v-if="delta !== undefined"
        class="inline-flex items-center gap-0.5 text-sm font-medium"
        :style="{ color: trendColor }"
        :aria-label="`Trend: ${trend}, change: ${delta}`"
      >
        <span aria-hidden="true">{{ trendArrow }}</span>
        {{ delta }}
      </span>
    </div>

    <!-- Description -->
    <p
      v-if="description || $slots.description"
      class="text-xs"
      style="color: var(--color-text-tertiary);"
    >
      <slot name="description">{{ description }}</slot>
    </p>

    <!-- Extra slot for supplementary content -->
    <slot />
  </div>
</template>
