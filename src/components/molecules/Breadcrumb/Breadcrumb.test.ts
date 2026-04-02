import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Breadcrumb from './Breadcrumb.vue'

const items = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Widget' },
]

describe('Breadcrumb', () => {
  it('renders all item labels', () => {
    const wrapper = mount(Breadcrumb, { props: { items } })
    expect(wrapper.text()).toContain('Home')
    expect(wrapper.text()).toContain('Products')
    expect(wrapper.text()).toContain('Widget')
  })

  it('renders links for items with href', () => {
    const wrapper = mount(Breadcrumb, { props: { items } })
    const links = wrapper.findAll('a')
    expect(links.length).toBe(2)
    expect(links[0].attributes('href')).toBe('/')
    expect(links[1].attributes('href')).toBe('/products')
  })

  it('does not render link for item without href', () => {
    const wrapper = mount(Breadcrumb, { props: { items } })
    // Last item has no href — should not be an anchor
    const links = wrapper.findAll('a')
    const linkTexts = links.map(l => l.text())
    expect(linkTexts).not.toContain('Widget')
  })

  it('has aria-label on nav', () => {
    const wrapper = mount(Breadcrumb, { props: { items } })
    const nav = wrapper.find('nav')
    expect(nav.exists()).toBe(true)
    expect(nav.attributes('aria-label')).toBeTruthy()
  })

  it('marks last item as aria-current=page', () => {
    const wrapper = mount(Breadcrumb, { props: { items } })
    const current = wrapper.find('[aria-current="page"]')
    expect(current.exists()).toBe(true)
    expect(current.text()).toContain('Widget')
  })

  it.each(['chevron', 'slash', 'dot'] as const)('renders separator variant %s', (separator) => {
    const wrapper = mount(Breadcrumb, { props: { items, separator } })
    expect(wrapper.text()).toContain('Home')
  })

  it.each(['sm', 'md', 'lg'] as const)('renders size %s', (size) => {
    const wrapper = mount(Breadcrumb, { props: { items, size } })
    expect(wrapper.text()).toContain('Home')
  })

  it('renders single item breadcrumb', () => {
    const wrapper = mount(Breadcrumb, { props: { items: [{ label: 'Home' }] } })
    expect(wrapper.text()).toContain('Home')
  })
})
