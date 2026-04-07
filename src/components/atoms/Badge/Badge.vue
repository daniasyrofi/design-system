<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { RiCloseLine } from '@remixicon/vue'

type Variant = 'neutral' | 'primary' | 'danger' | 'success' | 'warning' | 'info' | 'secondary'
type Size = 'sm' | 'md' | 'lg'
type BadgeStyle = 'subtle' | 'solid' | 'outline'

interface Props {
  variant?: Variant
  size?: Size
  badgeStyle?: BadgeStyle
  dot?: boolean
  removable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'neutral',
  size: 'md',
  badgeStyle: 'subtle',
  dot: false,
  removable: false,
})

const emit = defineEmits<{ remove: [] }>()

// ── Semantic color map ──────────────────────────────────────────────────────
type ColorTokens = { bg: string; light: string; text: string }

const colorMap: Record<Variant, ColorTokens> = {
  neutral: {
    bg: 'var(--color-neutral)',
    light: 'var(--color-neutral-light)',
    text: 'var(--color-neutral)',
  },
  primary: {
    bg: 'var(--color-primary)',
    light: 'var(--color-primary-light)',
    text: 'var(--color-primary)',
  },
  danger: {
    bg: 'var(--color-danger)',
    light: 'var(--color-danger-light)',
    text: 'var(--color-danger)',
  },
  success: {
    bg: 'var(--color-success)',
    light: 'var(--color-success-light)',
    text: 'var(--color-success)',
  },
  warning: {
    bg: 'var(--color-warning)',
    light: 'var(--color-warning-light)',
    text: 'var(--color-warning)',
  },
  info: { bg: 'var(--color-info)', light: 'var(--color-info-light)', text: 'var(--color-info)' },
  secondary: {
    bg: 'var(--color-secondary)',
    light: 'var(--color-secondary-light)',
    text: 'var(--color-secondary)',
  },
}

// ── Computed inline styles based on variant + badgeStyle ────────────────────
// Component-level CSS override tokens (set via :style or a wrapping CSS rule):
//   --badge-bg      overrides background color
//   --badge-text    overrides text color
//   --badge-border  overrides border color (outline style only)
const badgeInlineStyle = computed(() => {
  const tokens = colorMap[props.variant]

  switch (props.badgeStyle) {
    case 'subtle':
      return {
        backgroundColor: `var(--badge-bg, ${tokens.light})`,
        color: `var(--badge-text, ${tokens.text})`,
      }
    case 'solid':
      return {
        backgroundColor: `var(--badge-bg, ${tokens.bg})`,
        color: `var(--badge-text, var(--color-text-inverse))`,
      }
    case 'outline':
      return {
        backgroundColor: 'transparent',
        color: `var(--badge-text, ${tokens.text})`,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: `var(--badge-border, ${tokens.bg})`,
      }
    default:
      return {}
  }
})

const dotInlineStyle = computed(() => ({
  backgroundColor: `var(--badge-bg, ${colorMap[props.variant].bg})`,
}))

// ── Size classes (layout only, no color) ────────────────────────────────────
// Keep corner radius fixed across all sizes for a consistent badge silhouette.
const sizeClasses: Record<Size, string> = {
  sm: 'text-[11px] leading-none py-0.5 gap-1 rounded-[var(--radius-md)] min-h-5',
  md: 'text-xs leading-none py-0.5 gap-1 rounded-[var(--radius-md)] min-h-6',
  lg: 'text-sm leading-none py-1 gap-1 rounded-[var(--radius-md)] min-h-7',
}

const basePadding: Record<Size, { pl: string; pr: string }> = {
  sm: { pl: 'pl-2', pr: 'pr-2' },
  md: { pl: 'pl-2.5', pr: 'pr-2.5' },
  lg: { pl: 'pl-3', pr: 'pr-3' },
}

const iconSidePad: Record<Size, { pl: string; pr: string }> = {
  sm: { pl: 'pl-1.5', pr: 'pr-1' },
  md: { pl: 'pl-2', pr: 'pr-1.5' },
  lg: { pl: 'pl-2', pr: 'pr-2' },
}

const dotSizeClass: Record<Size, string> = {
  sm: 'size-1.5',
  md: 'size-1.5',
  lg: 'size-2',
}

const slots = defineSlots()

const removeButtonSizeClass: Record<Size, string> = {
  sm: 'size-3',
  md: 'size-3.5',
  lg: 'size-4',
}

const paddingClasses = computed(() => {
  const hasLeading = !!slots.leading
  const pl = hasLeading ? iconSidePad[props.size].pl : basePadding[props.size].pl
  const pr = props.removable ? iconSidePad[props.size].pr : basePadding[props.size].pr
  return `${pl} ${pr}`
})

const classes = computed(() =>
  cn(
    'inline-flex items-center font-medium select-none overflow-hidden max-w-full',
    sizeClasses[props.size],
    paddingClasses.value
  )
)
</script>

<template>
  <span :class="classes" :style="badgeInlineStyle">
    <span
      v-if="dot"
      :class="cn('shrink-0 rounded-full', dotSizeClass[size])"
      :style="dotInlineStyle"
      aria-hidden="true"
    />
    <span v-if="$slots.leading" class="shrink-0 flex items-center justify-center">
      <slot name="leading" />
    </span>
    <span class="truncate">
      <slot />
    </span>
    <button
      v-if="removable"
      type="button"
      :class="
        cn(
          'shrink-0 flex items-center justify-center rounded-sm opacity-60 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-1 transition-opacity duration-150 cursor-pointer',
          removeButtonSizeClass[size]
        )
      "
      aria-label="Remove"
      @click.stop="emit('remove')"
    >
      <RiCloseLine class="size-full" />
    </button>
  </span>
</template>
