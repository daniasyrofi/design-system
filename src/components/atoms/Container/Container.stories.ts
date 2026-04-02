import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Container from './Container.vue'

const meta: Meta<typeof Container> = {
  title: 'Atoms/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    size:     { control: 'select', options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'] },
    padded:   { control: 'boolean' },
    centered: { control: 'boolean' },
    as:       { control: 'text' },
  },
}
export default meta

type Story = StoryObj<typeof Container>

export const Default: Story = {
  render: (args) => ({
    components: { Container },
    setup: () => ({ args }),
    template: `
      <div style="background:var(--color-bg-subtle);padding:16px;min-height:100px;">
        <Container v-bind="args">
          <div style="background:var(--color-primary-light);border-radius:var(--radius-md);padding:24px;text-align:center;color:var(--color-primary);font-weight:500;">
            Content inside container (max-width: {{ args.size }})
          </div>
        </Container>
      </div>
    `,
  }),
  args: { size: 'lg', padded: true, centered: true },
}

export const AllSizes: Story = {
  render: () => ({
    components: { Container },
    template: `
      <div style="display:flex;flex-direction:column;gap:8px;background:var(--color-bg-subtle);padding:16px;">
        <template v-for="size in ['sm','md','lg','xl']" :key="size">
          <Container :size="size">
            <div style="background:var(--color-primary-light);border-radius:var(--radius-sm);padding:10px 16px;font-size:12px;color:var(--color-primary);">
              {{ size }} — max-width: {{ { sm:'640px', md:'768px', lg:'1024px', xl:'1280px' }[size] }}
            </div>
          </Container>
        </template>
      </div>
    `,
  }),
}
