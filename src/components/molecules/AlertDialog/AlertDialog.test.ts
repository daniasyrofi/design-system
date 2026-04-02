import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AlertDialog from './AlertDialog.vue'

describe('AlertDialog', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('does not render when modelValue=false', () => {
    const wrapper = mount(AlertDialog, {
      props: { modelValue: false, title: 'Delete?' },
      attachTo: document.body,
    })
    expect(document.body.querySelector('[role="alertdialog"]')).toBeNull()
    wrapper.unmount()
  })

  it('renders when modelValue=true', () => {
    const wrapper = mount(AlertDialog, {
      props: { modelValue: true, title: 'Delete?' },
      attachTo: document.body,
    })
    expect(document.body.querySelector('[role="alertdialog"]')).not.toBeNull()
    wrapper.unmount()
  })

  it('renders title prop', () => {
    const wrapper = mount(AlertDialog, {
      props: { modelValue: true, title: 'Are you sure?' },
      attachTo: document.body,
    })
    expect(document.body.textContent).toContain('Are you sure?')
    wrapper.unmount()
  })

  it('renders description prop', () => {
    const wrapper = mount(AlertDialog, {
      props: { modelValue: true, description: 'This cannot be undone.' },
      attachTo: document.body,
    })
    expect(document.body.textContent).toContain('This cannot be undone.')
    wrapper.unmount()
  })

  it('emits cancel when cancel button clicked', async () => {
    const wrapper = mount(AlertDialog, {
      props: { modelValue: true, cancelLabel: 'No' },
      attachTo: document.body,
    })
    const cancelBtn = document.body.querySelector<HTMLElement>('[data-cancel]')
    await cancelBtn?.click()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    expect(wrapper.emitted('cancel')).toBeTruthy()
    wrapper.unmount()
  })

  it('emits confirm when confirm button clicked', async () => {
    const wrapper = mount(AlertDialog, {
      props: { modelValue: true, confirmLabel: 'Yes, delete' },
      attachTo: document.body,
    })
    const buttons = Array.from(document.body.querySelectorAll<HTMLElement>('button'))
    const confirmBtn = buttons.find(b => b.textContent?.includes('Yes, delete'))
    await confirmBtn?.click()
    expect(wrapper.emitted('confirm')).toBeTruthy()
    wrapper.unmount()
  })

  it('renders danger variant', () => {
    const wrapper = mount(AlertDialog, {
      props: { modelValue: true, variant: 'danger' },
      attachTo: document.body,
    })
    expect(document.body.querySelector('[role="alertdialog"]')).not.toBeNull()
    wrapper.unmount()
  })

  it('renders custom confirmLabel and cancelLabel', () => {
    const wrapper = mount(AlertDialog, {
      props: { modelValue: true, confirmLabel: 'Proceed', cancelLabel: 'Abort' },
      attachTo: document.body,
    })
    expect(document.body.textContent).toContain('Proceed')
    expect(document.body.textContent).toContain('Abort')
    wrapper.unmount()
  })

  it('renders description slot', () => {
    const wrapper = mount(AlertDialog, {
      props: { modelValue: true, title: 'Delete?' },
      slots: { description: '<p>Custom description</p>' },
      attachTo: document.body,
    })
    expect(document.body.textContent).toContain('Custom description')
    wrapper.unmount()
  })

  it('renders loading state on confirm button', () => {
    const wrapper = mount(AlertDialog, {
      props: { modelValue: true, loading: true },
      attachTo: document.body,
    })
    expect(document.body.querySelector('[role="alertdialog"]')).not.toBeNull()
    wrapper.unmount()
  })

  it('renders confirmDisabled state', () => {
    const wrapper = mount(AlertDialog, {
      props: { modelValue: true, confirmDisabled: true },
      attachTo: document.body,
    })
    expect(document.body.querySelector('[role="alertdialog"]')).not.toBeNull()
    wrapper.unmount()
  })
})
