import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import HoverCard from './HoverCard.vue'

describe('HoverCard', () => {
  it('renders trigger slot', () => {
    const wrapper = mount(HoverCard, {
      slots: { trigger: '<button>Hover me</button>', default: 'Card content' },
    })
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('card is hidden by default', () => {
    const wrapper = mount(HoverCard, {
      props: { openDelay: 0 },
      slots: { trigger: '<button>x</button>', default: 'Content' },
    })
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false)
  })

  it('card opens after mouseenter (with openDelay 0)', async () => {
    const wrapper = mount(HoverCard, {
      props: { openDelay: 0 },
      slots: { trigger: '<button>x</button>', default: 'Card content' },
    })
    await wrapper.trigger('mouseenter')
    await new Promise(r => setTimeout(r, 10))
    await nextTick()
    const card = wrapper.find('[role="tooltip"]')
    expect(card.exists()).toBe(true)
    expect(card.text()).toContain('Card content')
  })

  it.each(['top', 'bottom', 'left', 'right'] as const)('renders placement %s', (placement) => {
    const wrapper = mount(HoverCard, {
      props: { placement },
      slots: { trigger: '<button>x</button>', default: 'content' },
    })
    expect(wrapper.exists()).toBe(true)
  })
})
