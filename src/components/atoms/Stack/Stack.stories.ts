import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Stack from './Stack.vue'

const meta: Meta<typeof Stack> = {
  title: 'Atoms/Stack',
  component: Stack,
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'select', options: ['vertical', 'horizontal'] },
    gap:       { control: 'number' },
    align:     { control: 'select', options: ['start', 'center', 'end', 'stretch', 'baseline'] },
    justify:   { control: 'select', options: ['start', 'center', 'end', 'between', 'around', 'evenly'] },
    wrap:      { control: 'boolean' },
    inline:    { control: 'boolean' },
    as:        { control: 'text' },
  },
}
export default meta

type Story = StoryObj<typeof Stack>

const Box = `<div style="background:var(--color-primary-light);color:var(--color-primary);border-radius:var(--radius-md);padding:12px 20px;font-size:13px;font-weight:500;">`

export const Vertical: Story = {
  render: () => ({
    components: { Stack },
    template: `
      <Stack direction="vertical" :gap="3">
        ${Box}Item 1</div>
        ${Box}Item 2</div>
        ${Box}Item 3</div>
      </Stack>
    `,
  }),
}

export const Horizontal: Story = {
  render: () => ({
    components: { Stack },
    template: `
      <Stack direction="horizontal" :gap="3" align="center">
        ${Box}Item 1</div>
        ${Box}Item 2</div>
        ${Box}Item 3</div>
      </Stack>
    `,
  }),
}

export const SpaceBetween: Story = {
  render: () => ({
    components: { Stack },
    template: `
      <Stack direction="horizontal" justify="between" align="center" style="width:100%;">
        ${Box}Left</div>
        ${Box}Center</div>
        ${Box}Right</div>
      </Stack>
    `,
  }),
}

export const Wrap: Story = {
  render: () => ({
    components: { Stack },
    template: `
      <Stack direction="horizontal" :gap="2" wrap style="max-width:300px;">
        <div v-for="i in 8" :key="i" style="background:var(--color-primary-light);color:var(--color-primary);border-radius:var(--radius-sm);padding:8px 14px;font-size:12px;font-weight:500;">Tag {{ i }}</div>
      </Stack>
    `,
  }),
}
