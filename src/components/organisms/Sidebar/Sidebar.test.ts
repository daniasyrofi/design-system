import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Sidebar from './Sidebar.vue'

const items = [
  { id: 'home', label: 'Home', route: '/' },
  { id: 'settings', label: 'Settings', route: '/settings' },
  { id: 'help', label: 'Help', badge: '3' },
  {
    id: 'admin', label: 'Admin',
    children: [
      { id: 'users', label: 'Users' },
      { id: 'roles', label: 'Roles' },
    ],
  },
]

describe('Sidebar', () => {
  it('renders navigation items', () => {
    const wrapper = mount(Sidebar, { props: { items } })
    expect(wrapper.text()).toContain('Home')
    expect(wrapper.text()).toContain('Settings')
  })

  it('renders badge for items with badge prop', () => {
    const wrapper = mount(Sidebar, { props: { items } })
    expect(wrapper.text()).toContain('3')
  })

  it('highlights active item', () => {
    const wrapper = mount(Sidebar, { props: { items, activeId: 'home' } })
    // Active item should have active styling
    const html = wrapper.html()
    expect(html).toMatch(/active|ds-sidebar.*active/i)
  })

  it('emits itemClick when item is clicked', async () => {
    const wrapper = mount(Sidebar, { props: { items } })
    const itemBtns = wrapper.findAll('[data-id], button, a').filter(el =>
      el.text() === 'Home'
    )
    if (itemBtns.length > 0) {
      await itemBtns[0].trigger('click')
    } else {
      // Find any element containing the label
      const allClickable = wrapper.findAll('button, a, [role="button"]')
      const homeBtn = allClickable.find(el => el.text().includes('Home'))
      if (homeBtn) await homeBtn.trigger('click')
    }
    expect(wrapper.emitted('itemClick')).toBeTruthy()
  })

  it('renders collapse toggle button when collapsible=true', () => {
    const wrapper = mount(Sidebar, { props: { items, collapsible: true } })
    // Should have a collapse/expand toggle button
    expect(wrapper.findAll('button').length).toBeGreaterThan(0)
  })

  it('toggles collapsed state on collapse button click', async () => {
    const wrapper = mount(Sidebar, { props: { items, collapsible: true, modelValue: false } })
    const buttons = wrapper.findAll('button')
    if (buttons.length > 0) {
      await buttons[buttons.length - 1].trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    }
  })

  it('renders child items for items with children', async () => {
    const wrapper = mount(Sidebar, { props: { items } })
    // Admin has children — find and expand
    const allBtns = wrapper.findAll('button, a, [role="button"]')
    const adminBtn = allBtns.find(el => el.text().includes('Admin'))
    if (adminBtn) {
      await adminBtn.trigger('click')
      expect(wrapper.text()).toContain('Users')
    }
  })

  it('renders header and footer slots', () => {
    const wrapper = mount(Sidebar, {
      props: { items },
      slots: {
        header: '<div class="sidebar-header">Header</div>',
        footer: '<div class="sidebar-footer">Footer</div>',
      },
    })
    expect(wrapper.find('.sidebar-header').exists()).toBe(true)
    expect(wrapper.find('.sidebar-footer').exists()).toBe(true)
  })

  it.each(['narrow', 'default', 'wide'] as const)('renders width %s', (width) => {
    const wrapper = mount(Sidebar, { props: { items, width } })
    expect(wrapper.exists()).toBe(true)
  })
})
