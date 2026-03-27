<script setup lang="ts">
import { computed, ref } from 'vue'
import { cn } from '@/lib/utils'

type Size = 'sm' | 'md' | 'lg'

interface Props {
  modelValue: number
  min?: number
  max?: number
  step?: number
  size?: Size
  disabled?: boolean
  label?: string
  showValue?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  step: 1,
  size: 'md',
  disabled: false,
  showValue: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const trackRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)

const pct = computed(() => {
  const range = props.max - props.min
  if (range <= 0) return 0
  return ((props.modelValue - props.min) / range) * 100
})

function clamp(v: number): number {
  const stepped = Math.round(v / props.step) * props.step
  return Math.max(props.min, Math.min(props.max, stepped))
}

function getValueFromX(clientX: number) {
  if (!trackRef.value) return props.modelValue
  const rect = trackRef.value.getBoundingClientRect()
  const ratio = (clientX - rect.left) / rect.width
  return clamp(props.min + ratio * (props.max - props.min))
}

function onPointerDown(e: PointerEvent) {
  if (props.disabled) return
  isDragging.value = true
  emit('update:modelValue', getValueFromX(e.clientX))
  ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
}

function onPointerMove(e: PointerEvent) {
  if (!isDragging.value) return
  emit('update:modelValue', getValueFromX(e.clientX))
}

function onPointerUp() {
  isDragging.value = false
}

function onKeyDown(e: KeyboardEvent) {
  if (props.disabled) return
  let next = props.modelValue
  if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
    next = clamp(props.modelValue + props.step)
    e.preventDefault()
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
    next = clamp(props.modelValue - props.step)
    e.preventDefault()
  } else if (e.key === 'Home') {
    next = props.min
    e.preventDefault()
  } else if (e.key === 'End') {
    next = props.max
    e.preventDefault()
  }
  if (next !== props.modelValue) emit('update:modelValue', next)
}

const trackHeightPx: Record<Size, number> = {
  sm: 4,
  md: 6,
  lg: 8,
}

const thumbPx: Record<Size, number> = {
  sm: 16,
  md: 20,
  lg: 24,
}
</script>

<template>
  <div :class="cn('flex flex-col gap-2 w-full select-none', disabled && 'opacity-50 pointer-events-none')">
    <!-- Label row -->
    <div v-if="label || showValue" class="flex items-center justify-between">
      <span v-if="label" class="text-sm font-medium" style="color: var(--color-text-primary);">
        {{ label }}
      </span>
      <span v-if="showValue" class="text-sm font-medium tabular-nums" style="color: var(--color-text-secondary);">
        {{ modelValue }}
      </span>
    </div>

    <!-- Slider track area -->
    <div
      ref="trackRef"
      :class="cn('relative w-full cursor-pointer', disabled && 'cursor-not-allowed')"
      :style="{ height: `${Math.max(thumbPx[size], 24)}px`, display: 'flex', alignItems: 'center' }"
      role="slider"
      tabindex="0"
      :aria-valuenow="modelValue"
      :aria-valuemin="min"
      :aria-valuemax="max"
      :aria-label="label || 'Slider'"
      :aria-disabled="disabled || undefined"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @keydown="onKeyDown"
    >
      <!-- Track background -->
      <div
        class="ds-slider-track w-full rounded-full"
        :style="{
          height: `${trackHeightPx[size]}px`,
        }"
      />

      <!-- Filled portion -->
      <div
        class="ds-slider-fill absolute rounded-full"
        :style="{
          height: `${trackHeightPx[size]}px`,
          width: `${pct}%`,
          top: '50%',
          left: 0,
          transform: 'translateY(-50%)',
        }"
      />

      <!-- Thumb -->
      <div
        class="ds-slider-thumb absolute rounded-full"
        :style="{
          width: `${thumbPx[size]}px`,
          height: `${thumbPx[size]}px`,
          left: `${pct}%`,
          top: '50%',
          transform: `translate(-50%, -50%)${isDragging ? ' scale(1.15)' : ''}`,
          transition: 'transform 100ms ease-out, box-shadow 150ms ease-out',
        }"
      />
    </div>
  </div>
</template>

<style scoped>
.ds-slider-track {
  background-color: var(--color-border);
}

.ds-slider-fill {
  background-color: var(--color-primary);
}

.ds-slider-thumb {
  background-color: var(--color-surface);
  border: 2px solid var(--color-primary);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.06);
  cursor: grab;
}

.ds-slider-thumb:hover {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.ds-slider-thumb:active {
  cursor: grabbing;
}

div[role="slider"]:focus-visible .ds-slider-thumb {
  box-shadow: 0 0 0 2px var(--color-surface), 0 0 0 4px var(--color-primary);
}
</style>
