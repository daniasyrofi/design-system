import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Rating from './Rating.vue'

const meta: Meta<typeof Rating> = {
  title: 'Molecules/Rating',
  component: Rating,
  tags: ['autodocs'],
  argTypes: {
    size:       { control: 'select', options: ['sm', 'md', 'lg'] },
    max:        { control: 'number' },
    readonly:   { control: 'boolean' },
    disabled:   { control: 'boolean' },
    allowClear: { control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<typeof Rating>

export const Default: Story = {
  render: (args) => ({
    components: { Rating },
    setup: () => {
      const value = ref(3)
      return { args, value }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-start;">
        <Rating v-bind="args" v-model="value" />
        <p style="font-size:13px;color:var(--color-text-secondary);">Value: {{ value }}</p>
      </div>
    `,
  }),
  args: { max: 5, size: 'md' },
}

export const AllSizes: Story = {
  render: () => ({
    components: { Rating },
    setup: () => ({ vals: { sm: ref(3), md: ref(4), lg: ref(5) } }),
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start;">
        <div v-for="size in ['sm','md','lg']" :key="size" style="display:flex;align-items:center;gap:12px;">
          <span style="width:24px;font-size:12px;color:var(--color-text-tertiary);">{{ size }}</span>
          <Rating :size="size" v-model="vals[size].value" />
        </div>
      </div>
    `,
  }),
}

export const Readonly: Story = {
  render: () => ({
    components: { Rating },
    template: `<Rating :model-value="3" :max="5" readonly />`,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { Rating },
    template: `<Rating :model-value="2" :max="5" disabled />`,
  }),
}

export const CustomMax: Story = {
  render: () => ({
    components: { Rating },
    setup: () => ({ value: ref(7) }),
    template: `<Rating :max="10" v-model="value" />`,
  }),
}
