<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, useId } from 'vue'
import { cn } from '@/lib/utils'
import { RiCalendarLine, RiArrowLeftSLine, RiArrowRightSLine, RiArrowRightLine } from '@remixicon/vue'

export interface DateRange {
  /** ISO date string for range start (YYYY-MM-DD) or null. */
  start: string | null
  /** ISO date string for range end (YYYY-MM-DD) or null. */
  end:   string | null
}

type Size = 'sm' | 'md' | 'lg'

interface Props {
  /** The selected date range. Use with v-model. */
  modelValue:       DateRange
  /** Minimum selectable date (YYYY-MM-DD). */
  minDate?:         string
  /** Maximum selectable date (YYYY-MM-DD). */
  maxDate?:         string
  /** Placeholder shown when no start date selected. @default 'Start date' */
  startPlaceholder?: string
  /** Placeholder shown when no end date selected. @default 'End date' */
  endPlaceholder?:   string
  /** Visual size. @default 'md' */
  size?:             Size
  /** Label above the trigger. */
  label?:            string
  /** Error message. */
  error?:            string
  /** Disables the picker. @default false */
  disabled?:         boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue:        () => ({ start: null, end: null }),
  startPlaceholder:  'Start date',
  endPlaceholder:    'End date',
  size:              'md',
  disabled:          false,
})

const emit = defineEmits<{
  'update:modelValue': [range: DateRange]
}>()

// ── State ─────────────────────────────────────────────────────────────────────

const isOpen      = ref(false)
const containerRef = ref<HTMLElement | null>(null)
const triggerId   = useId()

// Calendar shows two months: left and right
const leftYear  = ref(new Date().getFullYear())
const leftMonth = ref(new Date().getMonth()) // 0-based

const rightYear  = computed(() => leftMonth.value === 11 ? leftYear.value + 1 : leftYear.value)
const rightMonth = computed(() => leftMonth.value === 11 ? 0 : leftMonth.value + 1)

// Hover preview
const hoverDate = ref<string | null>(null)

// ── Parsing helpers ───────────────────────────────────────────────────────────

function toDate(iso: string | null | undefined): Date | null {
  if (!iso) return null
  const d = new Date(iso + 'T00:00:00')
  return isNaN(d.getTime()) ? null : d
}

