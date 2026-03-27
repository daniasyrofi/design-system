import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Stepper from './Stepper.vue'

const canvas = () => ({
  template: `
    <div style="
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 48px 32px;
      background-color: #eceae4;
      background-image: radial-gradient(circle, rgba(0,0,0,0.11) 1px, transparent 1px);
      background-size: 22px 22px;
    ">
      <story />
    </div>
  `,
})

const sampleSteps = [
  { title: 'Account', description: 'Create your account' },
  { title: 'Profile', description: 'Set up your profile' },
  { title: 'Preferences', description: 'Choose your settings' },
  { title: 'Complete', description: 'All done!' },
]

const meta: Meta<typeof Stepper> = {
  title: 'Molecules/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    activeStep: { control: { type: 'number', min: 0, max: 3 } },
    variant: { control: 'select', options: ['horizontal', 'vertical'] },
  },
}

export default meta
type Story = StoryObj<typeof Stepper>

export const Horizontal: Story = {
  render: () => ({
    components: { Stepper },
    template: `
      <div style="width:100%;max-width:600px;">
        <Stepper :steps="steps" :active-step="1" />
      </div>
    `,
    setup() {
      return { steps: sampleSteps }
    },
  }),
}

export const Vertical: Story = {
  render: () => ({
    components: { Stepper },
    template: `
      <div style="width:100%;max-width:320px;">
        <Stepper :steps="steps" :active-step="2" variant="vertical" />
      </div>
    `,
    setup() {
      return { steps: sampleSteps }
    },
  }),
}

export const AllCompleted: Story = {
  render: () => ({
    components: { Stepper },
    template: `
      <div style="width:100%;max-width:600px;">
        <Stepper :steps="steps" :active-step="4" />
      </div>
    `,
    setup() {
      return { steps: sampleSteps }
    },
  }),
}

export const FirstStep: Story = {
  render: () => ({
    components: { Stepper },
    template: `
      <div style="width:100%;max-width:600px;">
        <Stepper :steps="steps" :active-step="0" />
      </div>
    `,
    setup() {
      return { steps: sampleSteps }
    },
  }),
}
