import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Alert from './Alert.vue'

// Alert template has a comment + div (fragment); find the actual div
function getRoot(wrapper: ReturnType<typeof mount>) {
  return wrapper.find('div')
}

describe('Alert', () => {
  it('renders with default info variant', () => {
    const wrapper = mount(Alert, { props: { title: 'Info alert' } })
    expect(getRoot(wrapper).attributes('role')).toBe('status')
    expect(wrapper.text()).toContain('Info alert')
  })

  it('uses role=alert for danger variant', () => {
    const wrapper = mount(Alert, { props: { variant: 'danger', title: 'Error' } })
    expect(getRoot(wrapper).attributes('role')).toBe('alert')
  })

  it('uses role=alert for warning variant', () => {
    const wrapper = mount(Alert, { props: { variant: 'warning', title: 'Warning' } })
    expect(getRoot(wrapper).attributes('role')).toBe('alert')
  })

  it('uses role=status for success variant', () => {
    const wrapper = mount(Alert, { props: { variant: 'success', title: 'Done' } })
    expect(getRoot(wrapper).attributes('role')).toBe('status')
  })

  it('renders body slot content', () => {
    const wrapper = mount(Alert, {
      props: { title: 'Title' },
      slots: { default: '<p>Body text</p>' },
    })
    expect(wrapper.text()).toContain('Body text')
  })

  it('shows dismiss button when dismissible', () => {
    const wrapper = mount(Alert, { props: { title: 'T', dismissible: true } })
    const btn = wrapper.find('button[aria-label="Dismiss"]')
    expect(btn.exists()).toBe(true)
  })

  it('emits dismiss when close button clicked', async () => {
    const wrapper = mount(Alert, { props: { title: 'T', dismissible: true } })
    await wrapper.find('button[aria-label="Dismiss"]').trigger('click')
    expect(wrapper.emitted('dismiss')).toBeTruthy()
  })

  it('hides dismiss button when not dismissible', () => {
    const wrapper = mount(Alert, { props: { title: 'T', dismissible: false } })
    expect(wrapper.find('button[aria-label="Dismiss"]').exists()).toBe(false)
  })

  it('has aria-atomic attribute', () => {
    const wrapper = mount(Alert, { props: { title: 'T' } })
    expect(getRoot(wrapper).attributes('aria-atomic')).toBe('true')
  })

  it('renders action slot', () => {
    const wrapper = mount(Alert, {
      props: { title: 'T' },
      slots: { action: '<button>Retry</button>' },
    })
    expect(wrapper.text()).toContain('Retry')
  })
})