function toISO(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const startDate  = computed(() => toDate(props.modelValue.start))
const endDate    = computed(() => toDate(props.modelValue.end))
const minDateObj = computed(() => toDate(props.minDate))
const maxDateObj = computed(() => toDate(props.maxDate))

const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const today    = new Date()
const todayISO = toISO(today)

// ── Calendar grid builder ─────────────────────────────────────────────────────

interface CalCell {
  date: Date
  iso:  string
  day:  number
  isCurrentMonth: boolean
  isToday:        boolean
  isDisabled:     boolean
  isStart:        boolean
  isEnd:          boolean
  isInRange:      boolean
  isRangeStart:   boolean  // leftmost visible range edge
  isRangeEnd:     boolean  // rightmost visible range edge
}

function buildGrid(year: number, month: number): CalCell[] {
  const firstDay = new Date(year, month, 1)
  let startDow = firstDay.getDay() - 1
  if (startDow < 0) startDow = 6

  const prevMonth = new Date(year, month, 0)
  const prevDays  = prevMonth.getDate()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells: CalCell[] = []

  for (let i = startDow - 1; i >= 0; i--) {
    cells.push(makeCell(new Date(year, month - 1, prevDays - i), false))
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(makeCell(new Date(year, month, d), true))
  }
  const rem = 42 - cells.length
  for (let i = 1; i <= rem; i++) {
    cells.push(makeCell(new Date(year, month + 1, i), false))
  }

  return cells
}

function makeCell(date: Date, isCurrentMonth: boolean): CalCell {
  const iso = toISO(date)

  const isDisabled =
    (minDateObj.value ? date < minDateObj.value : false) ||
    (maxDateObj.value ? date > maxDateObj.value : false)

  const start = startDate.value
  const end   = endDate.value
  const hover = hoverDate.value ? toDate(hoverDate.value) : null

  const isStart = !!start && iso === toISO(start)
  const isEnd   = !!end   && iso === toISO(end)

  // Range includes hover preview when only start is selected
  let isInRange = false
  if (start && end) {
    isInRange = date > start && date < end
  } else if (start && hover && !end) {
    const lo = hover < start ? hover : start
    const hi = hover < start ? start : hover
    isInRange = date > lo && date < hi
  }

  return {
    date, iso, day: date.getDate(), isCurrentMonth,
    isToday: iso === todayISO,
    isDisabled,
    isStart,
    isEnd,
    isInRange,
    isRangeStart: isStart || (isInRange && date.getDay() === 1),
    isRangeEnd:   isEnd   || (isInRange && date.getDay() === 0),
  }
}

const leftGrid  = computed(() => buildGrid(leftYear.value, leftMonth.value))
const rightGrid = computed(() => buildGrid(rightYear.value, rightMonth.value))

// ── Navigation ────────────────────────────────────────────────────────────────

function prevMonth() {
  if (leftMonth.value === 0) {
    leftMonth.value = 11
    leftYear.value--
  } else {
    leftMonth.value--
  }
}

function nextMonth() {
  if (leftMonth.value === 11) {
    leftMonth.value = 0
    leftYear.value++
  } else {
    leftMonth.value++
  }
}

// ── Date selection ────────────────────────────────────────────────────────────

function selectDate(cell: CalCell) {
  if (cell.isDisabled) return

  const start = props.modelValue.start
  const end   = props.modelValue.end

  if (!start || (start && end)) {
    // No start yet, or full range already selected → reset to new start
    emit('update:modelValue', { start: cell.iso, end: null })
  } else {
    // Have start, no end → set end
    if (cell.iso < start) {
      // Clicked before start → swap
      emit('update:modelValue', { start: cell.iso, end: start })
    } else if (cell.iso === start) {
      // Clicked same day → clear
      emit('update:modelValue', { start: null, end: null })
    } else {
      emit('update:modelValue', { start, end: cell.iso })
      isOpen.value = false
    }
  }
}

// ── Display ───────────────────────────────────────────────────────────────────

function formatDate(iso: string | null): string {
  if (!iso) return ''
  const d = toDate(iso)
  if (!d) return ''
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

const displayStart = computed(() => formatDate(props.modelValue.start))
const displayEnd   = computed(() => formatDate(props.modelValue.end))

const hasError = computed(() => !!props.error)

// ── Click outside ─────────────────────────────────────────────────────────────

function handleClickOutside(e: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    isOpen.value = false
    hoverDate.value = null
  }
}

onMounted(()       => document.addEventListener('mousedown', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('mousedown', handleClickOutside))

// Sync calendar view when modelValue changes externally
watch(() => props.modelValue.start, (iso) => {
  if (iso) {
    const d = toDate(iso)
    if (d) {
      leftYear.value  = d.getFullYear()
      leftMonth.value = d.getMonth()
    }
  }
}, { immediate: true })

// ── Styling ───────────────────────────────────────────────────────────────────

const heightClass: Record<Size, string> = { sm: 'h-8', md: 'h-10', lg: 'h-12' }
const textClass:   Record<Size, string> = { sm: 'text-sm', md: 'text-sm', lg: 'text-base' }
const paddingX:    Record<Size, string> = { sm: 'px-3', md: 'px-4', lg: 'px-5' }

function cellClass(cell: CalCell) {
  return cn(
    'ds-drp-cell',
    cell.isStart     && 'ds-drp-cell--start',
    cell.isEnd       && 'ds-drp-cell--end',
    cell.isInRange   && 'ds-drp-cell--in-range',
    cell.isToday && !cell.isStart && !cell.isEnd && 'ds-drp-cell--today',
    !cell.isCurrentMonth && !cell.isStart && !cell.isEnd && 'ds-drp-cell--outside',
    cell.isDisabled  && 'ds-drp-cell--disabled',
  )
}
</script>

<template>
  <div ref="containerRef" class="relative flex flex-col gap-1.5 w-full">

    <!-- Label -->
    <label
      v-if="label"
      :for="triggerId"
      :class="cn('text-sm font-medium select-none', disabled && 'opacity-50')"
      style="color: var(--color-text-heading);"
    >
      {{ label }}
    </label>

    <!-- Trigger -->
    <button
      :id="triggerId"
      type="button"
      :class="cn(
        'ds-drp-trigger',
        'flex items-center w-full gap-2',
        'rounded-[var(--radius-lg)] border outline-none',
        'transition-colors duration-200 ease-out select-none',
        !disabled && 'cursor-pointer',
        heightClass[size],
        paddingX[size],
        textClass[size],
        hasError && 'ds-drp-trigger--error',
        isOpen   && 'ds-drp-trigger--open',
        disabled && 'ds-drp-trigger--disabled cursor-not-allowed',
      )"
      :disabled="disabled"
      :aria-expanded="isOpen"
      :aria-haspopup="'dialog'"
      @click="isOpen = !isOpen"
    >
      <!-- Start date -->
      <span
        class="flex-1 text-left truncate"
        :style="{ color: displayStart ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)' }"
      >
        {{ displayStart || startPlaceholder }}
      </span>

      <RiArrowRightLine size="14" style="color: var(--color-text-tertiary); flex-shrink: 0;" aria-hidden="true" />

      <!-- End date -->
      <span
        class="flex-1 text-left truncate"
        :style="{ color: displayEnd ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)' }"
      >
        {{ displayEnd || endPlaceholder }}
      </span>

      <RiCalendarLine
        :size="size === 'lg' ? '18' : '16'"
        style="color: var(--color-text-tertiary); flex-shrink: 0;"
        aria-hidden="true"
      />
    </button>

    <!-- Error -->
    <p v-if="error" class="text-[13px]" style="color: var(--color-danger);">{{ error }}</p>

    <!-- Calendar popup -->
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
        class="ds-drp-popup"
        role="dialog"
        aria-modal="true"
        :aria-label="label ? `${label} date range picker` : 'Date range picker'"
      >
        <!-- Header: left month -->
        <div class="ds-drp-panels">

          <!-- LEFT PANEL -->
          <div class="ds-drp-panel">
            <div class="flex items-center justify-between mb-3">
              <button type="button" class="ds-cal-nav-btn" aria-label="Previous month" @click="prevMonth">
                <RiArrowLeftSLine size="16" />
              </button>
              <span class="text-sm font-semibold" style="color: var(--color-text-primary);">
                {{ MONTHS[leftMonth] }} {{ leftYear }}
              </span>
              <div class="w-7" /> <!-- spacer (right nav is on right panel) -->
            </div>

            <!-- Day headers -->
            <div class="grid grid-cols-7 mb-1">
              <span v-for="d in DAYS" :key="d" class="ds-cal-day-header">{{ d }}</span>
            </div>

            <!-- Cells -->
            <div class="grid grid-cols-7">
              <button
                v-for="(cell, i) in leftGrid"
                :key="i"
                type="button"
                :class="cellClass(cell)"
                :disabled="cell.isDisabled"
                :aria-label="cell.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })"
                :aria-selected="cell.isStart || cell.isEnd || cell.isInRange || undefined"
                @click="selectDate(cell)"
                @mouseenter="hoverDate = cell.iso"
                @mouseleave="hoverDate = null"
              >
                {{ cell.day }}
              </button>
            </div>
          </div>

          <!-- Divider -->
          <div class="ds-drp-divider" />

          <!-- RIGHT PANEL -->
          <div class="ds-drp-panel">
            <div class="flex items-center justify-between mb-3">
              <div class="w-7" /> <!-- spacer -->
              <span class="text-sm font-semibold" style="color: var(--color-text-primary);">
                {{ MONTHS[rightMonth] }} {{ rightYear }}
              </span>
              <button type="button" class="ds-cal-nav-btn" aria-label="Next month" @click="nextMonth">
                <RiArrowRightSLine size="16" />
              </button>
            </div>

            <!-- Day headers -->
            <div class="grid grid-cols-7 mb-1">
              <span v-for="d in DAYS" :key="d" class="ds-cal-day-header">{{ d }}</span>
            </div>

            <!-- Cells -->
            <div class="grid grid-cols-7">
              <button
                v-for="(cell, i) in rightGrid"
                :key="i"
                type="button"
                :class="cellClass(cell)"
                :disabled="cell.isDisabled"
                :aria-label="cell.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })"
                :aria-selected="cell.isStart || cell.isEnd || cell.isInRange || undefined"
                @click="selectDate(cell)"
                @mouseenter="hoverDate = cell.iso"
                @mouseleave="hoverDate = null"
              >
                {{ cell.day }}
              </button>
            </div>
          </div>
        </div>

        <!-- Footer actions -->
        <div class="ds-drp-footer">
          <span class="text-xs" style="color: var(--color-text-tertiary);">
            {{ modelValue.start && !modelValue.end ? 'Now select an end date' : modelValue.start && modelValue.end ? `${displayStart} → ${displayEnd}` : 'Select a start date' }}
          </span>
          <button
            type="button"
            class="ds-drp-clear-btn text-xs"
            :disabled="!modelValue.start && !modelValue.end"
            @click="emit('update:modelValue', { start: null, end: null }); isOpen = false"
          >
            Clear
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* ── Trigger ── */
.ds-drp-trigger {
  background-color: var(--color-surface);
  border-color: var(--color-border);
}
.ds-drp-trigger:hover:not(.ds-drp-trigger--disabled):not(.ds-drp-trigger--open) {
  border-color: var(--color-border-strong);
}
.ds-drp-trigger--open {
  border-color: var(--color-text-primary);
  box-shadow: 0 0 0 1px var(--color-text-primary);
}
.ds-drp-trigger--error        { border-color: var(--color-danger); }
.ds-drp-trigger--disabled     { opacity: 0.5; background-color: var(--color-bg-subtle); }

/* ── Popup ── */
.ds-drp-popup {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 50;
  padding: 16px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl), 0 0 0 1px var(--color-border);
}

