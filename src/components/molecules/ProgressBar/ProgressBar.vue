<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'primary' | 'success' | 'warning' | 'danger' | 'info'
type Size = 'sm' | 'md' | 'lg'

interface Props {
  /** The current progress percentage (0-100). @default 0 */
  value?: number
  /** Visual thickness of the progress bar. @default 'md' */
  size?: Size
  /** Semantic color variant. @default 'primary' */
  variant?: Variant
  /** Shows an animated indeterminate state instead of actual progress. @default false */
  indeterminate?: boolean
  /** Text label displayed above the progress bar. */
  label?: string
  /** Shows the numeric percentage alongside the label. @default false */
  showValue?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
  size: 'md',
  variant: 'primary',
  indeterminate: false,
  showValue: false,
})

const clamped = computed(() => Math.max(0, Math.min(100, props.value)))

const trackPx: Record<Size, number> = {
  sm: 6,
  md: 10,
  lg: 14,
}

// Component-level CSS override tokens:
//   --progress-fill   overrides the fill/bar color (default: variant color)
//   --progress-track  overrides the track background (default: theme track)
const variantColor: Record<Variant, string> = {
  primary: 'var(--color-primary)',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  danger:  'var(--color-danger)',
  info:    'var(--color-info)',
}

const fillColor = computed(() =>
  `var(--progress-fill, ${variantColor[props.variant]})`
)
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <!-- Label row -->
    <div
      v-if="label || showValue"
      class="flex items-center justify-between"
    >
      <span
        v-if="label"
        class="text-sm font-medium"
        style="color: var(--color-text-primary);"
      >
        {{ label }}
      </span>
      <span
        v-if="showValue && !indeterminate"
        class="text-sm font-medium tabular-nums"
        style="color: var(--color-text-secondary);"
      >
        {{ clamped }}%
      </span>
    </div>

    <!-- Track -->
    <div
      class="ds-progress-track w-full rounded-full overflow-hidden"
      :style="{ height: `${trackPx[size]}px` }"
      role="progressbar"
      :aria-valuenow="indeterminate ? undefined : clamped"
      :aria-valuemin="indeterminate ? undefined : 0"
      :aria-valuemax="indeterminate ? undefined : 100"
      :aria-label="label || 'Progress'"
    >
      <!-- Fill -->
      <div
        v-if="!indeterminate"
        class="h-full rounded-full transition-all duration-500 ease-out"
        :style="{
          width: `${clamped}%`,
          backgroundColor: fillColor,
        }"
      />
      <!-- Indeterminate shimmer -->
      <div
        v-else
        class="ds-progress-indeterminate h-full rounded-full"
        :style="{ backgroundColor: fillColor }"
      />
    </div>
  </div>
</template>

<style scoped>
.ds-progress-track {
  background-color: var(--color-text-tertiary);
  opacity: 0.2;
  position: relative;
}

/* Use a pseudo-element so the track bg has opacity but the fill does not */
.ds-progress-track {
  background: none;
  opacity: 1;
}

.ds-progress-track::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background-color: var(--progress-track, var(--color-text-primary));
  opacity: 0.12;
}

.ds-progress-track > div {
  position: relative;
  z-index: 1;
}

.ds-progress-indeterminate {
  width: 40%;
  animation: ds-progress-slide 1.5s ease-in-out infinite;
}

@keyframes ds-progress-slide {
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(150%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
