import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Skeleton from './Skeleton.vue'

describe('Skeleton', () => {
  // ── Default (single text line) ───────────────────────────────

  it('renders a single element by default', () => {
    const wrapper = mount(Skeleton)
    // Single skeleton = one span.ds-skel
    expect(wrapper.find('span.ds-skel').exists()).toBe(true)
  })

  it('has role="status" and aria-busy="true"', () => {
    const wrapper = mount(Skeleton)
    const el = wrapper.find('[role="status"]')
    expect(el.exists()).toBe(true)
    expect(el.attributes('aria-busy')).toBe('true')
  })

  it('has aria-label="Loading"', () => {
    const wrapper = mount(Skeleton)
    expect(wrapper.find('[aria-label="Loading"]').exists()).toBe(true)
  })

  // ── Multi-line ───────────────────────────────────────────────

  it('renders multiple lines when lines > 1', () => {
    const wrapper = mount(Skeleton, { props: { variant: 'text', lines: 3 } })
    expect(wrapper.findAll('span.ds-skel')).toHaveLength(3)
  })

  it('makes last line shorter (72% width) for multi-line text', () => {
    const wrapper = mount(Skeleton, { props: { variant: 'text', lines: 2 } })
    const lines = wrapper.findAll('span.ds-skel')
    const lastStyle = (lines[1].element as HTMLElement).style.width
    expect(lastStyle).toBe('72%')
  })

  // ── Variants ─────────────────────────────────────────────────

  it('applies circular border-radius for circular variant', () => {
    const wrapper = mount(Skeleton, { props: { variant: 'circular' } })
    const el = wrapper.find('span.ds-skel').element as HTMLElement
    expect(el.style.borderRadius).toBe('var(--radius-full)')
  })

  it('applies zero border-radius for rectangular variant', () => {
    const wrapper = mount(Skeleton, { props: { variant: 'rectangular' } })
    const el = wrapper.find('span.ds-skel').element as HTMLElement
    expect(el.style.borderRadius).toBe('0px')
  })

  // ── Custom dimensions ────────────────────────────────────────

  it('applies custom width and height', () => {
    const wrapper = mount(Skeleton, { props: { width: '120px', height: '40px' } })
    const el = wrapper.find('span.ds-skel').element as HTMLElement
    expect(el.style.width).toBe('120px')
    expect(el.style.height).toBe('40px')
  })
})
