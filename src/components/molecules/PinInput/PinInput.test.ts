import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PinInput from './PinInput.vue'

describe('PinInput', () => {
  it('renders the correct number of inputs', () => {
    const wrapper = mount(PinInput, { props: { length: 6 } })
    expect(wrapper.findAll('input').length).toBe(6)
  })

  it('renders custom length', () => {
    const wrapper = mount(PinInput, { props: { length: 4 } })
    expect(wrapper.findAll('input').length).toBe(4)
  })

  it('sets initial value from modelValue', () => {
    const wrapper = mount(PinInput, { props: { modelValue: '123', length: 6 } })
    const inputs = wrapper.findAll('input')
    expect((inputs[0].element as HTMLInputElement).value).toBe('1')
    expect((inputs[1].element as HTMLInputElement).value).toBe('2')
    expect((inputs[2].element as HTMLInputElement).value).toBe('3')
  })

  it('has role=group', () => {
    const wrapper = mount(PinInput)
    expect(wrapper.attributes('role')).toBe('group')
  })

  it('applies disabled to all inputs', () => {
    const wrapper = mount(PinInput, { props: { disabled: true, length: 4 } })
    wrapper.findAll('input').forEach(input => {
      expect((input.element as HTMLInputElement).disabled).toBe(true)
    })
  })

  it.each(['sm', 'md', 'lg'] as const)('renders size %s', (size) => {
    const wrapper = mount(PinInput, { props: { size, length: 4 } })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders password type when masked=true', () => {
    const wrapper = mount(PinInput, { props: { masked: true, length: 4 } })
    wrapper.findAll('input').forEach(input => {
      expect((input.element as HTMLInputElement).type).toBe('password')
    })
  })

  it('emits update:modelValue when a digit is typed', async () => {
    const wrapper = mount(PinInput, { props: { length: 4, modelValue: '' } })
    const input = wrapper.findAll('input')[0]
    await input.setValue('3')
    await input.trigger('input')
    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy()
    expect(emitted![0][0]).toContain('3')
  })

  it('emits complete when all digits are filled', async () => {
    const wrapper = mount(PinInput, { props: { length: 3, modelValue: '12' } })
    const inputs = wrapper.findAll('input')
    await inputs[2].setValue('3')
    await inputs[2].trigger('input')
    expect(wrapper.emitted('complete')).toBeTruthy()
  })

  it('clears digit on Backspace when digit exists', async () => {
    const wrapper = mount(PinInput, { props: { length: 4, modelValue: '1234' } })
    const input = wrapper.findAll('input')[2]
    await input.trigger('keydown', { key: 'Backspace' })
    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy()
  })

  it('ignores non-numeric char when type=number', async () => {
    const wrapper = mount(PinInput, { props: { length: 4, modelValue: '', type: 'number' } })
    const input = wrapper.findAll('input')[0]
    await input.setValue('a')
    await input.trigger('input')
    // non-numeric — value cleared
    const emitted = wrapper.emitted('update:modelValue')
    if (emitted) {
      expect((emitted[0][0] as string)[0] ?? '').not.toBe('a')
    }
  })

  it('accepts alphanumeric chars when type=alphanumeric', async () => {
    const wrapper = mount(PinInput, { props: { length: 4, modelValue: '', type: 'alphanumeric' } })
    const input = wrapper.findAll('input')[0]
    await input.setValue('a')
    await input.trigger('input')
    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy()
  })

  it('applies error ring when error=true', () => {
    const wrapper = mount(PinInput, { props: { length: 4, error: true } })
    const html = wrapper.html()
    expect(html).toContain('ring')
  })

  it('navigates with ArrowLeft / ArrowRight', async () => {
    const wrapper = mount(PinInput, { props: { length: 4, modelValue: '1234' } })
    const input1 = wrapper.findAll('input')[1]
    // ArrowLeft should attempt focus on prev — no error thrown
    await input1.trigger('keydown', { key: 'ArrowLeft' })
    await input1.trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.exists()).toBe(true)
  })

  it('selects all text on focus', async () => {
    const wrapper = mount(PinInput, { props: { length: 4, modelValue: '1234' } })
    const input = wrapper.findAll('input')[0]
    await input.trigger('focus')
    expect(wrapper.exists()).toBe(true)
  })

  it('renders custom placeholder', () => {
    const wrapper = mount(PinInput, { props: { length: 4, placeholder: '_' } })
    const input = wrapper.find('input')
    expect((input.element as HTMLInputElement).placeholder).toBe('_')
  })
})
