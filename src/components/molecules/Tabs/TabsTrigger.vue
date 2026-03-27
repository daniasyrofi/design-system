<script setup lang="ts">
import { inject, computed, onMounted, onUnmounted } from 'vue'
import { cn } from '@/lib/utils'
import { TABS_KEY, type TabsContext } from './Tabs.vue'

interface Props {
  value:     string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const ctx = inject<TabsContext>(TABS_KEY)!

onMounted(() => ctx.registerTab(props.value))
onUnmounted(() => ctx.unregisterTab(props.value))

const isActive = computed(() => ctx.activeTab.value === props.value)

// ── Size maps ─────────────────────────────────────────────────────────────────

const sizePadding = {
  line:  { sm: 'px-3 py-1.5 text-xs', md: 'px-4 py-2 text-sm',  lg: 'px-5 py-2.5 text-base' },
  pill:  { sm: 'px-3 py-1   text-xs', md: 'px-4 py-1.5 text-sm', lg: 'px-5 py-2 text-base' },
  boxed: { sm: 'px-3 py-1.5 text-xs', md: 'px-4 py-2 text-sm',  lg: 'px-5 py-2.5 text-base' },
}

const classes = computed(() => {
  const { variant, size } = ctx
  const active  = isActive.value
  const base = [
    'relative inline-flex items-center justify-center gap-1.5 whitespace-nowrap',
    'font-medium cursor-pointer select-none',
    'transition-all duration-[--duration-normal] ease-[--ease-default]',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--color-primary]',
    'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
  ]

  if (variant === 'line') {
    return cn(
      ...base,
      sizePadding.line[size],
      active
        ? 'text-[--color-text-primary] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-[--color-text-primary] after:rounded-t-full'
        : 'text-[--color-text-secondary] hover:text-[--color-text-primary] hover:bg-[--color-neutral-light] rounded-t-[--radius-md]',
    )
  }

  if (variant === 'pill') {
    return cn(
      ...base,
      sizePadding.pill[size],
      'rounded-xl',
      active
        ? 'bg-[--color-surface] text-[--color-text-primary] shadow-sm ring-1 ring-inset ring-[--color-border]/40'
        : 'text-[--color-text-secondary] hover:text-[--color-text-primary]',
    )
  }

  if (variant === 'boxed') {
    return cn(
      ...base,
      sizePadding.boxed[size],
      'border-r border-[--color-border]/60 last:border-r-0',
      active
        ? 'bg-[--color-neutral-light]/50 text-[--color-text-primary] font-medium shadow-inner'
        : 'bg-transparent text-[--color-text-secondary] hover:text-[--color-text-primary] hover:bg-[--color-neutral-light]/30',
    )
  }

  return cn(...base)
})

function handleKeydown(e: KeyboardEvent) {
  if (props.disabled) return
  const allTabs   = ctx.tabs.value
  const current   = allTabs.indexOf(props.value)
  const isVertical = ctx.orientation === 'vertical'

  const prevKey = isVertical ? 'ArrowUp'   : 'ArrowLeft'
  const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight'

  if (e.key === prevKey) {
    e.preventDefault()
    const prev = (current - 1 + allTabs.length) % allTabs.length
    ctx.selectTab(allTabs[prev])
    ;(e.target as HTMLElement)
      .closest('[role="tablist"]')
      ?.querySelectorAll<HTMLElement>('[role="tab"]')[prev]
      ?.focus()
  } else if (e.key === nextKey) {
    e.preventDefault()
    const next = (current + 1) % allTabs.length
    ctx.selectTab(allTabs[next])
    ;(e.target as HTMLElement)
      .closest('[role="tablist"]')
      ?.querySelectorAll<HTMLElement>('[role="tab"]')[next]
      ?.focus()
  } else if (e.key === 'Home') {
    e.preventDefault()
    ctx.selectTab(allTabs[0])
    ;(e.target as HTMLElement)
      .closest('[role="tablist"]')
      ?.querySelectorAll<HTMLElement>('[role="tab"]')[0]
      ?.focus()
  } else if (e.key === 'End') {
    e.preventDefault()
    ctx.selectTab(allTabs[allTabs.length - 1])
    ;(e.target as HTMLElement)
      .closest('[role="tablist"]')
      ?.querySelectorAll<HTMLElement>('[role="tab"]')[allTabs.length - 1]
      ?.focus()
  }
}
</script>

<template>
  <button
    type="button"
    role="tab"
    :class="classes"
    :aria-selected="isActive"
    :aria-controls="`tabpanel-${value}`"
    :tabindex="isActive ? 0 : -1"
    :disabled="disabled"
    @click="!disabled && ctx.selectTab(value)"
    @keydown="handleKeydown"
  >
    <slot />
  </button>
</template>
