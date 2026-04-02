import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Textarea from './Textarea.vue'

describe('Textarea', () => {
  // ── Rendering ────────────────────────────────────────────────

  it('renders a textarea element', () => {
    const wrapper = mount(Textarea, { props: { modelValue: '' } })
    expect(wrapper.find('textarea').exists()).toBe(true)
  })

  it('renders label when provided', () => {
    const wrapper = mount(Textarea, { props: { modelValue: '', label: 'Description' } })
    expect(wrapper.find('label').text()).toContain('Description')
  })

  it('renders helper text', () => {
    const wrapper = mount(Textarea, { props: { modelValue: '', helperText: 'Enter details' } })
    expect(wrapper.text()).toContain('Enter details')
  })

  it('renders error message and hides helper text', () => {
    const wrapper = mount(Textarea, { props: { modelValue: '', helperText: 'Help', error: 'Too short' } })
    expect(wrapper.text()).toContain('Too short')
    expect(wrapper.text()).not.toContain('Help')
  })

  // ── v-model ──────────────────────────────────────────────────

  it('displays modelValue in textarea', () => {
    const wrapper = mount(Textarea, { props: { modelValue: 'Hello world' } })
    expect(wrapper.find('textarea').element.value).toBe('Hello world')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(Textarea, { props: { modelValue: '' } })
    await wrapper.find('textarea').setValue('New text')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['New text'])
  })

  // ── Required ─────────────────────────────────────────────────

  it('sets required attribute when required=true', () => {
    const wrapper = mount(Textarea, { props: { modelValue: '', required: true } })
    expect(wrapper.find('textarea').attributes('required')).toBeDefined()
  })

  it('shows asterisk in label when required', () => {
    const wrapper = mount(Textarea, { props: { modelValue: '', label: 'Bio', required: true } })
    expect(wrapper.find('label').text()).toContain('*')
  })

  it('does not set required when required=false', () => {
    const wrapper = mount(Textarea, { props: { modelValue: '', required: false } })
    expect(wrapper.find('textarea').attributes('required')).toBeUndefined()
  })

  // ── Disabled / Readonly ───────────────────────────────────────

  it('sets disabled on textarea when disabled=true', () => {
    const wrapper = mount(Textarea, { props: { modelValue: '', disabled: true } })
    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined()
  })

  it('sets readonly on textarea when readonly=true', () => {
    const wrapper = mount(Textarea, { props: { modelValue: '', readonly: true } })
    expect(wrapper.find('textarea').attributes('readonly')).toBeDefined()
  })

  // ── Character counter ─────────────────────────────────────────

  it('shows character counter when counter=true', () => {
    const wrapper = mount(Textarea, { props: { modelValue: 'Hi', counter: true, maxlength: 100 } })
    expect(wrapper.text()).toContain('2')
    expect(wrapper.text()).toContain('100')
  })

  // ── Label association ─────────────────────────────────────────

  it('associates label with textarea via id/for', () => {
    const wrapper = mount(Textarea, { props: { modelValue: '', label: 'Notes' } })
    const textareaId = wrapper.find('textarea').attributes('id')
    const labelFor   = wrapper.find('label').attributes('for')
    expect(textareaId).toBeTruthy()
    expect(textareaId).toBe(labelFor)
  })
})
