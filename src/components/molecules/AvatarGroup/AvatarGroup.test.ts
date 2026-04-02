import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AvatarGroup from './AvatarGroup.vue'

const avatars = [
  { name: 'Alice', src: 'a.png' },
  { name: 'Bob', src: 'b.png' },
  { name: 'Carol', src: 'c.png' },
  { name: 'Dave', src: 'd.png' },
  { name: 'Eve', src: 'e.png' },
  { name: 'Frank', src: 'f.png' },
]

describe('AvatarGroup', () => {
  it('renders visible avatars up to max', () => {
    const wrapper = mount(AvatarGroup, { props: { avatars, max: 3 } })
    // 3 avatars + 1 overflow chip = 4 children
    const imgs = wrapper.findAll('img')
    expect(imgs.length).toBe(3)
  })

  it('shows overflow count when avatars exceed max', () => {
    const wrapper = mount(AvatarGroup, { props: { avatars, max: 3 } })
    expect(wrapper.text()).toContain('+3')
  })

  it('does not show overflow when within limit', () => {
    const wrapper = mount(AvatarGroup, { props: { avatars: avatars.slice(0, 3), max: 5 } })
    expect(wrapper.text()).not.toContain('+')
  })

  it('renders all avatars when max >= length', () => {
    const wrapper = mount(AvatarGroup, { props: { avatars: avatars.slice(0, 4), max: 10 } })
    expect(wrapper.findAll('img').length).toBe(4)
  })

  it('respects default max of 5', () => {
    const wrapper = mount(AvatarGroup, { props: { avatars } })
    expect(wrapper.findAll('img').length).toBe(5)
    expect(wrapper.text()).toContain('+1')
  })

  it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)('renders size %s without errors', (size) => {
    const wrapper = mount(AvatarGroup, { props: { avatars: avatars.slice(0, 3), size } })
    expect(wrapper.findAll('img').length).toBe(3)
  })

  it('renders with empty avatars array', () => {
    const wrapper = mount(AvatarGroup, { props: { avatars: [] } })
    expect(wrapper.findAll('img').length).toBe(0)
    expect(wrapper.text()).not.toContain('+')
  })
})
