<script setup lang="ts">
import { computed, inject } from 'vue'
import { cn } from '@/lib/utils'
import { RiArrowDownSLine, RiCloseLine } from '@remixicon/vue'
import Spinner from '@/components/atoms/Spinner/Spinner.vue'
import { SELECT_KEY } from './context'

interface Props {
  /** Text shown when nothing is selected. @default 'Select...' */
  placeholder?: string
  /** Show a × button to clear the selection. @default false */
  clearable?:   boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select...',
  clearable:   false,
})

const ctx = inject(SELECT_KEY)!

const heightClass   = computed(() => ({ sm: 'min-h-8', md: 'min-h-10', lg: 'min-h-12' }[ctx.size.value]))
const textClass     = computed(() => ({ sm: 'text-sm', md: 'text-sm',  lg: 'text-base' }[ctx.size.value]))
const paddingX      = computed(() => ({ sm: 'px-3',   md: 'px-4',     lg: 'px-5' }[ctx.size.value]))
const iconSize      = computed(() => ({ sm: 14,        md: 16,          lg: 18 }[ctx.size.value]))
const spinnerSize   = computed(() => ({ sm: 'xs',      md: 'sm',        lg: 'md' } as const)[ctx.size.value])

const displayText = computed(() => {
  const sel = ctx.selectedValues.value
  if (sel.length === 0) return ''
  if (ctx.multiple.value) {
    if (sel.length === 1) return ctx.getItemLabel(sel[0])
    return `${sel.length} selected`
  }
  return ctx.getItemLabel(sel[0])
})

const showClear = computed(() =>
  (props.clearable || ctx.multiple.value) &&
  ctx.selectedValues.value.length > 0 &&
  !ctx.disabled.value &&
  !ctx.loading.value &&
  !ctx.readonly.value
)

function handleClear(e: MouseEvent) {
  e.stopPropagation()
  ctx.clearAll()
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    ctx.close()
  } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault()
    if (!ctx.isOpen.value) ctx.toggle()
    // Focus management is handled by SelectContent's watch
  }
}

const triggerClasses = computed(() =>
  cn(
    'ds-select-trigger',
    'relative flex items-center w-full gap-2 text-left',
    'rounded-[var(--radius-lg)] border outline-none',
    'transition-colors duration-200 ease-out select-none',
    !ctx.disabled.value && !ctx.readonly.value && !ctx.loading.value && 'cursor-pointer',
    heightClass.value,
    paddingX.value,
    textClass.value,
    ctx.hasError.value   && 'ds-select-trigger--error',
    ctx.isOpen.value     && 'ds-select-trigger--open',
    ctx.disabled.value   && 'ds-select-trigger--disabled cursor-not-allowed',
    ctx.readonly.value   && 'ds-select-trigger--readonly cursor-default',
    ctx.loading.value    && 'cursor-wait',
  )
)
</script>

<template>
  <button
    :id="ctx.triggerId"
    type="button"
    :class="triggerClasses"
    :disabled="ctx.disabled.value || ctx.loading.value"
    :aria-expanded="ctx.isOpen.value"
    :aria-readonly="ctx.readonly.value || undefined"
    aria-haspopup="listbox"
    @click="ctx.toggle()"
    @keydown="handleKeydown"
  >
    <!-- Selected value / placeholder -->
    <span
      class="flex-1 truncate"
      :class="displayText ? 'ds-select-trigger-text' : 'ds-select-trigger-placeholder'"
    >
      {{ displayText || placeholder }}
    </span>

    <!-- Clear button -->
    <button
      v-if="showClear"
      type="button"
      class="ds-select-clear shrink-0 flex items-center justify-center transition-colors duration-200 cursor-pointer"
      aria-label="Clear selection"
      @click="handleClear"
    >
      <RiCloseLine :size="String(iconSize)" />
    </button>

    <!-- Loading spinner -->
    <Spinner
      v-if="ctx.loading.value"
      :size="spinnerSize"
      color="neutral"
    />

    <!-- Chevron (hidden when loading or readonly) -->
    <RiArrowDownSLine
      v-else-if="!ctx.readonly.value"
      :size="String(iconSize)"
      :class="cn('shrink-0 transition-transform duration-200', ctx.isOpen.value && 'rotate-180')"
      style="color: var(--color-text-tertiary);"
      aria-hidden="true"
    />
  </button>
</template>

<style scoped>
.ds-select-trigger {
  background-color: var(--color-surface);
  border-color: var(--color-border);
}

.ds-select-trigger:focus,
.ds-select-trigger:focus-visible { outline: none; }

.ds-select-trigger:hover:not(.ds-select-trigger--disabled):not(.ds-select-trigger--open) {
  border-color: var(--color-border-strong);
}

.ds-select-trigger--open:not(.ds-select-trigger--error) {
  border-color: var(--color-text-primary);
  box-shadow: 0 0 0 1px var(--color-text-primary);
}

.ds-select-trigger--error        { border-color: var(--color-danger); }
.ds-select-trigger--error.ds-select-trigger--open { box-shadow: 0 0 0 1px var(--color-danger); }
.ds-select-trigger--disabled     { opacity: 0.5; background-color: var(--color-bg-subtle); }
.ds-select-trigger-text          { color: var(--color-text-primary); }
.ds-select-trigger-placeholder   { color: var(--color-text-tertiary); }
.ds-select-trigger--readonly     { background-color: var(--color-bg-subtle); }

.ds-select-clear                 { color: var(--color-text-tertiary); }
.ds-select-clear:hover           { color: var(--color-text-primary); }
.ds-select-clear:focus,
.ds-select-clear:focus-visible   { outline: none; }
</style>
