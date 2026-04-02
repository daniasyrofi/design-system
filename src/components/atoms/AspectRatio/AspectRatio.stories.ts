import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AspectRatio from './AspectRatio.vue'

const meta: Meta<typeof AspectRatio> = {
  title: 'Atoms/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs'],
  argTypes: {
    ratio: { control: 'number' },
    as:    { control: 'text' },
  },
}
export default meta

type Story = StoryObj<typeof AspectRatio>

export const Default: Story = {
  render: (args) => ({
    components: { AspectRatio },
    setup: () => ({ args }),
    template: `
      <div style="max-width:480px;">
        <AspectRatio v-bind="args">
          <div style="width:100%;height:100%;background:var(--color-primary-light);border-radius:var(--radius-lg);display:flex;align-items:center;justify-content:center;color:var(--color-primary);font-size:14px;font-weight:500;">
            16 : 9
          </div>
        </AspectRatio>
      </div>
    `,
  }),
  args: { ratio: 16 / 9 },
}

export const CommonRatios: Story = {
  render: () => ({
    components: { AspectRatio },
    template: `
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;max-width:600px;">
        <div v-for="[label, r] in [['16:9', 16/9], ['4:3', 4/3], ['1:1', 1]]" :key="label">
          <AspectRatio :ratio="r">
            <div style="width:100%;height:100%;background:var(--color-primary-light);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;color:var(--color-primary);font-size:13px;font-weight:600;">
              {{ label }}
            </div>
          </AspectRatio>
        </div>
      </div>
    `,
  }),
}
