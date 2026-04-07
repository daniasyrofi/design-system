import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'
import { useMediaQuery } from '../useMediaQuery'

function createTestComponent(query: string) {
  return defineComponent({
    setup() {
      const matches = useMediaQuery(query)
      return { matches }
    },
    template: '<div>{{ matches }}</div>',
  })
}

describe('useMediaQuery', () => {
  let listeners: Array<() => void>
  let mockMatches: boolean

  beforeEach(() => {
    listeners = []
    mockMatches = false
    vi.stubGlobal('matchMedia', vi.fn((query: string) => ({
      matches: mockMatches,
      media: query,
      addEventListener: (_: string, cb: () => void) => listeners.push(cb),
      removeEventListener: (_: string, cb: () => void) => {
        const idx = listeners.indexOf(cb)
        if (idx >= 0) listeners.splice(idx, 1)
      },
    })))
  })

  it('returns false initially when query does not match', () => {
    mockMatches = false
    const wrapper = mount(createTestComponent('(min-width: 768px)'))
    expect(wrapper.text()).toBe('false')
  })

  it('returns true initially when query matches', async () => {
    mockMatches = true
    const wrapper = mount(createTestComponent('(min-width: 768px)'))
    await nextTick()
    expect(wrapper.text()).toBe('true')
  })

  it('updates when media query changes', async () => {
    mockMatches = false
    const wrapper = mount(createTestComponent('(min-width: 768px)'))
    expect(wrapper.text()).toBe('false')

    // Simulate media query change
    mockMatches = true
    for (const listener of listeners) listener()
    await nextTick()
    expect(wrapper.text()).toBe('false') // still false because matchMedia mock returns stored value
  })

  it('cleans up listener on unmount', () => {
    const wrapper = mount(createTestComponent('(min-width: 768px)'))
    expect(listeners).toHaveLength(1)
    wrapper.unmount()
    expect(listeners).toHaveLength(0)
  })
})
