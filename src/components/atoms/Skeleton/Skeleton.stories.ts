import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Skeleton from './Skeleton.vue'

const meta: Meta<typeof Skeleton> = {
  title: 'Atoms/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['text', 'circular', 'rectangular', 'rounded'] },
    width:   { control: 'text' },
    height:  { control: 'text' },
    lines:   { control: 'number' },
  },
}
export default meta

type Story = StoryObj<typeof Skeleton>

export const Text: Story = {
  args: { variant: 'text', width: '200px' },
}

export const MultiLine: Story = {
  args: { variant: 'text', lines: 3, width: '320px' },
}

export const Circular: Story = {
  args: { variant: 'circular', width: '48px', height: '48px' },
}

export const Rectangular: Story = {
  args: { variant: 'rectangular', width: '100%', height: '120px' },
}

export const Rounded: Story = {
  args: { variant: 'rounded', width: '100%', height: '80px' },
}

export const CardPlaceholder: Story = {
  render: () => ({
    components: { Skeleton },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;width:280px;padding:16px;border:1px solid var(--color-border);border-radius:var(--radius-lg);">
        <Skeleton variant="rectangular" height="160px" />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" lines="2" />
        <div style="display:flex;align-items:center;gap:8px;margin-top:4px;">
          <Skeleton variant="circular" width="32px" height="32px" />
          <Skeleton variant="text" width="100px" />
        </div>
      </div>
    `,
  }),
}
