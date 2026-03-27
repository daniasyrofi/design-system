import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Toast from './Toast.vue'
import ToastContainer from './ToastContainer.vue'
import { useToast } from './useToast'
import Button from '@/components/atoms/Button/Button.vue'

// ── Canvas decorator — same as Alert ─────────────────────────────────────────
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

const meta: Meta<typeof Toast> = {
  title: 'Molecules/Toast',
  component: Toast,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    variant:     { control: 'select', options: ['info', 'success', 'warning', 'danger'] },
    title:       { control: 'text' },
    description: { control: 'text' },
    dismissible: { control: 'boolean' },
  },
  args: {
    id:          'toast-preview',
    variant:     'info',
    title:       'Toast title',
    description: 'This is a toast description with extra context.',
    dismissible: true,
  },
}
export default meta
type Story = StoryObj<typeof Toast>

const W = 'display:flex;flex-direction:column;gap:10px;'

// Text-link action styles (macOS notification style)
const lP = 'background:none;border:none;padding:0;cursor:pointer;font-size:13px;font-weight:600;color:var(--color-text-primary);letter-spacing:-0.01em;'
const lM = 'background:none;border:none;padding:0;cursor:pointer;font-size:13px;font-weight:400;color:var(--color-text-tertiary);letter-spacing:-0.01em;'

// ── All Variants ──────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => ({
    components: { Toast },
    setup() {
      const dismissed = ref<Record<string, boolean>>({})
      const onDismiss = (id: string) => { dismissed.value[id] = true }
      return { dismissed, onDismiss }
    },
    template: `
      <div style="${W}">
        <Toast v-if="!dismissed['t-info']"    id="t-info"    variant="info"    title="System update available" description="A new version (v2.4.1) is ready to install." @dismiss="onDismiss" />
        <Toast v-if="!dismissed['t-success']" id="t-success" variant="success" title="Payment successful"      description="Your invoice has been paid. A receipt was sent." @dismiss="onDismiss" />
        <Toast v-if="!dismissed['t-warning']" id="t-warning" variant="warning" title="Storage almost full"     description="You've used 92% of your 5 GB storage." @dismiss="onDismiss" />
        <Toast v-if="!dismissed['t-danger']"  id="t-danger"  variant="danger"  title="Failed to save changes"  description="Your changes could not be saved. Please try again." @dismiss="onDismiss" />
      </div>
    `,
  }),
}

// ── With Action ───────────────────────────────────────────────────────────────

export const WithAction: Story = {
  name: 'With Actions',
  render: () => ({
    components: { Toast },
    setup: () => ({ lP, lM }),
    template: `
      <div style="${W}">
        <Toast id="t-action" variant="warning" title="Subscription expiring" description="Your free trial ends in 2 days." :dismissible="false">
          <template #action>
            <button :style="lM">Dismiss</button>
            <button :style="lP">Upgrade now</button>
          </template>
        </Toast>
        <Toast id="t-action2" variant="danger" title="Connection lost" description="Reconnecting to server…" :dismissible="false">
          <template #action>
            <button :style="lP">Retry now</button>
          </template>
        </Toast>
      </div>
    `,
  }),
}

// ── Auto Dismiss (interactive) ────────────────────────────────────────────────

export const AutoDismiss: Story = {
  name: 'Auto Dismiss',
  parameters: { layout: 'padded' },
  render: () => ({
    components: { ToastContainer, Button },
    setup() {
      const { success, error, info, warning, dismissAll } = useToast()
      return { success, error, info, warning, dismissAll }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          <Button variant="secondary" size="sm" @click="info('Info toast', 'This will auto-dismiss in 5 seconds.')">Show Info</Button>
          <Button variant="secondary" size="sm" @click="success('Success toast', 'Operation completed successfully.')">Show Success</Button>
          <Button variant="secondary" size="sm" @click="warning('Warning toast', 'Please review before continuing.')">Show Warning</Button>
          <Button variant="danger"    size="sm" @click="error('Error toast', 'Something went wrong.')">Show Error</Button>
          <Button variant="ghost"     size="sm" @click="dismissAll()">Dismiss All</Button>
        </div>
        <ToastContainer />
      </div>
    `,
  }),
}

// ── Persistent ────────────────────────────────────────────────────────────────

export const Persistent: Story = {
  parameters: { layout: 'padded' },
  render: () => ({
    components: { ToastContainer, Button },
    setup() {
      const { toast, dismissAll } = useToast()
      const showPersistent = () => toast({
        title: 'Persistent toast',
        description: 'This toast will not auto-dismiss. Click × to close it.',
        variant: 'danger',
        duration: 0,
        dismissible: true,
      })
      return { showPersistent, dismissAll }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <div style="display:flex;gap:8px;">
          <Button variant="danger" size="sm" @click="showPersistent()">Show Persistent Toast</Button>
          <Button variant="ghost"  size="sm" @click="dismissAll()">Dismiss All</Button>
        </div>
        <ToastContainer />
      </div>
    `,
  }),
}
