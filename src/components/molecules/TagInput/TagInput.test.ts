import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TagInput from './TagInput.vue'

describe('TagInput', () => {
  it('renders existing tags from modelValue', () => {
    const wrapper = mount(TagInput, { props: { modelValue: ['foo', 'bar'] } })
    expect(wrapper.text()).toContain('foo')
    expect(wrapper.text()).toContain('bar')
  })

  it('emits update:modelValue with new tag on Enter', async () => {
    const wrapper = mount(TagInput, { props: { modelValue: [] } })
    const input = wrapper.find('input')
    await input.setValue('hello')
    await input.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['hello']])
  })

  it('emits update:modelValue with new tag on comma', async () => {
    const wrapper = mount(TagInput, { props: { modelValue: [] } })
    const input = wrapper.find('input')
    await input.setValue('world')
    await input.trigger('keydown', { key: ',' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['world']])
  })

  it('removes last tag on Backspace when input is empty', async () => {
    const wrapper = mount(TagInput, { props: { modelValue: ['a', 'b'] } })
    await wrapper.find('input').trigger('keydown', { key: 'Backspace' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['a']])
  })

  it('removes a tag by clicking its remove button', async () => {
    const wrapper = mount(TagInput, { props: { modelValue: ['x', 'y'] } })
    await wrapper.findAll('button')[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['y']])
  })

  it('does not add duplicate tags by default', async () => {
    const wrapper = mount(TagInput, { props: { modelValue: ['dup'] } })
    const input = wrapper.find('input')
    await input.setValue('dup')
    await input.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('allows duplicates when allowDuplicates=true', async () => {
    const wrapper = mount(TagInput, { props: { modelValue: ['dup'], allowDuplicates: true } })
    const input = wrapper.find('input')
    await input.setValue('dup')
    await input.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['dup', 'dup']])
  })

  it('respects maxTags limit', async () => {
    const wrapper = mount(TagInput, { props: { modelValue: ['a', 'b'], maxTags: 2 } })
    const input = wrapper.find('input')
    await input.setValue('c')
    await input.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('shows placeholder when no tags', () => {
    const wrapper = mount(TagInput, { props: { modelValue: [], placeholder: 'Add tag…' } })
    expect((wrapper.find('input').element as HTMLInputElement).placeholder).toBe('Add tag…')
  })

  it('applies disabled to the input', () => {
    const wrapper = mount(TagInput, { props: { modelValue: [], disabled: true } })
    expect((wrapper.find('input').element as HTMLInputElement).disabled).toBe(true)
  })

  it.each(['sm', 'md', 'lg'] as const)('renders size %s', (size) => {
    const wrapper = mount(TagInput, { props: { modelValue: [], size } })
    expect(wrapper.exists()).toBe(true)
  })
})
