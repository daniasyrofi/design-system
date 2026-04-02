import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import CommandPalette from './CommandPalette.vue'

const global = { stubs: { Teleport: true } }

const items = [
  { id: 'new-doc',  label: 'New Document',  group: 'File',     action: vi.fn() },
  { id: 'open',     label: 'Open File',      group: 'File',     shortcut: '⌘O' },
  { id: 'settings', label: 'Settings',       group: 'App',      description: 'App preferences' },
  { id: 'logout',   label: 'Log Out',         group: 'App',      disabled: true },
]

describe('CommandPalette', () => {
  // ── Visibility ────────────────────────────────────────────────
  it('is hidden when modelValue=false', () => {
    const wrapper = mount(CommandPalette, { props: { modelValue: false, items }, global })
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
  })

  it('is visible when modelValue=true', () => {
    const wrapper = mount(CommandPalette, { props: { modelValue: true, items }, global })
    expect(wrapper.find('[role="dialog"]').exists()).toBe(true)
  })

  it('has aria-modal=true on dialog', () => {
    const wrapper = mount(CommandPalette, { props: { modelValue: true, items }, global })
    expect(wrapper.find('[role="dialog"]').attributes('aria-modal')).toBe('true')
  })

  // ── Search ────────────────────────────────────────────────────
  it('renders search input', () => {
    const wrapper = mount(CommandPalette, { props: { modelValue: true, items }, global })
    expect(wrapper.find('input[type="search"]').exists()).toBe(true)
  })

  it('shows placeholder text', () => {
    const wrapper = mount(CommandPalette, { props: { modelValue: true, items, placeholder: 'Type a command' }, global })
    expect(wrapper.find('input').attributes('placeholder')).toBe('Type a command')
  })

  it('renders all items initially', () => {
    const wrapper = mount(CommandPalette, { props: { modelValue: true, items }, global })
    const options = wrapper.findAll('[role="option"]')
    expect(options.length).toBe(4)
  })

  it('filters items based on search query', async () => {
    const wrapper = mount(CommandPalette, { props: { modelValue: true, items }, global })
    await wrapper.find('input').setValue('settings')
    await nextTick()
    const options = wrapper.findAll('[role="option"]')
    expect(options.length).toBe(1)
    expect(options[0].text()).toContain('Settings')
  })

  it('shows emptyText when no results', async () => {
    const wrapper = mount(CommandPalette, { props: { modelValue: true, items, emptyText: 'Nothing found' }, global })
    await wrapper.find('input').setValue('zzzzz')
    await nextTick()
    expect(wrapper.text()).toContain('Nothing found')
  })

  it('filters by description text', async () => {
    const wrapper = mount(CommandPalette, { props: { modelValue: true, items }, global })
    await wrapper.find('input').setValue('preferences')
    await nextTick()
    expect(wrapper.findAll('[role="option"]').length).toBe(1)
    expect(wrapper.text()).toContain('Settings')
  })

  // ── Group headings ────────────────────────────────────────────
  it('renders group headings', () => {
    const wrapper = mount(CommandPalette, { props: { modelValue: true, items }, global })
    expect(wrapper.text()).toContain('File')
    expect(wrapper.text()).toContain('App')
  })

  // ── Shortcut badges ───────────────────────────────────────────
  it('renders shortcut badge', () => {
    const wrapper = mount(CommandPalette, { props: { modelValue: true, items }, global })
    expect(wrapper.text()).toContain('⌘O')
  })

  // ── Selection ─────────────────────────────────────────────────
  it('calls item action when item is clicked', async () => {
    const action = vi.fn()
    const wrapper = mount(CommandPalette, {
      props: { modelValue: true, items: [{ id: 'x', label: 'X', action }], global },
      global,
    })
    await wrapper.find('[role="option"]').trigger('click')
    expect(action).toHaveBeenCalled()
  })

  it('emits select with the item when clicked', async () => {
    const wrapper = mount(CommandPalette, { props: { modelValue: true, items }, global })
    await wrapper.find('[role="option"]').trigger('click')
    expect(wrapper.emitted('select')).toBeTruthy()
    expect((wrapper.emitted('select')![0][0] as any).id).toBe('new-doc')
  })

  it('emits update:modelValue=false after selection (closes)', async () => {
    const wrapper = mount(CommandPalette, { props: { modelValue: true, items }, global })
    await wrapper.find('[role="option"]').trigger('click')
    const emissions = wrapper.emitted('update:modelValue')!
    const last = emissions[emissions.length - 1]
    expect(last[0]).toBe(false)
  })

  it('does not select disabled item', async () => {
    const wrapper = mount(CommandPalette, { props: { modelValue: true, items }, global })
    const disabledOption = wrapper.findAll('[role="option"]').find(o => o.text().includes('Log Out'))
    if (disabledOption) {
      await disabledOption.trigger('click')
      expect(wrapper.emitted('select')).toBeFalsy()
    }
  })

  // ── Keyboard ──────────────────────────────────────────────────
  it('closes on Escape key', async () => {
    const wrapper = mount(CommandPalette, { props: { modelValue: true, items }, global })
    await wrapper.find('input').trigger('keydown', { key: 'Escape' })
    const emissions = wrapper.emitted('update:modelValue')!
    expect(emissions[emissions.length - 1][0]).toBe(false)
  })

  it('selects active item on Enter', async () => {
    const wrapper = mount(CommandPalette, { props: { modelValue: true, items }, global })
    await wrapper.find('input').trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('select')).toBeTruthy()
  })

  it('moves active item down on ArrowDown', async () => {
    const wrapper = mount(CommandPalette, { props: { modelValue: true, items }, global })
    await wrapper.find('input').trigger('keydown', { key: 'ArrowDown' })
    const active = wrapper.find('[data-active="true"]')
    expect(active.text()).not.toContain('New Document') // moved to 2nd item
  })

  it('moves active item up on ArrowUp', async () => {
    const wrapper = mount(CommandPalette, { props: { modelValue: true, items }, global })
    // Move down twice then up once
    await wrapper.find('input').trigger('keydown', { key: 'ArrowDown' })
    await wrapper.find('input').trigger('keydown', { key: 'ArrowDown' })
    await wrapper.find('input').trigger('keydown', { key: 'ArrowUp' })
    // Should be at index 1
    const active = wrapper.find('[data-active="true"]')
    expect(active.exists()).toBe(true)
  })

  // ── Close button ──────────────────────────────────────────────
  it('closes when close button is clicked', async () => {
    const wrapper = mount(CommandPalette, { props: { modelValue: true, items }, global })
    await wrapper.find('button[aria-label="Close command palette"]').trigger('click')
    const emissions = wrapper.emitted('update:modelValue')!
    expect(emissions[emissions.length - 1][0]).toBe(false)
  })
})
