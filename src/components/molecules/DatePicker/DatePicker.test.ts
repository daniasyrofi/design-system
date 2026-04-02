import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DatePicker from './DatePicker.vue'

describe('DatePicker', () => {
  it('renders a trigger button', () => {
    const wrapper = mount(DatePicker, { props: { modelValue: null } })
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('shows placeholder when no date selected', () => {
    const wrapper = mount(DatePicker, { props: { modelValue: null, placeholder: 'Pick a date' } })
    expect(wrapper.text()).toContain('Pick a date')
  })

  it('displays formatted date when value is set', () => {
    const wrapper = mount(DatePicker, { props: { modelValue: '2024-06-15', format: 'dd/MM/yyyy' } })
    expect(wrapper.text()).toContain('15/06/2024')
  })

  it('calendar is hidden by default', () => {
    const wrapper = mount(DatePicker, { props: { modelValue: null } })
    expect(wrapper.find('.ds-calendar-popup').exists()).toBe(false)
  })

  it('opens calendar on trigger click', async () => {
    const wrapper = mount(DatePicker, { props: { modelValue: null } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('.ds-calendar-popup').exists()).toBe(true)
  })

  it('shows label when provided', () => {
    const wrapper = mount(DatePicker, { props: { modelValue: null, label: 'Due Date' } })
    expect(wrapper.find('label').text()).toContain('Due Date')
  })

  it('shows error message', () => {
    const wrapper = mount(DatePicker, { props: { modelValue: null, error: 'Date required' } })
    expect(wrapper.text()).toContain('Date required')
  })

  it('disables trigger when disabled=true', () => {
    const wrapper = mount(DatePicker, { props: { modelValue: null, disabled: true } })
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('does not open when disabled', async () => {
    const wrapper = mount(DatePicker, { props: { modelValue: null, disabled: true } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })

  it('renders month navigation when open', async () => {
    const wrapper = mount(DatePicker, { props: { modelValue: null } })
    await wrapper.find('button').trigger('click')
    // Should have prev/next navigation buttons
    const navBtns = wrapper.findAll('button')
    expect(navBtns.length).toBeGreaterThan(1)
  })

  it.each(['sm', 'md', 'lg'] as const)('renders size %s', (size) => {
    const wrapper = mount(DatePicker, { props: { modelValue: null, size } })
    expect(wrapper.find('button').exists()).toBe(true)
  })
})
