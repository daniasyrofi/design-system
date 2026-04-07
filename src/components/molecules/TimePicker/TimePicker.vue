<script setup lang="ts">
import { ref, computed, watch, useId } from 'vue'
import { cn } from '@/lib/utils'

type Size = 'sm' | 'md' | 'lg'

interface Props {
  /** Current time value in "HH:mm" 24h format. Supports v-model. */
  modelValue?: string
  /** Visual size of the input. @default 'md' */
  size?: Size
  /** Label text displayed above the input. */
  label?: string
  /** Placeholder text. @default 'HH:MM' */
  placeholder?: string
  /** Error message displayed beneath the input. */
  error?: string
  /** Disables the component. @default false */
  disabled?: boolean
  /** Step interval for minutes (e.g. 5, 15, 30). @default 1 */
  minuteStep?: number
  /** Use 24-hour format. When false, shows AM/PM toggle. @default true */
  use24h?: boolean
  /** HTML id for the first input (hours). */
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  placeholder: 'HH:MM',
  disabled: false,
  minuteStep: 1,
  use24h: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const autoId = useId()
const inputId = computed(() => props.id ?? autoId)

const hoursRef = ref<HTMLInputElement | null>(null)
const minutesRef = ref<HTMLInputElement | null>(null)

// Internal state
const hoursDisplay = ref('')
const minutesDisplay = ref('')
const period = ref<'AM' | 'PM'>('AM')

const hasError = computed(() => !!props.error)

// Parse the incoming modelValue ("HH:mm" 24h string)
function parseModelValue(val: string | undefined) {
  if (!val) {
    hoursDisplay.value = ''
    minutesDisplay.value = ''
    return
  }
  const match = val.match(/^(\d{1,2}):(\d{2})$/)
  if (!match) return

  let h = parseInt(match[1], 10)
  const m = parseInt(match[2], 10)

  if (props.use24h) {
    hoursDisplay.value = String(h).padStart(2, '0')
  } else {
    if (h === 0) {
      period.value = 'AM'
      hoursDisplay.value = '12'
    } else if (h < 12) {
      period.value = 'AM'
      hoursDisplay.value = String(h).padStart(2, '0')
    } else if (h === 12) {
      period.value = 'PM'
      hoursDisplay.value = '12'
    } else {
      period.value = 'PM'
      hoursDisplay.value = String(h - 12).padStart(2, '0')
    }
  }
  minutesDisplay.value = String(m).padStart(2, '0')
}

watch(() => props.modelValue, parseModelValue, { immediate: true })

// Convert display values → 24h "HH:mm" and emit
function emitValue() {
  const hRaw = parseInt(hoursDisplay.value, 10)
  const mRaw = parseInt(minutesDisplay.value, 10)

  if (isNaN(hRaw) || isNaN(mRaw)) return

  let h = hRaw
  if (!props.use24h) {
    if (period.value === 'AM') {
      h = hRaw === 12 ? 0 : hRaw
    } else {
      h = hRaw === 12 ? 12 : hRaw + 12
    }
  }

  const clamped_h = Math.max(0, Math.min(23, h))
  const clamped_m = Math.max(0, Math.min(59, mRaw))

  emit(
    'update:modelValue',
    `${String(clamped_h).padStart(2, '0')}:${String(clamped_m).padStart(2, '0')}`
  )
}

// ── Hours input ──

const hoursMax = computed(() => (props.use24h ? 23 : 12))
const hoursMin = computed(() => (props.use24h ? 0 : 1))

function onHoursInput(e: Event) {
  const raw = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 2)
  hoursDisplay.value = raw

  // Auto-advance to minutes when 2 digits typed
  if (raw.length === 2) {
    const num = parseInt(raw, 10)
    if (num > hoursMax.value) {
      hoursDisplay.value = String(hoursMax.value).padStart(2, '0')
    }
    minutesRef.value?.focus()
    minutesRef.value?.select()
  }
}

