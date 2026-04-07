import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ToggleGroup from './ToggleGroup.vue'
import ToggleGroupItem from './ToggleGroupItem.vue'

function mountGroup(props: Record<string, unknown>, items = ['bold', 'italic', 'underline']) {
  return mount(ToggleGroup, {
    props,
    slots: {
      default: items
        .map((v) => `<ToggleGroupItem value="${v}">${v}</ToggleGroupItem>`)
        .join(''),
    },
    global: { components: { ToggleGroupItem } },
  })
}

describe('ToggleGroup', () => {
  it('renders without errors', () => {
    const wrapper = mountGroup({ modelValue: '', type: 'single' })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders all items', () => {
    const wrapper = mountGroup({ modelValue: '', type: 'single' })
    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(3)
  })

  it('single mode: clicking item selects it', async () => {
    const wrapper = mountGroup({ modelValue: '', type: 'single' })
    const buttons = wrapper.findAll('button')
    await buttons[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['bold'])
  })

  it('single mode: clicking selected item deselects it (emits empty string)', async () => {
    const wrapper = mountGroup({ modelValue: 'bold', type: 'single' })
    const buttons = wrapper.findAll('button')
    await buttons[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
  })

  it('multiple mode: clicking items adds them to array', async () => {
    const wrapper = mountGroup({ modelValue: [], type: 'multiple' })
    const buttons = wrapper.findAll('button')
    await buttons[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['bold']])
    await buttons[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([['bold', 'italic']])
  })

  it('multiple mode: clicking selected item removes it from array', async () => {
    const wrapper = mountGroup({ modelValue: ['bold', 'italic'], type: 'multiple' })
    const buttons = wrapper.findAll('button')
    await buttons[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['italic']])
  })

  it('disabled group: items have disabled attribute', () => {
    const wrapper = mountGroup({ modelValue: '', type: 'single', disabled: true })
    const buttons = wrapper.findAll('button')
    // All items should reflect disabled state via data-disabled attribute
    buttons.forEach((btn) => {
      expect(btn.attributes('data-disabled')).toBe('')
    })
  })

  it('data-state reflects selected state', async () => {
    const wrapper = mountGroup({ modelValue: 'bold', type: 'single' })
    const buttons = wrapper.findAll('button')
    expect(buttons[0].attributes('data-state')).toBe('on')
    expect(buttons[1].attributes('data-state')).toBe('off')
    expect(buttons[2].attributes('data-state')).toBe('off')
  })

  it('single mode: aria-checked is true for selected item', () => {
    const wrapper = mountGroup({ modelValue: 'italic', type: 'single' })
    const buttons = wrapper.findAll('button')
    expect(buttons[1].attributes('aria-checked')).toBe('true')
    expect(buttons[0].attributes('aria-checked')).toBe('false')
  })

  it('multiple mode: role is checkbox', () => {
    const wrapper = mountGroup({ modelValue: [], type: 'multiple' })
    const buttons = wrapper.findAll('button')
    buttons.forEach((btn) => {
      expect(btn.attributes('role')).toBe('checkbox')
    })
  })

  it('single mode: role is radio', () => {
    const wrapper = mountGroup({ modelValue: '', type: 'single' })
    const buttons = wrapper.findAll('button')
    buttons.forEach((btn) => {
      expect(btn.attributes('role')).toBe('radio')
    })
  })
})
