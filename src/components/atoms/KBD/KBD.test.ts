import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import KBD from './KBD.vue'

describe('KBD', () => {
  it('renders slot content', () => {
    const wrapper = mount(KBD, { slots: { default: '⌘K' } })
    expect(wrapper.text()).toContain('⌘K')
  })

  it('renders a kbd element', () => {
    const wrapper = mount(KBD, { slots: { default: 'Enter' } })
    expect(wrapper.element.tagName.toLowerCase()).toBe('kbd')
  })

  it.each(['sm', 'md', 'lg'] as const)('renders size %s', (size) => {
    const wrapper = mount(KBD, { props: { size }, slots: { default: 'K' } })
    expect(wrapper.exists()).toBe(true)
  })
})
