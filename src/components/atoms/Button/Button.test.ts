import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button', () => {
  // ── Rendering ────────────────────────────────────────────────

  it('renders default slot content', () => {
    const wrapper = mount(Button, { slots: { default: 'Click me' } })
    expect(wrapper.text()).toContain('Click me')
  })

  it('renders as <button> by default', () => {
    const wrapper = mount(Button)
    expect(wrapper.element.tagName).toBe('BUTTON')
  })

  it('renders as <a> when href is provided', () => {
    const wrapper = mount(Button, { props: { href: '/home' } })
    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBe('/home')
  })

  it('renders as custom tag via `as` prop', () => {
    const wrapper = mount(Button, { props: { as: 'div' } })
    expect(wrapper.element.tagName).toBe('DIV')
  })

  // ── Type attribute ───────────────────────────────────────────

  it('has type="button" by default', () => {
    const wrapper = mount(Button)
    expect(wrapper.attributes('type')).toBe('button')
  })

  it('has type="submit" when specified', () => {
    const wrapper = mount(Button, { props: { type: 'submit' } })
    expect(wrapper.attributes('type')).toBe('submit')
  })

  it('does not set type on anchor elements', () => {
    const wrapper = mount(Button, { props: { href: '/x' } })
    expect(wrapper.attributes('type')).toBeUndefined()
  })

  // ── Disabled state ───────────────────────────────────────────

  it('sets disabled attribute when disabled=true', () => {
    const wrapper = mount(Button, { props: { disabled: true } })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('sets aria-disabled when disabled', () => {
    const wrapper = mount(Button, { props: { disabled: true } })
    expect(wrapper.attributes('aria-disabled')).toBe('true')
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(Button, { props: { disabled: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  // ── Loading state ────────────────────────────────────────────

  it('shows Spinner when loading=true', () => {
    const wrapper = mount(Button, { props: { loading: true } })
    expect(wrapper.findComponent({ name: 'Spinner' }).exists()).toBe(true)
  })

  it('sets aria-busy when loading', () => {
    const wrapper = mount(Button, { props: { loading: true } })
    expect(wrapper.attributes('aria-busy')).toBe('true')
  })

  it('does not emit click when loading', async () => {
    const wrapper = mount(Button, { props: { loading: true } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  // ── Click emission ───────────────────────────────────────────

  it('emits click event on click', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  // ── Slots ────────────────────────────────────────────────────

  it('renders leading slot', () => {
    const wrapper = mount(Button, {
      slots: { leading: '<span data-testid="lead">★</span>' },
    })
    expect(wrapper.find('[data-testid="lead"]').exists()).toBe(true)
  })

  it('renders trailing slot', () => {
    const wrapper = mount(Button, {
      slots: { trailing: '<span data-testid="trail">→</span>' },
    })
    expect(wrapper.find('[data-testid="trail"]').exists()).toBe(true)
  })

  it('renders icon slot when iconOnly=true', () => {
    const wrapper = mount(Button, {
      props: { iconOnly: true },
      slots: { icon: '<svg data-testid="ico" />' },
    })
    expect(wrapper.find('[data-testid="ico"]').exists()).toBe(true)
  })

  it('hides leading/trailing slots when loading', () => {
    const wrapper = mount(Button, {
      props: { loading: true },
      slots: {
        leading:  '<span data-testid="lead">★</span>',
        trailing: '<span data-testid="trail">→</span>',
      },
    })
    expect(wrapper.find('[data-testid="lead"]').exists()).toBe(false)
    expect(wrapper.find('[data-testid="trail"]').exists()).toBe(false)
  })

  // ── Variants & sizes (CSS classes) ───────────────────────────

  it('applies fullWidth class when fullWidth=true', () => {
    const wrapper = mount(Button, { props: { fullWidth: true } })
    expect(wrapper.classes()).toContain('w-full')
  })

  it('applies ds-btn class always', () => {
    const wrapper = mount(Button)
    expect(wrapper.classes()).toContain('ds-btn')
  })
})
