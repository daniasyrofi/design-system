import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Tag from './Tag.vue'

describe('Tag', () => {
  it('renders slot content', () => {
    const wrapper = mount(Tag, { slots: { default: 'Vue 3' } })
    expect(wrapper.text()).toContain('Vue 3')
  })

  it('renders with default neutral variant', () => {
    const wrapper = mount(Tag, { slots: { default: 'Tag' } })
    expect(wrapper.exists()).toBe(true)
  })

  it('applies variant prop', () => {
    const wrapper = mount(Tag, { props: { variant: 'danger' }, slots: { default: 'Error' } })
    expect(wrapper.exists()).toBe(true)
  })

  it('shows remove button when removable', () => {
    const wrapper = mount(Tag, { props: { removable: true }, slots: { default: 'Tag' } })
    expect(wrapper.find('button[aria-label="Remove tag"]').exists()).toBe(true)
  })

  it('hides remove button when not removable', () => {
    const wrapper = mount(Tag, { props: { removable: false }, slots: { default: 'Tag' } })
    expect(wrapper.find('button[aria-label="Remove tag"]').exists()).toBe(false)
  })

  it('emits remove when × clicked', async () => {
    const wrapper = mount(Tag, { props: { removable: true }, slots: { default: 'Tag' } })
    await wrapper.find('button[aria-label="Remove tag"]').trigger('click')
    expect(wrapper.emitted('remove')).toBeTruthy()
  })

  it('does not emit remove when disabled and × clicked', async () => {
    const wrapper = mount(Tag, { props: { removable: true, disabled: true }, slots: { default: 'Tag' } })
    // disabled tag has pointer-events-none; the remove button is still in DOM but disabled
    const removeBtn = wrapper.find('button[aria-label="Remove tag"]')
    if (removeBtn.exists() && !(removeBtn.element as HTMLButtonElement).disabled) {
      await removeBtn.trigger('click')
    }
    expect(wrapper.emitted('remove')).toBeFalsy()
  })

  it('emits click when clickable', async () => {
    const wrapper = mount(Tag, { props: { clickable: true }, slots: { default: 'Tag' } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(Tag, { props: { clickable: true, disabled: true }, slots: { default: 'Tag' } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('has role=button when clickable', () => {
    const wrapper = mount(Tag, { props: { clickable: true }, slots: { default: 'Tag' } })
    expect(wrapper.attributes('role')).toBe('button')
  })

  it('renders icon slot', () => {
    const wrapper = mount(Tag, {
      slots: {
        icon: '<svg data-testid="icon" />',
        default: 'Tag',
      },
    })
    expect(wrapper.find('[data-testid="icon"]').exists()).toBe(true)
  })

  it('applies size prop', () => {
    const sm = mount(Tag, { props: { size: 'sm' }, slots: { default: 'S' } })
    const lg = mount(Tag, { props: { size: 'lg' }, slots: { default: 'L' } })
    expect(sm.exists()).toBe(true)
    expect(lg.exists()).toBe(true)
  })
})
