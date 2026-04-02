<script setup lang="ts">
import { ref, reactive, computed, provide, onMounted, onBeforeUnmount, useId } from 'vue'
import { cn } from '@/lib/utils'
import { SELECT_KEY } from './context'
import type { SelectSize } from './context'

interface Props {
  /** The selected value (string) or values (string[]) — use with v-model. */
  modelValue:  string | string[]
  /** Allow selecting multiple values. @default false */
  multiple?:   boolean
  /** Size token passed to all child components. @default 'md' */
  size?:       SelectSize
  /** Disables the entire select. @default false */
  disabled?:   boolean
  /** Label rendered above the trigger. */
  label?:      string
  /** Helper text rendered below (hidden when error is set). */
  helperText?: string
  /** Error message — also applies error styling to the trigger. */
  error?:      string
  /** Shows a loading spinner and prevents opening. @default false */
  loading?:    boolean
  /** Shows the value but prevents opening. @default false */
  readonly?:   boolean
import { RiArrowDownSLine, RiCloseLine, RiSearchLine } from '@remixicon/vue'
import Checkbox from '@/components/atoms/Checkbox/Checkbox.vue'

type SelectSize = 'sm' | 'md' | 'lg'

interface Option {
  label:     string
  value:     string
  icon?:     string
  disabled?: boolean
  group?:    string
}

interface Props {
  /** The selected value or array of values. Supports v-model. */
  modelValue:  string | string[]
  /** Array of option items to choose from. */
  options:     Option[]
  /** Enables selecting multiple values. @default false */
  multiple?:   boolean
  /** Visual size of the select trigger and dropdown items. @default 'md' */
  size?:       SelectSize
  /** Label text displayed above the select. */
  label?:      string
  /** Displayed when no value is selected. @default 'Select...' */
  placeholder?: string
  /** Subtitle or hint text displayed below the element. */
  helperText?: string
  /** Error message to display (also applies error styling). */
  error?:      string
  /** Shows a search input inside the dropdown to filter options. @default false */
  searchable?: boolean
  /** Shows a button to clear the current selection. @default false */
  clearable?:  boolean
  /** Disables the select component. @default false */
  disabled?:   boolean
}

const props = withDefaults(defineProps<Props>(), {
  multiple:  false,
  size:      'md',
  disabled:  false,
  loading:   false,
  readonly:  false,
})

const emit = defineEmits<{ 'update:modelValue': [value: string | string[]] }>()

const isOpen    = ref(false)
const rootRef   = ref<HTMLElement | null>(null)
const triggerId = useId()
const autoId      = useId()
const isOpen      = ref(false)
const searchQuery = ref('')
const searchRef   = ref<HTMLInputElement | null>(null)
const rootRef     = ref<HTMLElement | null>(null)
const hasError    = computed(() => !!props.error)

// Reactive map: value → display label, populated by SelectItem on mount
const itemLabels = reactive<Record<string, string>>({})

const selectedValues = computed<string[]>(() => {
  if (Array.isArray(props.modelValue)) return props.modelValue
  return props.modelValue ? [props.modelValue] : []
})

const hasError = computed(() => !!props.error)

function isSelected(value: string) {
  return selectedValues.value.includes(value)
}

function selectItem(value: string) {
  if (props.multiple) {
    const next = [...selectedValues.value]
    const idx  = next.indexOf(value)
    if (idx >= 0) next.splice(idx, 1)
    else next.push(value)
    emit('update:modelValue', next)
const selectedLabels = computed(() =>
  selectedValues.value
    .map(v => props.options.find(o => o.value === v)?.label ?? v)
)

const displayText = computed(() => {
  if (selectedValues.value.length === 0) return ''
  if (props.multiple) {
    if (selectedValues.value.length === 1) return selectedLabels.value[0]
    return `${selectedValues.value.length} selected`
  }
  return selectedLabels.value[0]
})

const filteredOptions = computed(() => {
  const base = searchQuery.value
    ? props.options.filter(o => o.label.toLowerCase().includes(searchQuery.value.toLowerCase()))
    : props.options

  // In multiple mode: selected items float to top
  if (!props.multiple) return base
  const selected   = base.filter(o => isSelected(o.value))
  const unselected = base.filter(o => !isSelected(o.value))
  return [...selected, ...unselected]
})

const groupedOptions = computed(() => {
  const groups: Record<string, Option[]> = {}
  for (const opt of filteredOptions.value) {
    const key = opt.group ?? ''
    if (!groups[key]) groups[key] = []
    groups[key].push(opt)
  }
  return groups
})

const hasGroups = computed(() =>
  Object.keys(groupedOptions.value).some(k => k !== '')
)

// Number of selected items floating at top (for divider placement)
const selectedCountInFiltered = computed(() => {
  if (!props.multiple) return 0
  return filteredOptions.value.filter(o => isSelected(o.value)).length
})

// ── Actions ──────────────────────────────────────────────────────────────────

function toggleOpen() {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    searchQuery.value = ''
    nextTick(() => searchRef.value?.focus())
  }
}

function selectOption(opt: Option) {
  if (opt.disabled) return
  if (props.multiple) {
    const current = [...selectedValues.value]
    const idx = current.indexOf(opt.value)
    if (idx >= 0) current.splice(idx, 1)
    else current.push(opt.value)
    emit('update:modelValue', current)
  } else {
    emit('update:modelValue', value)
    isOpen.value = false
  }
}

function clearAll() {
  emit('update:modelValue', props.multiple ? [] : '')
}

function toggle() {
  if (props.disabled || props.loading || props.readonly) return
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
onMounted(() => document.addEventListener('click', handleClickOutside, true))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside, true))

// ── Size maps (aligned with Input atom) ──────────────────────────────────────

const heightClass: Record<SelectSize, string> = {
  sm: 'min-h-8',
  md: 'min-h-10',
  lg: 'min-h-12',
}

function registerItem(value: string, label: string) {
  itemLabels[value] = label
}

function unregisterItem(value: string) {
  delete itemLabels[value]
const paddingXClass: Record<SelectSize, string> = {
  sm: 'px-3',
  md: 'px-4',
  lg: 'px-5',
}

function getItemLabel(value: string): string {
  return itemLabels[value] ?? value
}

function handleClickOutside(e: MouseEvent) {
  if (rootRef.value && !rootRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

onMounted(()        => document.addEventListener('click', handleClickOutside, true))
onBeforeUnmount(()  => document.removeEventListener('click', handleClickOutside, true))

provide(SELECT_KEY, {
  multiple:       computed(() => props.multiple!),
  size:           computed(() => props.size!),
  disabled:       computed(() => props.disabled!),
  loading:        computed(() => props.loading!),
  readonly:       computed(() => props.readonly!),
  hasError,
  isOpen,
  selectedValues,
  isSelected,
  selectItem,
  clearAll,
  close,
  toggle,
  triggerId,
  registerItem,
  unregisterItem,
  getItemLabel,
})
// ── Computed classes ─────────────────────────────────────────────────────────

const triggerClasses = computed(() =>
  cn(
    'ds-select-trigger',
    'relative flex items-center w-full gap-2 text-left',
    'rounded-[var(--radius-lg)] border outline-none',
    'transition-colors duration-200 ease-out select-none',
    !props.disabled && 'cursor-pointer',
    heightClass[props.size],
    paddingXClass[props.size],
    textSizeClass[props.size],
    hasError.value && 'ds-select-trigger--error',
    isOpen.value && 'ds-select-trigger--open',
    props.disabled && 'ds-select-trigger--disabled cursor-not-allowed',
  )
)

const optionClasses = (opt: Option) =>
  cn(
    'ds-select-option flex items-center gap-2 w-full text-left',
    'cursor-pointer select-none',
    textSizeClass[props.size],
    props.size === 'sm' ? 'px-2 py-1.5' : 'px-2.5 py-2',
    'transition-colors duration-[--duration-fast]',
    'ds-select-option--default',
    opt.disabled && 'opacity-40 cursor-not-allowed',
  )

const checkboxSize: Record<SelectSize, 'sm' | 'md' | 'lg'> = {
  sm: 'sm',
  md: 'sm',
  lg: 'md',
}
</script>

<template>
  <div ref="rootRef" class="flex flex-col gap-1.5 w-full">

    <!-- Label — linked to trigger button via triggerId -->
    <label
      v-if="label"
      :for="triggerId"
      :class="cn('text-sm font-medium select-none', disabled && 'opacity-50')"
      :style="{ color: 'var(--color-text-heading)' }"
    <!-- Label -->
    <label
      v-if="label"
      :for="autoId"
      :class="cn(
        'text-sm font-medium select-none',
        disabled && 'opacity-50',
      )"
      style="color: var(--color-text-heading);"
    >
      {{ label }}
    </label>

    <!-- Trigger + Content slot -->
    <div class="relative">
      <slot />

      <!-- Trigger -->
      <button
        :id="autoId"
        type="button"
        :class="triggerClasses"
        :disabled="disabled"
        :aria-expanded="isOpen"
        aria-haspopup="listbox"
        @click="toggleOpen"
      >
        <span
          :class="cn(
            'flex-1 truncate',
            displayText ? 'ds-select-trigger-text' : 'ds-select-trigger-placeholder'
          )"
        >
          {{ displayText || placeholder }}
        </span>

        <!-- Clear button: always show in multiple when has selection, or when clearable prop set -->
        <button
          v-if="(multiple || clearable) && selectedValues.length > 0 && !disabled"
          type="button"
          class="ds-select-clear shrink-0 flex items-center justify-center transition-colors duration-200 cursor-pointer"
          aria-label="Clear selection"
          @click="handleClear"
        >
          <RiCloseLine :size="String(iconSizePx[size])" />
        </button>

        <!-- Chevron -->
        <RiArrowDownSLine
          :size="String(iconSizePx[size])"
          :class="cn(
            'shrink-0 transition-transform duration-200',
            isOpen && 'rotate-180',
          )"
          style="color: var(--color-text-tertiary);"
          aria-hidden="true"
        />
      </button>

