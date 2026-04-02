import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Toggle from './Toggle.vue'

describe('Toggle', () => {
  // ── Rendering ────────────────────────────────────────────────

  it('renders a hidden native checkbox input', () => {
    const wrapper = mount(Toggle, { props: { modelValue: false } })
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
  })

  it('renders label when provided', () => {
    const wrapper = mount(Toggle, { props: { modelValue: false, label: 'Enable notifications' } })
    expect(wrapper.text()).toContain('Enable notifications')
  })

  // ── ARIA ─────────────────────────────────────────────────────

  it('has role="switch" on the visual button', () => {
    const wrapper = mount(Toggle, { props: { modelValue: false } })
    expect(wrapper.find('button[role="switch"]').exists()).toBe(true)
  })

  it('has aria-checked=false when modelValue=false', () => {
    const wrapper = mount(Toggle, { props: { modelValue: false } })
    expect(wrapper.find('button[role="switch"]').attributes('aria-checked')).toBe('false')
  })

  it('has aria-checked=true when modelValue=true', () => {
    const wrapper = mount(Toggle, { props: { modelValue: true } })
    expect(wrapper.find('button[role="switch"]').attributes('aria-checked')).toBe('true')
  })

  // ── States ───────────────────────────────────────────────────

  it('is disabled when disabled=true', () => {
    const wrapper = mount(Toggle, { props: { modelValue: false, disabled: true } })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  // ── Emits ────────────────────────────────────────────────────

  it('emits update:modelValue with true when off toggle is clicked', async () => {
    const wrapper = mount(Toggle, { props: { modelValue: false } })
    await wrapper.find('button[role="switch"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
  })

  it('emits update:modelValue with false when on toggle is clicked', async () => {
    const wrapper = mount(Toggle, { props: { modelValue: true } })
    await wrapper.find('button[role="switch"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([false])
  })

  it('does not emit when disabled', async () => {
    const wrapper = mount(Toggle, { props: { modelValue: false, disabled: true } })
    await wrapper.find('button[role="switch"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('emits on Space keydown', async () => {
    const wrapper = mount(Toggle, { props: { modelValue: false } })
    await wrapper.find('button[role="switch"]').trigger('keydown.space')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
  })

  it('emits on Enter keydown', async () => {
    const wrapper = mount(Toggle, { props: { modelValue: false } })
    await wrapper.find('button[role="switch"]').trigger('keydown.enter')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
  })
})
