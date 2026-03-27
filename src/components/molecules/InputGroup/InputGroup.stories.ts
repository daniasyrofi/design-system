import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import InputGroup from './InputGroup.vue'
import Input from '@/components/atoms/Input/Input.vue'
import Button from '@/components/atoms/Button/Button.vue'

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

const meta: Meta<typeof InputGroup> = {
  title: 'Molecules/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof InputGroup>

export const Default: Story = {
  render: () => ({
    components: { InputGroup, Input, Button },
    template: `
      <div style="width:100%;max-width:480px;">
        <InputGroup>
          <Input v-model="email" placeholder="Enter your email" type="email" />
          <Button>Subscribe</Button>
        </InputGroup>
      </div>
    `,
    setup() {
      const email = ref('')
      return { email }
    },
  }),
}

export const WithSearch: Story = {
  render: () => ({
    components: { InputGroup, Input, Button },
    template: `
      <div style="width:100%;max-width:480px;">
        <InputGroup>
          <Input v-model="q" placeholder="Search products..." type="search" />
          <Button variant="secondary">Search</Button>
        </InputGroup>
      </div>
    `,
    setup() {
      const q = ref('')
      return { q }
    },
  }),
}

export const MultipleSegments: Story = {
  render: () => ({
    components: { InputGroup, Input, Button },
    template: `
      <div style="width:100%;max-width:520px;">
        <InputGroup>
          <Button variant="secondary">https://</Button>
          <Input v-model="domain" placeholder="your-domain" />
          <Button variant="secondary">.com</Button>
        </InputGroup>
      </div>
    `,
    setup() {
      const domain = ref('')
      return { domain }
    },
  }),
}
