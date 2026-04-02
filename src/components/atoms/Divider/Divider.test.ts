import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Divider from './Divider.vue'

describe('Divider', () => {
  // ── Default rendering ─────────────────────────────────────────

  it('renders without label as a separator', () => {
    const wrapper = mount(Divider)
    expect(wrapper.attributes('role')).toBe('separator')
  })

  it('does not render role=separator when label is present', () => {
    const wrapper = mount(Divider, { props: { label: 'Section' } })
    expect(wrapper.attributes('role')).toBeUndefined()
    expect(wrapper.text()).toContain('Section')
  })

  // ── Orientation ──────────────────────────────────────────────

  it('defaults to horizontal orientation', () => {
    const wrapper = mount(Divider)
    expect(wrapper.attributes('aria-orientation')).toBe('horizontal')
  })

  it('sets vertical orientation', () => {
    const wrapper = mount(Divider, { props: { orientation: 'vertical' } })
    expect(wrapper.attributes('aria-orientation')).toBe('vertical')
  })

  // ── Variants ─────────────────────────────────────────────────

  it.each(['solid', 'dashed', 'dotted'] as const)('renders %s variant', (variant) => {
    const wrapper = mount(Divider, { props: { variant } })
    expect(wrapper.exists()).toBe(true)
  })

  // ── Label positions ───────────────────────────────────────────

  it.each(['start', 'center', 'end'] as const)('renders label at %s position', (labelPosition) => {
    const wrapper = mount(Divider, { props: { label: 'OR', labelPosition } })
    expect(wrapper.text()).toContain('OR')
  })
})
