import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from './Input.vue'

describe('Input', () => {
  // ── Rendering ────────────────────────────────────────────────

  it('renders a native input element', () => {
    const wrapper = mount(Input, { props: { modelValue: '' } })
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('renders label when provided', () => {
    const wrapper = mount(Input, { props: { modelValue: '', label: 'Email' } })
    expect(wrapper.find('label').text()).toContain('Email')
  })

  it('renders required asterisk when required=true', () => {
    const wrapper = mount(Input, { props: { modelValue: '', label: 'Name', required: true } })
    expect(wrapper.find('input').attributes('required')).toBeDefined()
  })

  it('renders helper text', () => {
    const wrapper = mount(Input, { props: { modelValue: '', helperText: 'Enter your email' } })
    expect(wrapper.text()).toContain('Enter your email')
  })

  it('renders error message when error is provided', () => {
    const wrapper = mount(Input, { props: { modelValue: '', error: 'Invalid email' } })
    expect(wrapper.text()).toContain('Invalid email')
  })

  it('renders char counter when counter=true and maxlength is set', () => {
    const wrapper = mount(Input, {
      props: { modelValue: 'hello', counter: true, maxlength: 20 },
    })
    expect(wrapper.text()).toContain('5/20')
  })

  // ── modelValue ───────────────────────────────────────────────

  it('reflects modelValue in native input', () => {
    const wrapper = mount(Input, { props: { modelValue: 'hello' } })
    const input = wrapper.find('input').element as HTMLInputElement
    expect(input.value).toBe('hello')
  })

  it('emits update:modelValue on input event', async () => {
    const wrapper = mount(Input, { props: { modelValue: '' } })
    const input = wrapper.find('input')
    await input.setValue('test')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['test'])
  })

  // ── States ───────────────────────────────────────────────────

  it('disables native input when disabled=true', () => {
    const wrapper = mount(Input, { props: { modelValue: '', disabled: true } })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('sets readonly on native input', () => {
    const wrapper = mount(Input, { props: { modelValue: '', readonly: true } })
    expect(wrapper.find('input').attributes('readonly')).toBeDefined()
  })

  it('sets aria-invalid when error is provided', () => {
    const wrapper = mount(Input, { props: { modelValue: '', error: 'Bad' } })
    expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
  })

  // ── Password toggle ──────────────────────────────────────────

  it('renders password toggle button for type=password', () => {
    const wrapper = mount(Input, { props: { modelValue: '', type: 'password' } })
    const toggleBtn = wrapper.find('button[aria-label="Show password"]')
    expect(toggleBtn.exists()).toBe(true)
  })

  it('toggles password visibility on click', async () => {
    const wrapper = mount(Input, { props: { modelValue: 'secret', type: 'password' } })
    const input = wrapper.find('input')
    expect(input.attributes('type')).toBe('password')
    await wrapper.find('button[aria-label="Show password"]').trigger('click')
    expect(input.attributes('type')).toBe('text')
  })

  // ── Clear button ─────────────────────────────────────────────

  it('shows clear button when clearable=true and value is not empty', () => {
    const wrapper = mount(Input, { props: { modelValue: 'hello', clearable: true } })
    expect(wrapper.find('button[aria-label="Clear input"]').exists()).toBe(true)
  })

  it('hides clear button when value is empty', () => {
    const wrapper = mount(Input, { props: { modelValue: '', clearable: true } })
    expect(wrapper.find('button[aria-label="Clear input"]').exists()).toBe(false)
  })

  it('emits update:modelValue with empty string and clear event on clear', async () => {
    const wrapper = mount(Input, { props: { modelValue: 'hello', clearable: true } })
    await wrapper.find('button[aria-label="Clear input"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([''])
    expect(wrapper.emitted('clear')).toHaveLength(1)
  })

  it('compensates prefix corner radius with wrapper border width', () => {
    const wrapper = mount(Input, {
      props: { modelValue: '' },
      slots: { prefix: 'https://' },
    })
    const prefix = wrapper.find('[data-testid="input-prefix-panel"]')
    expect(prefix.exists()).toBe(true)
    expect(prefix.classes()).toContain('rounded-l-[calc(var(--radius-lg)-1px)]')
  })

  it('compensates suffix corner radius with wrapper border width', () => {
    const wrapper = mount(Input, {
      props: { modelValue: '' },
      slots: { suffix: '.com' },
    })
    const suffix = wrapper.find('[data-testid="input-suffix-panel"]')
    expect(suffix.exists()).toBe(true)
    expect(suffix.classes()).toContain('rounded-r-[calc(var(--radius-lg)-1px)]')
  })

  // ── Accessibility ────────────────────────────────────────────

  it('links label to input via htmlFor/id', () => {
    const wrapper = mount(Input, {
      props: { modelValue: '', label: 'Name', id: 'name-input' },
    })
    expect(wrapper.find('label').attributes('for')).toBe('name-input')
    expect(wrapper.find('input').attributes('id')).toBe('name-input')
  })

  it('links input to hint via aria-describedby when helperText is set', () => {
    const wrapper = mount(Input, {
      props: { modelValue: '', helperText: 'Hint text', id: 'inp' },
    })
    expect(wrapper.find('input').attributes('aria-describedby')).toBe('inp-hint')
  })
})
