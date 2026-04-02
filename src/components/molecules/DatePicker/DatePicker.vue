<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, useId } from 'vue'
import { cn } from '@/lib/utils'
import {
  RiCalendarLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from '@remixicon/vue'

type Size = 'sm' | 'md' | 'lg'

interface Props {
  /** The selected date string in YYYY-MM-DD format. Supports v-model. */
  modelValue?: string | null
  /** Selection mode (currently only 'single' is fully supported). @default 'single' */
  mode?: 'single' | 'range'
  /** The minimum selectable date in YYYY-MM-DD format. */
  minDate?: string
  /** The maximum selectable date in YYYY-MM-DD format. */
  maxDate?: string
  /** Visual display format of the date. @default 'dd/MM/yyyy' */
  format?: string
  /** Text to display when no date is selected. @default 'Select date' */
  placeholder?: string
  /** Visual size of the input. @default 'md' */
  size?: Size
  /** Label text displayed above the input. */
  label?: string
  /** Error message displayed beneath the input. */
  error?: string
  /** Disables the datepicker. @default false */
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
const triggerId = useId()

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


</script>

<template>
  <div ref="containerRef" class="relative flex flex-col gap-1 w-full">
    <!-- Label -->
    <label
      v-if="label"
      :for="triggerId"
      :class="cn(
        'text-sm font-medium text-[--color-text-primary]',
        disabled && 'opacity-50',
      )"
    >
      {{ label }}
    </label>

    <!-- Trigger -->
    <button
      :id="triggerId"
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
      enter-active-class="ds-cal-enter-active"
      enter-from-class="ds-cal-enter-from"
      enter-to-class="ds-cal-enter-to"
      leave-active-class="ds-cal-leave-active"
      leave-from-class="ds-cal-leave-to"
      leave-to-class="ds-cal-leave-from"
    >
      <div
        v-if="isOpen"
        class="ds-calendar-popup"
      >
        <!-- Month/Year header -->
        <div class="flex items-center justify-between mb-3">
          <button
            type="button"
            class="ds-cal-nav-btn"
            aria-label="Previous month"
            @click="prevMonth"
          >
            <RiArrowLeftSLine :size="'16'" />
          </button>
          <span class="text-sm font-semibold tracking-tight ds-cal-month-label">
            {{ monthYearLabel }}
          </span>
          <button
            type="button"
            class="ds-cal-nav-btn"
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
            class="ds-cal-day-header"
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
            :class="[
              'ds-cal-day',
              cell.isSelected  && 'ds-cal-day--selected',
              cell.isToday && !cell.isSelected && 'ds-cal-day--today',
              !cell.isCurrentMonth && !cell.isSelected && 'ds-cal-day--outside',
              cell.isDisabled  && 'ds-cal-day--disabled',
            ]"
            :aria-label="cell.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })"
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

/* ── Calendar popup ── */
.ds-calendar-popup {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 50;
  width: 308px;
  padding: 16px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow:
    0 10px 15px oklch(0.20 0 0 / 0.07),
    0 4px 6px oklch(0.20 0 0 / 0.04);
}

/* ── Nav buttons (prev/next month) ── */
.ds-cal-nav-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  transition: background-color 150ms ease, color 150ms ease;
}

.ds-cal-nav-btn:hover {
  background-color: var(--color-neutral-light);
  color: var(--color-text-primary);
}

/* ── Month/year label ── */
.ds-cal-month-label {
  color: var(--color-text-primary);
}

/* ── Day-of-week header ── */
.ds-cal-day-header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-text-tertiary);
}

/* ── Day cells ── */
.ds-cal-day {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1;
  font-size: 0.875rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  color: var(--color-text-primary);
  transition: background-color 100ms ease, color 100ms ease;
}

.ds-cal-day:hover:not(:disabled):not(.ds-cal-day--selected) {
  background-color: var(--color-neutral-light);
}

.ds-cal-day--today {
  color: var(--color-primary);
  font-weight: 600;
  outline: 1.5px solid var(--color-primary);
  outline-offset: -1.5px;
}

.ds-cal-day--selected {
  background-color: var(--color-neutral);
  color: var(--color-text-inverse);
  font-weight: 600;
}

.ds-cal-day--outside {
  color: var(--color-text-tertiary);
  opacity: 0.5;
}

.ds-cal-day--disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* ── Transitions ── */
.ds-cal-enter-active,
.ds-cal-leave-active {
  transition: opacity 150ms ease, transform 150ms ease;
}

.ds-cal-enter-from {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}

.ds-cal-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.ds-cal-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}
</style>
