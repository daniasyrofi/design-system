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
    const withBorder = mount(Navbar, { props: { variant: 'default', border: true } })
    const withoutBorder = mount(Navbar, { props: { variant: 'default', border: false } })
    expect(withBorder.html()).not.toBe(withoutBorder.html())
  })

  it('renders sentinel element when floatingOnScroll + sticky', () => {
    const wrapper = mount(Navbar, { props: { sticky: true, floatingOnScroll: true } })
    // sentinel div is rendered for the IntersectionObserver
    expect(wrapper.find('div.opacity-0').exists()).toBe(true)
  })

  it('does not render sentinel when floatingOnScroll=false', () => {
    const wrapper = mount(Navbar, { props: { sticky: true, floatingOnScroll: false } })
    expect(wrapper.find('div.opacity-0').exists()).toBe(false)
  })

  it('applies sticky class when sticky=true', () => {
    const wrapper = mount(Navbar, { props: { sticky: true } })
    expect(wrapper.find('header').classes().join(' ')).toMatch(/sticky/)
  })

  it('renders scoped isFloating slot prop', () => {
    const wrapper = mount(Navbar, {
      props: { sticky: true },
      slots: {
        start: `<template #start="{ isFloating }"><span class="float-state">{{ isFloating }}</span></template>`,
      },
    })
    expect(wrapper.find('.float-state').exists()).toBe(true)
  })

  it('uses token-based bottom radius class', () => {
    const wrapper = mount(Navbar)
    expect(wrapper.find('header').classes()).toContain('rounded-b-[var(--radius-xl)]')
  })

  it('unmounts cleanly when floatingOnScroll=true', () => {
    const wrapper = mount(Navbar, { props: { sticky: true, floatingOnScroll: true } })
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
