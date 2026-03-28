import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Popover from './Popover.vue'
import Button from '@/components/atoms/Button/Button.vue'
import Input from '@/components/atoms/Input/Input.vue'

// ── Canvas decorator ──────────────────────────────────────────────────────────
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

const meta: Meta<typeof Popover> = {
  title: 'Molecules/Popover',
  component: Popover,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    trigger:             { control: 'select', options: ['click', 'hover', 'manual'] },
    placement:           { control: 'select', options: ['top', 'bottom', 'left', 'right', 'top-start', 'top-end', 'bottom-start', 'bottom-end'] },
    width:               { control: 'text' },
    arrow:               { control: 'boolean' },
    closeOnClickOutside: { control: 'boolean' },
  },
  args: {
    trigger:             'click',
    placement:           'bottom',
    width:               'auto',
    arrow:               true,
    closeOnClickOutside: true,
  },
}
export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
  render: (args) => ({
    components: { Popover, Button },
    setup: () => ({ args }),
    template: `
      <div style="display:flex;align-items:center;justify-content:center;padding:80px;">
        <Popover v-bind="args">
          <template #trigger>
            <Button variant="secondary">Click me</Button>
          </template>
          <div style="font-size:14px;color:var(--color-text-primary);">
            <p style="font-weight:600;margin-bottom:4px;">Popover content</p>
            <p style="color:var(--color-text-secondary);">This is interactive content inside a popover.</p>
          </div>
        </Popover>
      </div>
    `,
  }),
}

export const AllPlacements: Story = {
  name: 'All Placements',
  render: () => ({
    components: { Popover, Button },
    template: `
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:32px;padding:96px;place-items:center;min-height:500px;">
        <div />
        <Popover placement="top" trigger="click">
          <template #trigger><Button variant="secondary" size="sm">Top</Button></template>
          <p style="font-size:14px;color:var(--color-text-primary);">Top placement</p>
        </Popover>
        <div />

        <Popover placement="left" trigger="click">
          <template #trigger><Button variant="secondary" size="sm">Left</Button></template>
          <p style="font-size:14px;color:var(--color-text-primary);">Left placement</p>
        </Popover>
        <div />
        <Popover placement="right" trigger="click">
          <template #trigger><Button variant="secondary" size="sm">Right</Button></template>
          <p style="font-size:14px;color:var(--color-text-primary);">Right placement</p>
        </Popover>

        <div />
        <Popover placement="bottom" trigger="click">
          <template #trigger><Button variant="secondary" size="sm">Bottom</Button></template>
          <p style="font-size:14px;color:var(--color-text-primary);">Bottom placement</p>
        </Popover>
        <div />
      </div>
    `,
  }),
}

export const WithForm: Story = {
  name: 'With Form',
  render: () => ({
    components: { Popover, Button, Input },
    setup() {
      const name = ref('')
      const email = ref('')
      function handleSubmit() {
        console.log('Submitted:', { name: name.value, email: email.value })
      }
      return { name, email, handleSubmit }
    },
    template: `
      <div style="display:flex;align-items:center;justify-content:center;padding:80px;">
        <Popover placement="bottom-start" width="280px">
          <template #trigger>
            <Button>{{ $t('common.edit') }}</Button>
          </template>
          <form @submit.prevent="handleSubmit" style="display:flex;flex-direction:column;gap:12px;">
            <p style="font-size:14px;font-weight:600;color:var(--color-text-primary);">{{ $t('common.edit') }}</p>
            <Input v-model="name" label="Name" placeholder="John Doe" size="sm" />
            <Input v-model="email" label="Email" type="email" placeholder="john@example.com" size="sm" />
            <Button type="submit" size="sm" fullWidth>{{ $t('common.save') }}</Button>
          </form>
        </Popover>
      </div>
    `,
  }),
}

export const ClickTrigger: Story = {
  name: 'Click Trigger',
  render: () => ({
    components: { Popover, Button },
    template: `
      <div style="display:flex;align-items:center;justify-content:center;padding:80px;">
        <Popover trigger="click" placement="bottom">
          <template #trigger>
            <Button variant="secondary">Click to toggle</Button>
          </template>
          <div style="font-size:14px;color:var(--color-text-primary);">
            <p style="font-weight:600;margin-bottom:4px;">Click-triggered</p>
            <p style="color:var(--color-text-secondary);">Click the button again or outside to close.</p>
          </div>
        </Popover>
      </div>
    `,
  }),
}

export const HoverTrigger: Story = {
  name: 'Hover Trigger',
  render: () => ({
    components: { Popover, Button },
    template: `
      <div style="display:flex;align-items:center;justify-content:center;padding:80px;">
        <Popover trigger="hover" placement="bottom">
          <template #trigger>
            <Button variant="secondary">Hover me</Button>
          </template>
          <div style="font-size:14px;color:var(--color-text-primary);">
            <p style="font-weight:600;margin-bottom:4px;">Hover-triggered</p>
            <p style="color:var(--color-text-secondary);">Move your mouse away to close. You can interact with this content.</p>
            <a href="#" style="color:var(--color-primary);text-decoration:underline;font-size:12px;margin-top:4px;display:inline-block;">Learn more</a>
          </div>
        </Popover>
      </div>
    `,
  }),
}
