import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Modal from './Modal.vue'

// Teleport renders to body in tests — disable it for simplicity
const mountModal = (props = {}, slots = {}) =>
  mount(Modal, {
    props: { modelValue: false, ...props },
    slots,
    global: { stubs: { Teleport: true } },
  })

describe('Modal', () => {
  // ── Visibility ────────────────────────────────────────────────

  it('does not render content when modelValue=false', () => {
    const wrapper = mountModal({ modelValue: false })
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })

  it('renders dialog when modelValue=true', () => {
    const wrapper = mountModal({ modelValue: true })
    expect(wrapper.find('[role="dialog"]').exists()).toBe(true)
  })

  it('has aria-modal="true" on dialog', () => {
    const wrapper = mountModal({ modelValue: true })
    expect(wrapper.find('[role="dialog"]').attributes('aria-modal')).toBe('true')
  })

  // ── Slots ────────────────────────────────────────────────────

  it('renders title slot', () => {
    const wrapper = mountModal({ modelValue: true }, { title: 'My Dialog' })
    expect(wrapper.text()).toContain('My Dialog')
  })

  it('renders description slot', () => {
    const wrapper = mountModal({ modelValue: true }, { description: 'Some details' })
    expect(wrapper.text()).toContain('Some details')
  })

  it('renders default slot content', () => {
    const wrapper = mountModal({ modelValue: true }, { default: 'Body content' })
    expect(wrapper.text()).toContain('Body content')
  })

  it('renders footer slot', () => {
    const wrapper = mountModal({ modelValue: true }, { footer: 'Footer actions' })
    expect(wrapper.text()).toContain('Footer actions')
  })

  // ── Close button ──────────────────────────────────────────────

  it('renders close button when closable=true (default)', () => {
    const wrapper = mountModal({ modelValue: true, closable: true })
    expect(wrapper.find('button[aria-label="Close dialog"]').exists()).toBe(true)
  })

  it('hides close button when closable=false', () => {
    const wrapper = mountModal({ modelValue: true, closable: false })
    expect(wrapper.find('button[aria-label="Close dialog"]').exists()).toBe(false)
  })

  it('emits update:modelValue with false when close button clicked', async () => {
    const wrapper = mountModal({ modelValue: true })
    await wrapper.find('button[aria-label="Close dialog"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })

  // ── preventClose ─────────────────────────────────────────────

  it('hides close button when preventClose=true', () => {
    const wrapper = mountModal({ modelValue: true, preventClose: true })
    expect(wrapper.find('button[aria-label="Close dialog"]').exists()).toBe(false)
  })

  // ── Sizes ────────────────────────────────────────────────────

  it.each(['sm', 'md', 'lg', 'xl', 'full'] as const)('renders size %s without errors', (size) => {
    const wrapper = mountModal({ modelValue: true, size })
    expect(wrapper.find('[role="dialog"]').exists()).toBe(true)
  })
})
