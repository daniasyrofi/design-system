import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Container from './Container.vue'

describe('Container', () => {
  it('renders slot content', () => {
    const wrapper = mount(Container, { slots: { default: '<p>Content</p>' } })
    expect(wrapper.text()).toContain('Content')
  })

  it('renders as div by default', () => {
    const wrapper = mount(Container, { slots: { default: 'x' } })
    expect(wrapper.element.tagName.toLowerCase()).toBe('div')
  })

  it('sets maxWidth based on size', () => {
    const wrapper = mount(Container, { props: { size: 'lg' }, slots: { default: 'x' } })
    expect((wrapper.element as HTMLElement).style.maxWidth).toBe('1024px')
  })

  it('centers by default', () => {
    const wrapper = mount(Container, { slots: { default: 'x' } })
    expect((wrapper.element as HTMLElement).style.marginLeft).toBe('auto')
  })

  it('applies padding when padded=true', () => {
    const wrapper = mount(Container, { props: { padded: true }, slots: { default: 'x' } })
    expect((wrapper.element as HTMLElement).style.paddingLeft).toBeTruthy()
  })

  it('removes padding when padded=false', () => {
    const wrapper = mount(Container, { props: { padded: false }, slots: { default: 'x' } })
    expect((wrapper.element as HTMLElement).style.paddingLeft).toBe('')
  })

  it.each(['sm', 'md', 'lg', 'xl', '2xl', 'full'] as const)('renders size %s', (size) => {
    const wrapper = mount(Container, { props: { size }, slots: { default: 'x' } })
    expect(wrapper.exists()).toBe(true)
  })
})
