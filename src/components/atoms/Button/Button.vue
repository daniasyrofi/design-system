<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { cn } from '@/lib/utils'
import Spinner from '@/components/atoms/Spinner/Spinner.vue'

type Variant = 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link'
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface Props {
  variant?: Variant
  size?: Size
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  iconOnly?: boolean
  as?: string
  href?: string
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  disabled: false,
  loading: false,
  fullWidth: false,
  iconOnly: false,
  as: 'button',
  type: 'button',
})

const emit = defineEmits<{ click: [e: MouseEvent] }>()
const slots = useSlots()

const tag = computed(() => (props.href ? 'a' : props.as))

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

const variantTokens: Record<Variant, any> = {
  default: {
    bg: 'var(--color-neutral)',
    text: 'var(--color-text-inverse)',
    border: 'var(--color-neutral)',
    hoverBg: 'var(--color-neutral-hover)',
    hoverBorder: 'var(--color-neutral-hover)',
  },
  primary: {
    bg: 'var(--color-primary)',
    text: 'var(--color-text-inverse)',
    border: 'var(--color-primary)',
    hoverBg: 'var(--color-primary-hover)',
    hoverBorder: 'var(--color-primary-hover)',
  },
  secondary: {
    bg: 'var(--color-secondary)',
    text: 'var(--color-text-inverse)',
    border: 'var(--color-secondary)',
    hoverBg: 'var(--color-secondary-hover)',
    hoverBorder: 'var(--color-secondary-hover)',
  },
  outline: {
    bg: 'var(--color-surface)',
    text: 'var(--color-text-primary)',
    border: 'var(--color-border)',
    hoverBg: 'var(--color-bg-subtle)',
    hoverBorder: 'var(--color-border-strong)',
  },
  ghost: {
    bg: 'transparent',
    text: 'var(--color-text-secondary)',
    border: 'transparent',
    hoverBg: 'var(--color-neutral-light)',
    hoverBorder: 'transparent',
    hoverText: 'var(--color-text-heading)',
  },
  danger: {
    bg: 'var(--color-danger)',
    text: 'var(--color-text-inverse)',
    border: 'var(--color-danger)',
    hoverBg: 'var(--color-danger-hover)',
    hoverBorder: 'var(--color-danger-hover)',
  },
  link: {
    bg: 'transparent',
    text: 'var(--color-secondary)',
    border: 'transparent',
    hoverBg: 'transparent',
    hoverBorder: 'transparent',
  },
}

const textBaseSizes: Record<Size, string> = {
  xs: 'py-1 text-xs rounded-full min-h-7',
  sm: 'py-1.5 text-sm rounded-full min-h-8',
  md: 'py-2 text-sm rounded-full min-h-10',
  lg: 'py-2.5 text-base rounded-full min-h-12',
  xl: 'py-3 text-lg rounded-full min-h-14',
}

const textSymmetricSpacing: Record<Size, string> = {
  xs: 'px-3 gap-1.5',
  sm: 'px-4 gap-1.5',
  md: 'px-5 gap-2',
  lg: 'px-6 gap-2',
  xl: 'px-8 gap-2',
}

const textTrailingSpacing: Record<Size, string> = {
  xs: 'pl-3 pr-2 gap-1.5',
  sm: 'pl-4 pr-3 gap-1.5',
  md: 'pl-5 pr-3 gap-2',
  lg: 'pl-6 pr-4 gap-2',
  xl: 'pl-8 pr-6 gap-2',
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

const hasTrailingContent = computed(() => !!slots.trailing && !props.loading)

const textSpacingClasses = computed(() =>
  hasTrailingContent.value ? textTrailingSpacing[props.size] : textSymmetricSpacing[props.size]
)

const classes = computed(() => {
  const baseAndSize = cn(
    ...baseClasses,
    props.iconOnly ? iconSizes[props.size] : cn(textBaseSizes[props.size], textSpacingClasses.value),
    props.fullWidth && 'w-full',
    props.variant === 'link' ? 'p-0! h-auto!' : '',
    'ds-btn--variant', // Add the stable logic class
    props.variant === 'danger' ? 'ds-btn--is-danger' : '',
    props.variant === 'link' ? 'ds-btn--is-link' : ''
  )
  return baseAndSize
})

const variantStyleVars = computed(() => {
  const t = variantTokens[props.variant]
  return {
    '--btn-bg': t.bg,
    '--btn-text': t.text,
    '--btn-border': t.border,
    '--btn-hover-bg': t.hoverBg,
    '--btn-hover-border': t.hoverBorder,
    '--btn-hover-text': t.hoverText || t.text,
  }
})
</script>

<template>
  <component
    :is="tag"
    :class="classes"
    :style="variantStyleVars"
    :disabled="disabled || loading || undefined"
    :href="href"
    :type="tag === 'button' ? type : undefined"
    :aria-disabled="disabled || loading"
    :aria-busy="loading"
    v-bind="$attrs"
    @click="!disabled && !loading && emit('click', $event)"
  >
    <!-- Leading slot -->
    <span
      v-if="$slots.leading && !loading"
      class="shrink-0 flex items-center justify-center leading-none"
    >
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
    <span
      v-if="$slots.trailing && !loading"
      class="shrink-0 flex items-center justify-center leading-none"
    >
      <slot name="trailing" />
    </span>
  </component>
</template>

<style>
/* Core Variant logic driven by variables */
.ds-btn--variant {
  background-color: var(--btn-bg);
  color: var(--btn-text);
  border: 1px solid var(--btn-border);
}

.ds-btn--variant:hover:not(:disabled) {
  background-color: var(--btn-hover-bg);
  border-color: var(--btn-hover-border);
  color: var(--btn-hover-text);
}

.ds-btn--is-link:hover:not(:disabled) {
  text-decoration: underline;
  text-underline-offset: 4px;
}

/* Focus rings using secondary (pink) for all except danger */
.ds-btn:focus-visible {
  box-shadow:
    0 0 0 2px var(--color-surface),
    0 0 0 4px var(--color-primary);
}

.ds-btn--is-danger:focus-visible {
  box-shadow:
    0 0 0 2px var(--color-surface),
    0 0 0 4px var(--color-danger);
}
</style>
