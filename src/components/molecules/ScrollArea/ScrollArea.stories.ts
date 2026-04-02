import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ScrollArea from './ScrollArea.vue'

const meta: Meta<typeof ScrollArea> = {
  title: 'Molecules/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'select', options: ['vertical', 'horizontal', 'both'] },
  },
}
export default meta

type Story = StoryObj<typeof ScrollArea>

export const Vertical: Story = {
  render: () => ({
    components: { ScrollArea },
    template: `
      <ScrollArea maxHeight="200px" style="border:1px solid var(--color-border);border-radius:var(--radius-md);">
        <div style="padding:16px;display:flex;flex-direction:column;gap:8px;">
          <div v-for="i in 20" :key="i" style="padding:8px 12px;background:var(--color-bg-subtle);border-radius:var(--radius-sm);font-size:13px;color:var(--color-text-primary);">
            Item {{ i }}
          </div>
        </div>
      </ScrollArea>
    `,
  }),
}

export const Horizontal: Story = {
  render: () => ({
    components: { ScrollArea },
    template: `
      <ScrollArea direction="horizontal" maxWidth="400px" style="border:1px solid var(--color-border);border-radius:var(--radius-md);">
        <div style="display:flex;gap:8px;padding:16px;width:max-content;">
          <div v-for="i in 12" :key="i" style="flex-shrink:0;width:120px;height:80px;background:var(--color-bg-subtle);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;font-size:13px;color:var(--color-text-primary);">
            Card {{ i }}
          </div>
        </div>
      </ScrollArea>
    `,
  }),
}
