<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { cn } from '@/lib/utils'
import {
  RiCalendarLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from '@remixicon/vue'

type Size = 'sm' | 'md' | 'lg'

interface Props {
  modelValue?: string | null
  mode?: 'single' | 'range'
  minDate?: string
  maxDate?: string
  format?: string
  placeholder?: string
  size?: Size
  label?: string
  error?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  mode: 'single',
  format: 'dd/MM/yyyy',
  placeholder: 'Select date',
  size: 'md',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
}>()

const isOpen = ref(false)
const containerRef = ref<HTMLElement | null>(null)

// Calendar view state
const viewYear = ref(new Date().getFullYear())
const viewMonth = ref(new Date().getMonth()) // 0-based

const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

// Parse the model value
const selectedDate = computed(() => {
  if (!props.modelValue) return null
  const d = new Date(props.modelValue + 'T00:00:00')
  return isNaN(d.getTime()) ? null : d
})

const minDateObj = computed(() => {
  if (!props.minDate) return null
  const d = new Date(props.minDate + 'T00:00:00')
  return isNaN(d.getTime()) ? null : d
})

const maxDateObj = computed(() => {
  if (!props.maxDate) return null
  const d = new Date(props.maxDate + 'T00:00:00')
  return isNaN(d.getTime()) ? null : d
})

const today = new Date()
const todayStr = toISODate(today)

// When modelValue changes, sync calendar view
watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      const d = new Date(val + 'T00:00:00')
      if (!isNaN(d.getTime())) {
        viewYear.value = d.getFullYear()
        viewMonth.value = d.getMonth()
      }
    }
  },
  { immediate: true },
)

// Formatted display value
const displayValue = computed(() => {
  if (!selectedDate.value) return ''
  return formatDate(selectedDate.value, props.format)
})

// Calendar grid
const calendarDays = computed(() => {
  const year = viewYear.value
  const month = viewMonth.value

  // First day of the month
  const firstDay = new Date(year, month, 1)
  // Day of week (0=Sun). We want Mon=0
  let startDow = firstDay.getDay() - 1
  if (startDow < 0) startDow = 6

  // Last day of the month
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()

  // Previous month fill
  const prevMonth = new Date(year, month, 0)
  const prevDays = prevMonth.getDate()

  const cells: {
    date: Date
    day: number
    isCurrentMonth: boolean
    isToday: boolean
    isSelected: boolean
    isDisabled: boolean
  }[] = []

  // Fill from previous month
  for (let i = startDow - 1; i >= 0; i--) {
    const d = new Date(year, month - 1, prevDays - i)
    cells.push(makeCell(d, false))
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, month, day)
    cells.push(makeCell(d, true))
  }

  // Fill remaining to complete 6 rows (42 cells)
  const remaining = 42 - cells.length
  for (let i = 1; i <= remaining; i++) {
    const d = new Date(year, month + 1, i)
    cells.push(makeCell(d, false))
  }

  return cells
})

function makeCell(date: Date, isCurrentMonth: boolean) {
  const iso = toISODate(date)
  const isDisabledByMin = minDateObj.value ? date < minDateObj.value : false
  const isDisabledByMax = maxDateObj.value ? date > maxDateObj.value : false

  return {
    date,
    day: date.getDate(),
    isCurrentMonth,
    isToday: iso === todayStr,
    isSelected: selectedDate.value ? iso === toISODate(selectedDate.value) : false,
    isDisabled: isDisabledByMin || isDisabledByMax,
  }
}

const monthYearLabel = computed(() => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]
  return `${monthNames[viewMonth.value]} ${viewYear.value}`
})

function prevMonth() {
  if (viewMonth.value === 0) {
    viewMonth.value = 11
    viewYear.value--
  } else {
    viewMonth.value--
  }
}

function nextMonth() {
  if (viewMonth.value === 11) {
    viewMonth.value = 0
    viewYear.value++
  } else {
    viewMonth.value++
  }
}

function selectDate(cell: (typeof calendarDays.value)[number]) {
  if (cell.isDisabled) return
  const iso = toISODate(cell.date)
  emit('update:modelValue', iso)
  isOpen.value = false
}

function toggleOpen() {
  if (props.disabled) return
  isOpen.value = !isOpen.value
}

function handleClickOutside(event: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})

// Utilities
function toISODate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function formatDate(d: Date, fmt: string): string {
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return fmt
    .replace('dd', day)
    .replace('MM', month)
    .replace('yyyy', String(year))
}

// Size maps
const heightClass: Record<Size, string> = {
  sm: 'h-8',
  md: 'h-9',
  lg: 'h-10',
}

const textSizeClass: Record<Size, string> = {
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base',
}

const iconSizePx: Record<Size, number> = {
  sm: 14,
  md: 16,
  lg: 18,
}

const hasError = computed(() => !!props.error)

const triggerClasses = computed(() =>
  cn(
    'ds-datepicker-trigger',
    'relative flex items-center w-full gap-2',
    'rounded-[var(--radius-lg)] border outline-none',
    'transition-all duration-200 ease-out select-none',
    !props.disabled && 'cursor-pointer',
    heightClass[props.size],
    textSizeClass[props.size],
    'px-3',
    hasError.value && 'ds-datepicker-trigger--error',
    isOpen.value && 'ds-datepicker-trigger--focus',
    props.disabled && 'ds-datepicker-trigger--disabled cursor-not-allowed',
  )
)

