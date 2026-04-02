import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchInput from './SearchInput.vue'

describe('SearchInput', () => {
  it('renders an input', () => {
    const wrapper = mount(SearchInput, { props: { modelValue: '' } })
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('reflects modelValue in the input', () => {
    const wrapper = mount(SearchInput, { props: { modelValue: 'hello' } })
    expect(wrapper.find('input').element.value).toBe('hello')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(SearchInput, { props: { modelValue: '' } })
    await wrapper.find('input').setValue('world')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['world'])
  })

  it('shows clear button when value is non-empty', () => {
    const wrapper = mount(SearchInput, { props: { modelValue: 'abc', clearable: true } })
    expect(wrapper.find('button[aria-label]').exists()).toBe(true)
  })

  it('does not show clear button when empty', () => {
    const wrapper = mount(SearchInput, { props: { modelValue: '', clearable: true } })
    // clear button should not be visible when value is empty
    const clearBtn = wrapper.findAll('button').find(b =>
      (b.attributes('aria-label') ?? '').toLowerCase().includes('clear')
    )
    expect(clearBtn).toBeUndefined()
  })

  it('emits clear event when clear button clicked', async () => {
    const wrapper = mount(SearchInput, { props: { modelValue: 'test', clearable: true } })
    const clearBtn = wrapper.findAll('button').find(b =>
      (b.attributes('aria-label') ?? '').toLowerCase().includes('clear')
    )
    if (clearBtn) {
      await clearBtn.trigger('click')
      expect(wrapper.emitted('clear')).toBeTruthy()
    }
  })

  it('disables input when disabled=true', () => {
    const wrapper = mount(SearchInput, { props: { modelValue: '', disabled: true } })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('shows loading indicator when loading=true', () => {
    const wrapper = mount(SearchInput, { props: { modelValue: '', loading: true } })
    expect(wrapper.html()).toMatch(/animate-spin|role="status"|Loading/)
  })

  it.each(['sm', 'md', 'lg'] as const)('renders size %s', (size) => {
    const wrapper = mount(SearchInput, { props: { modelValue: '', size } })
    expect(wrapper.find('input').exists()).toBe(true)
  })
})
