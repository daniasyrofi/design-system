import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Radio from './Radio.vue'

describe('Radio', () => {
  // ── Rendering ────────────────────────────────────────────────

  it('renders a radio input', () => {
    const wrapper = mount(Radio, { props: { modelValue: '', value: 'a' } })
    expect(wrapper.find('input[type="radio"]').exists()).toBe(true)
  })

  it('renders label text', () => {
    const wrapper = mount(Radio, { props: { modelValue: '', value: 'a', label: 'Option A' } })
    expect(wrapper.text()).toContain('Option A')
  })

  it('renders description text', () => {
    const wrapper = mount(Radio, { props: { modelValue: '', value: 'a', description: 'Details here' } })
    expect(wrapper.text()).toContain('Details here')
  })

  it('renders error text', () => {
    const wrapper = mount(Radio, { props: { modelValue: '', value: 'a', error: 'Required field' } })
    expect(wrapper.text()).toContain('Required field')
  })

  // ── Checked state ─────────────────────────────────────────────

  it('is checked when modelValue equals value', () => {
    const wrapper = mount(Radio, { props: { modelValue: 'a', value: 'a' } })
    expect(wrapper.find('input').element.checked).toBe(true)
  })

  it('is unchecked when modelValue differs from value', () => {
    const wrapper = mount(Radio, { props: { modelValue: 'b', value: 'a' } })
    expect(wrapper.find('input').element.checked).toBe(false)
  })

  // ── v-model ──────────────────────────────────────────────────

  it('emits update:modelValue with its value on change', async () => {
    const wrapper = mount(Radio, { props: { modelValue: '', value: 'a' } })
    await wrapper.find('input').trigger('change')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['a'])
  })

  // ── Disabled state ───────────────────────────────────────────

  it('sets disabled on input when disabled=true', () => {
    const wrapper = mount(Radio, { props: { modelValue: '', value: 'a', disabled: true } })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('does not emit when disabled and clicked', async () => {
    const wrapper = mount(Radio, { props: { modelValue: '', value: 'a', disabled: true } })
    await wrapper.find('input').trigger('change')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  // ── Sizes ────────────────────────────────────────────────────

  it.each(['sm', 'md', 'lg'] as const)('renders size %s without errors', (size) => {
    const wrapper = mount(Radio, { props: { modelValue: '', value: 'a', size } })
    expect(wrapper.exists()).toBe(true)
  })

  // ── Label association ─────────────────────────────────────────

  it('associates label with input via matching id/for', () => {
    const wrapper = mount(Radio, { props: { modelValue: '', value: 'a', label: 'Choice' } })
    const inputId = wrapper.find('input').attributes('id')
    const labelFor = wrapper.find('label').attributes('for')
    expect(inputId).toBeTruthy()
    expect(inputId).toBe(labelFor)
  })
})
