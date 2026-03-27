<script setup lang="ts">
import { ref, provide, readonly } from 'vue'

type AccordionType = 'single' | 'multiple'

interface Props {
  type?: AccordionType
  defaultOpen?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  type: 'single',
  defaultOpen: () => [],
})

const openItems = ref<Set<string>>(new Set(props.defaultOpen))

function toggle(id: string) {
  if (props.type === 'single') {
    if (openItems.value.has(id)) {
      openItems.value = new Set()
    } else {
      openItems.value = new Set([id])
    }
  } else {
    const next = new Set(openItems.value)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    openItems.value = next
  }
}

function isOpen(id: string): boolean {
  return openItems.value.has(id)
}

provide('accordion', { toggle, isOpen, openItems: readonly(openItems) })
</script>

<template>
  <div class="ds-accordion w-full" role="region">
    <slot />
  </div>
</template>

<style scoped>
.ds-accordion {
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  background-color: var(--color-surface);
  overflow: hidden;
}
</style>
