import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Combobox from './Combobox.vue'

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry', disabled: true },
]

const base = { modelValue: '', options }

describe('Combobox', () => {
  it('renders an input with role=combobox', () => {
    const wrapper = mount(Combobox, { props: base })
    expect(wrapper.find('[role="combobox"]').exists()).toBe(true)
  })

  it('shows placeholder text', () => {
    const wrapper = mount(Combobox, { props: { ...base, placeholder: 'Pick fruit' } })
    expect(wrapper.find('input').attributes('placeholder')).toBe('Pick fruit')
  })

  it('aria-expanded is false by default', () => {
    const wrapper = mount(Combobox, { props: base })
    expect(wrapper.find('[role="combobox"]').attributes('aria-expanded')).toBe('false')
  })

  it('opens dropdown on input click', async () => {
    const wrapper = mount(Combobox, { props: base })
    await wrapper.find('input').trigger('click')
    expect(wrapper.find('[role="combobox"]').attributes('aria-expanded')).toBe('true')
  })

  it('renders options when open', async () => {
    const wrapper = mount(Combobox, { props: base })
    await wrapper.find('input').trigger('click')
    const listbox = wrapper.find('[role="listbox"]')
    expect(listbox.exists()).toBe(true)
    expect(wrapper.findAll('[role="option"]').length).toBe(3)
  })

  it('selects option on click and emits update:modelValue', async () => {
    const wrapper = mount(Combobox, { props: base })
    await wrapper.find('input').trigger('click')
    await wrapper.findAll('[role="option"]')[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['apple'])
  })

  it('does not select disabled option', async () => {
    const wrapper = mount(Combobox, { props: base })
    await wrapper.find('input').trigger('click')
    await wrapper.findAll('[role="option"]')[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('filters options based on query', async () => {
    const wrapper = mount(Combobox, { props: base })
    await wrapper.find('input').trigger('click')
    await wrapper.find('input').setValue('ban')
    await nextTick()
    const options = wrapper.findAll('[role="option"]')
    expect(options.length).toBe(1)
    expect(options[0].text()).toContain('Banana')
  })

  it('shows emptyText when no matches', async () => {
    const wrapper = mount(Combobox, { props: { ...base, emptyText: 'No fruit found' } })
    await wrapper.find('input').trigger('click')
    await wrapper.find('input').setValue('zzz')
    await nextTick()
    expect(wrapper.text()).toContain('No fruit found')
  })

  it('shows label when provided', () => {
    const wrapper = mount(Combobox, { props: { ...base, label: 'Fruit' } })
    expect(wrapper.find('label').exists()).toBe(true)
    expect(wrapper.find('label').text()).toContain('Fruit')
  })

  it('shows error message', () => {
    const wrapper = mount(Combobox, { props: { ...base, error: 'Required field' } })
    expect(wrapper.text()).toContain('Required field')
  })

  it('shows helper text when no error', () => {
    const wrapper = mount(Combobox, { props: { ...base, helperText: 'Choose a fruit' } })
    expect(wrapper.text()).toContain('Choose a fruit')
  })

  it('is disabled when disabled=true', () => {
    const wrapper = mount(Combobox, { props: { ...base, disabled: true } })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('shows spinner when loading=true', () => {
    const wrapper = mount(Combobox, { props: { ...base, loading: true } })
    expect(wrapper.html()).toContain('spinner')
  })

  it('shows clear button when clearable and value is set', () => {
    const wrapper = mount(Combobox, { props: { ...base, modelValue: 'apple', clearable: true } })
    const clearBtn = wrapper.findAll('button').find(b =>
      (b.attributes('aria-label') ?? '').toLowerCase().includes('clear')
    )
    expect(clearBtn).toBeDefined()
  })

  it('emits update:modelValue with empty string when cleared', async () => {
    const wrapper = mount(Combobox, { props: { ...base, modelValue: 'apple', clearable: true } })
    const clearBtn = wrapper.findAll('button').find(b =>
      (b.attributes('aria-label') ?? '').toLowerCase().includes('clear')
    )
    if (clearBtn) {
      await clearBtn.trigger('click')
      const emissions = wrapper.emitted('update:modelValue') ?? []
      const lastEmit = emissions[emissions.length - 1]
      expect(lastEmit?.[0]).toBe('')
    }
  })

  it('closes on Escape key', async () => {
    const wrapper = mount(Combobox, { props: base })
    await wrapper.find('input').trigger('click')
    expect(wrapper.find('[role="combobox"]').attributes('aria-expanded')).toBe('true')
    await wrapper.find('input').trigger('keydown', { key: 'Escape' })
    expect(wrapper.find('[role="combobox"]').attributes('aria-expanded')).toBe('false')
  })

  it.each(['sm', 'md', 'lg'] as const)('renders size %s', (size) => {
    const wrapper = mount(Combobox, { props: { ...base, size } })
    expect(wrapper.find('[role="combobox"]').exists()).toBe(true)
  })
})
