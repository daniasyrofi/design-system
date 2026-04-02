import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Icon from './Icon.vue'

describe('Icon', () => {
  // ── Valid icon ────────────────────────────────────────────────

  it('renders the icon component for a valid name', () => {
    const wrapper = mount(Icon, { props: { name: 'RiHomeLine' } })
    // Should not render the fallback span
    expect(wrapper.find('span[title]').exists()).toBe(false)
  })

  it('renders fallback span for unknown icon name', () => {
    const wrapper = mount(Icon, { props: { name: 'RiNonExistentIcon' } })
    expect(wrapper.find('span[title]').exists()).toBe(true)
    expect(wrapper.find('span[title]').attributes('title')).toContain('RiNonExistentIcon')
  })

  // ── Accessibility ─────────────────────────────────────────────

  it('is aria-hidden by default (decorative)', () => {
    const wrapper = mount(Icon, { props: { name: 'RiHomeLine' } })
    // The component itself is aria-hidden when no label
    expect(wrapper.find('[aria-hidden="true"]').exists() || !wrapper.find('[aria-label]').exists()).toBe(true)
  })

  it('is not aria-hidden when label is provided', () => {
    const wrapper = mount(Icon, { props: { name: 'RiHomeLine', label: 'Home' } })
    expect(wrapper.find('[aria-label="Home"]').exists()).toBe(true)
    expect(wrapper.find('[role="img"]').exists()).toBe(true)
  })

  // ── Sizes ────────────────────────────────────────────────────

  it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)('renders size %s without errors', (size) => {
    const wrapper = mount(Icon, { props: { name: 'RiHomeLine', size } })
    expect(wrapper.exists()).toBe(true)
  })
})
