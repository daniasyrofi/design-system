<script setup lang="ts">
import { inject, computed } from 'vue'
import { cn } from '@/lib/utils'
import { TABS_KEY, type TabsContext } from './Tabs.vue'

const ctx = inject<TabsContext>(TABS_KEY)!

const classes = computed(() => {
  const isVertical = ctx.orientation === 'horizontal' ? false : true
  const base = 'flex'

  if (ctx.variant === 'line') {
    return cn(
      base,
      isVertical ? 'flex-col border-r border-[--color-border] pr-0' : 'flex-row border-b border-[--color-border]',
      'gap-1',
    )
  }

  if (ctx.variant === 'pill') {
    return cn(
      base,
      isVertical ? 'flex-col' : 'flex-row',
      'gap-0.5 p-[3px] rounded-full ds-tabs-list--pill',
    )
  }

  if (ctx.variant === 'boxed') {
    return cn(
      base,
      isVertical ? 'flex-col' : 'flex-row',
      'gap-0 overflow-hidden ds-tabs-list--boxed',
    )
  }

  return cn(base, 'flex-row')
})
</script>

<template>
  <div
    :class="classes"
    role="tablist"
    :aria-orientation="ctx.orientation"
  >
    <slot />
  </div>
</template>

<style scoped>
.ds-tabs-list--pill {
  background-color: var(--color-neutral-light);
  box-shadow: var(--shadow-sm), inset 0 0 0 1px var(--color-border);
  position: relative;
  isolation: isolate;
}
.ds-tabs-list--boxed {
  background-color: var(--color-surface);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm), inset 0 0 0 1px var(--color-border);
}
</style>
