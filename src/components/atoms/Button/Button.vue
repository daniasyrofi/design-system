<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import Spinner from '@/components/atoms/Spinner/Spinner.vue'

type Variant = 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link'
type Size    = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface Props {
  variant?:  Variant
  size?:     Size
  disabled?: boolean
  loading?:  boolean
  fullWidth?: boolean
  iconOnly?:  boolean
  as?:        string
  href?:      string
  type?:      'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant:   'default',
  size:      'md',
  disabled:  false,
  loading:   false,
  fullWidth: false,
  iconOnly:  false,
  as:        'button',
  type:      'button',
})

const emit = defineEmits<{ click: [e: MouseEvent] }>()

const tag = computed(() => props.href ? 'a' : props.as)

const baseClasses = [
  'ds-btn',
  'inline-flex items-center justify-center',
  'overflow-hidden',
  'font-medium leading-tight',
  'cursor-pointer select-none',
  'transition-all duration-200 ease-out',
  'focus-visible:outline-none',
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
  'active:scale-[0.97]',
]

const variants: Record<Variant, string> = {
  default: [
    'ds-btn--default',
    'bg-[var(--color-neutral)] text-[var(--color-text-inverse)]',
    'border border-[var(--color-neutral)]',
    'hover:bg-[var(--color-neutral-hover)] hover:border-[var(--color-neutral-hover)]',
  ].join(' '),
  primary: [
    'ds-btn--primary',
    'bg-[var(--color-primary)] text-[var(--color-text-inverse)]',
    'border border-[var(--color-primary)]',
    'hover:bg-[var(--color-primary-hover)] hover:border-[var(--color-primary-hover)]',
  ].join(' '),
  secondary: [
    'ds-btn--secondary',
    'bg-[var(--color-secondary)] text-[var(--color-text-inverse)]',
    'border border-[var(--color-secondary)]',
    'hover:bg-[var(--color-secondary-hover)] hover:border-[var(--color-secondary-hover)]',
  ].join(' '),
  outline: [
    'ds-btn--outline',
    'bg-[var(--color-surface)] text-[var(--color-text-primary)]',
    'border border-[var(--color-border)]',
    'hover:bg-[var(--color-bg-subtle)] hover:border-[var(--color-border-strong)]',
  ].join(' '),
  ghost: [
    'ds-btn--ghost',
    'bg-transparent text-[var(--color-text-secondary)]',
    'border border-transparent',
    'hover:bg-[var(--color-neutral-light)] hover:text-[var(--color-text-heading)]',
  ].join(' '),
  danger: [
    'ds-btn--danger',
    'bg-[var(--color-danger)] text-[var(--color-primary-text)]',
    'border border-[var(--color-danger)]',
    'hover:bg-[var(--color-danger-hover)] hover:border-[var(--color-danger-hover)]',
  ].join(' '),
  link: [
    'ds-btn--link',
    'bg-transparent text-[var(--color-secondary)]',
    'border-none',
    'underline-offset-4 hover:underline',
    'p-0! h-auto!',
  ].join(' '),
}

const sizes: Record<Size, string> = {
  xs: 'px-3 py-1 text-xs rounded-full min-h-7 gap-1.5',
  sm: 'px-4 py-1.5 text-sm rounded-full min-h-8 gap-1.5',
  md: 'px-5 py-2 text-sm rounded-full min-h-10 gap-2',
  lg: 'px-6 py-2.5 text-base rounded-full min-h-12 gap-2',
  xl: 'px-8 py-3 text-lg rounded-full min-h-14 gap-2',
}

const iconSizes: Record<Size, string> = {
  xs: 'h-7 w-7 rounded-full',
  sm: 'h-8 w-8 rounded-full',
  md: 'h-10 w-10 rounded-full',
  lg: 'h-12 w-12 rounded-full',
  xl: 'h-14 w-14 rounded-full',
}

const spinnerSizes: Record<Size, 'xs' | 'sm' | 'md'> = {
  xs: 'xs',
  sm: 'xs',
  md: 'sm',
  lg: 'sm',
  xl: 'md',
}

const classes = computed(() =>
  cn(
    ...baseClasses,
    variants[props.variant],
    props.iconOnly ? iconSizes[props.size] : sizes[props.size],
    props.fullWidth && 'w-full',
  )
)
</script>

<template>
  <component
    :is="tag"
    :class="classes"
    :disabled="disabled || loading || undefined"
    :href="href"
    :type="tag === 'button' ? type : undefined"
    :aria-disabled="disabled || loading"
    :aria-busy="loading"
    v-bind="$attrs"
    @click="!disabled && !loading && emit('click', $event)"
  >
    <!-- Leading slot -->
    <span v-if="$slots.leading && !loading" class="shrink-0 -ml-1 flex items-center justify-center">
      <slot name="leading" />
    </span>

    <!-- Loading spinner -->
    <span v-if="loading" class="shrink-0">
      <Spinner :size="spinnerSizes[size]" />
    </span>

    <!-- Default slot (label) -->
    <span v-if="!iconOnly" class="truncate">
      <slot />
    </span>

    <!-- Icon-only slot -->
    <slot v-else name="icon" />

    <!-- Trailing slot -->
    <span v-if="$slots.trailing && !loading" class="shrink-0 -mr-1 flex items-center justify-center">
      <slot name="trailing" />
    </span>
  </component>
</template>

<style scoped>
/* Shadow and focus ring styles using CSS custom properties.
   Tailwind arbitrary values handle colors/radius; these handle
   box-shadow which doesn't have clean Tailwind token mapping. */

.ds-btn--default,
.ds-btn--primary,
.ds-btn--secondary,
.ds-btn--outline,
.ds-btn--danger {
  box-shadow: var(--shadow-sm);
}

.ds-btn--default:hover,
.ds-btn--primary:hover,
.ds-btn--secondary:hover,
.ds-btn--outline:hover,
.ds-btn--danger:hover {
  box-shadow: var(--shadow-md);
}

/* Ghost and link get no shadow */
.ds-btn--ghost,
.ds-btn--link {
  box-shadow: none;
}

/* Focus rings using secondary (pink) for all except danger */
.ds-btn:focus-visible {
  box-shadow: 0 0 0 2px var(--color-surface), 0 0 0 4px var(--color-primary);
}

.ds-btn--danger:focus-visible {
  box-shadow: 0 0 0 2px var(--color-surface), 0 0 0 4px var(--color-danger);
}
</style>
