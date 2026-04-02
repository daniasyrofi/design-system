import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import SegmentedControl from './SegmentedControl.vue'

const meta: Meta<typeof SegmentedControl> = {
  title: 'Molecules/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  argTypes: {
    size:      { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled:  { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<typeof SegmentedControl>

export const Default: Story = {
  render: (args) => ({
    components: { SegmentedControl },
    setup: () => ({ args, value: ref('week') }),
    template: `<SegmentedControl v-bind="args" v-model="value" />`,
  }),
  args: {
    options: [
      { label: 'Day',   value: 'day' },
      { label: 'Week',  value: 'week' },
      { label: 'Month', value: 'month' },
    ],
    size: 'md',
  },
}

export const AllSizes: Story = {
  render: () => ({
    components: { SegmentedControl },
    setup: () => ({
      values: { sm: ref('b'), md: ref('b'), lg: ref('b') },
      opts: [{ label: 'A', value: 'a' }, { label: 'B', value: 'b' }, { label: 'C', value: 'c' }],
    }),
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;align-items:flex-start;">
        <SegmentedControl v-model="values.sm.value" :options="opts" size="sm" />
        <SegmentedControl v-model="values.md.value" :options="opts" size="md" />
        <SegmentedControl v-model="values.lg.value" :options="opts" size="lg" />
      </div>
    `,
  }),
}

export const FullWidth: Story = {
  render: () => ({
    components: { SegmentedControl },
    setup: () => ({ value: ref('list') }),
    template: `
      <div style="max-width:400px;">
        <SegmentedControl
          v-model="value"
          fullWidth
          :options="[{ label: 'List', value: 'list' }, { label: 'Grid', value: 'grid' }, { label: 'Table', value: 'table' }]"
        />
      </div>
    `,
  }),
}
