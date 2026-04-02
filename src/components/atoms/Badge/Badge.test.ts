import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Badge from './Badge.vue'

describe('Badge', () => {
  // ── Content ──────────────────────────────────────────────────

  it('renders slot content', () => {
    const wrapper = mount(Badge, { slots: { default: 'New' } })
    expect(wrapper.text()).toContain('New')
  })

  // ── Variants ─────────────────────────────────────────────────

  it.each(['neutral', 'primary', 'danger', 'success', 'warning', 'info', 'secondary'] as const)(
    'renders %s variant without errors',
    (variant) => {
      const wrapper = mount(Badge, { props: { variant }, slots: { default: variant } })
      expect(wrapper.exists()).toBe(true)
    }
  )

  // ── Sizes ────────────────────────────────────────────────────

  it.each(['sm', 'md', 'lg'] as const)('renders size %s', (size) => {
    const wrapper = mount(Badge, { props: { size }, slots: { default: 'Badge' } })
    expect(wrapper.exists()).toBe(true)
  })

  // ── Badge styles ─────────────────────────────────────────────

  it.each(['subtle', 'solid', 'outline'] as const)('renders %s badge style', (badgeStyle) => {
    const wrapper = mount(Badge, { props: { badgeStyle }, slots: { default: 'Badge' } })
    expect(wrapper.exists()).toBe(true)
  })

  // ── Dot ──────────────────────────────────────────────────────

  it('renders dot indicator when dot=true', () => {
    const wrapper = mount(Badge, { props: { dot: true }, slots: { default: 'Dot' } })
    const dot = wrapper.find('[aria-hidden="true"]')
    expect(dot.exists()).toBe(true)
  })

  // ── Removable ────────────────────────────────────────────────

  it('renders remove button when removable=true', () => {
    const wrapper = mount(Badge, { props: { removable: true }, slots: { default: 'Tag' } })
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('emits remove event when remove button is clicked', async () => {
    const wrapper = mount(Badge, { props: { removable: true }, slots: { default: 'Tag' } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('remove')).toBeTruthy()
  })

  it('does not render remove button when removable=false', () => {
    const wrapper = mount(Badge, { props: { removable: false }, slots: { default: 'Tag' } })
    expect(wrapper.find('button').exists()).toBe(false)
  })
})
