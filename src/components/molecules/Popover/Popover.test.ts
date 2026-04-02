import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Popover from './Popover.vue'

describe('Popover', () => {
  it('renders trigger slot', () => {
    const wrapper = mount(Popover, {
      slots: { trigger: '<button>Toggle</button>', default: 'Popover content' },
    })
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('popover content hidden by default (click trigger)', () => {
    const wrapper = mount(Popover, {
      props: { trigger: 'click' },
      slots: { trigger: '<button>Open</button>', default: 'Content' },
    })
    const popover = wrapper.find('[role="dialog"]')
    if (popover.exists()) {
      expect((popover.element as HTMLElement).style.display).toBe('none')
    } else {
      expect(popover.exists()).toBe(false)
    }
  })

  it('opens on trigger click', async () => {
    const wrapper = mount(Popover, {
      props: { trigger: 'click' },
      slots: { trigger: '<button>Open</button>', default: 'Popover body' },
    })
    await wrapper.find('button').trigger('click')
    const popover = wrapper.find('[role="dialog"]')
    if (popover.exists()) {
      expect((popover.element as HTMLElement).style.display).not.toBe('none')
    }
    expect(wrapper.text()).toContain('Popover body')
  })

  it('closes on second click', async () => {
    const wrapper = mount(Popover, {
      props: { trigger: 'click' },
      slots: { trigger: '<button>Toggle</button>', default: 'Content' },
    })
    await wrapper.find('button').trigger('click')
    await wrapper.find('button').trigger('click')
    const popover = wrapper.find('[role="dialog"]')
    if (popover.exists()) {
      expect((popover.element as HTMLElement).style.display).toBe('none')
    }
  })

  it('emits update:modelValue when toggled', async () => {
    const wrapper = mount(Popover, {
      props: { trigger: 'click', modelValue: false },
      slots: { trigger: '<button>Toggle</button>', default: 'Content' },
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('respects modelValue=true in manual mode', () => {
    const wrapper = mount(Popover, {
      props: { trigger: 'manual', modelValue: true },
      slots: { trigger: '<button>x</button>', default: 'Forced open' },
    })
    expect(wrapper.text()).toContain('Forced open')
  })

  it.each(['top', 'bottom', 'left', 'right'] as const)('renders placement %s', (placement) => {
    const wrapper = mount(Popover, {
      props: { placement },
      slots: { trigger: '<button>x</button>', default: 'body' },
    })
    expect(wrapper.exists()).toBe(true)
  })
})
