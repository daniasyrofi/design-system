import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AspectRatio from './AspectRatio.vue'

describe('AspectRatio', () => {
  it('renders slot content', () => {
    const wrapper = mount(AspectRatio, { slots: { default: '<img alt="test">' } })
    expect(wrapper.exists()).toBe(true)
  })

  it('applies paddingTop for 16/9 ratio', () => {
    const wrapper = mount(AspectRatio, { props: { ratio: 16 / 9 } })
    const pt = (wrapper.element as HTMLElement).style.paddingTop
    expect(parseFloat(pt)).toBeCloseTo(56.25, 1)
  })

  it('applies paddingTop for 1:1 ratio', () => {
    const wrapper = mount(AspectRatio, { props: { ratio: 1 } })
    const pt = (wrapper.element as HTMLElement).style.paddingTop
    expect(parseFloat(pt)).toBeCloseTo(100, 1)
  })

  it('renders as div by default', () => {
    const wrapper = mount(AspectRatio)
    expect(wrapper.element.tagName.toLowerCase()).toBe('div')
  })

  it('renders as custom element', () => {
    const wrapper = mount(AspectRatio, { props: { as: 'figure' } })
    expect(wrapper.element.tagName.toLowerCase()).toBe('figure')
  })
})
