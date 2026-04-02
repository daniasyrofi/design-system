import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import VisuallyHidden from './VisuallyHidden.vue'

describe('VisuallyHidden', () => {
  it('renders slot content', () => {
    const wrapper = mount(VisuallyHidden, { slots: { default: 'Hidden label' } })
    expect(wrapper.text()).toContain('Hidden label')
  })

  it('renders a span element', () => {
    const wrapper = mount(VisuallyHidden, { slots: { default: 'label' } })
    expect(wrapper.element.tagName.toLowerCase()).toBe('span')
  })

  it('has sr-only class by default', () => {
    const wrapper = mount(VisuallyHidden, { slots: { default: 'label' } })
    expect(wrapper.classes()).toContain('sr-only')
  })
})
