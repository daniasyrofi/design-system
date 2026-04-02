import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DateRangePicker from './DateRangePicker.vue'

const emptyRange = { start: null, end: null }

describe('DateRangePicker', () => {
  it('renders a trigger button', () => {
    const wrapper = mount(DateRangePicker, { props: { modelValue: emptyRange } })
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('shows start/end placeholders when no range selected', () => {
    const wrapper = mount(DateRangePicker, {
      props: { modelValue: emptyRange, startPlaceholder: 'From', endPlaceholder: 'To' },
    })
    expect(wrapper.text()).toContain('From')
    expect(wrapper.text()).toContain('To')
  })

  it('shows selected start date', () => {
    const wrapper = mount(DateRangePicker, {
      props: { modelValue: { start: '2024-03-01', end: null } },
    })
    expect(wrapper.text()).toContain('01')
  })

  it('calendar is hidden by default', () => {
    const wrapper = mount(DateRangePicker, { props: { modelValue: emptyRange } })
    expect(wrapper.find('.ds-drp-popup').exists()).toBe(false)
  })

  it('opens calendar on trigger click', async () => {
    const wrapper = mount(DateRangePicker, { props: { modelValue: emptyRange } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('.ds-drp-popup').exists()).toBe(true)
  })

  it('shows label when provided', () => {
    const wrapper = mount(DateRangePicker, { props: { modelValue: emptyRange, label: 'Trip dates' } })
    expect(wrapper.find('label').text()).toContain('Trip dates')
  })

  it('shows error message', () => {
    const wrapper = mount(DateRangePicker, { props: { modelValue: emptyRange, error: 'Select range' } })
    expect(wrapper.text()).toContain('Select range')
  })

  it('disables trigger when disabled=true', () => {
    const wrapper = mount(DateRangePicker, { props: { modelValue: emptyRange, disabled: true } })
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('does not open when disabled', async () => {
    const wrapper = mount(DateRangePicker, { props: { modelValue: emptyRange, disabled: true } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })

  it('renders two calendar panels when open', async () => {
    const wrapper = mount(DateRangePicker, { props: { modelValue: emptyRange } })
    await wrapper.find('button').trigger('click')
    // Should show two month panels side-by-side
    const panels = wrapper.findAll('.ds-drp-panel')
    expect(panels.length).toBe(2)
  })

  it.each(['sm', 'md', 'lg'] as const)('renders size %s', (size) => {
    const wrapper = mount(DateRangePicker, { props: { modelValue: emptyRange, size } })
    expect(wrapper.find('button').exists()).toBe(true)
  })
})
