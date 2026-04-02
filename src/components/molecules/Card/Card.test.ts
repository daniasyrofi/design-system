import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Card from './Card.vue'

describe('Card', () => {
  it('renders default slot content', () => {
    const wrapper = mount(Card, { slots: { default: '<p>Hello</p>' } })
    expect(wrapper.text()).toContain('Hello')
  })

  it('renders as div by default', () => {
    const wrapper = mount(Card)
    expect(wrapper.element.tagName).toBe('DIV')
  })

  it('renders as custom element via `as` prop', () => {
    const wrapper = mount(Card, { props: { as: 'section' } })
    expect(wrapper.element.tagName).toBe('SECTION')
  })

  it.each(['default', 'outlined', 'elevated', 'flat', 'glass'] as const)(
    'renders variant %s without errors', (variant) => {
      const wrapper = mount(Card, { props: { variant }, slots: { default: 'content' } })
      expect(wrapper.text()).toContain('content')
    }
  )

  it.each(['none', 'sm', 'md', 'lg'] as const)('renders padding %s', (padding) => {
    const wrapper = mount(Card, { props: { padding } })
    expect(wrapper.exists()).toBe(true)
  })

  it.each(['sm', 'md', 'lg', 'xl'] as const)('renders radius %s', (radius) => {
    const wrapper = mount(Card, { props: { radius } })
    expect(wrapper.exists()).toBe(true)
  })

  it('applies clickable semantics when clickable=true', () => {
    const wrapper = mount(Card, { props: { clickable: true } })
    expect(wrapper.attributes('role')).toBe('button')
    expect(wrapper.attributes('tabindex')).toBe('0')
  })

  it('does not have button role when not clickable', () => {
    const wrapper = mount(Card, { props: { clickable: false } })
    expect(wrapper.attributes('role')).not.toBe('button')
  })

  it('emits click event when clickable and clicked', async () => {
    const wrapper = mount(Card, { props: { clickable: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('does not emit click when not clickable', async () => {
    const wrapper = mount(Card, { props: { clickable: false } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('applies hoverable class when hoverable=true', () => {
    const wrapper = mount(Card, { props: { hoverable: true } })
    expect(wrapper.classes().join(' ')).toMatch(/hover/)
  })
})