      <!-- Dropdown -->
      <Transition
        enter-active-class="transition duration-[--duration-normal] ease-[--ease-default]"
        enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-[--duration-fast] ease-[--ease-default]"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-1"
      >
        <div
          v-if="isOpen"
          class="ds-select-dropdown absolute z-50 left-0 right-0 top-full mt-1.5"
          role="listbox"
          :aria-multiselectable="multiple || undefined"
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

          <!-- Options list -->
          <div class="max-h-60 overflow-y-auto overflow-x-hidden py-1.5 px-1">
            <template v-if="filteredOptions.length === 0">
              <div class="px-3 py-4 text-center text-sm" style="color: var(--color-text-tertiary);">
                No options found
              </div>
            </template>

            <template v-else-if="hasGroups">
              <template v-for="(groupOpts, groupName) in groupedOptions" :key="groupName">
                <div
                  v-if="groupName"
                  class="px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-wider"
                  style="color: var(--color-text-tertiary);"
                >
                  {{ groupName }}
                </div>
                <button
                  v-for="opt in groupOpts"
                  :key="opt.value"
                  type="button"
                  role="option"
                  :class="optionClasses(opt)"
                  :aria-selected="isSelected(opt.value)"
                  :disabled="opt.disabled"
                  @click.stop="selectOption(opt)"
                >
                  <!-- Left: Checkbox atom — multiple always visible, single hidden when not selected -->
                  <span class="shrink-0 flex items-center pointer-events-none" :style="{ visibility: multiple || isSelected(opt.value) ? 'visible' : 'hidden' }" aria-hidden="true">
                    <Checkbox :model-value="isSelected(opt.value)" :size="checkboxSize[size]" color="secondary" />
                  </span>
                  <span class="flex-1 truncate">{{ opt.label }}</span>
                </button>
              </template>
            </template>

