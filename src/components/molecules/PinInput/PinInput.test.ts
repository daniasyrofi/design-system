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
})
