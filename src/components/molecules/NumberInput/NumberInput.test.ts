import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NumberInput from './NumberInput.vue'

describe('NumberInput', () => {
  it('renders with label', () => {
    const wrapper = mount(NumberInput, { props: { modelValue: 5, label: 'Quantity' } })
    expect(wrapper.find('label').text()).toBe('Quantity')
  })

  it('label is associated with input via for/id', () => {
    const wrapper = mount(NumberInput, { props: { modelValue: 5, label: 'Qty' } })
    const label = wrapper.find('label')
    const input = wrapper.find('input')
    expect(label.attributes('for')).toBe(input.attributes('id'))
  })

  it('displays current value in input', () => {
    const wrapper = mount(NumberInput, { props: { modelValue: 42 } })
    const input = wrapper.find('input')
    expect(input.element.value).toBe('42')
  })

  it('emits increment on + button click', async () => {
    const wrapper = mount(NumberInput, { props: { modelValue: 5 } })
    const [, btnIncrement] = wrapper.findAll('button')
    await btnIncrement.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([6])
  })

  it('emits decrement on - button click', async () => {
    const wrapper = mount(NumberInput, { props: { modelValue: 5, min: 0 } })
    const [btnDecrement] = wrapper.findAll('button')
    await btnDecrement.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([4])
  })

  it('does not go below min', async () => {
    const wrapper = mount(NumberInput, { props: { modelValue: 0, min: 0 } })
    const [btnDecrement] = wrapper.findAll('button')
    expect(btnDecrement.attributes('disabled')).toBeDefined()
  })

  it('does not go above max', async () => {
    const wrapper = mount(NumberInput, { props: { modelValue: 10, max: 10 } })
    const [, btnIncrement] = wrapper.findAll('button')
    expect(btnIncrement.attributes('disabled')).toBeDefined()
  })

  it('respects step prop', async () => {
    const wrapper = mount(NumberInput, { props: { modelValue: 0, step: 5 } })
    const [, btnIncrement] = wrapper.findAll('button')
    await btnIncrement.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([5])
  })

  it('disables both buttons when disabled', () => {
    const wrapper = mount(NumberInput, { props: { modelValue: 5, disabled: true } })
    const buttons = wrapper.findAll('button')
    buttons.forEach(btn => expect(btn.attributes('disabled')).toBeDefined())
  })

  it('disables buttons when readonly', () => {
    const wrapper = mount(NumberInput, { props: { modelValue: 5, readonly: true } })
    const buttons = wrapper.findAll('button')
    buttons.forEach(btn => expect(btn.attributes('disabled')).toBeDefined())
  })

  it('does not emit when readonly and + clicked', async () => {
    const wrapper = mount(NumberInput, { props: { modelValue: 5, readonly: true } })
    const [, btnIncrement] = wrapper.findAll('button')
    await btnIncrement.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })
})
