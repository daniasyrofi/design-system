import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AlertDialog from './AlertDialog.vue'

describe('AlertDialog', () => {
  it('does not render when modelValue=false', () => {
    const wrapper = mount(AlertDialog, { props: { modelValue: false, title: 'Delete?' } })
    expect(wrapper.find('[role="alertdialog"]').exists()).toBe(false)
  })

  it('renders when modelValue=true', () => {
    const wrapper = mount(AlertDialog, {
      props: { modelValue: true, title: 'Delete?' },
      attachTo: document.body,
    })
    expect(wrapper.find('[role="alertdialog"]').exists()).toBe(true)
    wrapper.unmount()
  })

  it('renders title prop', () => {
    const wrapper = mount(AlertDialog, {
      props: { modelValue: true, title: 'Are you sure?' },
      attachTo: document.body,
    })
    expect(wrapper.text()).toContain('Are you sure?')
    wrapper.unmount()
  })

  it('renders description prop', () => {
    const wrapper = mount(AlertDialog, {
      props: { modelValue: true, description: 'This cannot be undone.' },
      attachTo: document.body,
    })
    expect(wrapper.text()).toContain('This cannot be undone.')
    wrapper.unmount()
  })

  it('emits cancel when cancel button clicked', async () => {
    const wrapper = mount(AlertDialog, {
      props: { modelValue: true, cancelLabel: 'No' },
      attachTo: document.body,
    })
    const cancelBtn = wrapper.find('[data-cancel]')
    await cancelBtn.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    expect(wrapper.emitted('cancel')).toBeTruthy()
    wrapper.unmount()
  })

  it('emits confirm when confirm button clicked', async () => {
    const wrapper = mount(AlertDialog, {
      props: { modelValue: true, confirmLabel: 'Yes, delete' },
      attachTo: document.body,
    })
    const buttons = wrapper.findAll('button')
    const confirmBtn = buttons.find(b => b.text().includes('Yes, delete'))
    await confirmBtn?.trigger('click')
    expect(wrapper.emitted('confirm')).toBeTruthy()
    wrapper.unmount()
  })

  it('renders danger variant', () => {
    const wrapper = mount(AlertDialog, {
      props: { modelValue: true, variant: 'danger' },
      attachTo: document.body,
    })
    expect(wrapper.find('[role="alertdialog"]').exists()).toBe(true)
    wrapper.unmount()
  })
})
