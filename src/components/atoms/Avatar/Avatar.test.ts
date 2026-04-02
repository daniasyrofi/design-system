import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Avatar from './Avatar.vue'

describe('Avatar', () => {
  // ── Initials ─────────────────────────────────────────────────

  it('renders initials from a single name', () => {
    const wrapper = mount(Avatar, { props: { name: 'Alice' } })
    expect(wrapper.text()).toContain('A')
  })

  it('renders two initials from full name', () => {
    const wrapper = mount(Avatar, { props: { name: 'Alice Johnson' } })
    expect(wrapper.text()).toContain('AJ')
  })

  it('renders image when src is provided', () => {
    const wrapper = mount(Avatar, { props: { src: '/avatar.jpg', alt: 'User' } })
    expect(wrapper.find('img').exists()).toBe(true)
    expect(wrapper.find('img').attributes('src')).toBe('/avatar.jpg')
    expect(wrapper.find('img').attributes('alt')).toBe('User')
  })

  // ── Sizes ────────────────────────────────────────────────────

  it.each(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const)(
    'applies size class for %s',
    (size) => {
      const wrapper = mount(Avatar, { props: { name: 'AB', size } })
      const sizeMap = { xs: 'size-6', sm: 'size-8', md: 'size-10', lg: 'size-12', xl: 'size-14', '2xl': 'size-16' }
      expect(wrapper.classes()).toContain(sizeMap[size])
    }
  )

  // ── Shapes ───────────────────────────────────────────────────

  it('applies circle shape by default', () => {
    const wrapper = mount(Avatar, { props: { name: 'AB' } })
    expect(wrapper.classes()).toContain('rounded-full')
  })

  it('applies rounded shape', () => {
    const wrapper = mount(Avatar, { props: { name: 'AB', shape: 'rounded' } })
    expect(wrapper.classes()).toContain('rounded-xl')
  })

  it('applies square shape', () => {
    const wrapper = mount(Avatar, { props: { name: 'AB', shape: 'square' } })
    expect(wrapper.classes()).toContain('rounded-md')
  })

  // ── Status dot ───────────────────────────────────────────────

  it('renders status dot when status is provided', () => {
    const wrapper = mount(Avatar, { props: { name: 'AB', status: 'online' } })
    const dot = wrapper.find('[role="img"]')
    expect(dot.exists()).toBe(true)
    expect(dot.attributes('aria-label')).toBe('online')
  })

  it('does not render status dot when status is null', () => {
    const wrapper = mount(Avatar, { props: { name: 'AB' } })
    expect(wrapper.find('[aria-label="online"]').exists()).toBe(false)
  })

  // ── Accessibility ─────────────────────────────────────────────

  it('renders initials as visible text content', () => {
    const wrapper = mount(Avatar, { props: { name: 'Alice Johnson' } })
    expect(wrapper.text()).toBeTruthy()
  })
})
