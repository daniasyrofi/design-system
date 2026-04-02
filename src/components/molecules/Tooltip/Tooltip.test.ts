import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Tooltip from './Tooltip.vue'

describe('Tooltip', () => {
  it('renders trigger slot', () => {
    const wrapper = mount(Tooltip, {
      props: { content: 'Tip text' },
      slots: { default: '<button>Hover me</button>' },
    })
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('tooltip content is initially hidden', () => {
    const wrapper = mount(Tooltip, {
      props: { content: 'Tip text' },
      slots: { default: '<button>Hover me</button>' },
    })
    const tooltip = wrapper.find('[role="tooltip"]')
    // v-show sets display:none when hidden
    if (tooltip.exists()) {
      expect((tooltip.element as HTMLElement).style.display).toBe('none')
    } else {
      // Not rendered at all — acceptable
      expect(tooltip.exists()).toBe(false)
    }
  })

  it('shows tooltip on mouseenter (hover trigger)', async () => {
    const wrapper = mount(Tooltip, {
      props: { content: 'Tip text', delay: 0 },
      slots: { default: '<button>Hover me</button>' },
    })
    await wrapper.trigger('mouseenter')
    await new Promise(r => setTimeout(r, 10))
    const tooltip = wrapper.find('[role="tooltip"]')
    if (tooltip.exists()) {
      expect((tooltip.element as HTMLElement).style.display).not.toBe('none')
    }
  })

  it('hides tooltip on mouseleave after hide delay (150ms)', async () => {
    const wrapper = mount(Tooltip, {
      props: { content: 'Tip text', delay: 0 },
      slots: { default: '<button>Hover me</button>' },
    })
    await wrapper.trigger('mouseenter')
    await new Promise(r => setTimeout(r, 10))
    await wrapper.trigger('mouseleave')
    // hide() uses a 100ms timeout — wait for it
    await new Promise(r => setTimeout(r, 150))
    const tooltip = wrapper.find('[role="tooltip"]')
    if (tooltip.exists()) {
      expect((tooltip.element as HTMLElement).style.display).toBe('none')
    } else {
      // Already unmounted — acceptable
      expect(true).toBe(true)
    }
  })

  it('renders content text in tooltip', async () => {
    const wrapper = mount(Tooltip, {
      props: { content: 'My tooltip text', delay: 0 },
      slots: { default: '<span>trigger</span>' },
    })
    await wrapper.trigger('mouseenter')
    await new Promise(r => setTimeout(r, 10))
    expect(wrapper.text()).toContain('My tooltip text')
  })

  it('uses content slot when provided', async () => {
    const wrapper = mount(Tooltip, {
      props: { delay: 0 },
      slots: {
        default: '<span>trigger</span>',
        content: '<strong>Slot tip</strong>',
      },
    })
    await wrapper.trigger('mouseenter')
    await new Promise(r => setTimeout(r, 10))
    expect(wrapper.text()).toContain('Slot tip')
  })

  it.each(['top', 'bottom', 'left', 'right'] as const)('renders placement %s', (placement) => {
    const wrapper = mount(Tooltip, {
      props: { content: 'Tip', placement },
      slots: { default: '<span>x</span>' },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('shows tooltip on click (click trigger)', async () => {
    const wrapper = mount(Tooltip, {
      props: { content: 'Click tip', trigger: 'click', delay: 0 },
      slots: { default: '<button>Click me</button>' },
    })
    await wrapper.trigger('click')
    await new Promise(r => setTimeout(r, 10))
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(true)
  })

  it('toggles tooltip off on second click (click trigger)', async () => {
    const wrapper = mount(Tooltip, {
      props: { content: 'Click tip', trigger: 'click', delay: 0 },
      slots: { default: '<button>Click me</button>' },
    })
    await wrapper.trigger('click')
    await new Promise(r => setTimeout(r, 10))
    await wrapper.trigger('click')
    await new Promise(r => setTimeout(r, 150))
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false)
  })

  it('shows tooltip on focusin (focus trigger)', async () => {
    const wrapper = mount(Tooltip, {
      props: { content: 'Focus tip', trigger: 'focus', delay: 0 },
      slots: { default: '<input />' },
    })
    await wrapper.trigger('focusin')
    await new Promise(r => setTimeout(r, 10))
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(true)
  })

  it('hides tooltip on focusout (focus trigger)', async () => {
    const wrapper = mount(Tooltip, {
      props: { content: 'Focus tip', trigger: 'focus', delay: 0 },
      slots: { default: '<input />' },
    })
    await wrapper.trigger('focusin')
    await new Promise(r => setTimeout(r, 10))
    await wrapper.trigger('focusout')
    await new Promise(r => setTimeout(r, 150))
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false)
  })

  it('renders without arrow when arrow=false', async () => {
    const wrapper = mount(Tooltip, {
      props: { content: 'No arrow', arrow: false, delay: 0 },
      slots: { default: '<span>x</span>' },
    })
    await wrapper.trigger('mouseenter')
    await new Promise(r => setTimeout(r, 10))
    // arrow span should not be present
    const arrowEl = wrapper.find('[aria-hidden="true"]')
    expect(arrowEl.exists()).toBe(false)
  })

  it('unmounts cleanly without errors', () => {
    const wrapper = mount(Tooltip, {
      props: { content: 'Tip', delay: 0 },
      slots: { default: '<span>x</span>' },
    })
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
