<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick, useId } from 'vue'
import { cn } from '@/lib/utils'
import { RiCloseLine, RiArrowDownSLine } from '@remixicon/vue'
import Spinner from '@/components/atoms/Spinner/Spinner.vue'

export interface ComboboxOption {
  /** The value emitted on selection. */
  value:     string
  /** The human-readable label shown in the list and trigger. */
  label:     string
  /** Prevents the option from being selected. @default false */
  disabled?: boolean
}

type Size = 'sm' | 'md' | 'lg'

interface Props {
  /** The selected value. Use with v-model. */
  modelValue:   string
  /** The list of selectable options. */
  options:      ComboboxOption[]
  /** Placeholder shown in the input when empty. @default 'Search...' */
  placeholder?: string
  /** Shows a × button to clear the selection. @default false */
  clearable?:   boolean
  /** Disables the combobox. @default false */
  disabled?:    boolean
  /** Shows a spinner (for async loading). @default false */
  loading?:     boolean
  /** Visual size. @default 'md' */
  size?:        Size
  /** Label rendered above the input. */
  label?:       string
  /** Helper text rendered below (hidden when error is set). */
  helperText?:  string
  /** Error message — applies error styling. */
  error?:       string
  /** Text shown when no options match the query. @default 'No results' */
  emptyText?:   string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Search...',
  clearable:   false,
  disabled:    false,
  loading:     false,
  size:        'md',
  emptyText:   'No results',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  /** Fired on every keystroke — useful for async option fetching. */
  'search':            [query: string]
}>()

// ── IDs ───────────────────────────────────────────────────────────────────────

const inputId  = useId()
const listId   = useId()
const rootRef  = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)
const listRef  = ref<HTMLElement | null>(null)

// ── State ─────────────────────────────────────────────────────────────────────

const isOpen    = ref(false)
const query     = ref('')
const activeIdx = ref(-1)

// When value changes externally, sync the input to show the label
const selectedLabel = computed(() =>
  props.options.find(o => o.value === props.modelValue)?.label ?? ''
)

// When dropdown is closed the input shows the selected label
// When open, it shows what the user is typing
watch(isOpen, (open) => {
  if (!open) {
    query.value = selectedLabel.value
    activeIdx.value = -1
  } else {
    query.value = ''
    nextTick(() => {
      // Highlight current selection in list
      const selectedIdx = filtered.value.findIndex(o => o.value === props.modelValue)
      activeIdx.value = selectedIdx >= 0 ? selectedIdx : -1
    })
  }
})

// Keep input in sync with external modelValue changes (e.g. reset)
watch(selectedLabel, (label) => {
  if (!isOpen.value) query.value = label
}, { immediate: true })

// ── Filtering ─────────────────────────────────────────────────────────────────

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q || !isOpen.value) return props.options
  return props.options.filter(o => o.label.toLowerCase().includes(q))
})

// ── Interaction ───────────────────────────────────────────────────────────────

function open() {
  if (props.disabled || props.loading) return
  isOpen.value = true
  inputRef.value?.focus()
}

function close() {
  isOpen.value = false
}

function selectOption(option: ComboboxOption) {
  if (option.disabled) return
  emit('update:modelValue', option.value)
  close()
}

function clear(e: MouseEvent) {
  e.stopPropagation()
  emit('update:modelValue', '')
  query.value = ''
  isOpen.value = false
}

function handleInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  query.value = val
  isOpen.value = true
  activeIdx.value = -1
  emit('search', val)
}

function handleKeydown(e: KeyboardEvent) {
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      if (!isOpen.value) { open(); return }
      activeIdx.value = Math.min(activeIdx.value + 1, filtered.value.length - 1)
      scrollActiveIntoView()
      break
    case 'ArrowUp':
      e.preventDefault()
      if (!isOpen.value) { open(); return }
      activeIdx.value = Math.max(activeIdx.value - 1, 0)
      scrollActiveIntoView()
      break
    case 'Enter':
      e.preventDefault()
      if (isOpen.value && activeIdx.value >= 0) {
        selectOption(filtered.value[activeIdx.value])
      } else {
        open()
      }
      break
    case 'Escape':
      e.preventDefault()
      close()
      break
    case 'Tab':
      close()
      break
    case 'Backspace':
      if (!query.value && props.modelValue) {
        emit('update:modelValue', '')
      }
      break
  }
}

function scrollActiveIntoView() {
  nextTick(() => {
    const el = listRef.value?.querySelectorAll<HTMLElement>('[role="option"]')[activeIdx.value]
    el?.scrollIntoView({ block: 'nearest' })
  })
}

function handleClickOutside(e: MouseEvent) {
  if (rootRef.value && !rootRef.value.contains(e.target as Node)) {
    close()
  }
}

onMounted(()       => document.addEventListener('click', handleClickOutside, true))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside, true))

// ── Computed styles ───────────────────────────────────────────────────────────

const hasError  = computed(() => !!props.error)
const showClear = computed(() => props.clearable && !!props.modelValue && !props.disabled && !props.loading)

const heightClass  = computed(() => ({ sm: 'h-8',  md: 'h-10', lg: 'h-12' }[props.size]))
const textClass    = computed(() => ({ sm: 'text-sm', md: 'text-sm', lg: 'text-base' }[props.size]))
const paddingX     = computed(() => ({ sm: 'px-3', md: 'px-4', lg: 'px-5' }[props.size]))
const iconSize     = computed(() => ({ sm: 14, md: 16, lg: 18 }[props.size]))
const spinnerSize  = computed(() => ({ sm: 'xs', md: 'sm', lg: 'md' } as const)[props.size])

