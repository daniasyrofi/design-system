import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import PinInput from './PinInput.vue'

const meta: Meta<typeof PinInput> = {
  title: 'Molecules/PinInput',
  component: PinInput,
  tags: ['autodocs'],
  argTypes: {
    size:    { control: 'select', options: ['sm', 'md', 'lg'] },
    type:    { control: 'select', options: ['number', 'alphanumeric'] },
    length:  { control: 'number' },
    masked:  { control: 'boolean' },
    error:   { control: 'boolean' },
    disabled:{ control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<typeof PinInput>

export const Default: Story = {
  render: (args) => ({
    components: { PinInput },
    setup: () => {
      const value = ref('')
      const done  = ref(false)
      return { args, value, done }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;align-items:flex-start;">
        <PinInput v-bind="args" v-model="value" @complete="done = true" />
        <p v-if="value" style="font-size:13px;color:var(--color-text-secondary);">Value: {{ value }}</p>
        <p v-if="done" style="font-size:13px;color:var(--color-success);">✓ Complete!</p>
      </div>
    `,
  }),
  args: { length: 6, size: 'md', type: 'number' },
}

export const AllSizes: Story = {
  render: () => ({
    components: { PinInput },
    setup: () => ({ vals: { sm: ref(''), md: ref(''), lg: ref('') } }),
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start;">
        <div v-for="size in ['sm','md','lg']" :key="size" style="display:flex;align-items:center;gap:12px;">
          <span style="width:24px;font-size:12px;color:var(--color-text-tertiary);">{{ size }}</span>
          <PinInput :size="size" :length="4" v-model="vals[size].value" />
        </div>
      </div>
    `,
  }),
}

export const ErrorState: Story = {
  render: () => ({
    components: { PinInput },
    setup: () => ({ value: ref('1234') }),
    template: `
      <div style="display:flex;flex-direction:column;gap:8px;">
        <PinInput :length="4" v-model="value" error />
        <p style="font-size:12px;color:var(--color-danger);">Invalid PIN. Please try again.</p>
      </div>
    `,
  }),
}
