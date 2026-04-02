import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Slider from './Slider.vue'

describe('Slider', () => {
  it('renders a slider with role=slider', () => {
    const wrapper = mount(Slider, { props: { modelValue: 50 } })
    expect(wrapper.find('[role="slider"]').exists()).toBe(true)
  })

  it('sets aria-valuenow to modelValue', () => {
    const wrapper = mount(Slider, { props: { modelValue: 40, min: 0, max: 100 } })
    expect(wrapper.find('[role="slider"]').attributes('aria-valuenow')).toBe('40')
  })

  it('sets aria-valuemin and aria-valuemax', () => {
    const wrapper = mount(Slider, { props: { modelValue: 5, min: 0, max: 10 } })
    const slider = wrapper.find('[role="slider"]')
    expect(slider.attributes('aria-valuemin')).toBe('0')
    expect(slider.attributes('aria-valuemax')).toBe('10')
  })

  it('is keyboard focusable (tabindex=0)', () => {
    const wrapper = mount(Slider, { props: { modelValue: 50 } })
    expect(wrapper.find('[role="slider"]').attributes('tabindex')).toBe('0')
  })

  it('emits update:modelValue on ArrowRight key', async () => {
    const wrapper = mount(Slider, { props: { modelValue: 50, step: 1 } })
    await wrapper.find('[role="slider"]').trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:modelValue')?.[0][0]).toBe(51)
  })

  it('emits update:modelValue on ArrowLeft key', async () => {
    const wrapper = mount(Slider, { props: { modelValue: 50, step: 1 } })
    await wrapper.find('[role="slider"]').trigger('keydown', { key: 'ArrowLeft' })
    expect(wrapper.emitted('update:modelValue')?.[0][0]).toBe(49)
  })

  it('does not emit when ArrowRight is pressed at max', async () => {
    const wrapper = mount(Slider, { props: { modelValue: 100, min: 0, max: 100 } })
    await wrapper.find('[role="slider"]').trigger('keydown', { key: 'ArrowRight' })
    // Clamped to max: value unchanged → no emission
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('does not emit when ArrowLeft is pressed at min', async () => {
    const wrapper = mount(Slider, { props: { modelValue: 0, min: 0, max: 100 } })
    await wrapper.find('[role="slider"]').trigger('keydown', { key: 'ArrowLeft' })
    // Clamped to min: value unchanged → no emission
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('sets aria-disabled when disabled', () => {
    const wrapper = mount(Slider, { props: { modelValue: 50, disabled: true } })
    expect(wrapper.find('[role="slider"]').attributes('aria-disabled')).toBe('true')
  })

  it('renders label text', () => {
    const wrapper = mount(Slider, { props: { modelValue: 50, label: 'Volume' } })
    expect(wrapper.text()).toContain('Volume')
  })

  it('shows current value when showValue=true', () => {
    const wrapper = mount(Slider, { props: { modelValue: 42, showValue: true } })
    expect(wrapper.text()).toContain('42')
  })

  it.each(['sm', 'md', 'lg'] as const)('renders size %s', (size) => {
    const wrapper = mount(Slider, { props: { modelValue: 50, size } })
    expect(wrapper.find('[role="slider"]').exists()).toBe(true)
  })

  it('emits update:modelValue on ArrowUp key', async () => {
    const wrapper = mount(Slider, { props: { modelValue: 50, step: 5 } })
    await wrapper.find('[role="slider"]').trigger('keydown', { key: 'ArrowUp' })
    expect(wrapper.emitted('update:modelValue')?.[0][0]).toBe(55)
  })

  it('emits update:modelValue on ArrowDown key', async () => {
    const wrapper = mount(Slider, { props: { modelValue: 50, step: 5 } })
    await wrapper.find('[role="slider"]').trigger('keydown', { key: 'ArrowDown' })
    expect(wrapper.emitted('update:modelValue')?.[0][0]).toBe(45)
  })

  it('jumps to min on Home key', async () => {
    const wrapper = mount(Slider, { props: { modelValue: 50, min: 10, max: 100 } })
    await wrapper.find('[role="slider"]').trigger('keydown', { key: 'Home' })
    expect(wrapper.emitted('update:modelValue')?.[0][0]).toBe(10)
  })

  it('jumps to max on End key', async () => {
    const wrapper = mount(Slider, { props: { modelValue: 50, min: 0, max: 100 } })
    await wrapper.find('[role="slider"]').trigger('keydown', { key: 'End' })
    expect(wrapper.emitted('update:modelValue')?.[0][0]).toBe(100)
  })

  it('does not emit when disabled and key pressed', async () => {
    const wrapper = mount(Slider, { props: { modelValue: 50, disabled: true } })
    await wrapper.find('[role="slider"]').trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('emits on pointerdown', async () => {
    const wrapper = mount(Slider, { props: { modelValue: 50 } })
    await wrapper.find('[role="slider"]').trigger('pointerdown', { clientX: 0, pointerId: 1 })
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('does not emit on pointerdown when disabled', async () => {
    const wrapper = mount(Slider, { props: { modelValue: 50, disabled: true } })
    await wrapper.find('[role="slider"]').trigger('pointerdown', { clientX: 50 })
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('handles pointermove while dragging', async () => {
    const wrapper = mount(Slider, { props: { modelValue: 50 } })
    const slider = wrapper.find('[role="slider"]')
    await slider.trigger('pointerdown', { clientX: 0, pointerId: 1 })
    await slider.trigger('pointermove', { clientX: 50 })
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('ends drag on pointerup', async () => {
    const wrapper = mount(Slider, { props: { modelValue: 50 } })
    const slider = wrapper.find('[role="slider"]')
    await slider.trigger('pointerdown', { clientX: 0, pointerId: 1 })
    await slider.trigger('pointerup')
    // After pointerup, pointermove should not emit
    const countBefore = wrapper.emitted('update:modelValue')?.length ?? 0
    await slider.trigger('pointermove', { clientX: 80 })
    const countAfter = wrapper.emitted('update:modelValue')?.length ?? 0
    expect(countAfter).toBe(countBefore)
  })

  it('clamps pct correctly when min === max', () => {
    const wrapper = mount(Slider, { props: { modelValue: 5, min: 5, max: 5 } })
    expect(wrapper.find('[role="slider"]').exists()).toBe(true)
  })
})