const dayCellBase = [
  'inline-flex items-center justify-center',
  'h-8 w-8 text-sm',
  'cursor-pointer select-none',
  'transition-colors duration-[--duration-fast] ease-[--ease-default]',
]
</script>

<template>
  <div ref="containerRef" class="relative flex flex-col gap-1 w-full">
    <!-- Label -->
    <label
      v-if="label"
      :class="cn(
        'text-sm font-medium text-[--color-text-primary]',
        disabled && 'opacity-50',
      )"
    >
      {{ label }}
    </label>

    <!-- Trigger -->
    <button
      type="button"
      :class="triggerClasses"
      :disabled="disabled"
      @click="toggleOpen"
    >
      <span
        :class="cn(
          'flex-1 text-left truncate',
          displayValue ? 'ds-datepicker-trigger-text' : 'ds-datepicker-trigger-text--placeholder',
        )"
      >
        {{ displayValue || placeholder }}
      </span>
      <RiCalendarLine
        :size="String(iconSizePx[size])"
        class="shrink-0 text-[--color-text-tertiary]"
      />
    </button>

    <!-- Error text -->
    <p v-if="error" class="text-sm text-[--color-danger]">
      {{ error }}
    </p>

    <!-- Calendar dropdown -->
    <Transition
      enter-active-class="transition duration-[--duration-normal] ease-[--ease-default]"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-[--duration-fast] ease-[--ease-default]"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <div
        v-if="isOpen"
        class="absolute z-50 top-full mt-1.5 left-0 rounded-[--radius-2xl] ring-1 ring-inset ring-[--color-border]/60 bg-[--color-surface] shadow-[--shadow-2xl] p-3 w-[308px]"
      >
        <!-- Month/Year header -->
        <div class="flex items-center justify-between mb-3 px-1">
          <button
            type="button"
            class="inline-flex items-center justify-center h-7 w-7 rounded-full text-[--color-text-secondary] hover:bg-[--color-neutral-light] hover:text-[--color-text-primary] cursor-pointer transition-colors duration-[--duration-fast]"
            aria-label="Previous month"
            @click="prevMonth"
          >
            <RiArrowLeftSLine :size="'16'" />
          </button>
          <span class="text-sm font-semibold text-[--color-text-primary] tracking-tight">
            {{ monthYearLabel }}
          </span>
          <button
            type="button"
            class="inline-flex items-center justify-center h-7 w-7 rounded-full text-[--color-text-secondary] hover:bg-[--color-neutral-light] hover:text-[--color-text-primary] cursor-pointer transition-colors duration-[--duration-fast]"
            aria-label="Next month"
            @click="nextMonth"
          >
            <RiArrowRightSLine :size="'16'" />
          </button>
        </div>

        <!-- Day-of-week header -->
        <div class="grid grid-cols-7 mb-1">
          <span
            v-for="day in DAYS"
            :key="day"
            class="text-center text-xs font-medium text-[--color-text-tertiary] h-8 flex items-center justify-center"
          >
            {{ day }}
          </span>
        </div>

        <!-- Date grid -->
        <div class="grid grid-cols-7">
          <button
            v-for="(cell, i) in calendarDays"
            :key="i"
            type="button"
            :disabled="cell.isDisabled"
            :class="cn(
              ...dayCellBase,
              'rounded-full',
              cell.isSelected
                ? 'bg-[--color-primary] text-[--color-text-inverse] font-medium shadow-sm'
                : cell.isToday
                  ? 'ring-1.5 ring-[--color-primary] text-[--color-primary] font-medium hover:bg-[--color-primary-light]'
                  : cell.isCurrentMonth
                    ? 'text-[--color-text-primary] hover:bg-[--color-neutral-light]'
                    : 'text-[--color-text-muted] hover:bg-[--color-neutral-light]',
              cell.isDisabled && 'opacity-30 pointer-events-none cursor-not-allowed',
            )"
            :aria-label="`${cell.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`"
            :aria-selected="cell.isSelected || undefined"
            @click="selectDate(cell)"
          >
            {{ cell.day }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* ── Wrapper base (matches Input atom) ── */
.ds-datepicker-trigger {
  background-color: var(--color-surface);
  border-color: var(--color-border);
}

.ds-datepicker-trigger:hover:not(.ds-datepicker-trigger--disabled) {
  border-color: var(--color-border-strong);
}

.ds-datepicker-trigger--focus:not(.ds-datepicker-trigger--error),
.ds-datepicker-trigger:focus-visible:not(.ds-datepicker-trigger--error) {
  border-color: var(--color-text-primary);
  box-shadow: 0 0 0 1px var(--color-text-primary);
}

/* ── Error state ── */
.ds-datepicker-trigger--error {
  border-color: var(--color-danger);
}

.ds-datepicker-trigger--error.ds-datepicker-trigger--focus,
.ds-datepicker-trigger--error:focus-visible {
  box-shadow: 0 0 0 1px var(--color-danger);
}

/* ── Disabled state ── */
.ds-datepicker-trigger--disabled {
  opacity: 0.5;
  background-color: var(--color-bg-subtle);
}

/* ── Typography ── */
.ds-datepicker-trigger-text {
  color: var(--color-text-primary);
}

.ds-datepicker-trigger-text--placeholder {
  color: var(--color-text-tertiary);
}
</style>
