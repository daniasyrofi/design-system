<script setup lang="ts">
import { inject, computed, onMounted, onUnmounted } from 'vue'
import { cn } from '@/lib/utils'
import { TABS_KEY, type TabsContext } from './Tabs.vue'

interface Props {
  /** The unique value associating this trigger with its content panel. */
  value: string
  /** Disables the tab trigger. @default false */
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
  line: { sm: 'px-3 py-1.5 text-xs', md: 'px-4 py-2 text-sm', lg: 'px-5 py-2.5 text-base' },
  pill: { sm: 'h-6 px-2.5 text-[10px]', md: 'h-7 px-3 text-xs', lg: 'h-8 px-3.5 text-xs' },
  boxed: { sm: 'px-3 py-1.5 text-xs', md: 'px-4 py-2 text-sm', lg: 'px-5 py-2.5 text-base' },
}

const classes = computed(() => {
  const { variant, size } = ctx
  const active = isActive.value
  const isVertical = ctx.orientation === 'vertical'
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
        ? [
            'text-[--color-text-primary] bg-[--color-surface] z-10',
            isVertical
              ? 'border border-[--color-border] border-r-[--color-surface] rounded-l-lg mr-[-1px] shadow-[-1px_1px_2px_oklch(0.20_0_0_/_0.04)]'
              : 'border border-[--color-border] border-b-[--color-surface] rounded-t-lg mb-[-1px] shadow-[0_-1px_2px_oklch(0.20_0_0_/_0.04)]',
          ]
        : [
            'text-[--color-text-secondary] hover:text-[--color-text-primary] hover:bg-[--color-neutral-light]',
            'border border-transparent',
            isVertical ? 'rounded-l-lg' : 'rounded-t-lg',
          ]
    )
  }

  if (variant === 'pill') {
    return cn(
      ...base,
      sizePadding.pill[size],
      'rounded-full',
      active
        ? 'ds-tab-trigger--pill-active'
        : 'text-[--color-text-secondary] hover:text-[--color-text-primary] hover:bg-[--color-neutral-light]'
    )
  }

  if (variant === 'boxed') {
    return cn(
      ...base,
      sizePadding.boxed[size],
      isVertical
        ? 'border-b border-[--color-border] last:border-b-0'
        : 'border-r border-[--color-border] last:border-r-0',
      active
        ? 'ds-tab-trigger--boxed-active text-[--color-text-primary] font-medium'
        : 'bg-transparent text-[--color-text-secondary] hover:text-[--color-text-primary] ds-tab-trigger--boxed-hover'
    )
  }

  return cn(...base)
})

function handleKeydown(e: KeyboardEvent) {
  if (props.disabled) return
  const allTabs = ctx.tabs.value
  const current = allTabs.indexOf(props.value)
  const isVertical = ctx.orientation === 'vertical'

  const prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft'
  const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight'

  if (e.key === prevKey) {
    e.preventDefault()
    const prev = (current - 1 + allTabs.length) % allTabs.length
    ctx.selectTab(allTabs[prev])
    ;(e.target as HTMLElement)
      .closest('[role="tablist"]')
      ?.querySelectorAll<HTMLElement>('[role="tab"]')
      [prev]?.focus()
  } else if (e.key === nextKey) {
    e.preventDefault()
    const next = (current + 1) % allTabs.length
    ctx.selectTab(allTabs[next])
    ;(e.target as HTMLElement)
      .closest('[role="tablist"]')
      ?.querySelectorAll<HTMLElement>('[role="tab"]')
      [next]?.focus()
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
      ?.querySelectorAll<HTMLElement>('[role="tab"]')
      [allTabs.length - 1]?.focus()
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
    :data-state="isActive ? 'active' : 'inactive'"
    :data-orientation="ctx.orientation"
    :data-disabled="disabled ? '' : undefined"
    @click="!disabled && ctx.selectTab(value)"
    @keydown="handleKeydown"
  >
    <slot />
  </button>
</template>

<style scoped>
.ds-tab-trigger--pill-active {
  background-color: var(--color-surface);
  color: var(--color-text-primary);
  box-shadow:
    0 6px 12px -10px oklch(0.2 0 0 / 0.25),
    0 1px 2px oklch(0.2 0 0 / 0.1),
    inset 0 0 0 1px var(--color-border);
  animation: ds-tab-activate 220ms var(--ease-out);
}
@keyframes ds-tab-activate {
  0% {
    box-shadow:
      0 0 0 0 oklch(0.2 0 0 / 0),
      inset 0 0 0 1px var(--color-border);
    filter: saturate(0.95);
  }
  100% {
    box-shadow:
      0 6px 12px -10px oklch(0.2 0 0 / 0.25),
      0 1px 2px oklch(0.2 0 0 / 0.1),
      inset 0 0 0 1px var(--color-border);
    filter: saturate(1);
  }
}
.ds-tab-trigger--boxed-active {
  background-color: var(--color-neutral-light);
  box-shadow: inset 0 1px 3px oklch(0.2 0 0 / 0.06);
}
.ds-tab-trigger--boxed-hover:hover {
  background-color: color-mix(in oklch, var(--color-neutral-light) 50%, transparent);
}
</style>
