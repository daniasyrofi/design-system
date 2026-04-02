import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ChatInput from './ChatInput.vue'

describe('ChatInput', () => {
  it('renders a textarea', () => {
    const wrapper = mount(ChatInput, { props: { modelValue: '' } })
    expect(wrapper.find('textarea').exists()).toBe(true)
  })

  it('reflects modelValue in the textarea', () => {
    const wrapper = mount(ChatInput, { props: { modelValue: 'Hello there' } })
    expect(wrapper.find('textarea').element.value).toBe('Hello there')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(ChatInput, { props: { modelValue: '' } })
    await wrapper.find('textarea').setValue('New message')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['New message'])
  })

  it('renders send button', () => {
    const wrapper = mount(ChatInput, { props: { modelValue: '' } })
    expect(wrapper.find('button[type="submit"], button[type="button"]').exists()).toBe(true)
  })

  it('send button is disabled when value is empty', () => {
    const wrapper = mount(ChatInput, { props: { modelValue: '' } })
    const btn = wrapper.find('button')
    expect(btn.attributes('disabled')).toBeDefined()
  })

  it('send button is enabled when value is non-empty', () => {
    const wrapper = mount(ChatInput, { props: { modelValue: 'Hello' } })
    const btn = wrapper.find('button')
    expect(btn.attributes('disabled')).toBeUndefined()
  })

  it('emits submit event on button click', async () => {
    const wrapper = mount(ChatInput, { props: { modelValue: 'Send this' } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('submit')?.[0]).toEqual(['Send this'])
  })

  it('emits submit on Enter (without Shift)', async () => {
    const wrapper = mount(ChatInput, { props: { modelValue: 'Message' } })
    await wrapper.find('textarea').trigger('keydown', { key: 'Enter', shiftKey: false })
    expect(wrapper.emitted('submit')).toBeTruthy()
  })

  it('does not submit on Shift+Enter', async () => {
    const wrapper = mount(ChatInput, { props: { modelValue: 'Message' } })
    await wrapper.find('textarea').trigger('keydown', { key: 'Enter', shiftKey: true })
    expect(wrapper.emitted('submit')).toBeFalsy()
  })

  it('shows loading indicator when loading=true', () => {
    const wrapper = mount(ChatInput, { props: { modelValue: '', loading: true } })
    expect(wrapper.html()).toMatch(/animate-spin|role="status"|Loading/)
  })

  it('is disabled when disabled=true', () => {
    const wrapper = mount(ChatInput, { props: { modelValue: '', disabled: true } })
    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined()
  })

  it('shows placeholder text', () => {
    const wrapper = mount(ChatInput, { props: { modelValue: '', placeholder: 'Say something...' } })
    expect(wrapper.find('textarea').attributes('placeholder')).toBe('Say something...')
  })
})
