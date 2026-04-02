import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Pagination from './Pagination.vue'

const base = { modelValue: 1, total: 100, perPage: 10 }

describe('Pagination', () => {
  it('renders page buttons', () => {
    const wrapper = mount(Pagination, { props: base })
    expect(wrapper.findAll('button').length).toBeGreaterThan(0)
  })

  it('marks current page button as active (aria-current)', () => {
    const wrapper = mount(Pagination, { props: { ...base, modelValue: 3 } })
    const current = wrapper.find('[aria-current="page"]')
    expect(current.exists()).toBe(true)
    expect(current.text()).toBe('3')
  })

  it('emits update:modelValue when page button is clicked', async () => {
    const wrapper = mount(Pagination, { props: base })
    const pageButtons = wrapper.findAll('[aria-label]').filter(b => /^Page \d+$/.test(b.attributes('aria-label') ?? ''))
    if (pageButtons.length > 1) {
      await pageButtons[1].trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    }
  })

  it('disables previous button on first page', () => {
    const wrapper = mount(Pagination, { props: { ...base, modelValue: 1 } })
    const prevBtn = wrapper.find('[aria-label="Previous page"]')
    expect(prevBtn.exists()).toBe(true)
    expect(prevBtn.attributes('disabled')).toBeDefined()
  })

  it('disables next button on last page', () => {
    const wrapper = mount(Pagination, { props: { ...base, modelValue: 10 } })
    const nextBtn = wrapper.find('[aria-label="Next page"]')
    expect(nextBtn.exists()).toBe(true)
    expect(nextBtn.attributes('disabled')).toBeDefined()
  })

  it('emits next page when next button is clicked', async () => {
    const wrapper = mount(Pagination, { props: { ...base, modelValue: 3 } })
    await wrapper.find('[aria-label="Next page"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([4])
  })

  it('emits previous page when prev button is clicked', async () => {
    const wrapper = mount(Pagination, { props: { ...base, modelValue: 3 } })
    await wrapper.find('[aria-label="Previous page"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([2])
  })

  it('shows first/last buttons by default', () => {
    const wrapper = mount(Pagination, { props: base })
    expect(wrapper.find('[aria-label="First page"]').exists()).toBe(true)
    expect(wrapper.find('[aria-label="Last page"]').exists()).toBe(true)
  })

  it('hides first/last buttons when showFirstLast=false', () => {
    const wrapper = mount(Pagination, { props: { ...base, showFirstLast: false } })
    expect(wrapper.find('[aria-label="First page"]').exists()).toBe(false)
    expect(wrapper.find('[aria-label="Last page"]').exists()).toBe(false)
  })

  it('handles total=0 gracefully (single page)', () => {
    const wrapper = mount(Pagination, { props: { modelValue: 1, total: 0, perPage: 10 } })
    expect(wrapper.exists()).toBe(true)
  })

  it.each(['sm', 'md', 'lg'] as const)('renders size %s', (size) => {
    const wrapper = mount(Pagination, { props: { ...base, size } })
    expect(wrapper.exists()).toBe(true)
  })
})
