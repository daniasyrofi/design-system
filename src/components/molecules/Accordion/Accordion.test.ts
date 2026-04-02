import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import Accordion from './Accordion.vue'
import AccordionItem from './AccordionItem.vue'

// Helper: mount a full accordion with two items
function mountAccordion(options: {
  type?: 'single' | 'multiple'
  defaultOpen?: string[]
} = {}) {
  return mount(defineComponent({
    components: { Accordion, AccordionItem },
    template: `
      <Accordion :type="type" :default-open="defaultOpen">
        <AccordionItem value="a" title="Item A">Content A</AccordionItem>
        <AccordionItem value="b" title="Item B">Content B</AccordionItem>
      </Accordion>
    `,
    props: ['type', 'defaultOpen'],
  }), {
    props: {
      type: options.type ?? 'single',
      defaultOpen: options.defaultOpen ?? [],
    },
  })
}

describe('Accordion', () => {
  it('renders with role=region', () => {
    const wrapper = mountAccordion()
    expect(wrapper.find('.ds-accordion').attributes('role')).toBe('region')
  })

  it('renders item titles', () => {
    const wrapper = mountAccordion()
    expect(wrapper.text()).toContain('Item A')
    expect(wrapper.text()).toContain('Item B')
  })

  it('items are collapsed by default', () => {
    const wrapper = mountAccordion()
    const buttons = wrapper.findAll('button')
    expect(buttons[0].attributes('aria-expanded')).toBe('false')
    expect(buttons[1].attributes('aria-expanded')).toBe('false')
  })

  it('expands item on click', async () => {
    const wrapper = mountAccordion()
    const btn = wrapper.findAll('button')[0]
    await btn.trigger('click')
    expect(btn.attributes('aria-expanded')).toBe('true')
  })

  it('closes other items in single mode', async () => {
    const wrapper = mountAccordion({ type: 'single' })
    const [btnA, btnB] = wrapper.findAll('button')
    await btnA.trigger('click')
    expect(btnA.attributes('aria-expanded')).toBe('true')
    await btnB.trigger('click')
    expect(btnA.attributes('aria-expanded')).toBe('false')
    expect(btnB.attributes('aria-expanded')).toBe('true')
  })

  it('allows multiple open in multiple mode', async () => {
    const wrapper = mountAccordion({ type: 'multiple' })
    const [btnA, btnB] = wrapper.findAll('button')
    await btnA.trigger('click')
    await btnB.trigger('click')
    expect(btnA.attributes('aria-expanded')).toBe('true')
    expect(btnB.attributes('aria-expanded')).toBe('true')
  })

  it('respects defaultOpen', () => {
    const wrapper = mountAccordion({ defaultOpen: ['b'] })
    const buttons = wrapper.findAll('button')
    expect(buttons[0].attributes('aria-expanded')).toBe('false')
    expect(buttons[1].attributes('aria-expanded')).toBe('true')
  })

  it('collapses open item on second click', async () => {
    const wrapper = mountAccordion()
    const btn = wrapper.findAll('button')[0]
    await btn.trigger('click')
    expect(btn.attributes('aria-expanded')).toBe('true')
    await btn.trigger('click')
    expect(btn.attributes('aria-expanded')).toBe('false')
  })

  it('disabled item does not toggle', async () => {
    const wrapper = mount(defineComponent({
      components: { Accordion, AccordionItem },
      template: `
        <Accordion>
          <AccordionItem value="a" title="Disabled" :disabled="true">Body</AccordionItem>
        </Accordion>
      `,
    }))
    const btn = wrapper.find('button')
    expect(btn.attributes('disabled')).toBeDefined()
    // Clicking a disabled button should not change aria-expanded from false
    await btn.trigger('click')
    expect(btn.attributes('aria-expanded')).toBe('false')
  })
})
