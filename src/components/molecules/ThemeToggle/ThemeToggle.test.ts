import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ThemeToggle from './ThemeToggle.vue'

beforeEach(() => {
  // useTheme reads window.matchMedia on import; ensure it exists in happy-dom
  if (!window.matchMedia) {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })
  }
  // Start from a clean theme state
  localStorage.removeItem('ds-theme')
  document.documentElement.removeAttribute('data-theme')
})

describe('ThemeToggle', () => {
  it('renders a button', () => {
    const wrapper = mount(ThemeToggle)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('button has a descriptive aria-label', () => {
    const wrapper = mount(ThemeToggle)
    const label = wrapper.find('button').attributes('aria-label')
    expect(label).toMatch(/mode|theme/i)
  })

  it('toggles data-theme on click', async () => {
    const wrapper = mount(ThemeToggle)
    const before = document.documentElement.getAttribute('data-theme')
    await wrapper.find('button').trigger('click')
    const after = document.documentElement.getAttribute('data-theme')
    expect(after).not.toBe(before)
  })

  it('aria-label updates after toggle', async () => {
    const wrapper = mount(ThemeToggle)
    const labelBefore = wrapper.find('button').attributes('aria-label')
    await wrapper.find('button').trigger('click')
    const labelAfter = wrapper.find('button').attributes('aria-label')
    expect(labelAfter).not.toBe(labelBefore)
  })

  it.each(['sm', 'md', 'lg'] as const)('renders size %s', (size) => {
    const wrapper = mount(ThemeToggle, { props: { size } })
    expect(wrapper.find('button').exists()).toBe(true)
  })
})
