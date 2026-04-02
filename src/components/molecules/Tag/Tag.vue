<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { RiCloseLine } from '@remixicon/vue'

type TagVariant = 'neutral' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
type TagSize    = 'sm' | 'md' | 'lg'

interface Props {
  /** Color variant. @default 'neutral' */
  variant?:   TagVariant
  /** Visual size. @default 'md' */
  size?:      TagSize
  /** Shows a × button to remove the tag. @default false */
  removable?: boolean
  /** Makes the tag look interactive (hover + cursor pointer). @default false */
  clickable?: boolean
  /** Disables interactions. @default false */
  disabled?:  boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant:   'neutral',
  size:      'md',
  removable: false,
  clickable: false,
  disabled:  false,
})

const emit = defineEmits<{
  click:  []
  remove: []
}>()

// ── Color tokens per variant ──────────────────────────────────────────────────

type ColorTokens = { bg: string; border: string; text: string }

const colorMap: Record<TagVariant, ColorTokens> = {
  neutral:   { bg: 'var(--color-neutral-light)',   border: 'var(--color-border)',          text: 'var(--color-text-secondary)' },
  primary:   { bg: 'var(--color-primary-light)',   border: 'var(--color-primary)',          text: 'var(--color-primary-strong)' },
  secondary: { bg: 'var(--color-secondary-light)', border: 'var(--color-secondary)',        text: 'var(--color-secondary-strong)' },
  success:   { bg: 'var(--color-success-light)',   border: 'var(--color-success)',          text: 'var(--color-success-strong)' },
  warning:   { bg: 'var(--color-warning-light)',   border: 'var(--color-warning)',          text: 'var(--color-warning-strong)' },
  danger:    { bg: 'var(--color-danger-light)',    border: 'var(--color-danger)',           text: 'var(--color-danger-strong)' },
  info:      { bg: 'var(--color-info-light)',      border: 'var(--color-info)',             text: 'var(--color-info-strong)' },
}

const tokens = computed(() => colorMap[props.variant])

// Component-level CSS override tokens:
//   --tag-bg      overrides background
//   --tag-border  overrides border color
//   --tag-text    overrides text color
const inlineStyle = computed(() => ({
  backgroundColor: `var(--tag-bg, ${tokens.value.bg})`,
  borderColor:     `var(--tag-border, ${tokens.value.border})`,
  color:           `var(--tag-text, ${tokens.value.text})`,
}))

// ── Size classes ──────────────────────────────────────────────────────────────

const sizeClass: Record<TagSize, string> = {
  sm: 'h-5 px-1.5 gap-1 text-[11px]',
  md: 'h-6 px-2 gap-1.5 text-xs',
  lg: 'h-7 px-2.5 gap-1.5 text-sm',
}

const iconSize: Record<TagSize, number> = { sm: 10, md: 12, lg: 14 }

const tagClasses = computed(() =>
  cn(
    'ds-tag inline-flex items-center font-medium border rounded-full select-none',
    'transition-colors duration-[--duration-fast]',
    sizeClass[props.size],
    props.clickable && !props.disabled && 'cursor-pointer hover:brightness-95 active:brightness-90',
    props.disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
  )
)

function handleClick() {
  if (!props.disabled) emit('click')
}

function handleRemove(e: MouseEvent) {
  e.stopPropagation()
  if (!props.disabled) emit('remove')
}
</script>

<template>
  <span
    :class="tagClasses"
    :style="inlineStyle"
    :role="clickable ? 'button' : undefined"
    :tabindex="clickable && !disabled ? 0 : undefined"
    :aria-disabled="disabled || undefined"
    @click="clickable ? handleClick() : undefined"
    @keydown.enter="clickable ? handleClick() : undefined"
    @keydown.space.prevent="clickable ? handleClick() : undefined"
  >
    <!-- Leading icon slot -->
    <slot name="icon" />

    <!-- Label -->
    <span class="truncate max-w-[200px]">
      <slot />
    </span>

    <!-- Remove button -->
    <button
      v-if="removable"
      type="button"
      class="ds-tag-remove shrink-0 flex items-center justify-center rounded-full -mr-0.5 transition-colors duration-[--duration-fast]"
      :style="{ color: tokens.text }"
      :aria-label="`Remove tag`"
      :disabled="disabled"
      @click.stop="handleRemove"
    >
      <RiCloseLine :size="String(iconSize[size])" />
    </button>
  </span>
</template>

<style scoped>
.ds-tag-remove:hover {
  background-color: color-mix(in oklch, currentColor 15%, transparent);
}
.ds-tag-remove:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 1px;
}
</style>