.ds-drp-panels {
  display: flex;
  gap: 0;
  align-items: flex-start;
}

.ds-drp-panel {
  width: 252px;
}

.ds-drp-divider {
  width: 1px;
  background-color: var(--color-border);
  align-self: stretch;
  margin: 0 12px;
}

/* ── Nav buttons ── */
.ds-cal-nav-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  transition: background-color 150ms ease;
}
.ds-cal-nav-btn:hover {
  background-color: var(--color-neutral-light);
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
.ds-drp-cell {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1;
  font-size: 0.8125rem;
  cursor: pointer;
  color: var(--color-text-primary);
  transition: background-color 100ms ease, color 100ms ease;
  border-radius: var(--radius-md);
  z-index: 1;
}

.ds-drp-cell:hover:not(:disabled):not(.ds-drp-cell--start):not(.ds-drp-cell--end) {
  background-color: var(--color-neutral-light);
}

/* Start/End: filled circle */
.ds-drp-cell--start,
.ds-drp-cell--end {
  background-color: var(--color-neutral) !important;
  color: var(--color-text-inverse) !important;
  font-weight: 600;
  border-radius: var(--radius-md);
}

/* In-range: subtle fill, no radius (pill band) */
.ds-drp-cell--in-range {
  background-color: color-mix(in oklch, var(--color-neutral) 12%, transparent);
  border-radius: 0;
  color: var(--color-text-primary);
}
/* Round left cap at start */
.ds-drp-cell--start + .ds-drp-cell--in-range,
.ds-drp-cell--in-range:first-child {
  border-radius: 0;
}

/* Today ring */
.ds-drp-cell--today {
  color: var(--color-primary);
  font-weight: 600;
  outline: 1.5px solid var(--color-primary);
  outline-offset: -1.5px;
  border-radius: var(--radius-md);
}

/* Outside current month */
.ds-drp-cell--outside {
  color: var(--color-text-tertiary);
  opacity: 0.4;
}

/* Disabled */
.ds-drp-cell--disabled {
  opacity: 0.3;
  cursor: not-allowed;
  pointer-events: none;
}

/* ── Footer ── */
.ds-drp-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--color-border);
}

.ds-drp-clear-btn {
  padding: 4px 10px;
  border-radius: var(--radius-md);
  color: var(--color-text-secondary);
  transition: background-color 150ms ease;
}
.ds-drp-clear-btn:hover:not(:disabled) {
  background-color: var(--color-neutral-light);
  color: var(--color-text-primary);
}
.ds-drp-clear-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
