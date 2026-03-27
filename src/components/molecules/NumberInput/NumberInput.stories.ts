import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import NumberInput from './NumberInput.vue'

const canvas = () => ({
  template: `
    <div style="
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 48px 32px;
      background-color: #eceae4;
      background-image: radial-gradient(circle, rgba(0,0,0,0.11) 1px, transparent 1px);
      background-size: 22px 22px;
    ">
      <story />
    </div>
  `,
})

const meta: Meta<typeof NumberInput> = {
  title: 'Molecules/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    modelValue: { control: 'number' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof NumberInput>

export const Default: Story = {
  render: () => ({
    components: { NumberInput },
    template: `
      <div style="width:100%;max-width:200px;">
        <NumberInput v-model="val" label="Quantity" :min="0" :max="99" />
      </div>
    `,
    setup() {
      const val = ref(3)
      return { val }
    },
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { NumberInput },
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;width:100%;max-width:200px;">
        <NumberInput v-model="v1" size="sm" label="Small" :min="0" :max="10" />
        <NumberInput v-model="v2" size="md" label="Medium" :min="0" :max="10" />
        <NumberInput v-model="v3" size="lg" label="Large" :min="0" :max="10" />
      </div>
    `,
    setup() {
      const v1 = ref(2)
      const v2 = ref(5)
      const v3 = ref(8)
      return { v1, v2, v3 }
    },
  }),
}

export const StepValues: Story = {
  render: () => ({
    components: { NumberInput },
    template: `
      <div style="width:100%;max-width:200px;">
        <NumberInput v-model="val" label="Temperature (°C)" :min="-20" :max="50" :step="0.5" />
      </div>
    `,
    setup() {
      const val = ref(22)
      return { val }
    },
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { NumberInput },
    template: `
      <div style="width:100%;max-width:200px;">
        <NumberInput v-model="val" label="Locked" :min="0" :max="10" disabled />
      </div>
    `,
    setup() {
      const val = ref(5)
      return { val }
    },
  }),
}
