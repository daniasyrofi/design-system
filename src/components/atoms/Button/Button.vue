<script setup lang="ts">
import { computed, useAttrs, ref } from 'vue'
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
const slots = defineSlots()
const attrs = useAttrs()
const buttonRef = ref<HTMLElement | null>(null)

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

interface VariantTokenSet {
  bg: string
  text: string
  border: string
  hoverBg: string
  hoverBorder: string
  hoverText?: string
}

const variantTokens: Record<Variant, VariantTokenSet> = {
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

const sizes: Record<Size, string> = {
  xs: 'py-1 text-xs rounded-[max(0px,calc(var(--radius-2xl)-4px))] min-h-7 gap-1.5',
  sm: 'py-1.5 text-sm rounded-[max(0px,calc(var(--radius-2xl)-6px))] min-h-8 gap-1.5',
  md: 'py-2 text-sm rounded-[max(0px,calc(var(--radius-2xl)-8px))] min-h-10 gap-2',
  lg: 'py-2.5 text-base rounded-[max(0px,calc(var(--radius-2xl)-10px))] min-h-12 gap-2',
  xl: 'py-3 text-lg rounded-[max(0px,calc(var(--radius-2xl)-12px))] min-h-14 gap-2',
}

const textPadClass: Record<Size, { pl: string; pr: string }> = {
  xs: { pl: 'pl-3', pr: 'pr-3' },
  sm: { pl: 'pl-4', pr: 'pr-4' },
  md: { pl: 'pl-5', pr: 'pr-5' },
  lg: { pl: 'pl-6', pr: 'pr-6' },
  xl: { pl: 'pl-8', pr: 'pr-8' },
}

const iconPadClass: Record<Size, { pl: string; pr: string }> = {
  xs: { pl: 'pl-2', pr: 'pr-2' },
  sm: { pl: 'pl-2.5', pr: 'pr-2.5' },
  md: { pl: 'pl-3', pr: 'pr-3' },
  lg: { pl: 'pl-3.5', pr: 'pr-3.5' },
  xl: { pl: 'pl-5', pr: 'pr-5' },
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

const paddingClasses = computed(() => {
  if (props.iconOnly || props.variant === 'link') return ''
  const hasLeading = !!slots.leading
  const hasTrailing = !!slots.trailing
  const pl = hasLeading ? iconPadClass[props.size].pl : textPadClass[props.size].pl
  const pr = hasTrailing ? iconPadClass[props.size].pr : textPadClass[props.size].pr
  return `${pl} ${pr}`
})

const classes = computed(() => {
  const baseAndSize = cn(
    ...baseClasses,
    props.iconOnly ? iconSizes[props.size] : sizes[props.size],
    paddingClasses.value,
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

const mergedStyle = computed(() => [variantStyleVars.value, attrs.style])

defineExpose({
  el: buttonRef,
  focus: () => buttonRef.value?.focus(),
  blur: () => buttonRef.value?.blur(),
})

const rootAttrs = computed(() => {
  const { style: _style, ...rest } = attrs as Record<string, unknown>
  return rest
})
</script>

<template>
  <component
    :is="tag"
    ref="buttonRef"
    :class="classes"
    :style="mergedStyle"
    :disabled="disabled || loading || undefined"
    :href="href"
    :type="tag === 'button' ? type : undefined"
    :aria-disabled="disabled || loading"
    :aria-busy="loading"
    v-bind="rootAttrs"
    @click="!disabled && !loading && emit('click', $event)"
  >
    <!-- Leading slot -->
    <span v-if="$slots.leading && !loading" class="shrink-0 flex items-center justify-center">
      <slot name="leading" />
    </span>

    <!-- Loading spinner -->
    <span v-if="loading" class="shrink-0">
      <Spinner :size="spinnerSizes[size]" color="currentColor" />
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
      class="shrink-0 flex items-center justify-center"
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
