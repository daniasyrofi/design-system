<script setup lang="ts">
import { ref, computed } from 'vue'

type RatingSize = 'sm' | 'md' | 'lg'

interface Props {
  /** Current rating value. Supports v-model. */
  modelValue?: number
  /** Maximum number of stars. @default 5 */
  max?:        number
  /** Visual size. @default 'md' */
  size?:       RatingSize
  /** Makes the rating read-only (no interaction). @default false */
  readonly?:   boolean
  /** Disables the rating. @default false */
  disabled?:   boolean
  /** Clicking an already-selected star resets to 0. @default true */
  allowClear?: boolean
  /** Accessible label for the group. */
  label?:      string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  max:        5,
  size:       'md',
  readonly:   false,
  disabled:   false,
  allowClear: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [value: number]
}>()

const hovered     = ref<number | null>(null)
const displayValue = computed(() => hovered.value ?? props.modelValue)

const starPx: Record<RatingSize, number> = { sm: 16, md: 20, lg: 28 }

function rate(star: number) {
  if (props.readonly || props.disabled) return
  const next = props.allowClear && star === props.modelValue ? 0 : star
  emit('update:modelValue', next)
  emit('change', next)
}
</script>

<template>
  <div
    class="inline-flex items-center gap-0.5"
    role="radiogroup"
    :aria-label="label || 'Rating'"
    :aria-disabled="disabled || readonly"
  >
    <button
      v-for="star in max"
      :key="star"
      type="button"
      role="radio"
      :aria-checked="modelValue >= star"
      :aria-label="`${star} star${star !== 1 ? 's' : ''}`"
      :disabled="readonly || disabled"
      class="relative focus-visible:outline-2 focus-visible:outline-offset-1 rounded-sm transition-transform duration-[--duration-fast]"
      :class="{ 'hover:scale-110 active:scale-95 cursor-pointer': !readonly && !disabled, 'cursor-default': readonly || disabled }"
      :style="{ color: displayValue >= star ? 'var(--color-warning)' : 'var(--color-border-strong)' }"
      @click="rate(star)"
      @mouseenter="!readonly && !disabled && (hovered = star)"
      @mouseleave="hovered = null"
    >
      <svg
        :width="starPx[size]"
        :height="starPx[size]"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    </button>
  </div>
</template>
