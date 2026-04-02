import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Rating from './Rating.vue'

describe('Rating', () => {
  it('renders correct number of stars (default 5)', () => {
    const wrapper = mount(Rating, { props: { modelValue: 0 } })
    expect(wrapper.findAll('button').length).toBe(5)
  })

  it('renders custom max stars', () => {
    const wrapper = mount(Rating, { props: { modelValue: 0, max: 10 } })
    expect(wrapper.findAll('button').length).toBe(10)
  })

  it('marks stars as aria-checked based on modelValue', () => {
    const wrapper = mount(Rating, { props: { modelValue: 3, max: 5 } })
    const btns = wrapper.findAll('button')
    expect(btns[0].attributes('aria-checked')).toBe('true')
    expect(btns[2].attributes('aria-checked')).toBe('true')
    expect(btns[3].attributes('aria-checked')).toBe('false')
  })

  it('emits update:modelValue on star click', async () => {
    const wrapper = mount(Rating, { props: { modelValue: 0 } })
    await wrapper.findAll('button')[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([3])
  })

  it('emits change on star click', async () => {
    const wrapper = mount(Rating, { props: { modelValue: 0 } })
    await wrapper.findAll('button')[1].trigger('click')
    expect(wrapper.emitted('change')?.[0]).toEqual([2])
  })

  it('does not emit when readonly', async () => {
    const wrapper = mount(Rating, { props: { modelValue: 3, readonly: true } })
    await wrapper.findAll('button')[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('does not emit when disabled', async () => {
    const wrapper = mount(Rating, { props: { modelValue: 3, disabled: true } })
    await wrapper.findAll('button')[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('clears rating when clicking active star and allowClear=true', async () => {
    const wrapper = mount(Rating, { props: { modelValue: 3, allowClear: true } })
    await wrapper.findAll('button')[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([0])
  })

  it.each(['sm', 'md', 'lg'] as const)('renders size %s', (size) => {
    const wrapper = mount(Rating, { props: { modelValue: 0, size } })
    expect(wrapper.exists()).toBe(true)
  })
})
