import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ProgressBar from './ProgressBar.vue'

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

const meta: Meta<typeof ProgressBar> = {
  title: 'Molecules/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    variant: { control: 'select', options: ['primary', 'success', 'warning', 'danger', 'info'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    indeterminate: { control: 'boolean' },
    showValue: { control: 'boolean' },
    label: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof ProgressBar>

export const Default: Story = {
  args: {
    value: 65,
    label: 'Upload progress',
    showValue: true,
  },
}

export const AllVariants: Story = {
  render: () => ({
    components: { ProgressBar },
    template: `
      <div style="display:flex;flex-direction:column;gap:28px;width:100%;max-width:420px;">
        <ProgressBar :value="75" variant="primary" label="Primary" show-value />
        <ProgressBar :value="90" variant="success" label="Success" show-value />
        <ProgressBar :value="45" variant="warning" label="Warning" show-value />
        <ProgressBar :value="30" variant="danger"  label="Danger"  show-value />
        <ProgressBar :value="60" variant="info"    label="Info"    show-value />
      </div>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { ProgressBar },
    template: `
      <div style="display:flex;flex-direction:column;gap:28px;width:100%;max-width:420px;">
        <ProgressBar :value="55" size="sm" label="Small" show-value />
        <ProgressBar :value="55" size="md" label="Medium" show-value />
        <ProgressBar :value="55" size="lg" label="Large" show-value />
      </div>
    `,
  }),
}

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    label: 'Loading...',
  },
}
