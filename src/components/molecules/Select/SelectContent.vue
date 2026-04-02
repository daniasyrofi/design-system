<script setup lang="ts">
import { ref, provide, inject, watch, nextTick } from 'vue'
import { RiSearchLine } from '@remixicon/vue'
import { SELECT_KEY, SELECT_SEARCH_KEY } from './context'

interface Props {
  /** Show a search input to filter items by label. @default false */
  searchable?: boolean
}

withDefaults(defineProps<Props>(), {
  searchable: false,
})

const ctx         = inject(SELECT_KEY)!
const searchQuery = ref('')
const listRef     = ref<HTMLElement | null>(null)

// Provide search query to all descendant SelectItems
provide(SELECT_SEARCH_KEY, searchQuery)

// Get all visible, enabled option buttons
function getFocusableItems(): HTMLButtonElement[] {
  if (!listRef.value) return []
  return Array.from(
    listRef.value.querySelectorAll<HTMLButtonElement>('button[role="option"]:not([disabled])')
  ).filter(el => el.offsetParent !== null)
}

function handleKeydown(e: KeyboardEvent) {
  const items = getFocusableItems()
  if (!items.length) return

  const idx = items.findIndex(el => el === document.activeElement)

  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      items[idx + 1 < items.length ? idx + 1 : 0].focus()
      break
    case 'ArrowUp':
      e.preventDefault()
      items[idx > 0 ? idx - 1 : items.length - 1].focus()
      break
    case 'Home':
      e.preventDefault()
      items[0].focus()
      break
    case 'End':
      e.preventDefault()
      items[items.length - 1].focus()
      break
    case 'Escape':
      e.preventDefault()
      ctx.close()
      break
  }
}

// When dropdown opens: focus selected item or first item; when closes: clear search
watch(() => ctx.isOpen.value, (open) => {
  if (open) {
    nextTick(() => {
      const items = getFocusableItems()
      if (!items.length) return
      // Find first selected item, fall back to first item
      const selectedEl = items.find(el => el.getAttribute('aria-selected') === 'true')
      ;(selectedEl ?? items[0]).focus()
    })
  } else {
    searchQuery.value = ''
  }
})
</script>

<template>
  <Transition
    enter-active-class="transition duration-[--duration-normal] ease-[--ease-default]"
    enter-from-class="opacity-0 -translate-y-1"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-[--duration-fast] ease-[--ease-default]"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-1"
  >
    <div
      v-show="ctx.isOpen.value"
      class="ds-select-dropdown absolute z-50 left-0 right-0 top-full mt-1.5"
      role="listbox"
      :aria-multiselectable="ctx.multiple.value || undefined"
    >
      <!-- Search input -->
      <div
        v-if="searchable"
        class="flex items-center gap-2 px-3 py-2"
        style="border-bottom: 1px solid var(--color-border);"
      >
        <RiSearchLine size="14" class="shrink-0" style="color: var(--color-text-tertiary);" />
        <input
          ref="searchRef"
          v-model="searchQuery"
          type="text"
          class="ds-select-search flex-1 min-w-0 bg-transparent text-sm"
          placeholder="Search..."
          @click.stop
        />
      </div>

      <!-- Items slot -->
      <div
        ref="listRef"
        class="max-h-60 overflow-y-auto overflow-x-hidden py-1.5 px-1"
        @keydown="handleKeydown"
      >
        <slot />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.ds-select-dropdown {
  background-color: var(--color-surface);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-2xl), inset 0 0 0 1px var(--color-border);
  overflow: hidden;
}

.ds-select-search { color: var(--color-text-primary); }
.ds-select-search::placeholder { color: var(--color-text-tertiary); }
.ds-select-search:focus,
.ds-select-search:focus-visible { outline: none; }
</style>
