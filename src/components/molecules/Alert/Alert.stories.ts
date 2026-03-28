import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { RiShieldCheckLine } from '@remixicon/vue'
import Alert from './Alert.vue'

// ── Canvas decorator — neutral dot-grid, alerts float above ───────────────────
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

const meta: Meta<typeof Alert> = {
  title: 'Molecules/Alert',
  component: Alert,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    variant:     { control: 'select', options: ['info', 'success', 'warning', 'danger'] },
    size:        { control: 'select', options: ['sm', 'md', 'lg'] },
    title:       { control: 'text' },
    icon:        { control: 'boolean' },
    dismissible: { control: 'boolean' },
  },
  args: {
    variant:     'info',
    size:        'md',
    title:       'Informational alert',
    icon:        true,
    dismissible: false,
  },
}
export default meta
type Story = StoryObj<typeof Alert>

const W = 'width:440px;max-width:100%;display:flex;flex-direction:column;gap:10px;'

// Inline text-link style (no solid buttons — matches macOS notification)
const lP = 'background:none;border:none;padding:0;cursor:pointer;font-size:13px;font-weight:600;color:var(--color-text-primary);letter-spacing:-0.01em;'
const lM = 'background:none;border:none;padding:0;cursor:pointer;font-size:13px;font-weight:400;color:var(--color-text-tertiary);letter-spacing:-0.01em;'

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: (args) => ({
    components: { Alert },
    setup: () => ({ args }),
    template: `<div style="${W}"><Alert v-bind="args">{{ $t('alert.defaultContext') }}</Alert></div>`,
  }),
}

// ── All Variants ──────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => ({
    components: { Alert },
    template: `
      <div style="${W}">
        <Alert variant="info" :title="$t('alert.systemUpdate.title')">
          {{ $t('alert.systemUpdate.desc') }}
        </Alert>
        <Alert variant="success" :title="$t('alert.paymentSuccess.title')">
          {{ $t('alert.paymentSuccess.desc') }}
        </Alert>
        <Alert variant="warning" :title="$t('alert.storageFull.title')">
          {{ $t('alert.storageFull.desc') }}
        </Alert>
        <Alert variant="danger" :title="$t('alert.saveFailed.title')">
          {{ $t('alert.saveFailed.desc') }}
        </Alert>
      </div>
    `,
  }),
}

// ── All Sizes ─────────────────────────────────────────────────────────────────

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => ({
    components: { Alert },
    setup: () => ({
      sizes: [
        { key: 'sm', label: 'Small',  body: 'Compact alert for tight spaces or inline feedback.' },
        { key: 'md', label: 'Medium', body: 'Default size — balanced for panel and page content.' },
        { key: 'lg', label: 'Large',  body: 'Prominent alert for critical or page-level messages.' },
      ] as const,
    }),
    template: `
      <div style="${W} gap:16px;">
        <div v-for="s in sizes" :key="s.key" style="display:flex;flex-direction:column;gap:6px;">
          <span style="font-size:10px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:rgba(0,0,0,0.35);">{{ s.label }}</span>
          <Alert variant="info" :size="s.key" title="Info message">{{ s.body }}</Alert>
        </div>
      </div>
    `,
  }),
}

// ── Dismissible ───────────────────────────────────────────────────────────────

export const Dismissible: Story = {
  render: () => ({
    components: { Alert },
    setup() {
      const show = ref(true)
      return { show }
    },
    template: `
      <div style="${W}">
        <Alert v-if="show" variant="warning" title="Unsaved changes" dismissible @dismiss="show = false">
          You have unsaved changes. They will be lost if you navigate away.
        </Alert>
        <button v-else style="font-size:13px;color:var(--color-text-tertiary);cursor:pointer;background:none;border:none;" @click="show = true">
          Show alert again
        </button>
      </div>
    `,
  }),
}

// ── Dismissible — All Variants ────────────────────────────────────────────────

export const DismissibleAllVariants: Story = {
  name: 'Dismissible — All Variants',
  render: () => ({
    components: { Alert },
    setup() {
      const visible = ref({ info: true, success: true, warning: true, danger: true })
      const resetAll = () => { visible.value = { info: true, success: true, warning: true, danger: true } }
      return { visible, resetAll }
    },
    template: `
      <div style="${W}">
        <Alert v-if="visible.info"    variant="info"    title="Update available"  dismissible @dismiss="visible.info = false">Version 2.4.1 is ready to install.</Alert>
        <Alert v-if="visible.success" variant="success" title="Profile saved"     dismissible @dismiss="visible.success = false">Your changes have been published successfully.</Alert>
        <Alert v-if="visible.warning" variant="warning" title="Low disk space"    dismissible @dismiss="visible.warning = false">Only 500 MB remaining. Free up space to continue.</Alert>
        <Alert v-if="visible.danger"  variant="danger"  title="Connection error"  dismissible @dismiss="visible.danger = false">Failed to sync data. Check your network connection.</Alert>
        <button style="font-size:12px;color:var(--color-text-tertiary);margin-top:4px;cursor:pointer;background:none;border:none;" @click="resetAll">Reset all</button>
      </div>
    `,
  }),
}

// ── Without Title ─────────────────────────────────────────────────────────────

export const WithoutTitle: Story = {
  name: 'Without Title',
  render: () => ({
    components: { Alert },
    template: `
      <div style="${W}">
        <Alert variant="info">Your session will expire in 10 minutes.</Alert>
        <Alert variant="success">Profile updated successfully.</Alert>
        <Alert variant="warning">Unsaved changes will be lost if you leave.</Alert>
        <Alert variant="danger">Invalid credentials. Please try again.</Alert>
      </div>
    `,
  }),
}

// ── Without Icon ──────────────────────────────────────────────────────────────

export const WithoutIcon: Story = {
  name: 'Without Icon',
  render: () => ({
    components: { Alert },
    template: `
      <div style="${W}">
        <Alert variant="info" title="Maintenance window" :icon="false">Scheduled maintenance on Sunday 02:00–04:00 UTC.</Alert>
        <Alert variant="danger" title="Account suspended" :icon="false">Your account has been suspended due to a policy violation.</Alert>
      </div>
    `,
  }),
}

// ── With Custom Icon ──────────────────────────────────────────────────────────

export const WithCustomIcon: Story = {
  name: 'With Custom Icon',
  render: () => ({
    components: { Alert, RiShieldCheckLine },
    template: `
      <div style="${W}">
        <Alert variant="success" title="Identity verified">
          <template #icon><RiShieldCheckLine :size="'16'" /></template>
          Your identity has been verified. You now have full account access.
        </Alert>
      </div>
    `,
  }),
}

// ── With Actions ─────────────────────────────────────────────────────────────

export const WithAction: Story = {
  name: 'With Actions',
  render: () => ({
    components: { Alert },
    setup: () => ({ lP, lM }),
    template: `
      <div style="${W}">
        <Alert variant="warning" title="Free trial expires in 2 days">
          Upgrade your plan to keep access to all features after the trial ends.
          <template #action>
            <button :style="lM">Dismiss</button>
            <button :style="lP">Upgrade now</button>
          </template>
        </Alert>
        <Alert variant="danger" title="Email not verified" dismissible>
          Please verify your email address to unlock all account features.
          <template #action>
            <button :style="lM">Skip for now</button>
            <button :style="lP">Send email</button>
          </template>
        </Alert>
        <Alert variant="info" title="New features available">
          We've shipped improvements to the dashboard, reporting, and exports.
          <template #action>
            <button :style="lP">View changelog</button>
          </template>
        </Alert>
      </div>
    `,
  }),
}
