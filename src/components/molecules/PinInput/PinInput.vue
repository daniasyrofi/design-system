<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { cn } from '@/lib/utils'

type PinType = 'number' | 'alphanumeric'
type PinSize = 'sm' | 'md' | 'lg'

interface Props {
  /** Current PIN value. Supports v-model. */
  modelValue?:  string
  /** Number of digit inputs. @default 6 */
  length?:      number
  /** Character type allowed. @default 'number' */
  type?:        PinType
  /** Visual size. @default 'md' */
  size?:        PinSize
  /** Hides characters (password-style). @default false */
  masked?:      boolean
  /** Placeholder character shown in empty cells. @default '○' */
  placeholder?: string
  /** Disables all inputs. @default false */
  disabled?:    boolean
  /** Shows error state on all inputs. @default false */
  error?:       boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue:  '',
  length:      6,
  type:        'number',
  size:        'md',
  masked:      false,
  placeholder: '○',
  disabled:    false,
  error:       false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  /** Fires when all cells are filled. */
  complete: [value: string]
}>()

const inputRefs = ref<HTMLInputElement[]>([])
const digits    = ref<string[]>(Array(props.length).fill(''))

// Sync external modelValue → digits
watch(() => props.modelValue, (val) => {
  const chars = (val ?? '').split('').slice(0, props.length)
  digits.value = [...chars, ...Array(props.length - chars.length).fill('')]
}, { immediate: true })

function allowed(char: string): boolean {
  if (props.type === 'number') return /^\d$/.test(char)
  return /^[a-zA-Z0-9]$/.test(char)
}

function emit_update() {
  const val = digits.value.join('')
  emit('update:modelValue', val)
  if (val.length === props.length && !digits.value.includes('')) {
    emit('complete', val)
  }
}

function onInput(idx: number, e: Event) {
  const input = e.target as HTMLInputElement
  const raw   = input.value

  // Handle paste / multi-char
  const chars = raw.split('').filter(allowed)

  if (chars.length > 1) {
    // Distribute across remaining cells
    chars.forEach((c, i) => {
      if (idx + i < props.length) digits.value[idx + i] = c
    })
    emit_update()
    const next = Math.min(idx + chars.length, props.length - 1)
    nextTick(() => inputRefs.value[next]?.focus())
    return
  }

  if (chars.length === 1) {
    digits.value[idx] = chars[0]
    emit_update()
    if (idx < props.length - 1) nextTick(() => inputRefs.value[idx + 1]?.focus())
  } else {
    // Non-allowed char — reset display
    digits.value[idx] = ''
    emit_update()
  }

  // Force Vue to update the input value
  nextTick(() => { if (inputRefs.value[idx]) inputRefs.value[idx].value = digits.value[idx] })
}

function onKeydown(idx: number, e: KeyboardEvent) {
  if (e.key === 'Backspace') {
    if (digits.value[idx]) {
      digits.value[idx] = ''
      emit_update()
    } else if (idx > 0) {
      nextTick(() => inputRefs.value[idx - 1]?.focus())
    }
    e.preventDefault()
  } else if (e.key === 'ArrowLeft'  && idx > 0)               nextTick(() => inputRefs.value[idx - 1]?.focus())
  else if   (e.key === 'ArrowRight' && idx < props.length - 1) nextTick(() => inputRefs.value[idx + 1]?.focus())
}

function onFocus(e: FocusEvent) {
  (e.target as HTMLInputElement).select()
}

const sizeMap: Record<PinSize, string> = {
  sm: 'w-8 h-9 text-sm rounded-[var(--radius-sm)]',
  md: 'w-10 h-11 text-base rounded-[var(--radius-md)]',
  lg: 'w-12 h-13 text-lg rounded-[var(--radius-md)]',
}
</script>

<template>
  <div class="inline-flex items-center gap-2" role="group" aria-label="PIN input">
    <input
      v-for="(digit, idx) in digits"
      :key="idx"
      :ref="el => { if (el) inputRefs[idx] = el as HTMLInputElement }"
      :value="digit"
      :type="masked ? 'password' : 'text'"
      inputmode="numeric"
      maxlength="10"
      :placeholder="placeholder"
      :disabled="disabled"
      :aria-label="`Digit ${idx + 1} of ${length}`"
      :class="cn(
        'text-center font-mono font-semibold transition-all outline-none focus:ring-2',
        sizeMap[size],
        error
          ? 'ring-2 ring-[--color-danger] border-transparent'
          : 'border focus:ring-[--color-primary]',
        disabled && 'opacity-40 cursor-not-allowed',
      )"
      :style="{
        backgroundColor: 'var(--color-surface)',
        color:           'var(--color-text-primary)',
        borderColor:     error ? undefined : 'var(--color-border)',
        boxShadow:       'var(--shadow-xs)',
      }"
      @input="onInput(idx, $event)"
      @keydown="onKeydown(idx, $event)"
      @focus="onFocus"
    />
  </div>
</template>
