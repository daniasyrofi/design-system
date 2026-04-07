<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { useToggleGroup } from './toggleGroupContext'

interface Props {
  value: string
  disabled?: boolean
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  ariaLabel: undefined,
})

const context = useToggleGroup()

const selected = computed(() => context.isSelected(props.value))
const isDisabled = computed(() => props.disabled || context.disabled)

function handleClick() {
  if (!isDisabled.value) {
    context.toggle(props.value)
  }
}

const sizeClasses: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'h-8 px-3 text-sm rounded-[max(0px,calc(var(--radius-2xl)-6px))]',
  md: 'h-10 px-4 text-sm rounded-[max(0px,calc(var(--radius-2xl)-8px))]',
  lg: 'h-12 px-5 text-base rounded-[max(0px,calc(var(--radius-2xl)-10px))]',
}

const classes = computed(() =>
  cn(
    'ds-toggle-item',
    'inline-flex items-center justify-center',
    'font-medium leading-tight',
    'cursor-pointer select-none',
    'transition-all duration-200 ease-out',
    'focus-visible:outline-none',
    'active:scale-[0.97]',
    sizeClasses[context.size],
    isDisabled.value && 'opacity-50 cursor-not-allowed pointer-events-none',
    selected.value ? 'ds-toggle-item--selected' : 'ds-toggle-item--unselected'
  )
)
</script>

<template>
  <button
    type="button"
    :role="context.type === 'single' ? 'radio' : 'checkbox'"
    :aria-checked="selected"
    :aria-label="ariaLabel"
    :disabled="isDisabled || undefined"
    :data-state="selected ? 'on' : 'off'"
    :data-disabled="isDisabled ? '' : undefined"
    :class="classes"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<style>
.ds-toggle-item--unselected {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
}

.ds-toggle-item--unselected:hover:not(:disabled) {
  background-color: var(--color-bg-subtle);
  border-color: var(--color-border-strong);
}

.ds-toggle-item--selected {
  background-color: var(--color-neutral);
  border: 1px solid var(--color-neutral);
  color: var(--color-text-inverse);
}

.ds-toggle-item--selected:hover:not(:disabled) {
  background-color: var(--color-neutral-hover);
  border-color: var(--color-neutral-hover);
}

.ds-toggle-item:focus-visible {
  box-shadow:
    0 0 0 2px var(--color-surface),
    0 0 0 4px var(--color-primary);
}
</style>
