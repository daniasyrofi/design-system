import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Drawer from './Drawer.vue'

const global = { stubs: { Teleport: true } }

describe('Drawer', () => {
  it('is hidden when modelValue is false', () => {
    const wrapper = mount(Drawer, { props: { modelValue: false }, global })
    // Overlay not present when closed
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })

  it('is visible when modelValue is true', () => {
    const wrapper = mount(Drawer, { props: { modelValue: true }, global })
    expect(wrapper.find('[role="dialog"]').exists()).toBe(true)
  })

  it('has aria-modal on dialog', () => {
    const wrapper = mount(Drawer, { props: { modelValue: true }, global })
    expect(wrapper.find('[role="dialog"]').attributes('aria-modal')).toBe('true')
  })

  it('renders title slot', () => {
    const wrapper = mount(Drawer, {
      props: { modelValue: true },
      slots: { title: '<span>My Drawer</span>' },
      global,
    })
    expect(wrapper.text()).toContain('My Drawer')
  })

  it('renders default slot content', () => {
    const wrapper = mount(Drawer, {
      props: { modelValue: true },
      slots: { default: '<p>Drawer body</p>' },
      global,
    })
    expect(wrapper.text()).toContain('Drawer body')
  })

  it('renders footer slot', () => {
    const wrapper = mount(Drawer, {
      props: { modelValue: true },
      slots: { footer: '<button>Save</button>' },
      global,
    })
    expect(wrapper.text()).toContain('Save')
  })

  it('shows close button when closable', () => {
    const wrapper = mount(Drawer, { props: { modelValue: true, closable: true }, global })
    expect(wrapper.find('button[aria-label="Close drawer"]').exists()).toBe(true)
  })

  it('hides close button when closable=false', () => {
    const wrapper = mount(Drawer, { props: { modelValue: true, closable: false }, global })
    expect(wrapper.find('button[aria-label="Close drawer"]').exists()).toBe(false)
  })

  it('emits update:modelValue=false when close button clicked', async () => {
    const wrapper = mount(Drawer, { props: { modelValue: true, closable: true }, global })
    await wrapper.find('button[aria-label="Close drawer"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  it('does not emit close when preventClose is true', async () => {
    // When preventClose=true, the close button is not rendered
    const wrapper = mount(Drawer, {
      props: { modelValue: true, closable: true, preventClose: true },
      global,
    })
    expect(wrapper.find('button[aria-label="Close drawer"]').exists()).toBe(false)
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })
})
