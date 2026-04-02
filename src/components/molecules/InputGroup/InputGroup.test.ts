import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InputGroup from './InputGroup.vue'

describe('InputGroup', () => {
  it('renders slot content', () => {
    const wrapper = mount(InputGroup, { slots: { default: '<input /><button>Go</button>' } })
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('has flex layout', () => {
    const wrapper = mount(InputGroup)
    expect(wrapper.classes()).toContain('flex')
  })

  it('applies error class when error=true', () => {
    const wrapper = mount(InputGroup, { props: { error: true } })
    expect(wrapper.classes().join(' ')).toContain('error')
  })

  it('does not apply error class by default', () => {
    const wrapper = mount(InputGroup)
    expect(wrapper.classes().join(' ')).not.toContain('error')
  })

  it.each(['sm', 'md', 'lg'] as const)('renders size %s without errors', (size) => {
    const wrapper = mount(InputGroup, { props: { size } })
    expect(wrapper.exists()).toBe(true)
  })
})
