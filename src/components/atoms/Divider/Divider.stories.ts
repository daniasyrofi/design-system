import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Divider from './Divider.vue'

const meta: Meta<typeof Divider> = {
  title: 'Atoms/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    orientation:   { control: 'select', options: ['horizontal', 'vertical'] },
    variant:       { control: 'select', options: ['solid', 'dashed', 'dotted'] },
    label:         { control: 'text' },
    labelPosition: { control: 'select', options: ['start', 'center', 'end'] },
  },
  args: {
    orientation:   'horizontal',
    variant:       'solid',
    labelPosition: 'center',
  },
}
export default meta
type Story = StoryObj<typeof Divider>

export const Default: Story = {
  render: (args) => ({
    components: { Divider },
    setup: () => ({ args }),
    template: '<div style="width:320px;"><Divider v-bind="args" /></div>',
  }),
}

export const Horizontal: Story = {
  render: () => ({
    components: { Divider },
    template: `
      <div style="width:300px;display:flex;flex-direction:column;gap:16px;">
        <p style="font-size:14px;color:var(--color-text-primary);">Content above the divider</p>
        <Divider />
        <p style="font-size:14px;color:var(--color-text-primary);">Content below the divider</p>
      </div>
    `,
  }),
}

export const Vertical: Story = {
  render: () => ({
    components: { Divider },
    template: `
      <div style="height:40px;display:flex;align-items:center;gap:16px;">
        <span style="font-size:14px;color:var(--color-text-primary);">Left</span>
        <Divider orientation="vertical" />
        <span style="font-size:14px;color:var(--color-text-primary);">Right</span>
        <Divider orientation="vertical" />
        <span style="font-size:14px;color:var(--color-text-primary);">End</span>
      </div>
    `,
  }),
}

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => ({
    components: { Divider },
    template: `
      <div style="width:300px;display:flex;flex-direction:column;gap:20px;">
        <div>
          <p style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:8px;">solid</p>
          <Divider variant="solid" />
        </div>
        <div>
          <p style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:8px;">dashed</p>
          <Divider variant="dashed" />
        </div>
        <div>
          <p style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:8px;">dotted</p>
          <Divider variant="dotted" />
        </div>
      </div>
    `,
  }),
}

export const WithLabel: Story = {
  name: 'With Label',
  render: () => ({
    components: { Divider },
    template: `
      <div style="width:320px;display:flex;flex-direction:column;gap:16px;">
        <Divider label="OR" />
        <Divider label="Section" labelPosition="start" />
        <Divider label="Continue" labelPosition="end" />
        <Divider label="··· Today ···" variant="dashed" />
      </div>
    `,
  }),
}

export const InCard: Story = {
  name: 'In Card',
  render: () => ({
    components: { Divider },
    template: `
      <div style="width:280px;border-radius:var(--radius-lg);border:1px solid var(--color-border);background:var(--color-surface);padding:16px;">
        <p style="font-weight:600;font-size:15px;color:var(--color-text-heading);">Card Title</p>
        <p style="font-size:13px;color:var(--color-text-secondary);margin-top:4px;">Description sits below the title.</p>
        <Divider style="margin:16px 0;" />
        <p style="font-size:13px;color:var(--color-text-secondary);">Footer content appears below the divider.</p>
      </div>
    `,
  }),
}

export const OrForm: Story = {
  name: 'OR — Form Separator',
  render: () => ({
    components: { Divider },
    template: `
      <div style="width:300px;display:flex;flex-direction:column;gap:12px;">
        <button style="width:100%;padding:8px;border:1px solid var(--color-border);border-radius:var(--radius-lg);background:var(--color-surface);font-size:14px;font-weight:500;color:var(--color-text-primary);cursor:pointer;">Continue with Google</button>
        <Divider label="OR" />
        <button style="width:100%;padding:8px;border-radius:var(--radius-lg);background:var(--color-primary);font-size:14px;font-weight:500;color:#fff;cursor:pointer;border:none;">Sign in with email</button>
      </div>
    `,
  }),
}
