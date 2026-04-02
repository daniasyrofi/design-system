import type { Meta, StoryObj } from '@storybook/vue3-vite'
import EmptyState from './EmptyState.vue'

const meta: Meta<typeof EmptyState> = {
  title: 'Molecules/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}
export default meta

type Story = StoryObj<typeof EmptyState>

const BoxIcon = `
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>`

export const Default: Story = {
  render: (args) => ({
    components: { EmptyState },
    setup: () => ({ args, BoxIcon }),
    template: `
      <div style="border:1px dashed var(--color-border);border-radius:var(--radius-xl);">
        <EmptyState v-bind="args">
          <template #icon><span v-html="BoxIcon" /></template>
          <button style="padding:8px 20px;background:var(--color-primary);color:white;border-radius:var(--radius-md);border:none;cursor:pointer;font-size:14px;font-weight:500;">
            Add item
          </button>
        </EmptyState>
      </div>
    `,
  }),
  args: {
    title: 'No items yet',
    description: 'Get started by adding your first item.',
    size: 'md',
  },
}

export const AllSizes: Story = {
  render: () => ({
    components: { EmptyState },
    setup: () => ({ BoxIcon }),
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;">
        <div v-for="size in ['sm','md','lg']" :key="size" style="border:1px dashed var(--color-border);border-radius:var(--radius-xl);">
          <EmptyState :size="size" :title="size + ' — No results'" description="Try a different search term.">
            <template #icon><span v-html="BoxIcon" /></template>
          </EmptyState>
        </div>
      </div>
    `,
  }),
}

export const WithoutIcon: Story = {
  args: {
    title: 'Nothing here',
    description: 'Come back later.',
    size: 'md',
  },
}
