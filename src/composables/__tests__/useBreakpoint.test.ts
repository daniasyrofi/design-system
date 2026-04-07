import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { useBreakpoint } from '../useBreakpoint'

describe('useBreakpoint', () => {
  beforeEach(() => {
    vi.stubGlobal('matchMedia', vi.fn((query: string) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })))
  })

  it('returns xs when no breakpoints match', () => {
    const TestComp = defineComponent({
      setup() {
        const { current } = useBreakpoint()
        return { current }
      },
      template: '<div>{{ current }}</div>',
    })
    const wrapper = mount(TestComp)
    expect(wrapper.text()).toBe('xs')
  })

  it('exports isAbove and isBelow helpers', () => {
    const TestComp = defineComponent({
      setup() {
        const { isAbove, isBelow } = useBreakpoint()
        return { aboveMd: isAbove('md'), belowLg: isBelow('lg') }
      },
      template: '<div>{{ aboveMd }} {{ belowLg }}</div>',
    })
    const wrapper = mount(TestComp)
    expect(wrapper.text()).toBe('false true')
  })
})
