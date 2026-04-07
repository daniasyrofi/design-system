import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import FormField from './FormField.vue'
import FormLabel from './FormLabel.vue'
import FormDescription from './FormDescription.vue'
import FormMessage from './FormMessage.vue'

describe('FormField compound', () => {
  it('renders without errors', () => {
    const wrapper = mount(FormField)
    expect(wrapper.exists()).toBe(true)
  })

  it('FormLabel renders with for attribute pointing to field id', () => {
    const TestComp = defineComponent({
      components: { FormField, FormLabel },
      template: `<FormField><FormLabel>Name</FormLabel></FormField>`,
    })
    const wrapper = mount(TestComp)
    const label = wrapper.find('label')
    expect(label.exists()).toBe(true)
    expect(label.attributes('for')).toBeDefined()
  })

  it('shows required asterisk when required prop is true', () => {
    const TestComp = defineComponent({
      components: { FormField, FormLabel },
      template: `<FormField :required="true"><FormLabel>Email</FormLabel></FormField>`,
    })
    const wrapper = mount(TestComp)
    expect(wrapper.find('span[aria-hidden]').exists()).toBe(true)
    expect(wrapper.find('span[aria-hidden]').text()).toBe('*')
  })

  it('FormMessage renders error text', () => {
    const TestComp = defineComponent({
      components: { FormField, FormMessage },
      template: `<FormField error="This field is required"><FormMessage /></FormField>`,
    })
    const wrapper = mount(TestComp)
    const msg = wrapper.find('[role="alert"]')
    expect(msg.exists()).toBe(true)
    expect(msg.text()).toContain('This field is required')
  })

  it('FormMessage does not render when no error', () => {
    const TestComp = defineComponent({
      components: { FormField, FormMessage },
      template: `<FormField><FormMessage /></FormField>`,
    })
    const wrapper = mount(TestComp)
    expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  })

  it('FormDescription renders with correct id', () => {
    const TestComp = defineComponent({
      components: { FormField, FormDescription },
      template: `<FormField><FormDescription>Helper text</FormDescription></FormField>`,
    })
    const wrapper = mount(TestComp)
    const desc = wrapper.find('p')
    expect(desc.exists()).toBe(true)
    expect(desc.attributes('id')).toBeDefined()
    expect(desc.text()).toBe('Helper text')
  })
})
