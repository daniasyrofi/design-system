import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Slider from './Slider.vue'

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

const meta: Meta<typeof Slider> = {
  title: 'Molecules/Slider',
  component: Slider,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    modelValue: { control: { type: 'range', min: 0, max: 100 } },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    showValue: { control: 'boolean' },
    label: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Slider>

export const Default: Story = {
  render: () => ({
    components: { Slider },
    template: `
      <div style="width:100%;max-width:380px;">
        <Slider v-model="val" label="Volume" show-value />
      </div>
    `,
    setup() {
      const val = ref(50)
      return { val }
    },
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { Slider },
    template: `
      <div style="display:flex;flex-direction:column;gap:32px;width:100%;max-width:380px;">
        <Slider v-model="v1" size="sm" label="Small" show-value />
        <Slider v-model="v2" size="md" label="Medium" show-value />
        <Slider v-model="v3" size="lg" label="Large" show-value />
      </div>
    `,
    setup() {
      const v1 = ref(30)
      const v2 = ref(50)
      const v3 = ref(70)
      return { v1, v2, v3 }
    },
  }),
}

export const CustomRange: Story = {
  render: () => ({
    components: { Slider },
    template: `
      <div style="width:100%;max-width:380px;">
        <Slider v-model="val" :min="0" :max="10" :step="1" label="Rating" show-value />
      </div>
    `,
    setup() {
      const val = ref(7)
      return { val }
    },
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { Slider },
    template: `
      <div style="width:100%;max-width:380px;">
        <Slider v-model="val" disabled label="Disabled" show-value />
      </div>
    `,
    setup() {
      const val = ref(40)
      return { val }
    },
  }),
}
