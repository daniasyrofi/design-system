import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, ref, nextTick } from 'vue'
import Select from './Select.vue'
import SelectTrigger from './SelectTrigger.vue'
import SelectContent from './SelectContent.vue'
import SelectItem from './SelectItem.vue'

// Helper: full compound select with items
function makeSelect(modelValue = '', multiple = false) {
  return defineComponent({
    components: { Select, SelectTrigger, SelectContent, SelectItem },
    setup() {
      const value = ref<string | string[]>(multiple ? [] : modelValue)
      return { value, multiple }
    },
    template: `
      <Select v-model="value" :multiple="multiple">
        <SelectTrigger placeholder="Select..." />
        <SelectContent>
          <SelectItem value="apple" label="Apple">Apple</SelectItem>
          <SelectItem value="banana" label="Banana">Banana</SelectItem>
          <SelectItem value="cherry" label="Cherry" :disabled="true">Cherry</SelectItem>
        </SelectContent>
      </Select>
    `,
  })
}

describe('Select (compound)', () => {
  // ── Rendering ────────────────────────────────────────────────

  it('renders trigger button', () => {
    const wrapper = mount(makeSelect())
    expect(wrapper.find('[aria-haspopup="listbox"]').exists()).toBe(true)
  })

  it('renders placeholder when nothing selected', () => {
    const wrapper = mount(makeSelect())
    expect(wrapper.find('[aria-haspopup="listbox"]').text()).toContain('Select...')
  })

  it('shows label when label prop set', () => {
    const wrapper = mount(Select, {
      props: { modelValue: '', label: 'Fruit' },
      slots: {
        default: `<div />`,
      },
    })
    expect(wrapper.find('label').text()).toContain('Fruit')
  })

  it('shows error message', () => {
    const wrapper = mount(Select, {
      props: { modelValue: '', error: 'Required' },
      slots: { default: '<div />' },
    })
    expect(wrapper.text()).toContain('Required')
  })

  it('shows helper text when no error', () => {
    const wrapper = mount(Select, {
      props: { modelValue: '', helperText: 'Pick one' },
      slots: { default: '<div />' },
    })
    expect(wrapper.text()).toContain('Pick one')
  })

  // ── Open / close ─────────────────────────────────────────────
  // Note: isVisible() is unreliable in happy-dom for v-show; use aria-expanded instead

  it('sets aria-expanded=false initially', () => {
    const wrapper = mount(makeSelect())
    expect(wrapper.find('[aria-haspopup="listbox"]').attributes('aria-expanded')).toBe('false')
  })

  it('sets aria-expanded=true when trigger is clicked', async () => {
    const wrapper = mount(makeSelect())
    await wrapper.find('[aria-haspopup="listbox"]').trigger('click')
    expect(wrapper.find('[aria-haspopup="listbox"]').attributes('aria-expanded')).toBe('true')
  })

  it('closes dropdown when trigger is clicked again', async () => {
    const wrapper = mount(makeSelect())
    await wrapper.find('[aria-haspopup="listbox"]').trigger('click')
    await wrapper.find('[aria-haspopup="listbox"]').trigger('click')
    expect(wrapper.find('[aria-haspopup="listbox"]').attributes('aria-expanded')).toBe('false')
  })

  // ── Item labels register (v-show fix) ────────────────────────

  it('displays item label for pre-selected value immediately', async () => {
    const wrapper = mount(makeSelect('banana'))
    // Items register labels in onMounted; wait for Vue to flush the re-render
    await nextTick()
    expect(wrapper.find('[aria-haspopup="listbox"]').text()).toContain('Banana')
  })

  // ── Selection ────────────────────────────────────────────────

  it('selects an item and updates display text', async () => {
    const wrapper = mount(makeSelect())
    await wrapper.find('[aria-haspopup="listbox"]').trigger('click')
    const items = wrapper.findAll('[role="option"]')
    await items[0].trigger('click')
    expect(wrapper.find('[aria-haspopup="listbox"]').text()).toContain('Apple')
  })

  it('closes after selecting in single mode', async () => {
    const wrapper = mount(makeSelect())
    await wrapper.find('[aria-haspopup="listbox"]').trigger('click')
    await wrapper.findAll('[role="option"]')[0].trigger('click')
    expect(wrapper.find('[aria-haspopup="listbox"]').attributes('aria-expanded')).toBe('false')
  })

  it('does not select disabled item', async () => {
    const wrapper = mount(makeSelect())
    await wrapper.find('[aria-haspopup="listbox"]').trigger('click')
    const cherry = wrapper.findAll('[role="option"]')[2]
    await cherry.trigger('click')
    expect(wrapper.find('[aria-haspopup="listbox"]').text()).not.toContain('Cherry')
  })

  // ── Multiple mode ────────────────────────────────────────────

  it('stays open after selecting in multiple mode', async () => {
    const wrapper = mount(makeSelect('', true))
    await wrapper.find('[aria-haspopup="listbox"]').trigger('click')
    await wrapper.findAll('[role="option"]')[0].trigger('click')
    expect(wrapper.find('[aria-haspopup="listbox"]').attributes('aria-expanded')).toBe('true')
  })

  it('shows count text when multiple items selected', async () => {
    const wrapper = mount(makeSelect('', true))
    await wrapper.find('[aria-haspopup="listbox"]').trigger('click')
    await wrapper.findAll('[role="option"]')[0].trigger('click')
    await wrapper.findAll('[role="option"]')[1].trigger('click')
    expect(wrapper.find('[aria-haspopup="listbox"]').text()).toContain('2 selected')
  })

  // ── Disabled state ───────────────────────────────────────────

  it('does not open when disabled', async () => {
    const wrapper = mount(Select, {
      props: { modelValue: '', disabled: true },
      slots: {
        default: `<SelectTrigger placeholder="Pick..." /><SelectContent><SelectItem value="a" label="A">A</SelectItem></SelectContent>`,
      },
      global: { components: { SelectTrigger, SelectContent, SelectItem } },
    })
    await wrapper.find('[aria-haspopup="listbox"]').trigger('click')
    expect(wrapper.find('[aria-haspopup="listbox"]').attributes('aria-expanded')).toBe('false')
  })
})
