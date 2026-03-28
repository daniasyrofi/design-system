import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Toggle from './Toggle.vue'

const meta: Meta<typeof Toggle> = {
  title: 'Atoms/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    modelValue: { control: 'boolean' },
    size:       { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled:   { control: 'boolean' },
    label:      { control: 'text' },
  },
  args: {
    modelValue: false,
    size:       'md',
    disabled:   false,
    label:      'Toggle',
  },
}
export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = {
  render: (args: any) => ({
    components: { Toggle },
    setup() {
      const val = ref(args.modelValue ?? false)
      return { args, val }
    },
    template: '<Toggle v-bind="args" v-model="val" />',
  }),
}

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => ({
    components: { Toggle },
    setup: () => ({
      sm: ref(true),
      md: ref(true),
      lg: ref(true),
    }),
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <Toggle v-model="sm" size="sm" label="Small (sm)" />
        <Toggle v-model="md" size="md" label="Medium (md)" />
        <Toggle v-model="lg" size="lg" label="Large (lg)" />
      </div>
    `,
  }),
}

export const OnOff: Story = {
  name: 'On / Off',
  render: () => ({
    components: { Toggle },
    template: `
      <div style="display:flex;gap:24px;align-items:center;">
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Toggle :model-value="true" />
          <span style="font-size:12px;color:var(--color-text-secondary);">On</span>
        </div>
        <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Toggle :model-value="false" />
          <span style="font-size:12px;color:var(--color-text-secondary);">Off</span>
        </div>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { Toggle },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <Toggle :model-value="false" disabled label="Disabled off" />
        <Toggle :model-value="true"  disabled label="Disabled on" />
      </div>
    `,
  }),
}

export const SettingsPanel: Story = {
  name: 'Settings Panel',
  render: () => ({
    components: { Toggle },
    setup() {
      const settings = ref({
        notifications: true,
        emails:        false,
        dark:          false,
        analytics:     true,
        twoFactor:     false,
      })
      return { settings }
    },
    template: `
      <div style="width:320px;border:1px solid var(--color-border);border-radius:var(--radius-lg);background:var(--color-surface);overflow:hidden;">
        <div style="padding:14px 16px;border-bottom:1px solid var(--color-border);">
          <p style="font-size:14px;font-weight:600;color:var(--color-text-heading);">Preferences</p>
        </div>
        <div style="display:flex;flex-direction:column;">
          <div v-for="[key, label, desc] in [
            ['notifications', 'Push notifications',   'Get notified about activity'],
            ['emails',        'Email updates',         'Weekly digest emails'],
            ['analytics',     'Usage analytics',       'Help improve the product'],
            ['twoFactor',     'Two-factor auth',       'Extra login security'],
          ]" :key="key" style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid var(--color-border);">
            <div>
              <p style="font-size:14px;font-weight:500;color:var(--color-text-primary);">{{ label }}</p>
              <p style="font-size:12px;color:var(--color-text-secondary);margin-top:2px;">{{ desc }}</p>
            </div>
            <Toggle v-model="settings[key]" />
          </div>
        </div>
      </div>
    `,
  }),
}

export const WithLabel: Story = {
  name: 'With Label',
  render: () => ({
    components: { Toggle },
    setup: () => ({ active: ref(true) }),
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <Toggle v-model="active" label="Receive notifications" />
        <p style="font-size:13px;color:var(--color-text-secondary);">Status: {{ active ? 'Enabled ✓' : 'Disabled' }}</p>
      </div>
    `,
  }),
}