            <template v-else>
              <template v-for="(opt, index) in filteredOptions" :key="opt.value">
                <!-- Divider between selected group and unselected group -->
                <div
                  v-if="multiple && index === selectedCountInFiltered && selectedCountInFiltered > 0 && selectedCountInFiltered < filteredOptions.length"
                  class="ds-select-group-divider mx-1 my-1"
                  role="separator"
                />
                <button
                  type="button"
                  role="option"
                  :class="optionClasses(opt)"
                  :aria-selected="isSelected(opt.value)"
                  :disabled="opt.disabled"
                  @click.stop="selectOption(opt)"
                >
                  <!-- Left: Checkbox atom — multiple always visible, single hidden when not selected -->
                  <span class="shrink-0 flex items-center pointer-events-none" :style="{ visibility: multiple || isSelected(opt.value) ? 'visible' : 'hidden' }" aria-hidden="true">
                    <Checkbox :model-value="isSelected(opt.value)" :size="checkboxSize[size]" color="secondary" />
                  </span>
                  <span class="flex-1 truncate">{{ opt.label }}</span>
                </button>
              </template>
            </template>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Helper / Error -->
    <p
      v-if="helperText || error"
      class="text-[13px] leading-snug"
      :style="{ color: hasError ? 'var(--color-danger)' : 'var(--color-text-secondary)' }"
    >
      {{ error ?? helperText }}
    </p>

