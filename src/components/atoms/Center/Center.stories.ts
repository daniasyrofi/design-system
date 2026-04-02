import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Center from './Center.vue'

const meta: Meta<typeof Center> = {
  title: 'Atoms/Center',
  component: Center,
  tags: ['autodocs'],
  argTypes: {
    inline: { control: 'boolean' },
    fill:   { control: 'boolean' },
    as:     { control: 'text' },
  },
}
export default meta

type Story = StoryObj<typeof Center>

export const Default: Story = {
  render: () => ({
    components: { Center },
    template: `
      <Center fill style="height:200px;background:var(--color-bg-subtle);border-radius:var(--radius-lg);">
        <div style="background:var(--color-primary);color:white;padding:12px 24px;border-radius:var(--radius-md);font-weight:500;">
          Centered content
        </div>
      </Center>
    `,
  }),
}
