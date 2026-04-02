import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Stat from './Stat.vue'

describe('Stat', () => {
  it('renders label and value', () => {
    const wrapper = mount(Stat, { props: { label: 'Revenue', value: '$1,200' } })
    expect(wrapper.text()).toContain('Revenue')
    expect(wrapper.text()).toContain('$1,200')
  })

  it('renders numeric value', () => {
    const wrapper = mount(Stat, { props: { label: 'Users', value: 42 } })
    expect(wrapper.text()).toContain('42')
  })

  it('renders delta when provided', () => {
    const wrapper = mount(Stat, { props: { label: 'Sales', value: 100, delta: '+12%' } })
    expect(wrapper.text()).toContain('+12%')
  })

  it('renders description when provided', () => {
    const wrapper = mount(Stat, { props: { label: 'L', value: 'V', description: 'vs last month' } })
    expect(wrapper.text()).toContain('vs last month')
  })

  it('shows up arrow for up trend', () => {
    const wrapper = mount(Stat, { props: { label: 'L', value: 'V', delta: '5%', trend: 'up' } })
    expect(wrapper.text()).toContain('↑')
  })

  it('shows down arrow for down trend', () => {
    const wrapper = mount(Stat, { props: { label: 'L', value: 'V', delta: '-2%', trend: 'down' } })
    expect(wrapper.text()).toContain('↓')
  })

  it.each(['sm', 'md', 'lg'] as const)('renders size %s', (size) => {
    const wrapper = mount(Stat, { props: { label: 'L', value: 'V', size } })
    expect(wrapper.exists()).toBe(true)
  })
})
