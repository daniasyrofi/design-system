<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue'
import { cn } from '@/lib/utils'
import Checkbox from '@/components/atoms/Checkbox/Checkbox.vue'
import { SELECT_KEY, SELECT_SEARCH_KEY } from './context'

interface Props {
  /** The value emitted when this item is selected. */
  value:     string
  /** Display label used in the trigger and for search filtering.
   *  Falls back to the string value of `value` if omitted. */
  label?:    string
  /** Prevents this item from being selected. @default false */
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const ctx         = inject(SELECT_KEY)!
const searchQuery = inject(SELECT_SEARCH_KEY, ref(''))

const displayLabel = computed(() => props.label ?? String(props.value))
const isSelected   = computed(() => ctx.isSelected(props.value))

// Filter visibility based on search query from SelectContent
const isVisible = computed(() => {
  if (!searchQuery.value) return true
  return displayLabel.value.toLowerCase().includes(searchQuery.value.toLowerCase())
})

// Register this item's label in root context so SelectTrigger can display it
onMounted(()       => ctx.registerItem(props.value, displayLabel.value))
onBeforeUnmount(() => ctx.unregisterItem(props.value))

function handleClick() {
  if (props.disabled) return
  ctx.selectItem(props.value)
}

const checkboxSize = computed(() => ({ sm: 'sm', md: 'sm', lg: 'md' } as const)[ctx.size.value])

const itemClasses = computed(() =>
  cn(
    'ds-select-item flex items-center gap-2 w-full text-left rounded-[var(--radius-md)]',
    'cursor-pointer select-none transition-colors duration-[--duration-fast]',
    ctx.size.value === 'sm' ? 'px-2 py-1.5 text-sm' : 'px-2.5 py-2 text-sm',
    ctx.size.value === 'lg' && 'text-base',
    props.disabled && 'opacity-40 cursor-not-allowed',
    isSelected.value && 'ds-select-item--selected',
  )
)
</script>

<template>
  <button
    v-show="isVisible"
    type="button"
    role="option"
    :class="itemClasses"
    :aria-selected="isSelected"
    :disabled="disabled"
    @click.stop="handleClick"
  >
    <!-- Checkbox: always visible in multiple, shown only when selected in single -->
    <span
      class="shrink-0 flex items-center pointer-events-none"
      :style="{ visibility: ctx.multiple.value || isSelected ? 'visible' : 'hidden' }"
      aria-hidden="true"
    >
      <Checkbox :model-value="isSelected" :size="checkboxSize" color="secondary" />
    </span>

    <!-- Item content -->
    <span class="flex-1 min-w-0 flex items-center gap-2 truncate">
      <slot>{{ displayLabel }}</slot>
    </span>
  </button>
</template>

<style scoped>
.ds-select-item        { color: var(--color-text-primary); }
.ds-select-item:focus,
.ds-select-item:focus-visible { outline: none; }
.ds-select-item:hover:not(:disabled)       { background-color: var(--color-neutral-light); }
.ds-select-item--selected:not(:hover)      { background-color: color-mix(in oklch, var(--color-secondary-light) 60%, transparent); }
</style>
