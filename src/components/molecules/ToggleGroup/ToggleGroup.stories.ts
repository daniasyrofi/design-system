import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import ToggleGroup from './ToggleGroup.vue'
import ToggleGroupItem from './ToggleGroupItem.vue'

const meta: Meta<typeof ToggleGroup> = {
  title: 'Molecules/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['single', 'multiple'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    disabled: { control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<typeof ToggleGroup>

export const Default: Story = {
  render: (args) => ({
    components: { ToggleGroup, ToggleGroupItem },
    setup: () => ({ args, value: ref('bold') }),
    template: `
      <ToggleGroup v-bind="args" v-model="value">
        <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
        <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
        <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
      </ToggleGroup>
    `,
  }),
  args: {
    type: 'single',
    size: 'md',
    orientation: 'horizontal',
    disabled: false,
  },
}

export const Multiple: Story = {
  render: (args) => ({
    components: { ToggleGroup, ToggleGroupItem },
    setup: () => ({ args, value: ref(['bold']) }),
    template: `
      <ToggleGroup v-bind="args" v-model="value">
        <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
        <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
        <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
      </ToggleGroup>
    `,
  }),
  args: {
    type: 'multiple',
    size: 'md',
    orientation: 'horizontal',
    disabled: false,
  },
}

export const WithIcons: Story = {
  render: () => ({
    components: { ToggleGroup, ToggleGroupItem },
    setup: () => ({ value: ref('list') }),
    template: `
      <ToggleGroup v-model="value" type="single" size="md">
        <ToggleGroupItem value="list" aria-label="List view">☰ List</ToggleGroupItem>
        <ToggleGroupItem value="grid" aria-label="Grid view">⊞ Grid</ToggleGroupItem>
        <ToggleGroupItem value="table" aria-label="Table view">⊟ Table</ToggleGroupItem>
      </ToggleGroup>
    `,
  }),
}

export const Vertical: Story = {
  render: () => ({
    components: { ToggleGroup, ToggleGroupItem },
    setup: () => ({ value: ref('bold') }),
    template: `
      <ToggleGroup v-model="value" type="single" orientation="vertical" size="md">
        <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
        <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
        <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
      </ToggleGroup>
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { ToggleGroup, ToggleGroupItem },
    setup: () => ({ value: ref('bold') }),
    template: `
      <ToggleGroup v-model="value" type="single" disabled size="md">
        <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
        <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
        <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
      </ToggleGroup>
    `,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { ToggleGroup, ToggleGroupItem },
    setup: () => ({
      sm: ref('bold'),
      md: ref('bold'),
      lg: ref('bold'),
    }),
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;align-items:flex-start;">
        <ToggleGroup v-model="sm" type="single" size="sm">
          <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
          <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
          <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup v-model="md" type="single" size="md">
          <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
          <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
          <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup v-model="lg" type="single" size="lg">
          <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
          <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
          <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
        </ToggleGroup>
      </div>
    `,
  }),
}