function onHoursBlur() {
  if (hoursDisplay.value === '') return
  let num = parseInt(hoursDisplay.value, 10)
  if (isNaN(num)) {
    hoursDisplay.value = ''
    return
  }
  num = Math.max(hoursMin.value, Math.min(hoursMax.value, num))
  hoursDisplay.value = String(num).padStart(2, '0')
  emitValue()
}

function onHoursKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    const cur = parseInt(hoursDisplay.value || '0', 10)
    const next = cur >= hoursMax.value ? hoursMin.value : cur + 1
    hoursDisplay.value = String(next).padStart(2, '0')
    emitValue()
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    const cur = parseInt(hoursDisplay.value || String(hoursMin.value), 10)
    const prev = cur <= hoursMin.value ? hoursMax.value : cur - 1
    hoursDisplay.value = String(prev).padStart(2, '0')
    emitValue()
  } else if (e.key === 'Tab' || e.key === ':') {
    // Tab handled naturally; colon advances focus
    if (e.key === ':') {
      e.preventDefault()
      minutesRef.value?.focus()
      minutesRef.value?.select()
    }
  }
}

// ── Minutes input ──

function onMinutesInput(e: Event) {
  const raw = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 2)
  minutesDisplay.value = raw
  if (raw.length === 2) {
    const num = parseInt(raw, 10)
    if (num > 59) {
      minutesDisplay.value = '59'
    }
  }
}

function onMinutesBlur() {
  if (minutesDisplay.value === '') return
  let num = parseInt(minutesDisplay.value, 10)
  if (isNaN(num)) {
    minutesDisplay.value = ''
    return
  }
  // Snap to nearest minuteStep
  const step = props.minuteStep
  num = Math.round(num / step) * step
  num = Math.max(0, Math.min(59, num))
  minutesDisplay.value = String(num).padStart(2, '0')
  emitValue()
}

function onMinutesKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    const cur = parseInt(minutesDisplay.value || '0', 10)
    const next = (cur + props.minuteStep) > 59 ? 0 : cur + props.minuteStep
    minutesDisplay.value = String(next).padStart(2, '0')
    emitValue()
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    const cur = parseInt(minutesDisplay.value || '0', 10)
    const prev = (cur - props.minuteStep) < 0 ? Math.floor(59 / props.minuteStep) * props.minuteStep : cur - props.minuteStep
    minutesDisplay.value = String(prev).padStart(2, '0')
    emitValue()
  }
}

// ── AM/PM toggle ──

function togglePeriod() {
  if (props.disabled) return
  period.value = period.value === 'AM' ? 'PM' : 'AM'
  emitValue()
}

// ── Size metrics (mirrors Input.vue) ──

const heightClass: Record<Size, string> = {
  sm: 'min-h-8',
  md: 'min-h-10',
  lg: 'min-h-12',
}

const textSizeClass: Record<Size, string> = {
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base',
}

const paddingX: Record<Size, string> = {
  sm: 'px-3',
  md: 'px-3.5',
  lg: 'px-4',
}

const radiusClass: Record<Size, string> = {
  sm: 'rounded-[max(0px,calc(var(--radius-2xl)-10px))]',
  md: 'rounded-[max(0px,calc(var(--radius-2xl)-9px))]',
  lg: 'rounded-[max(0px,calc(var(--radius-2xl)-8px))]',
}

const wrapperClasses = computed(() =>
  cn(
    'ds-timepicker-wrapper',
    'relative flex items-center w-full transition-colors duration-200 ease-out',
    radiusClass[props.size],
    'border outline-none overflow-hidden',
    heightClass[props.size],
    paddingX[props.size],
    'gap-0.5',
    hasError.value && 'ds-timepicker-wrapper--error',
    props.disabled && 'ds-timepicker-wrapper--disabled cursor-not-allowed'
  )
)

const inputClasses = computed(() =>
  cn(
    'ds-timepicker-field',
    'bg-transparent outline-none border-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none',
    'tabular-nums text-center w-[2ch] min-w-0',
    textSizeClass[props.size],
    props.disabled && 'cursor-not-allowed'
  )
)

