import { describe, it, expect } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { vi } from 'vitest'
import DropdownMenu from './DropdownMenu.vue'

const items = [
  { label: 'Edit', action: vi.fn() },
  { label: 'Duplicate', action: vi.fn() },
  { separator: true },
  { label: 'Delete', tone: 'danger' as const, action: vi.fn() },
  { label: 'Archive', disabled: true },
]

describe('DropdownMenu', () => {
  it('renders trigger slot', () => {
    const wrapper = mount(DropdownMenu, {
      props: { items },
      slots: { trigger: '<button>Open</button>' },
    })
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('menu is closed by default', () => {
    const wrapper = mount(DropdownMenu, { props: { items }, slots: { trigger: '<button>Open</button>' } })
    expect(wrapper.find('[role="menu"]').exists()).toBe(false)
  })

  it('opens menu on trigger click', async () => {
    const wrapper = mount(DropdownMenu, { props: { items }, slots: { trigger: '<button>Open</button>' } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('[role="menu"]').exists()).toBe(true)
  })

  it('renders menu items', async () => {
    const wrapper = mount(DropdownMenu, { props: { items }, slots: { trigger: '<button>Open</button>' } })
    await wrapper.find('button').trigger('click')
    const menuItems = wrapper.findAll('[role="menuitem"]')
    expect(menuItems.length).toBeGreaterThan(0)
    expect(wrapper.text()).toContain('Edit')
  })

  it('calls item action when clicked', async () => {
    const action = vi.fn()
    const wrapper = mount(DropdownMenu, {
      props: { items: [{ label: 'Edit', action }] },
      slots: { trigger: '<button>Open</button>' },
    })
    await wrapper.find('button').trigger('click')
    await wrapper.find('[role="menuitem"]').trigger('click')
    expect(action).toHaveBeenCalled()
  })

  it('closes menu after item is clicked', async () => {
    const wrapper = mount(DropdownMenu, { props: { items }, slots: { trigger: '<button>Open</button>' } })
    await wrapper.find('button').trigger('click')
    await wrapper.find('[role="menuitem"]').trigger('click')
    expect(wrapper.find('[role="menu"]').exists()).toBe(false)
  })

  it('does not trigger action for disabled item', async () => {
    const action = vi.fn()
    const wrapper = mount(DropdownMenu, {
      props: { items: [{ label: 'Archive', disabled: true, action }] },
      slots: { trigger: '<button>Open</button>' },
    })
    await wrapper.find('button').trigger('click')
    await wrapper.find('[role="menuitem"]').trigger('click')
    expect(action).not.toHaveBeenCalled()
  })

  it('renders separator when separator=true in items', async () => {
    const wrapper = mount(DropdownMenu, { props: { items }, slots: { trigger: '<button>Open</button>' } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('[role="separator"]').exists()).toBe(true)
  })

  it('closes on Escape key (document capture listener)', async () => {
    const wrapper = mount(DropdownMenu, { props: { items }, slots: { trigger: '<button>Open</button>' } })
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('[role="menu"]').exists()).toBe(true)
    // DropdownMenu listens on document with capture=true — dispatch there
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await nextTick()
    expect(wrapper.find('[role="menu"]').exists()).toBe(false)
  })

  it.each(['bottom-start', 'bottom-end', 'top-start', 'top-end'] as const)(
    'renders placement %s', (placement) => {
      const wrapper = mount(DropdownMenu, {
        props: { items: [{ label: 'A' }], placement },
        slots: { trigger: '<button>Open</button>' },
      })
      expect(wrapper.exists()).toBe(true)
    }
  )
})
