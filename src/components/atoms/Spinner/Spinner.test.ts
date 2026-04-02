import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Spinner from './Spinner.vue'

describe('Spinner', () => {
  it('renders an SVG element', () => {
    const wrapper = mount(Spinner)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('has role="status"', () => {
    const wrapper = mount(Spinner)
    expect(wrapper.find('svg').attributes('role')).toBe('status')
  })

  it('has a screen-reader label matching default label', () => {
    const wrapper = mount(Spinner)
    expect(wrapper.find('span.sr-only').text()).toBe('Loading')
  })

  it('uses custom label when provided', () => {
    const wrapper = mount(Spinner, { props: { label: 'Saving...' } })
    expect(wrapper.find('span.sr-only').text()).toBe('Saving...')
    expect(wrapper.find('svg').attributes('aria-label')).toBe('Saving...')
  })

  it('applies animate-spin class', () => {
    const wrapper = mount(Spinner)
    expect(wrapper.find('svg').classes()).toContain('animate-spin')
  })
})
