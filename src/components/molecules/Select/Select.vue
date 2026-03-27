<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, useId, nextTick } from 'vue'
import { cn } from '@/lib/utils'
import { RiArrowDownSLine, RiCheckLine, RiCloseLine, RiSearchLine } from '@remixicon/vue'

type SelectSize = 'sm' | 'md' | 'lg'

interface Option {
  label:     string
  value:     string
  icon?:     string
  disabled?: boolean
  group?:    string
}

interface Props {
  modelValue:  string | string[]
  options:     Option[]
  multiple?:   boolean
  size?:       SelectSize
  label?:      string
  placeholder?: string
  helperText?: string
  error?:      string
  searchable?: boolean
  clearable?:  boolean
  disabled?:   boolean
}

const props = withDefaults(defineProps<Props>(), {
  multiple:    false,
  size:        'md',
  placeholder: 'Select...',
  searchable:  false,
  clearable:   false,
  disabled:    false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | string[]]
}>()

const autoId    = useId()
const isOpen    = ref(false)
const searchQuery = ref('')
const searchRef = ref<HTMLInputElement | null>(null)
const rootRef   = ref<HTMLElement | null>(null)
const hasError  = computed(() => !!props.error)

// ── Computed helpers ─────────────────────────────────────────────────────────

const selectedValues = computed(() => {
  if (Array.isArray(props.modelValue)) return props.modelValue
  return props.modelValue ? [props.modelValue] : []
})

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
  if (!searchQuery.value) return props.options
  const q = searchQuery.value.toLowerCase()
  return props.options.filter(o =>
    o.label.toLowerCase().includes(q)
  )
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

const hasGroups = computed(() => {
  return Object.keys(groupedOptions.value).some(k => k !== '')
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
    if (idx >= 0) {
      current.splice(idx, 1)
    } else {
      current.push(opt.value)
    }
    emit('update:modelValue', current)
  } else {
    emit('update:modelValue', opt.value)
    isOpen.value = false
  }
}

function isSelected(value: string) {
  return selectedValues.value.includes(value)
}

function handleClear(e: MouseEvent) {
  e.stopPropagation()
  emit('update:modelValue', props.multiple ? [] : '')
}

function handleClickOutside(e: MouseEvent) {
  if (rootRef.value && !rootRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside, true)
})

// ── Size maps ────────────────────────────────────────────────────────────────

const heightClass: Record<SelectSize, string> = {
  sm: 'h-8',
  md: 'h-9',
  lg: 'h-10',
}

const textSizeClass: Record<SelectSize, string> = {
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base',
}

const paddingXClass: Record<SelectSize, string> = {
  sm: 'px-2.5',
  md: 'px-3',
  lg: 'px-3.5',
}

const iconSizePx: Record<SelectSize, number> = {
  sm: 14,
  md: 16,
  lg: 18,
}

// ── Computed styles ──────────────────────────────────────────────────────────

const triggerClasses = computed(() =>
  cn(
    'ds-select-trigger',
    'relative flex items-center w-full gap-2 text-left',
    'rounded-[var(--radius-lg)] border outline-none',
    'transition-all duration-200 ease-out select-none',
    !props.disabled && 'cursor-pointer',
    heightClass[props.size],
    paddingXClass[props.size],
    textSizeClass[props.size],
    hasError.value && 'ds-select-trigger--error',
    isOpen.value && 'ds-select-trigger--focus',
    props.disabled && 'ds-select-trigger--disabled cursor-not-allowed',
  )
)

const dropdownClasses = computed(() =>
  cn(
    'absolute z-50 left-0 right-0 top-full mt-1.5',
    'rounded-[--radius-2xl] ring-1 ring-inset ring-[--color-border]/60 bg-[--color-surface]',
    'shadow-[--shadow-2xl] overflow-hidden',
  )
)

const optionClasses = (opt: Option) =>
  cn(
    'flex items-center gap-2 w-full text-left',
    'cursor-pointer select-none rounded-[--radius-md] mx-1',
    textSizeClass[props.size],
    props.size === 'sm' ? 'px-2 py-1.5' : 'px-2.5 py-2',
    'transition-colors duration-[--duration-fast]',
    isSelected(opt.value)
      ? 'bg-[--color-primary] text-[--color-text-inverse] font-medium'
      : 'text-[--color-text-primary] hover:bg-[--color-neutral-light]',
    opt.disabled && 'opacity-40 cursor-not-allowed',
  )
</script>

