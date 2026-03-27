import type { Meta, StoryObj } from '@storybook/vue3-vite'
import LanguageToggle from './LanguageToggle.vue'

const meta: Meta<typeof LanguageToggle> = {
  title: 'Molecules/LanguageToggle',
  component: LanguageToggle,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: { size: 'md' },
}
export default meta
type Story = StoryObj<typeof LanguageToggle>

export const Default: Story = {
  parameters: { layout: 'centered' },
  render: (args) => ({
    components: { LanguageToggle },
    setup: () => ({ args }),
    template: '<LanguageToggle v-bind="args" />',
  }),
}

export const AllSizes: Story = {
  name: 'All Sizes',
  parameters: { layout: 'centered' },
  render: () => ({
    components: { LanguageToggle },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start;">
        <div style="display:flex;align-items:center;gap:12px;">
          <LanguageToggle size="sm" />
          <span style="font-size:12px;color:rgba(0,0,0,0.4);">sm</span>
        </div>
        <div style="display:flex;align-items:center;gap:12px;">
          <LanguageToggle size="md" />
          <span style="font-size:12px;color:rgba(0,0,0,0.4);">md</span>
        </div>
        <div style="display:flex;align-items:center;gap:12px;">
          <LanguageToggle size="lg" />
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
    components: { LanguageToggle },
    template: `
      <div style="display:flex;align-items:center;justify-content:space-between;width:320px;padding:8px 16px;background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);">
        <span style="font-size:14px;font-weight:500;color:var(--color-text-primary);">My App</span>
        <LanguageToggle />
      </div>
    `,
  }),
}