  </div>
</template>

<style scoped>
/* ── Trigger (matches Input atom wrapper) ── */
.ds-select-trigger {
  background-color: var(--color-surface);
  border-color: var(--color-border);
}

.ds-select-trigger:focus,
.ds-select-trigger:focus-visible {
  outline: none;
}

.ds-select-trigger:hover:not(.ds-select-trigger--disabled):not(.ds-select-trigger--open) {
  border-color: var(--color-border-strong);
}

.ds-select-trigger--open:not(.ds-select-trigger--error) {
  border-color: var(--color-text-primary);
  box-shadow: 0 0 0 1px var(--color-text-primary);
}

/* ── Error ── */
.ds-select-trigger--error {
  border-color: var(--color-danger);
}

.ds-select-trigger--error.ds-select-trigger--open {
  box-shadow: 0 0 0 1px var(--color-danger);
}

/* ── Disabled ── */
.ds-select-trigger--disabled {
  opacity: 0.5;
  background-color: var(--color-bg-subtle);
}

/* ── Typography ── */
.ds-select-trigger-text {
  color: var(--color-text-primary);
}

.ds-select-trigger-placeholder {
  color: var(--color-text-tertiary);
}

/* ── Clear button ── */
.ds-select-clear {
  color: var(--color-text-tertiary);
}

.ds-select-clear:hover {
  color: var(--color-text-primary);
}

.ds-select-clear:focus,
.ds-select-clear:focus-visible {
  outline: none;
}

/* ── Dropdown panel ── */
.ds-select-dropdown {
  background-color: var(--color-surface);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-2xl), inset 0 0 0 1px var(--color-border);
  overflow: hidden;
}

/* ── Search input ── */
.ds-select-search {
  color: var(--color-text-primary);
}

.ds-select-search::placeholder {
  color: var(--color-text-tertiary);
}

.ds-select-search:focus,
.ds-select-search:focus-visible {
  outline: none;
}

/* ── Options ── */
.ds-select-option {
  border-radius: var(--radius-md);
  color: var(--color-text-primary);
}

.ds-select-option:focus,
.ds-select-option:focus-visible {
  outline: none;
}

.ds-select-option--default:hover:not(:disabled) {
  background-color: var(--color-neutral-light);
}



/* ── Divider between selected / unselected group ── */
.ds-select-group-divider {
  height: 1px;
  background-color: var(--color-border);
}
</style>
