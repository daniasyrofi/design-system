import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Collapsible from './Collapsible.vue'

const makeWrapper = (open = false) =>
  mount(Collapsible, {
    props: { defaultOpen: open },
    slots: {
      trigger: `<template #trigger="{ open, toggle, contentId }">
        <button :aria-expanded="open" :aria-controls="contentId" @click="toggle" data-testid="trigger">Toggle</button>
      </template>`,
      default: '<p data-testid="content">Collapsible content</p>',
    },
  })

describe('Collapsible', () => {
  it('renders trigger slot', () => {
    const wrapper = makeWrapper()
    expect(wrapper.find('[data-testid="trigger"]').exists()).toBe(true)
  })

  it('is closed by default', () => {
    const wrapper = makeWrapper()
    expect(wrapper.find('[data-testid="trigger"]').attributes('aria-expanded')).toBe('false')
  })

  it('opens when defaultOpen=true', () => {
    const wrapper = makeWrapper(true)
    expect(wrapper.find('[data-testid="trigger"]').attributes('aria-expanded')).toBe('true')
  })

  it('toggles open on trigger click', async () => {
    const wrapper = makeWrapper()
    await wrapper.find('[data-testid="trigger"]').trigger('click')
    expect(wrapper.find('[data-testid="trigger"]').attributes('aria-expanded')).toBe('true')
  })

  it('emits update:modelValue on toggle', async () => {
    const wrapper = makeWrapper()
    await wrapper.find('[data-testid="trigger"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
  })

  it('respects controlled modelValue', async () => {
    const wrapper = mount(Collapsible, {
      props: { modelValue: true },
      slots: {
        trigger: `<template #trigger="{ open }"><button :aria-expanded="open" data-testid="btn">x</button></template>`,
        default: '<p>content</p>',
      },
    })
    expect(wrapper.find('[data-testid="btn"]').attributes('aria-expanded')).toBe('true')
  })

  it('does not toggle when disabled', async () => {
    const wrapper = mount(Collapsible, {
      props: { disabled: true },
      slots: {
        trigger: `<template #trigger="{ open, toggle }"><button @click="toggle" :aria-expanded="open" data-testid="btn">x</button></template>`,
        default: '<p>content</p>',
      },
    })
    await wrapper.find('[data-testid="btn"]').trigger('click')
    await nextTick()
    expect(wrapper.find('[data-testid="btn"]').attributes('aria-expanded')).toBe('false')
  })
})