defineExpose({
  focus: () => hoursRef.value?.focus(),
})
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full text-left">
    <!-- Label -->
    <label
      v-if="label"
      :for="inputId"
      :class="cn('text-sm font-medium select-none', disabled && 'opacity-50')"
      :style="{ color: 'var(--color-text-heading)' }"
    >
      {{ label }}
    </label>

    <!-- Input wrapper -->
    <div :class="wrapperClasses" role="group" :aria-label="label ?? 'Time input'">
      <!-- Hours -->
      <input
        ref="hoursRef"
        :id="inputId"
        type="text"
        inputmode="numeric"
        :placeholder="use24h ? 'HH' : 'hh'"
        :value="hoursDisplay"
        :disabled="disabled"
        :aria-label="'Hours'"
        :class="inputClasses"
        autocomplete="off"
        @input="onHoursInput"
        @blur="onHoursBlur"
        @keydown="onHoursKeydown"
        @focus="($event.target as HTMLInputElement).select()"
      />

      <!-- Separator -->
      <span
        class="select-none font-medium"
        :class="textSizeClass"
        :style="{ color: 'var(--color-text-tertiary)' }"
        aria-hidden="true"
        >:</span
      >

      <!-- Minutes -->
      <input
        ref="minutesRef"
        type="text"
        inputmode="numeric"
        placeholder="MM"
        :value="minutesDisplay"
        :disabled="disabled"
        :aria-label="'Minutes'"
        :class="inputClasses"
        autocomplete="off"
        @input="onMinutesInput"
        @blur="onMinutesBlur"
        @keydown="onMinutesKeydown"
        @focus="($event.target as HTMLInputElement).select()"
      />

      <!-- AM/PM toggle -->
      <button
        v-if="!use24h"
        type="button"
        :disabled="disabled"
        aria-label="Toggle AM/PM"
        class="ds-timepicker-period ml-1.5 select-none font-medium transition-colors rounded"
        :class="[textSizeClass, disabled && 'cursor-not-allowed']"
        @click="togglePeriod"
      >
        {{ period }}
      </button>
    </div>

    <!-- Error -->
    <p
      v-if="error"
      class="text-[13px] leading-snug font-medium animate-in fade-in slide-in-from-top-1"
      :style="{ color: 'var(--color-danger)' }"
    >
      {{ error }}
    </p>
  </div>
</template>

<style scoped>
/* ── Wrapper base ── */
.ds-timepicker-wrapper {
  background-color: var(--color-surface);
  border-color: var(--color-border);
}

.ds-timepicker-wrapper:hover:not(.ds-timepicker-wrapper--disabled):not(:focus-within) {
  border-color: var(--color-border-strong);
}

.ds-timepicker-wrapper:focus-within:not(.ds-timepicker-wrapper--error) {
  border-color: var(--color-text-primary);
  box-shadow: 0 0 0 1px var(--color-text-primary);
}

/* ── Error state ── */
.ds-timepicker-wrapper--error {
  border-color: var(--color-danger);
}

.ds-timepicker-wrapper--error:focus-within {
  box-shadow: 0 0 0 1px var(--color-danger);
}

/* ── Disabled state ── */
.ds-timepicker-wrapper--disabled {
  opacity: 0.5;
  background-color: var(--color-bg-subtle);
}

/* ── Field ── */
.ds-timepicker-field {
  color: var(--color-text-primary);
}

.ds-timepicker-field::placeholder {
  color: var(--color-text-tertiary);
}

.ds-timepicker-field:focus,
.ds-timepicker-field:focus-visible {
  outline: none !important;
  box-shadow: none !important;
  border-color: transparent !important;
  --tw-ring-shadow: none !important;
}

/* Hide number input arrows */
.ds-timepicker-field::-webkit-outer-spin-button,
.ds-timepicker-field::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* ── AM/PM button ── */
.ds-timepicker-period {
  color: var(--color-text-secondary);
  padding: 0 4px;
}

.ds-timepicker-period:hover:not(:disabled) {
  color: var(--color-text-primary);
  background-color: var(--color-neutral-light);
}

.ds-timepicker-period:focus-visible {
  outline: none;
  box-shadow: 0 0 0 1px var(--color-primary);
}
</style>
