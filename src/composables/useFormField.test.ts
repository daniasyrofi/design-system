import { describe, it, expect } from 'vitest'
import { useFormField, required, minLength, maxLength, email, min, max } from './useFormField'

describe('useFormField', () => {
  it('initializes with the provided value', () => {
    const field = useFormField({ initialValue: 'hello' })
    expect(field.value.value).toBe('hello')
  })

  it('error is empty until touched', () => {
    const field = useFormField({ initialValue: '', rules: [required()] })
    expect(field.error.value).toBe('')
  })

  it('validate() marks as touched and returns false on error', () => {
    const field = useFormField({ initialValue: '', rules: [required()] })
    const result = field.validate()
    expect(result).toBe(false)
    expect(field.isTouched.value).toBe(true)
    expect(field.error.value).toBe('This field is required')
  })

  it('validate() returns true when rules pass', () => {
    const field = useFormField({ initialValue: 'Alice', rules: [required()] })
    expect(field.validate()).toBe(true)
  })

  it('isDirty is false initially', () => {
    const field = useFormField({ initialValue: 'a' })
    expect(field.isDirty.value).toBe(false)
  })

  it('isDirty is true after value changes', () => {
    const field = useFormField({ initialValue: 'a' })
    field.value.value = 'b'
    expect(field.isDirty.value).toBe(true)
  })

  it('reset() restores initial state', () => {
    const field = useFormField({ initialValue: '', rules: [required()] })
    field.value.value = 'changed'
    field.validate()
    field.reset()
    expect(field.value.value).toBe('')
    expect(field.isTouched.value).toBe(false)
    expect(field.error.value).toBe('')
  })

  it('touch() marks field as touched and shows error', () => {
    const field = useFormField({ initialValue: '', rules: [required()] })
    field.touch()
    expect(field.isTouched.value).toBe(true)
    expect(field.error.value).not.toBe('')
  })
})

describe('required rule', () => {
  const rule = required()
  it('fails on empty string', () => expect(rule('')).not.toBe(true))
  it('fails on null', () => expect(rule(null)).not.toBe(true))
  it('fails on empty array', () => expect(rule([])).not.toBe(true))
  it('passes on non-empty string', () => expect(rule('hello')).toBe(true))
  it('passes on non-empty array', () => expect(rule(['a'])).toBe(true))
})

describe('minLength rule', () => {
  const rule = minLength(3)
  it('fails when too short', () => expect(rule('ab')).not.toBe(true))
  it('passes at minimum length', () => expect(rule('abc')).toBe(true))
  it('passes when longer', () => expect(rule('abcd')).toBe(true))
})

describe('maxLength rule', () => {
  const rule = maxLength(5)
  it('fails when too long', () => expect(rule('abcdef')).not.toBe(true))
  it('passes at max length', () => expect(rule('abcde')).toBe(true))
})

describe('email rule', () => {
  const rule = email()
  it('fails on invalid email', () => expect(rule('notanemail')).not.toBe(true))
  it('passes on valid email', () => expect(rule('user@example.com')).toBe(true))
})

describe('min rule', () => {
  const rule = min(5)
  it('fails below minimum', () => expect(rule(4)).not.toBe(true))
  it('passes at minimum', () => expect(rule(5)).toBe(true))
})

describe('max rule', () => {
  const rule = max(10)
  it('fails above maximum', () => expect(rule(11)).not.toBe(true))
  it('passes at maximum', () => expect(rule(10)).toBe(true))
})
