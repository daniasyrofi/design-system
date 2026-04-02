import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ScrollArea from './ScrollArea.vue'

describe('ScrollArea', () => {
  it('renders slot content', () => {
    const wrapper = mount(ScrollArea, { slots: { default: '<p>Content</p>' } })
    expect(wrapper.text()).toContain('Content')
  })

  it('applies maxHeight style', () => {
    const wrapper = mount(ScrollArea, { props: { maxHeight: '300px' } })
    expect((wrapper.element as HTMLElement).style.maxHeight).toBe('300px')
  })

  it('applies maxWidth style', () => {
    const wrapper = mount(ScrollArea, { props: { maxWidth: '500px' } })
    expect((wrapper.element as HTMLElement).style.maxWidth).toBe('500px')
  })

  it('has ds-scroll-area class', () => {
    const wrapper = mount(ScrollArea)
    expect(wrapper.classes()).toContain('ds-scroll-area')
  })
})
