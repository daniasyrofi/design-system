import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FileUpload from './FileUpload.vue'

describe('FileUpload', () => {
  it('renders dropzone area', () => {
    const wrapper = mount(FileUpload)
    expect(wrapper.find('[role="button"]').exists()).toBe(true)
  })

  it('renders a visually hidden file input', () => {
    const wrapper = mount(FileUpload)
    const input = wrapper.find('input[type="file"]')
    expect(input.exists()).toBe(true)
    // Input is hidden via sr-only class (not display:none)
    expect(input.classes()).toContain('sr-only')
  })

  it('shows upload icon/text', () => {
    const wrapper = mount(FileUpload)
    expect(wrapper.text().toLowerCase()).toMatch(/upload|drag|drop|browse/i)
  })

  it('sets accept attribute on input', () => {
    const wrapper = mount(FileUpload, { props: { accept: 'image/*' } })
    expect(wrapper.find('input[type="file"]').attributes('accept')).toBe('image/*')
  })

  it('sets multiple attribute on input when multiple=true', () => {
    const wrapper = mount(FileUpload, { props: { multiple: true } })
    expect(wrapper.find('input[type="file"]').attributes('multiple')).toBeDefined()
  })

  it('is disabled when disabled=true', () => {
    const wrapper = mount(FileUpload, { props: { disabled: true } })
    // Dropzone should have pointer-events disabled or a disabled-like class
    expect(wrapper.classes().join(' ') + wrapper.html()).toMatch(/disabled|pointer-events-none|opacity/)
  })

  it('shows file size hint derived from accept prop', () => {
    const wrapper = mount(FileUpload, { props: { accept: 'image/*', maxSize: 5242880 } })
    // acceptHint should mention 5MB
    expect(wrapper.text()).toContain('5MB')
  })

  it('emits files event when files are selected via input change', async () => {
    const wrapper = mount(FileUpload)
    const input = wrapper.find('input[type="file"]')
    const file = new File(['hello'], 'test.txt', { type: 'text/plain' })
    Object.defineProperty(input.element, 'files', { value: [file], configurable: true })
    await input.trigger('change')
    expect(wrapper.emitted('files')).toBeTruthy()
  })

  it('emits error when file exceeds maxSize', async () => {
    const wrapper = mount(FileUpload, { props: { maxSize: 10 } }) // 10 bytes
    const input = wrapper.find('input[type="file"]')
    const bigFile = new File(['a'.repeat(100)], 'big.txt', { type: 'text/plain' })
    Object.defineProperty(input.element, 'files', { value: [bigFile], configurable: true })
    await input.trigger('change')
    expect(wrapper.emitted('error')).toBeTruthy()
  })
})
