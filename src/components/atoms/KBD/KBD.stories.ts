import type { Meta, StoryObj } from '@storybook/vue3-vite'
import KBD from './KBD.vue'

const meta: Meta<typeof KBD> = {
  title: 'Atoms/KBD',
  component: KBD,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}
export default meta

type Story = StoryObj<typeof KBD>

export const Default: Story = {
  render: (args) => ({
    components: { KBD },
    setup: () => ({ args }),
    template: `<KBD v-bind="args">⌘K</KBD>`,
  }),
  args: { size: 'md' },
}

export const AllSizes: Story = {
  render: () => ({
    components: { KBD },
    template: `
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
        <KBD size="sm">⌘K</KBD>
        <KBD size="md">⌘K</KBD>
        <KBD size="lg">⌘K</KBD>
      </div>
    `,
  }),
}

export const Shortcuts: Story = {
  render: () => ({
    components: { KBD },
    template: `
      <div style="display:flex;flex-direction:column;gap:8px;">
        <div style="display:flex;align-items:center;gap:4px;">
          <KBD>⌘</KBD><span style="font-size:12px;color:var(--color-text-secondary);">+</span><KBD>K</KBD>
          <span style="margin-left:8px;font-size:13px;color:var(--color-text-secondary);">Command Palette</span>
        </div>
        <div style="display:flex;align-items:center;gap:4px;">
          <KBD>Ctrl</KBD><span style="font-size:12px;color:var(--color-text-secondary);">+</span><KBD>S</KBD>
          <span style="margin-left:8px;font-size:13px;color:var(--color-text-secondary);">Save</span>
        </div>
        <div style="display:flex;align-items:center;gap:4px;">
          <KBD>Esc</KBD>
          <span style="margin-left:8px;font-size:13px;color:var(--color-text-secondary);">Close</span>
        </div>
        <div style="display:flex;align-items:center;gap:4px;">
          <KBD>↑</KBD><KBD>↓</KBD>
          <span style="margin-left:8px;font-size:13px;color:var(--color-text-secondary);">Navigate</span>
        </div>
      </div>
    `,
  }),
}
