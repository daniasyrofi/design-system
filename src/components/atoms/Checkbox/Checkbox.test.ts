import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Checkbox from './Checkbox.vue'

describe('Checkbox', () => {
  // ── Rendering ────────────────────────────────────────────────

  it('renders a hidden native checkbox input', () => {
    const wrapper = mount(Checkbox, { props: { modelValue: false } })
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
  })

  it('renders label when provided', () => {
    const wrapper = mount(Checkbox, { props: { modelValue: false, label: 'Accept terms' } })
    expect(wrapper.text()).toContain('Accept terms')
  })

  it('renders description when provided', () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: false, label: 'Terms', description: 'Read carefully' },
    })
    expect(wrapper.text()).toContain('Read carefully')
  })

  it('renders error message instead of description when error is provided', () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: false, error: 'Required field' },
    })
    expect(wrapper.text()).toContain('Required field')
  })

  // ── States ───────────────────────────────────────────────────

  it('is checked when modelValue=true', () => {
    const wrapper = mount(Checkbox, { props: { modelValue: true } })
    const input = wrapper.find('input').element as HTMLInputElement
    expect(input.checked).toBe(true)
  })

  it('is unchecked when modelValue=false', () => {
    const wrapper = mount(Checkbox, { props: { modelValue: false } })
    const input = wrapper.find('input').element as HTMLInputElement
    expect(input.checked).toBe(false)
  })

  it('is disabled when disabled=true', () => {
    const wrapper = mount(Checkbox, { props: { modelValue: false, disabled: true } })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  // ── Indeterminate ────────────────────────────────────────────

  it('sets aria-checked to "mixed" for indeterminate state', () => {
    const wrapper = mount(Checkbox, { props: { modelValue: 'indeterminate' } })
    expect(wrapper.find('input').attributes('aria-checked')).toBe('mixed')
  })

  // ── Emits ────────────────────────────────────────────────────

  it('emits update:modelValue with true when unchecked input is changed', async () => {
    const wrapper = mount(Checkbox, { props: { modelValue: false } })
    await wrapper.find('input').setValue(true)
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
  })

  it('emits update:modelValue with false when checked input is changed', async () => {
    const wrapper = mount(Checkbox, { props: { modelValue: true } })
    await wrapper.find('input').setValue(false)
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([false])
  })

  it('emits true when indeterminate checkbox is changed', async () => {
    const wrapper = mount(Checkbox, { props: { modelValue: 'indeterminate' } })
    // Simulating change event directly since setValue won't handle indeterminate
    await wrapper.find('input').trigger('change')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
  })

  // ── Accessibility ────────────────────────────────────────────

  it('sets aria-invalid when error is provided', () => {
    const wrapper = mount(Checkbox, { props: { modelValue: false, error: 'Required' } })
    expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
  })

  it('sets aria-describedby when description is provided', () => {
    const wrapper = mount(Checkbox, {
      props: { modelValue: false, description: 'Some desc' },
    })
    expect(wrapper.find('input').attributes('aria-describedby')).toBeTruthy()
  })
})
