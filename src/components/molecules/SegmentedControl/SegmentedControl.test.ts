import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SegmentedControl from './SegmentedControl.vue'

const options = [
  { label: 'Day',   value: 'day' },
  { label: 'Week',  value: 'week' },
  { label: 'Month', value: 'month' },
]

describe('SegmentedControl', () => {
  it('renders all options', () => {
    const wrapper = mount(SegmentedControl, { props: { modelValue: 'day', options } })
    expect(wrapper.text()).toContain('Day')
    expect(wrapper.text()).toContain('Week')
    expect(wrapper.text()).toContain('Month')
  })

  it('marks selected option as aria-checked=true', () => {
    const wrapper = mount(SegmentedControl, { props: { modelValue: 'week', options } })
    const buttons = wrapper.findAll('button')
    const weekBtn = buttons.find(b => b.text() === 'Week')
    expect(weekBtn?.attributes('aria-checked')).toBe('true')
  })

  it('emits update:modelValue on click', async () => {
    const wrapper = mount(SegmentedControl, { props: { modelValue: 'day', options } })
    const buttons = wrapper.findAll('button')
    await buttons[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['week'])
  })

  it('does not emit when disabled', async () => {
    const wrapper = mount(SegmentedControl, { props: { modelValue: 'day', options, disabled: true } })
    await wrapper.findAll('button')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('does not emit for disabled option', async () => {
    const opts = [{ label: 'A', value: 'a' }, { label: 'B', value: 'b', disabled: true }]
    const wrapper = mount(SegmentedControl, { props: { modelValue: 'a', options: opts } })
    await wrapper.findAll('button')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it.each(['sm', 'md', 'lg'] as const)('renders size %s', (size) => {
    const wrapper = mount(SegmentedControl, { props: { modelValue: 'day', options, size } })
    expect(wrapper.exists()).toBe(true)
  })

  it('applies fullWidth class', () => {
    const wrapper = mount(SegmentedControl, { props: { modelValue: 'day', options, fullWidth: true } })
    expect(wrapper.classes()).toContain('flex')
    expect(wrapper.classes()).toContain('w-full')
  })
})
