<script setup lang="ts">
import { inject, computed } from 'vue'
import { cn } from '@/lib/utils'
import { RiArrowDownSLine } from '@remixicon/vue'

interface Props {
  /** The unique identifier for this item. */
  value: string
  /** The main title displayed on the trigger. */
  title: string
  /** Secondary text displayed below the title. */
  subtitle?: string
  /** Disables the item, preventing it from being toggled. @default false */
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const accordion = inject<{
  toggle: (id: string) => void
  isOpen: (id: string) => boolean
}>('accordion')

const open = computed(() => accordion?.isOpen(props.value) ?? false)

function handleToggle() {
  if (props.disabled) return
  accordion?.toggle(props.value)
}
</script>

<template>
  <div
    class="ds-accordion-item"
    :class="{
      'ds-accordion-item--disabled': disabled,
      'ds-accordion-item--open': open,
    }"
    :data-state="open ? 'open' : 'closed'"
    :data-disabled="disabled ? '' : undefined"
  >
    <!-- Trigger -->
    <button
      type="button"
      :class="
        cn(
          'ds-accordion-trigger',
          'flex items-center justify-between w-full text-left px-4 py-3.5',
          'transition-colors duration-200 ease-out',
          !disabled && 'cursor-pointer',
          disabled && 'cursor-not-allowed opacity-50'
        )
      "
      :aria-expanded="open"
      :disabled="disabled"
      :data-state="open ? 'open' : 'closed'"
      @click="handleToggle"
    >
      <div class="flex flex-col gap-0.5 min-w-0">
        <span class="text-sm font-semibold ds-accordion-title">
          {{ title }}
        </span>
        <span v-if="subtitle" class="text-xs ds-accordion-subtitle">
          {{ subtitle }}
        </span>
      </div>
      <RiArrowDownSLine
        :size="'18'"
        :class="
          cn(
            'ds-accordion-chevron shrink-0 ml-3',
            'transition-transform duration-200 ease-out',
            open && 'rotate-180'
          )
        "
      />
    </button>

    <!-- Collapsible content -->
    <div
      class="grid transition-[grid-template-rows] duration-200 ease-out"
      :style="{ gridTemplateRows: open ? '1fr' : '0fr' }"
    >
      <div class="overflow-hidden">
        <div class="ds-accordion-content px-4 pb-4 pt-0 text-sm">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ds-accordion-item + .ds-accordion-item {
  border-top: 1px solid var(--color-border);
}

.ds-accordion-item {
  transition: background-color 200ms ease-out;
}

.ds-accordion-item:hover:not(.ds-accordion-item--disabled):not(.ds-accordion-item--open) {
  background-color: var(--color-bg-subtle);
}

.ds-accordion-trigger:focus-visible {
  outline: none;
  box-shadow: inset 0 0 0 2px var(--color-primary);
}

.ds-accordion-title {
  color: var(--color-text-primary);
}

.ds-accordion-subtitle {
  color: var(--color-text-tertiary);
}

.ds-accordion-chevron {
  color: var(--color-text-tertiary);
}

.ds-accordion-content {
  color: var(--color-text-secondary);
  line-height: 1.6;
}
</style>
