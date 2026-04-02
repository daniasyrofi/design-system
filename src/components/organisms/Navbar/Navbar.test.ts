import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Navbar from './Navbar.vue'

describe('Navbar', () => {
  it('renders a header element', () => {
    const wrapper = mount(Navbar)
    expect(wrapper.find('header').exists()).toBe(true)
  })

  it('renders title text', () => {
    const wrapper = mount(Navbar, { props: { title: 'My App' } })
    expect(wrapper.text()).toContain('My App')
  })

  it('renders start slot', () => {
    const wrapper = mount(Navbar, { slots: { start: '<span class="logo">Logo</span>' } })
    expect(wrapper.find('.logo').exists()).toBe(true)
  })

  it('renders center slot', () => {
    const wrapper = mount(Navbar, { slots: { center: '<nav>Nav links</nav>' } })
    expect(wrapper.text()).toContain('Nav links')
  })

  it('renders end slot', () => {
    const wrapper = mount(Navbar, { slots: { end: '<button>Login</button>' } })
    expect(wrapper.find('button').text()).toBe('Login')
  })

  it.each(['default', 'transparent', 'colored'] as const)('renders variant %s', (variant) => {
    const wrapper = mount(Navbar, { props: { variant } })
    expect(wrapper.find('header').exists()).toBe(true)
  })

  it('applies sticky class when sticky=true', () => {
    const wrapper = mount(Navbar, { props: { sticky: true } })
    expect(wrapper.html()).toMatch(/sticky|position.*sticky/i)
  })

  it('shows border by default', () => {
    const wrapper = mount(Navbar, { props: { variant: 'default' } })
    expect(wrapper.html()).toMatch(/border/i)
  })

  it('hides border when border=false', () => {
    // When border=false the border class should not be present in the inner container
    const withBorder = mount(Navbar, { props: { variant: 'default', border: true } })
    const withoutBorder = mount(Navbar, { props: { variant: 'default', border: false } })
    expect(withBorder.html()).not.toBe(withoutBorder.html())
  })
})
