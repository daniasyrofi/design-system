import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EmptyState from './EmptyState.vue'

describe('EmptyState', () => {
  it('renders title prop', () => {
    const wrapper = mount(EmptyState, { props: { title: 'No results' } })
    expect(wrapper.text()).toContain('No results')
  })

  it('renders description prop', () => {
    const wrapper = mount(EmptyState, { props: { description: 'Try adjusting your search.' } })
    expect(wrapper.text()).toContain('Try adjusting your search.')
  })

  it('renders icon slot', () => {
    const wrapper = mount(EmptyState, {
      slots: { icon: '<svg data-testid="icon" />' },
    })
    expect(wrapper.find('[data-testid="icon"]').exists()).toBe(true)
  })

  it('renders default action slot', () => {
    const wrapper = mount(EmptyState, {
      slots: { default: '<button>Retry</button>' },
    })
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('renders description slot', () => {
    const wrapper = mount(EmptyState, {
      slots: { description: '<span>Custom desc</span>' },
    })
    expect(wrapper.text()).toContain('Custom desc')
  })

  it.each(['sm', 'md', 'lg'] as const)('renders size %s', (size) => {
    const wrapper = mount(EmptyState, { props: { size } })
    expect(wrapper.exists()).toBe(true)
  })
})
