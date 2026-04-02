import { ref, computed, watch, type Ref, type ComputedRef } from 'vue'

export type ValidationRule<T> = (value: T) => string | true

export interface UseFormFieldOptions<T> {
  /** Initial value of the field. */
  initialValue: T
  /** Validation rules run in order; first failing rule's message is shown. */
  rules?: ValidationRule<T>[]
  /** Re-validate on every change once the field has been touched. @default true */
  validateOnChange?: boolean
}

export interface UseFormFieldReturn<T> {
  value:     Ref<T>
  error:     ComputedRef<string>
  isDirty:   ComputedRef<boolean>
  isTouched: Ref<boolean>
  isValid:   ComputedRef<boolean>
  validate:  () => boolean
  touch:     () => void
  reset:     () => void
}

/**
 * Composable for managing a single form field with validation.
 *
 * @example
 * ```ts
 * const name = useFormField({
 *   initialValue: '',
 *   rules: [required(), minLength(2)],
 * })
 * // Bind: v-model="name.value" :error="name.error"
 * // On submit: if (name.validate()) { ... }
 * ```
 */
export function useFormField<T>(options: UseFormFieldOptions<T>): UseFormFieldReturn<T> {
  const { initialValue, rules = [], validateOnChange = true } = options

  const value     = ref<T>(initialValue) as Ref<T>
  const isTouched = ref(false)
  const errorMsg  = ref<string>('')

  const isDirty = computed(() => value.value !== initialValue)
  const isValid = computed(() => errorMsg.value === '')
  const error   = computed(() => (isTouched.value ? errorMsg.value : ''))

  function runRules(): string {
    for (const rule of rules) {
      const result = rule(value.value)
      if (result !== true) return result
    }
    return ''
  }

  function validate(): boolean {
    isTouched.value = true
    errorMsg.value = runRules()
    return isValid.value
  }

  function touch() {
    isTouched.value = true
    errorMsg.value = runRules()
  }

  function reset() {
    value.value     = initialValue
    isTouched.value = false
    errorMsg.value  = ''
  }

  // Re-validate on every change once the field has been touched
  if (validateOnChange) {
    watch(value, () => {
      if (isTouched.value) errorMsg.value = runRules()
    })
  }

  return { value, error, isDirty, isTouched, isValid, validate, touch, reset }
}

// ── Built-in validation rules ─────────────────────────────────────────────────

/** Field must not be empty (string, array, null, or undefined). */
export function required(message = 'This field is required'): ValidationRule<unknown> {
  return (value) => {
    if (value === null || value === undefined) return message
    if (typeof value === 'string' && value.trim() === '') return message
    if (Array.isArray(value) && value.length === 0) return message
    return true
  }
}

/** String must be at least `min` characters. */
export function minLength(min: number, message?: string): ValidationRule<string> {
  return (value) =>
    value.length >= min ? true : (message ?? `Must be at least ${min} characters`)
}

/** String must be at most `max` characters. */
export function maxLength(max: number, message?: string): ValidationRule<string> {
  return (value) =>
    value.length <= max ? true : (message ?? `Must be at most ${max} characters`)
}

/** String must match the given regular expression. */
export function pattern(regex: RegExp, message = 'Invalid format'): ValidationRule<string> {
  return (value) => (regex.test(value) ? true : message)
}

/** String must be a valid email address. */
export function email(message = 'Enter a valid email address'): ValidationRule<string> {
  return pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, message)
}

/** Number must be ≥ minimum. */
export function min(minimum: number, message?: string): ValidationRule<number> {
  return (value) =>
    value >= minimum ? true : (message ?? `Must be at least ${minimum}`)
}

/** Number must be ≤ maximum. */
export function max(maximum: number, message?: string): ValidationRule<number> {
  return (value) =>
    value <= maximum ? true : (message ?? `Must be at most ${maximum}`)
}
