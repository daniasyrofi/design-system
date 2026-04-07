<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

type Variant = 'default' | 'outlined' | 'elevated' | 'flat' | 'glass'
type Padding = 'none' | 'sm' | 'md' | 'lg'
type Radius = 'sm' | 'md' | 'lg' | 'xl'

interface Props {
  /** Stylistic variant of the card. @default 'default' */
  variant?: Variant
  /** Internal padding layout. @default 'md' */
  padding?: Padding
  /** Border radius scale. @default 'lg' */
  radius?: Radius
  /** Adds subtle lift effect on hover without making it interactive. @default false */
  hoverable?: boolean
  /** Makes the card fully interactive (button role, focusable, clickable). @default false */
  clickable?: boolean
  /** HTML element to render the card as. @default 'div' */
  as?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  padding: 'md',
  radius: 'lg',
  hoverable: false,
  clickable: false,
  as: 'div',
})

const emit = defineEmits<{ click: [e: MouseEvent] }>()

const variantClasses: Record<Variant, string> = {
  default: 'bg-[--color-surface] ds-card--default',
  outlined: 'bg-[--color-surface] ds-card--outlined',
  elevated: 'bg-[--color-surface] ds-card--elevated',
  flat: 'bg-[--color-surface]',
  glass: 'ds-card--glass',
}

const paddingClasses: Record<Padding, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-7',
}

const radiusClasses: Record<Radius, string> = {
  sm: 'ds-card--radius-sm',
  md: 'ds-card--radius-md',
  lg: 'ds-card--radius-lg',
  xl: 'ds-card--radius-xl',
}

const bodyPaddingClasses: Record<Padding, string> = {
  none: '',
  sm: 'px-3 py-2',
  md: 'px-5 py-3',
  lg: 'px-7 py-4',
}

const classes = computed(() =>
  cn(
    'relative overflow-hidden flex flex-col',
    'transition-all duration-[--duration-slow] ease-[--ease-out]',
    variantClasses[props.variant],
    props.variant === 'glass' &&
      '[background:var(--color-surface-glass)] [backdrop-filter:var(--glass-blur)]',
    radiusClasses[props.radius],
    !hasStructuredSlots.value && paddingClasses[props.padding],
    props.hoverable && 'ds-card--hoverable hover:-translate-y-1.5 cursor-default',
    props.clickable && [
      'ds-card--clickable cursor-pointer',
      'hover:-translate-y-1.5',
      'active:scale-[0.99] active:translate-y-0',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-primary]',
    ]
  )
)

// Detect if structured slots are in use so we can adjust padding
const slots = defineSlots<{
  media?: () => unknown
  header?: () => unknown
  default?: () => unknown
  footer?: () => unknown
}>()

const hasStructuredSlots = computed(() => !!(slots.media || slots.header || slots.footer))
</script>

<template>
  <component
    :is="as"
    :class="classes"
    :role="clickable ? 'button' : undefined"
    :tabindex="clickable ? 0 : undefined"
    v-bind="$attrs"
    @click="clickable && emit('click', $event)"
    @keydown.enter="clickable && emit('click', $event as unknown as MouseEvent)"
    @keydown.space.prevent="clickable && emit('click', $event as unknown as MouseEvent)"
  >
    <!-- Media slot — top image / cover area -->
    <div
      v-if="$slots.media"
      class="w-full overflow-hidden"
      :class="radiusClasses[radius]"
      style="border-bottom-left-radius: 0; border-bottom-right-radius: 0"
    >
      <slot name="media" />
    </div>

    <!-- Header slot -->
    <div
      v-if="$slots.header"
      :class="
        cn(
          'flex items-start justify-between gap-3',
          bodyPaddingClasses[padding],
          $slots.default || $slots.footer ? 'pb-0' : '',
          !$slots.media
            ? 'pt-' +
                (padding === 'sm' ? '3' : padding === 'md' ? '5' : padding === 'lg' ? '7' : '0')
            : ''
        )
      "
    >
      <slot name="header" />
    </div>

    <!-- Default / body slot -->
    <div
      v-if="$slots.default"
      :class="cn('flex-1', hasStructuredSlots && bodyPaddingClasses[padding])"
    >
      <slot />
    </div>

    <!-- Footer slot -->
    <div
      v-if="$slots.footer"
      :class="
        cn('flex items-center gap-2', bodyPaddingClasses[padding], $slots.default ? 'pt-0' : '')
      "
    >
      <slot name="footer" />
    </div>
  </component>
</template>

<style scoped>
/*
 * Component-level CSS override tokens:
 *   --card-bg      default: var(--color-surface)
 *   --card-border  default: var(--color-border)
 *   --card-shadow  default: (depends on variant)
 */

/* ── Radius ── */
.ds-card--radius-sm {
  border-radius: var(--radius-md);
}
.ds-card--radius-md {
  border-radius: var(--radius-lg);
}
.ds-card--radius-lg {
  border-radius: var(--radius-xl);
}
.ds-card--radius-xl {
  border-radius: var(--radius-xl);
}

/* ── Variants ── */
.ds-card--default {
  background-color: var(--card-bg, var(--color-surface));
  box-shadow:
    var(--card-shadow, var(--shadow-md)),
    inset 0 0 0 1px var(--card-border, var(--color-border));
}
.ds-card--outlined {
  background-color: var(--card-bg, var(--color-surface));
  box-shadow: inset 0 0 0 1px var(--card-border, var(--color-border));
}
.ds-card--elevated {
  background-color: var(--card-bg, var(--color-surface));
  box-shadow:
    var(--card-shadow, var(--shadow-2xl)),
    inset 0 0 0 1px var(--card-border, var(--color-border));
}
.ds-card--glass {
  background: var(--card-bg, var(--color-surface-glass, rgba(255, 255, 255, 0.7)));
  backdrop-filter: blur(20px);
  box-shadow:
    var(--card-shadow, var(--shadow-xl)),
    inset 0 0 0 1px var(--card-border, var(--color-border));
}
.ds-card--hoverable:hover,
.ds-card--clickable:hover {
  box-shadow:
    var(--card-shadow-hover, var(--shadow-xl)),
    inset 0 0 0 1px var(--card-border, var(--color-border));
}
.ds-card--clickable:focus-visible {
  box-shadow:
    0 0 0 2px var(--color-primary),
    inset 0 0 0 1px var(--card-border, var(--color-border));
}
</style>
