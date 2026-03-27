import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ThemeToggle from './ThemeToggle.vue'

const meta: Meta<typeof ThemeToggle> = {
  title: 'Molecules/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: { size: 'md' },
}
export default meta
type Story = StoryObj<typeof ThemeToggle>

export const Default: Story = {
  parameters: { layout: 'centered' },
  render: (args) => ({
    components: { ThemeToggle },
    setup: () => ({ args }),
    template: '<ThemeToggle v-bind="args" />',
  }),
}

export const AllSizes: Story = {
  name: 'All Sizes',
  parameters: { layout: 'centered' },
  render: () => ({
    components: { ThemeToggle },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start;">
        <div style="display:flex;align-items:center;gap:12px;">
          <ThemeToggle size="sm" />
          <span style="font-size:12px;color:rgba(0,0,0,0.4);">sm</span>
        </div>
        <div style="display:flex;align-items:center;gap:12px;">
          <ThemeToggle size="md" />
          <span style="font-size:12px;color:rgba(0,0,0,0.4);">md</span>
        </div>
        <div style="display:flex;align-items:center;gap:12px;">
          <ThemeToggle size="lg" />
          <span style="font-size:12px;color:rgba(0,0,0,0.4);">lg</span>
        </div>
      </div>
    `,
  }),
}

export const InNavbar: Story = {
  name: 'In Navbar',
  parameters: { layout: 'centered' },
  render: () => ({
    components: { ThemeToggle },
    template: `
      <div style="display:flex;align-items:center;justify-content:space-between;width:320px;padding:8px 16px;background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);">
        <span style="font-size:14px;font-weight:500;color:var(--color-text-primary);">My App</span>
        <ThemeToggle />
      </div>
    `,
  }),
}