<template>
  <div ref="rootRef" class="flex flex-col gap-1 w-full">
    <!-- Label -->
    <label
      v-if="label"
      :for="autoId"
      :class="cn(
        'text-sm font-medium text-[--color-text-primary]',
        disabled && 'opacity-50',
      )"
    >
      {{ label }}
    </label>

    <!-- Select wrapper -->
    <div class="relative">
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
            displayText ? 'ds-select-trigger-text' : 'ds-select-trigger-text--placeholder'
          )"
        >
          {{ displayText || placeholder }}
        </span>

        <!-- Clear button -->
        <button
          v-if="clearable && selectedValues.length > 0 && !disabled"
          type="button"
          class="shrink-0 flex items-center justify-center text-[--color-text-tertiary] hover:text-[--color-text-primary] transition-colors duration-[--duration-normal] cursor-pointer"
          aria-label="Clear selection"
          @click="handleClear"
        >
          <RiCloseLine :size="String(iconSizePx[size])" />
        </button>

        <!-- Chevron -->
        <RiArrowDownSLine
          :size="String(iconSizePx[size])"
          :class="cn(
            'shrink-0 text-[--color-text-tertiary] transition-transform duration-[--duration-normal]',
            isOpen && 'rotate-180',
          )"
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
          :class="dropdownClasses"
          role="listbox"
          :aria-multiselectable="multiple || undefined"
        >
          <!-- Search input -->
          <div
            v-if="searchable"
            class="flex items-center gap-2 px-3 py-2 border-b border-[--color-border]"
          >
            <RiSearchLine :size="'14'" class="shrink-0 text-[--color-text-tertiary]" />
            <input
              ref="searchRef"
              v-model="searchQuery"
              type="text"
              class="flex-1 min-w-0 bg-transparent outline-none text-sm text-[--color-text-primary] placeholder:text-[--color-text-tertiary]"
              placeholder="Search..."
              @click.stop
            />
          </div>

          <!-- Options list -->
          <div class="max-h-60 overflow-y-auto py-1.5">
            <template v-if="filteredOptions.length === 0">
              <div class="px-3 py-4 text-center text-sm text-[--color-text-tertiary]">
                No options found
              </div>
            </template>

            <template v-else-if="hasGroups">
              <template v-for="(groupOpts, groupName) in groupedOptions" :key="groupName">
                <div
                  v-if="groupName"
                  class="px-3 pt-2 pb-1 text-xs font-semibold text-[--color-text-tertiary] uppercase tracking-wider"
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
                  <span class="flex-1 truncate">{{ opt.label }}</span>
                  <RiCheckLine
                    v-if="isSelected(opt.value)"
                    :size="String(iconSizePx[size])"
                    class="shrink-0"
                  />
                </button>
              </template>
            </template>

            <template v-else>
              <button
                v-for="opt in filteredOptions"
                :key="opt.value"
                type="button"
                role="option"
                :class="optionClasses(opt)"
                :aria-selected="isSelected(opt.value)"
                :disabled="opt.disabled"
                @click.stop="selectOption(opt)"
              >
                <span class="flex-1 truncate">{{ opt.label }}</span>
                <RiCheckLine
                  v-if="isSelected(opt.value)"
                  :size="String(iconSizePx[size])"
                  class="shrink-0 text-[--color-primary]"
                />
              </button>
            </template>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Helper / Error text -->
    <p
      v-if="helperText || error"
      :class="cn(
        'text-sm',
        hasError ? 'text-[--color-danger]' : 'text-[--color-text-secondary]',
      )"
    >
      {{ error ?? helperText }}
    </p>
  </div>
</template>

<style scoped>
/* ── Wrapper base (matches Input atom) ── */
.ds-select-trigger {
  background-color: var(--color-surface);
  border-color: var(--color-border);
}

.ds-select-trigger:hover:not(.ds-select-trigger--disabled) {
  border-color: var(--color-border-strong);
}

.ds-select-trigger--focus:not(.ds-select-trigger--error),
.ds-select-trigger:focus-visible:not(.ds-select-trigger--error) {
  border-color: var(--color-text-primary);
  box-shadow: 0 0 0 1px var(--color-text-primary);
}

/* ── Error state ── */
.ds-select-trigger--error {
  border-color: var(--color-danger);
}

.ds-select-trigger--error.ds-select-trigger--focus,
.ds-select-trigger--error:focus-visible {
  box-shadow: 0 0 0 1px var(--color-danger);
}

/* ── Disabled state ── */
.ds-select-trigger--disabled {
  opacity: 0.5;
  background-color: var(--color-bg-subtle);
}

/* ── Typography ── */
.ds-select-trigger-text {
  color: var(--color-text-primary);
}

.ds-select-trigger-text--placeholder {
  color: var(--color-text-tertiary);
}
</style>