const wrapperClasses = computed(() =>
  cn(
    'ds-combobox-input',
    'relative flex items-center w-full gap-2',
    'rounded-[var(--radius-lg)] border',
    'transition-colors duration-200 ease-out',
    heightClass.value,
    paddingX.value,
    hasError.value  && 'ds-combobox-input--error',
    isOpen.value    && !hasError.value && 'ds-combobox-input--open',
    props.disabled  && 'ds-combobox-input--disabled cursor-not-allowed',
  )
)

const optionClass = (idx: number, option: ComboboxOption) =>
  cn(
    'ds-combobox-option',
    'flex items-center w-full text-left px-3 py-2 rounded-lg text-sm',
    'transition-colors duration-100 cursor-pointer select-none',
    option.disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
    option.value === props.modelValue && 'ds-combobox-option--selected',
    idx === activeIdx.value && 'ds-combobox-option--active',
  )
</script>

<template>
  <div ref="rootRef" class="flex flex-col gap-1.5 w-full">

    <!-- Label -->
    <label
      v-if="label"
      :for="inputId"
      :class="cn('text-sm font-medium select-none', disabled && 'opacity-50')"
      :style="{ color: 'var(--color-text-heading)' }"
    >
      {{ label }}
    </label>

    <!-- Trigger wrapper -->
    <div :class="wrapperClasses" @click="open">

      <!-- Text input -->
      <input
        :id="inputId"
        ref="inputRef"
        type="text"
        :value="query"
        :placeholder="isOpen ? placeholder : (selectedLabel || placeholder)"
        :disabled="disabled || loading"
        class="ds-combobox-native flex-1 min-w-0 bg-transparent outline-none"
        :class="textClass"
        role="combobox"
        :aria-expanded="isOpen"
        aria-haspopup="listbox"
        autocomplete="off"
        :aria-autocomplete="'list'"
        :aria-owns="listId"
        :aria-activedescendant="activeIdx >= 0 ? `${listId}-opt-${activeIdx}` : undefined"
        :aria-invalid="hasError || undefined"
        @input="handleInput"
        @keydown="handleKeydown"
        @focus="open"
      />

      <!-- Clear button -->
      <button
        v-if="showClear"
        type="button"
        class="ds-combobox-clear shrink-0 flex items-center justify-center transition-colors duration-200"
        aria-label="Clear"
        @click.stop="clear"
      >
        <RiCloseLine :size="String(iconSize)" />
      </button>

      <!-- Loading spinner -->
      <Spinner
        v-if="loading"
        :size="spinnerSize"
        color="neutral"
        class="shrink-0"
      />

      <!-- Chevron (hidden when loading) -->
      <RiArrowDownSLine
        v-else
        :size="String(iconSize)"
        :class="cn('shrink-0 transition-transform duration-200 pointer-events-none', isOpen && 'rotate-180')"
        style="color: var(--color-text-tertiary);"
        aria-hidden="true"
      />

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
          v-show="isOpen"
          class="ds-combobox-dropdown absolute z-50 left-0 right-0 top-full mt-1.5"
        >
          <div
            :id="listId"
            ref="listRef"
            role="listbox"
            class="max-h-60 overflow-y-auto overflow-x-hidden py-1.5 px-1"
            @mousedown.prevent
          >
            <!-- Options -->
            <template v-if="filtered.length">
              <button
                v-for="(option, idx) in filtered"
                :id="`${listId}-opt-${idx}`"
                :key="option.value"
                type="button"
                role="option"
                :class="optionClass(idx, option)"
                :aria-selected="option.value === modelValue"
                :aria-disabled="option.disabled || undefined"
                @click.stop="selectOption(option)"
                @mouseenter="activeIdx = idx"
              >
                <!-- Check mark for selected -->
                <span
                  :style="{ width: '16px', minWidth: '16px', color: 'var(--color-primary)', marginRight: '8px', opacity: option.value === modelValue ? 1 : 0 }"
                  aria-hidden="true"
                >✓</span>
                {{ option.label }}
              </button>
            </template>

            <!-- Empty state -->
            <p
              v-else
              class="text-sm text-center py-4 px-3 select-none"
              style="color: var(--color-text-tertiary);"
            >
              {{ emptyText }}
            </p>
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
.ds-combobox-input {
  position: relative;
  background-color: var(--color-surface);
  border-color: var(--color-border);
  cursor: text;
}

.ds-combobox-input:hover:not(.ds-combobox-input--disabled):not(.ds-combobox-input--open) {
  border-color: var(--color-border-strong);
}

.ds-combobox-input--open {
  border-color: var(--color-text-primary);
  box-shadow: 0 0 0 1px var(--color-text-primary);
}

.ds-combobox-input--error        { border-color: var(--color-danger); }
.ds-combobox-input--error.ds-combobox-input--open { box-shadow: 0 0 0 1px var(--color-danger); }
.ds-combobox-input--disabled     { opacity: 0.5; background-color: var(--color-bg-subtle); }

.ds-combobox-native {
  color: var(--color-text-primary);
}
.ds-combobox-native::placeholder {
  color: var(--color-text-tertiary);
}
.ds-combobox-native:focus,
.ds-combobox-native:focus-visible { outline: none; }

.ds-combobox-clear { color: var(--color-text-tertiary); }
.ds-combobox-clear:hover { color: var(--color-text-primary); }
.ds-combobox-clear:focus-visible { outline: none; }

.ds-combobox-dropdown {
  background-color: var(--color-surface);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-2xl), inset 0 0 0 1px var(--color-border);
  overflow: hidden;
}

.ds-combobox-option {
  color: var(--color-text-primary);
}
.ds-combobox-option:hover,
.ds-combobox-option--active {
  background-color: var(--color-neutral-light);
}
.ds-combobox-option--selected {
  color: var(--color-primary);
  font-weight: 500;
}
</style>
