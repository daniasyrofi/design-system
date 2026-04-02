import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Center from './Center.vue'

describe('Center', () => {
  it('renders slot content', () => {
    const wrapper = mount(Center, { slots: { default: 'Centered' } })
    expect(wrapper.text()).toContain('Centered')
  })

  it('has items-center and justify-center classes', () => {
    const wrapper = mount(Center, { slots: { default: 'x' } })
    expect(wrapper.classes()).toContain('items-center')
    expect(wrapper.classes()).toContain('justify-center')
  })

  it('uses flex by default', () => {
    const wrapper = mount(Center, { slots: { default: 'x' } })
    expect(wrapper.classes()).toContain('flex')
  })

  it('uses inline-flex when inline=true', () => {
    const wrapper = mount(Center, { props: { inline: true }, slots: { default: 'x' } })
    expect(wrapper.classes()).toContain('inline-flex')
  })

  it('renders as div by default', () => {
    const wrapper = mount(Center, { slots: { default: 'x' } })
    expect(wrapper.element.tagName.toLowerCase()).toBe('div')
  })

  it('renders as custom element', () => {
    const wrapper = mount(Center, { props: { as: 'section' }, slots: { default: 'x' } })
    expect(wrapper.element.tagName.toLowerCase()).toBe('section')
  })
})
