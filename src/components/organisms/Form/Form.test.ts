import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Form from './Form.vue'

describe('Form', () => {
  it('renders a <form> element', () => {
    const wrapper = mount(Form)
    expect(wrapper.element.tagName).toBe('FORM')
  })

  it('renders slot content', () => {
    const wrapper = mount(Form, { slots: { default: '<input name="email" />' } })
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it.each(['stack', 'grid', 'inline'] as const)('renders layout %s', (layout) => {
    const wrapper = mount(Form, { props: { layout } })
    expect(wrapper.element.tagName).toBe('FORM')
    expect(wrapper.classes().length).toBeGreaterThan(0)
  })

  it.each(['sm', 'md', 'lg'] as const)('renders gap %s', (gap) => {
    const wrapper = mount(Form, { props: { gap } })
    expect(wrapper.element.tagName).toBe('FORM')
  })

  it('applies stack layout classes by default', () => {
    const wrapper = mount(Form)
    expect(wrapper.classes().join(' ')).toMatch(/flex|flex-col/)
  })

  it('applies grid layout classes for grid', () => {
    const wrapper = mount(Form, { props: { layout: 'grid' } })
    expect(wrapper.classes().join(' ')).toMatch(/grid/)
  })

  it('passes attrs through to the form element', () => {
    const wrapper = mount(Form, { attrs: { 'data-testid': 'my-form', novalidate: '' } })
    expect(wrapper.attributes('data-testid')).toBe('my-form')
  })
})
