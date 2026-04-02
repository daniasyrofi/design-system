import type { Meta, StoryObj } from '@storybook/vue3-vite'
import VisuallyHidden from './VisuallyHidden.vue'

const meta: Meta<typeof VisuallyHidden> = {
  title: 'Atoms/VisuallyHidden',
  component: VisuallyHidden,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof VisuallyHidden>

export const Default: Story = {
  render: () => ({
    components: { VisuallyHidden },
    template: `
      <div>
        <button style="padding: 8px 16px; border-radius: 6px; background: var(--color-primary); color: white; border: none; cursor: pointer;">
          <VisuallyHidden>Save document</VisuallyHidden>
          💾
        </button>
        <p style="margin-top:12px;font-size:13px;color:var(--color-text-secondary);">
          The button above has a hidden label "Save document" for screen readers, but only shows the emoji visually.
        </p>
      </div>
    `,
  }),
}
