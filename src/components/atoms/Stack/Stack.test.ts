import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Stack from './Stack.vue'

describe('Stack', () => {
  it('renders slot content', () => {
    const wrapper = mount(Stack, { slots: { default: '<span>Item</span>' } })
    expect(wrapper.text()).toContain('Item')
  })

  it('renders as div by default', () => {
    const wrapper = mount(Stack, { slots: { default: 'x' } })
    expect(wrapper.element.tagName.toLowerCase()).toBe('div')
  })

  it('renders as custom element via as prop', () => {
    const wrapper = mount(Stack, { props: { as: 'section' }, slots: { default: 'x' } })
    expect(wrapper.element.tagName.toLowerCase()).toBe('section')
  })

  it('applies vertical direction by default (flex-col)', () => {
    const wrapper = mount(Stack, { slots: { default: 'x' } })
    expect(wrapper.classes()).toContain('flex-col')
  })

  it('applies horizontal direction (flex-row)', () => {
    const wrapper = mount(Stack, { props: { direction: 'horizontal' }, slots: { default: 'x' } })
    expect(wrapper.classes()).toContain('flex-row')
  })

  it('applies inline-flex when inline=true', () => {
    const wrapper = mount(Stack, { props: { inline: true }, slots: { default: 'x' } })
    expect(wrapper.classes()).toContain('inline-flex')
  })

  it('applies flex-wrap when wrap=true', () => {
    const wrapper = mount(Stack, { props: { wrap: true }, slots: { default: 'x' } })
    expect(wrapper.classes()).toContain('flex-wrap')
  })

  it('applies numeric gap as px style', () => {
    const wrapper = mount(Stack, { props: { gap: 4 }, slots: { default: 'x' } })
    expect((wrapper.element as HTMLElement).style.gap).toBe('16px')
  })

  it('applies string gap directly', () => {
    const wrapper = mount(Stack, { props: { gap: '1rem' }, slots: { default: 'x' } })
    expect((wrapper.element as HTMLElement).style.gap).toBe('1rem')
  })
})
