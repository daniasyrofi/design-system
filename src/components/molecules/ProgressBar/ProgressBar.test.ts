import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProgressBar from './ProgressBar.vue'

describe('ProgressBar', () => {
  it('renders progressbar role', () => {
    const wrapper = mount(ProgressBar, { props: { value: 50 } })
    expect(wrapper.find('[role="progressbar"]').exists()).toBe(true)
  })

  it('sets aria-valuenow to clamped value', () => {
    const wrapper = mount(ProgressBar, { props: { value: 60 } })
    expect(wrapper.find('[role="progressbar"]').attributes('aria-valuenow')).toBe('60')
  })

  it('clamps value above 100 to 100', () => {
    const wrapper = mount(ProgressBar, { props: { value: 150 } })
    expect(wrapper.find('[role="progressbar"]').attributes('aria-valuenow')).toBe('100')
  })

  it('clamps value below 0 to 0', () => {
    const wrapper = mount(ProgressBar, { props: { value: -10 } })
    expect(wrapper.find('[role="progressbar"]').attributes('aria-valuenow')).toBe('0')
  })

  it('sets aria-valuemin and aria-valuemax', () => {
    const wrapper = mount(ProgressBar, { props: { value: 50 } })
    const bar = wrapper.find('[role="progressbar"]')
    expect(bar.attributes('aria-valuemin')).toBe('0')
    expect(bar.attributes('aria-valuemax')).toBe('100')
  })

  it('renders label text', () => {
    const wrapper = mount(ProgressBar, { props: { value: 50, label: 'Upload' } })
    expect(wrapper.text()).toContain('Upload')
  })

  it('shows percentage when showValue is true', () => {
    const wrapper = mount(ProgressBar, { props: { value: 75, showValue: true } })
    expect(wrapper.text()).toContain('75%')
  })

  it('hides percentage when indeterminate', () => {
    const wrapper = mount(ProgressBar, { props: { value: 75, showValue: true, indeterminate: true } })
    expect(wrapper.text()).not.toContain('75%')
  })

  it('aria-valuenow is undefined when indeterminate', () => {
    const wrapper = mount(ProgressBar, { props: { value: 50, indeterminate: true } })
    expect(wrapper.find('[role="progressbar"]').attributes('aria-valuenow')).toBeUndefined()
  })

  it('aria-label uses label prop', () => {
    const wrapper = mount(ProgressBar, { props: { value: 50, label: 'Loading' } })
    expect(wrapper.find('[role="progressbar"]').attributes('aria-label')).toBe('Loading')
  })

  it('defaults aria-label to Progress', () => {
    const wrapper = mount(ProgressBar, { props: { value: 50 } })
    expect(wrapper.find('[role="progressbar"]').attributes('aria-label')).toBe('Progress')
  })
})
