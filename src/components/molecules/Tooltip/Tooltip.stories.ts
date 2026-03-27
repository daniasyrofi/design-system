import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Tooltip from './Tooltip.vue'
import Button from '@/components/atoms/Button/Button.vue'

// ── Canvas decorator — consistent with Alert/Toast ────────────────────────────
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

const meta: Meta<typeof Tooltip> = {
  title: 'Molecules/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    content:   { control: 'text' },
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    trigger:   { control: 'select', options: ['hover', 'click', 'focus'] },
    delay:     { control: 'number' },
    maxWidth:  { control: 'text' },
    arrow:     { control: 'boolean' },
  },
  args: {
    content:   'Tooltip text',
    placement: 'top',
    trigger:   'hover',
    delay:     200,
    maxWidth:  '200px',
    arrow:     true,
  },
}
export default meta
type Story = StoryObj<typeof Tooltip>

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: (args) => ({
    components: { Tooltip, Button },
    setup: () => ({ args }),
    template: `
      <div style="display:flex;align-items:center;justify-content:center;padding:80px;">
        <Tooltip v-bind="args">
          <Button>Hover me</Button>
        </Tooltip>
      </div>
    `,
  }),
}

// ── All Placements ────────────────────────────────────────────────────────────

export const AllPlacements: Story = {
  name: 'All Placements',
  render: () => ({
    components: { Tooltip, Button },
    template: `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:48px;padding:80px;place-items:center;min-height:300px;">
        <Tooltip content="Tooltip on top"    placement="top">    <Button variant="secondary" size="sm">Top</Button></Tooltip>
        <Tooltip content="Tooltip on bottom" placement="bottom"> <Button variant="secondary" size="sm">Bottom</Button></Tooltip>
        <Tooltip content="Tooltip on left"   placement="left">   <Button variant="secondary" size="sm">Left</Button></Tooltip>
        <Tooltip content="Tooltip on right"  placement="right">  <Button variant="secondary" size="sm">Right</Button></Tooltip>
      </div>
    `,
  }),
}

// ── Click Trigger ─────────────────────────────────────────────────────────────

export const ClickTrigger: Story = {
  name: 'Click Trigger',
  render: () => ({
    components: { Tooltip, Button },
    template: `
      <div style="display:flex;align-items:center;justify-content:center;padding:80px;">
        <Tooltip content="Click-triggered tooltip" trigger="click">
          <Button>Click me</Button>
        </Tooltip>
      </div>
    `,
  }),
}

// ── No Arrow ──────────────────────────────────────────────────────────────────

export const NoArrow: Story = {
  name: 'No Arrow',
  render: () => ({
    components: { Tooltip, Button },
    template: `
      <div style="display:flex;align-items:center;justify-content:center;padding:80px;">
        <Tooltip content="No arrow on this tooltip" :arrow="false">
          <Button variant="secondary">No arrow</Button>
        </Tooltip>
      </div>
    `,
  }),
}

// ── Rich Content ──────────────────────────────────────────────────────────────

export const RichContent: Story = {
  name: 'Rich Content',
  render: () => ({
    components: { Tooltip, Button },
    template: `
      <div style="display:flex;align-items:center;justify-content:center;padding:80px;">
        <Tooltip placement="bottom" max-width="260px">
          <Button variant="secondary">Rich tooltip</Button>
          <template #content>
            <div style="display:flex;flex-direction:column;gap:4px;">
              <span style="font-weight:600;">Pro tip</span>
              <span style="font-size:12px;opacity:0.8;">
                Use <kbd style="padding:1px 5px;border-radius:4px;background:rgba(255,255,255,0.2);font-size:11px;">Esc</kbd> key to close modals quickly.
              </span>
            </div>
          </template>
        </Tooltip>
      </div>
    `,
  }),
}
