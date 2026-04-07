<script setup lang="ts">
import { computed, ref, type Component } from 'vue'
import * as RemixIcons from '@remixicon/vue'
import { cn } from '@/lib/utils'

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
type AvatarShape = 'circle' | 'rounded' | 'square'
type AvatarStatus = 'online' | 'offline' | 'busy' | 'away' | null

interface Props {
  src?: string
  alt?: string
  name?: string
  size?: AvatarSize
  shape?: AvatarShape
  status?: AvatarStatus
  fallbackIcon?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  shape: 'circle',
})

const imgError = ref(false)

// ── Size classes ───────────────────────────────────────────────────────────

const sizeClass: Record<AvatarSize, string> = {
  xs: 'size-6',
  sm: 'size-8',
  md: 'size-10',
  lg: 'size-12',
  xl: 'size-14',
  '2xl': 'size-16',
}

const textSizeClass: Record<AvatarSize, string> = {
  xs: 'text-[10px] font-semibold leading-none',
  sm: 'text-xs font-semibold leading-none',
  md: 'text-sm font-semibold leading-none',
  lg: 'text-base font-semibold leading-none',
  xl: 'text-lg font-semibold leading-none',
  '2xl': 'text-xl font-semibold leading-none',
}

const iconSizePx: Record<AvatarSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
  '2xl': 32,
}

const shapeClass: Record<AvatarShape, string> = {
  circle: 'rounded-full',
  rounded: 'rounded-[var(--radius-xl)]',
  square: 'rounded-[var(--radius-md)]',
}

const statusSizeClass: Record<AvatarSize, string> = {
  xs: 'size-1.5 ring-1',
  sm: 'size-2 ring-[1.5px]',
  md: 'size-2.5 ring-2',
  lg: 'size-3 ring-2',
  xl: 'size-3.5 ring-2',
  '2xl': 'size-4 ring-[3px]',
}

const statusColors: Record<NonNullable<AvatarStatus>, string> = {
  online: 'var(--color-success)',
  busy: 'var(--color-danger)',
  away: 'var(--color-warning)',
  offline: 'var(--color-text-tertiary)',
}

// Derive initials from name
const initials = computed(() => {
  if (!props.name) return ''
  const parts = props.name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
})

// Derive a consistent hue from the name for unique per-user avatar colors
function nameToHue(name: string): number {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const hues = [55, 90, 130, 170, 200, 230, 260, 290]
  return hues[Math.abs(hash) % hues.length]
}

const initialsStyle = computed(() => {
  if (!props.name) return {}
  const hue = nameToHue(props.name)
  // Use CSS custom property so dark mode can be overridden via [data-theme='dark'] in globals.css
  // We expose --avatar-hue and compute the tones relative to it
  return {
    '--avatar-hue': hue,
    backgroundColor: `oklch(var(--avatar-bg-l, 0.88) 0.06 ${hue})`,
    color: `oklch(var(--avatar-text-l, 0.38) 0.12 ${hue})`,
  }
})

// Fallback (icon) inline style using semantic tokens
const fallbackStyle = computed(() => ({
  backgroundColor: 'var(--color-bg-subtle)',
  color: 'var(--color-text-secondary)',
}))

// Status dot inline style
const statusDotStyle = computed(() => {
  if (!props.status) return {}
  return {
    backgroundColor: statusColors[props.status],
    '--tw-ring-color': 'var(--color-surface)',
  } as Record<string, string>
})

// Show logic
const showImage = computed(() => !!props.src && !imgError.value)
const showInitials = computed(() => !showImage.value && !!initials.value)
const showIcon = computed(() => !showImage.value && !showInitials.value)

const fallbackIconComponent = computed<Component | null>(() => {
  const iconName = props.fallbackIcon ?? 'RiUser3Line'
  const icons = RemixIcons as Record<string, Component>
  return icons[iconName] ?? icons['RiUser3Line'] ?? null
})

const containerClass = computed(() =>
  cn(
    'relative inline-flex items-center justify-center shrink-0',
    'select-none',
    sizeClass[props.size],
    shapeClass[props.shape]
  )
)

const containerStyle = computed(() => {
  if (showInitials.value) return initialsStyle.value
  if (showImage.value) return undefined
  return fallbackStyle.value
})
</script>

<template>
  <span :class="containerClass" :style="containerStyle">
    <!-- Image -->
    <img
      v-if="showImage"
      :src="src"
      :alt="alt ?? name ?? 'Avatar'"
      :class="cn('size-full object-cover', shapeClass[shape])"
      @error="imgError = true"
    />

    <!-- Initials fallback -->
    <span v-else-if="showInitials" :class="textSizeClass[size]" aria-hidden="true">
      {{ initials }}
    </span>

    <!-- Icon fallback -->
    <component
      :is="fallbackIconComponent"
      v-else-if="showIcon && fallbackIconComponent"
      :size="iconSizePx[size]"
      aria-hidden="true"
    />

    <!-- Status dot -->
    <span
      v-if="status"
      role="img"
      :class="cn('absolute bottom-0 right-0 rounded-full', statusSizeClass[size])"
      :style="statusDotStyle"
      :aria-label="status"
    />
  </span>
</template>
