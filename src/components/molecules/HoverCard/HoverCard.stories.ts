import type { Meta, StoryObj } from '@storybook/vue3-vite'
import HoverCard from './HoverCard.vue'

const meta: Meta<typeof HoverCard> = {
  title: 'Molecules/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
  argTypes: {
    placement:  { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    openDelay:  { control: 'number' },
    closeDelay: { control: 'number' },
    width:      { control: 'text' },
  },
}
export default meta

type Story = StoryObj<typeof HoverCard>

export const Default: Story = {
  render: (args) => ({
    components: { HoverCard },
    setup: () => ({ args }),
    template: `
      <div style="padding:80px;display:flex;justify-content:center;">
        <HoverCard v-bind="args">
          <template #trigger>
            <a href="#" style="font-size:14px;font-weight:500;color:var(--color-primary);text-decoration:underline;" @click.prevent>@abadikan</a>
          </template>
          <div style="display:flex;flex-direction:column;gap:10px;min-width:240px;">
            <div style="display:flex;align-items:center;gap:12px;">
              <div style="width:40px;height:40px;border-radius:50%;background:var(--color-primary);display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:14px;">A</div>
              <div>
                <p style="font-weight:600;font-size:14px;color:var(--color-text-primary);">Abadikan</p>
                <p style="font-size:12px;color:var(--color-text-secondary);">@abadikan</p>
              </div>
            </div>
            <p style="font-size:13px;color:var(--color-text-secondary);line-height:1.5;">
              Digital wedding invitation platform. Craft beautiful, memorable moments.
            </p>
            <div style="display:flex;gap:16px;">
              <span style="font-size:12px;color:var(--color-text-secondary);"><strong style="color:var(--color-text-primary);">120</strong> Following</span>
              <span style="font-size:12px;color:var(--color-text-secondary);"><strong style="color:var(--color-text-primary);">4.2K</strong> Followers</span>
            </div>
          </div>
        </HoverCard>
      </div>
    `,
  }),
  args: { placement: 'bottom', openDelay: 200 },
}

export const AllPlacements: Story = {
  render: () => ({
    components: { HoverCard },
    template: `
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:80px;padding:80px;">
        <div v-for="p in ['top','bottom','left','right']" :key="p" style="display:flex;justify-content:center;align-items:center;">
          <HoverCard :placement="p" :openDelay="0">
            <template #trigger>
              <button style="padding:8px 16px;border:1px solid var(--color-border);border-radius:var(--radius-md);font-size:13px;cursor:pointer;background:var(--color-surface);color:var(--color-text-primary);">{{ p }}</button>
            </template>
            <p style="font-size:13px;color:var(--color-text-secondary);">Opens to the {{ p }}</p>
          </HoverCard>
        </div>
      </div>
    `,
  }),
}
