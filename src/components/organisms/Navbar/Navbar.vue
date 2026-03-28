<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

type Variant = 'default' | 'transparent' | 'colored'

interface Props {
  title?: string
  variant?: Variant
  sticky?: boolean
  border?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title:   '',
  variant: 'default',
  sticky:  false,
  border:  true,
})

const variantClasses: Record<Variant, string> = {
  default:     'bg-[--color-surface] text-[--color-text-primary]',
  transparent: '[background:var(--color-surface-glass)] [backdrop-filter:var(--glass-blur)] text-[--color-text-primary] border-b border-[--glass-border]',
  colored:     'bg-[--color-neutral] text-[--color-text-inverse] shadow-[--shadow-highlight]',
}

const classes = computed(() =>
  cn(
    'flex items-center justify-between w-full h-14 px-4 md:px-6 lg:px-8',
    'transition-all duration-[--duration-normal] ease-[--ease-default]',
    variantClasses[props.variant],
    props.variant === 'default' && props.border && 'border-b border-[--color-border]',
    props.sticky && 'sticky top-0 z-40',
    props.sticky && props.variant === 'default' && 'ds-navbar--sticky-shadow',
  )
)
</script>

<template>
  <header :class="classes">
    <!-- Start (left): logo / title -->
    <div class="flex items-center gap-3 shrink-0">
      <slot name="start">
        <span
          v-if="title"
          class="text-base font-semibold leading-none select-none"
        >
          {{ title }}
        </span>
      </slot>
    </div>

    <!-- Center: navigation links -->
    <div class="flex items-center gap-1">
      <slot name="center" />
    </div>

    <!-- End (right): actions -->
    <div class="flex items-center gap-2 shrink-0">
      <slot name="end" />
    </div>
  </header>
</template>

<style scoped>
.ds-navbar--sticky-shadow {
  box-shadow: var(--shadow-md);
}
</style>
