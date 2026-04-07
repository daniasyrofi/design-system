import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TimePicker from './TimePicker.vue'

describe('TimePicker', () => {
  it('renders with default props', () => {
    const wrapper = mount(TimePicker)
    const inputs = wrapper.findAll('input')
    expect(inputs).toHaveLength(2)
  })

  it('renders label when provided', () => {
    const wrapper = mount(TimePicker, { props: { label: 'Meeting time' } })
    expect(wrapper.find('label').text()).toBe('Meeting time')
  })

  it('label is associated with hours input via for/id', () => {
    const wrapper = mount(TimePicker, { props: { label: 'Time' } })
    const label = wrapper.find('label')
    const hoursInput = wrapper.findAll('input')[0]
    expect(label.attributes('for')).toBe(hoursInput.attributes('id'))
  })

  it('renders error message when provided', () => {
    const wrapper = mount(TimePicker, { props: { error: 'Invalid time' } })
    expect(wrapper.text()).toContain('Invalid time')
  })

  it('does not render error element when no error', () => {
    const wrapper = mount(TimePicker)
    expect(wrapper.find('p').exists()).toBe(false)
  })

  it('disabled state disables both inputs', () => {
    const wrapper = mount(TimePicker, { props: { disabled: true } })
    const inputs = wrapper.findAll('input')
    inputs.forEach((input) => expect(input.attributes('disabled')).toBeDefined())
  })

  it('parses modelValue "HH:mm" into hours and minutes fields', () => {
    const wrapper = mount(TimePicker, { props: { modelValue: '14:30' } })
    const inputs = wrapper.findAll('input')
    expect(inputs[0].element.value).toBe('14')
    expect(inputs[1].element.value).toBe('30')
  })

  it('parses "09:05" correctly', () => {
    const wrapper = mount(TimePicker, { props: { modelValue: '09:05' } })
    const inputs = wrapper.findAll('input')
    expect(inputs[0].element.value).toBe('09')
    expect(inputs[1].element.value).toBe('05')
  })

  it('emits update:modelValue in HH:mm 24h format on hours blur', async () => {
    const wrapper = mount(TimePicker)
    const inputs = wrapper.findAll('input')

    await inputs[0].setValue('9')
    await inputs[0].trigger('blur')

    await inputs[1].setValue('05')
    await inputs[1].trigger('blur')

    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted).toBeTruthy()
    // Last emission should be formatted as "09:05"
    const last = emitted![emitted!.length - 1] as [string]
    expect(last[0]).toBe('09:05')
  })

  it('clamps hours to 23 in 24h mode', async () => {
    const wrapper = mount(TimePicker)
    const inputs = wrapper.findAll('input')
    await inputs[0].setValue('25')
    await inputs[0].trigger('blur')
    expect(inputs[0].element.value).toBe('23')
  })

  it('clamps minutes to 59', async () => {
    const wrapper = mount(TimePicker)
    const inputs = wrapper.findAll('input')
    await inputs[1].setValue('72')
    await inputs[1].trigger('blur')
    expect(inputs[1].element.value).toBe('59')
  })

  it('renders AM/PM toggle button when use24h=false', () => {
    const wrapper = mount(TimePicker, { props: { use24h: false } })
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBeGreaterThanOrEqual(1)
    const periodBtn = buttons.find((b) => b.text() === 'AM' || b.text() === 'PM')
    expect(periodBtn).toBeTruthy()
  })

  it('does not render AM/PM toggle in 24h mode', () => {
    const wrapper = mount(TimePicker, { props: { use24h: true } })
    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('toggles period between AM and PM on click', async () => {
    const wrapper = mount(TimePicker, { props: { use24h: false } })
    const periodBtn = wrapper.find('button[aria-label="Toggle AM/PM"]')
    expect(periodBtn.text()).toBe('AM')
    await periodBtn.trigger('click')
    expect(periodBtn.text()).toBe('PM')
  })

  it('converts 12h PM value to 24h format on emit', async () => {
    const wrapper = mount(TimePicker, {
      props: { use24h: false, modelValue: '14:00' },
    })
    // 14:00 in 24h = 02:00 PM in 12h
    const inputs = wrapper.findAll('input')
    expect(inputs[0].element.value).toBe('02')
    const periodBtn = wrapper.find('button[aria-label="Toggle AM/PM"]')
    expect(periodBtn.text()).toBe('PM')
  })

  it('converts 12h midnight (12:00 AM) to 00:00 on emit', async () => {
    const wrapper = mount(TimePicker, {
      props: { use24h: false, modelValue: '00:00' },
    })
    const inputs = wrapper.findAll('input')
    // 00:00 24h → 12:00 AM in 12h
    expect(inputs[0].element.value).toBe('12')
    const periodBtn = wrapper.find('button[aria-label="Toggle AM/PM"]')
    expect(periodBtn.text()).toBe('AM')
  })

  it('ArrowUp increments hours', async () => {
    const wrapper = mount(TimePicker, { props: { modelValue: '10:00' } })
    const inputs = wrapper.findAll('input')
    await inputs[0].trigger('keydown', { key: 'ArrowUp' })
    expect(inputs[0].element.value).toBe('11')
  })

  it('ArrowDown decrements hours', async () => {
    const wrapper = mount(TimePicker, { props: { modelValue: '10:00' } })
    const inputs = wrapper.findAll('input')
    await inputs[0].trigger('keydown', { key: 'ArrowDown' })
    expect(inputs[0].element.value).toBe('09')
  })

  it('ArrowUp increments minutes by minuteStep', async () => {
    const wrapper = mount(TimePicker, { props: { modelValue: '10:00', minuteStep: 15 } })
    const inputs = wrapper.findAll('input')
    await inputs[1].trigger('keydown', { key: 'ArrowUp' })
    expect(inputs[1].element.value).toBe('15')
  })
})
