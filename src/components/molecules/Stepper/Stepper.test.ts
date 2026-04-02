import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Stepper from './Stepper.vue'

const steps = [
  { title: 'Account', description: 'Create your account' },
  { title: 'Profile', description: 'Set up your profile' },
  { title: 'Payment', description: 'Add payment method' },
]

describe('Stepper', () => {
  it('renders all step titles', () => {
    const wrapper = mount(Stepper, { props: { steps } })
    expect(wrapper.text()).toContain('Account')
    expect(wrapper.text()).toContain('Profile')
    expect(wrapper.text()).toContain('Payment')
  })

  it('renders step descriptions', () => {
    const wrapper = mount(Stepper, { props: { steps } })
    expect(wrapper.text()).toContain('Create your account')
  })

  it('has role=list on container', () => {
    const wrapper = mount(Stepper, { props: { steps } })
    expect(wrapper.find('[role="list"]').exists()).toBe(true)
  })

  it('each step has role=listitem', () => {
    const wrapper = mount(Stepper, { props: { steps } })
    const items = wrapper.findAll('[role="listitem"]')
    expect(items.length).toBe(3)
  })

  it('marks active step', () => {
    const wrapper = mount(Stepper, { props: { steps, activeStep: 1 } })
    // Active step circle should have active class
    const circles = wrapper.findAll('.ds-stepper-circle')
    const activeClasses = circles[1].classes().join(' ')
    expect(activeClasses).toMatch(/active/)
  })

  it('marks completed steps', () => {
    const wrapper = mount(Stepper, { props: { steps, activeStep: 2 } })
    const circles = wrapper.findAll('.ds-stepper-circle')
    // First two should be completed
    expect(circles[0].classes().join(' ')).toMatch(/completed/)
    expect(circles[1].classes().join(' ')).toMatch(/completed/)
  })

  it('defaults to first step active', () => {
    const wrapper = mount(Stepper, { props: { steps } })
    const circles = wrapper.findAll('.ds-stepper-circle')
    expect(circles[0].classes().join(' ')).toMatch(/active/)
  })

  it.each(['horizontal', 'vertical'] as const)('renders variant %s', (variant) => {
    const wrapper = mount(Stepper, { props: { steps, variant } })
    expect(wrapper.findAll('[role="listitem"]').length).toBe(3)
  })
})
