import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import AlertDialog from './AlertDialog.vue'

const meta: Meta<typeof AlertDialog> = {
  title: 'Molecules/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'danger'] },
  },
}
export default meta

type Story = StoryObj<typeof AlertDialog>

export const Default: Story = {
  render: (args) => ({
    components: { AlertDialog },
    setup: () => ({ args, open: ref(false), confirmed: ref(false) }),
    template: `
      <div>
        <button @click="open = true" style="padding:8px 20px;background:var(--color-primary);color:white;border-radius:var(--radius-md);border:none;cursor:pointer;font-weight:500;">
          Open Dialog
        </button>
        <p v-if="confirmed" style="margin-top:12px;font-size:13px;color:var(--color-success);">✓ Confirmed!</p>
        <AlertDialog
          v-bind="args"
          v-model="open"
          @confirm="open = false; confirmed = true"
          @cancel="open = false"
        />
      </div>
    `,
  }),
  args: {
    title:        'Save changes?',
    description:  'Your unsaved changes will be lost if you leave this page.',
    confirmLabel: 'Save',
    cancelLabel:  'Discard',
    variant:      'default',
  },
}

export const Danger: Story = {
  render: (args) => ({
    components: { AlertDialog },
    setup: () => ({ args, open: ref(false) }),
    template: `
      <div>
        <button @click="open = true" style="padding:8px 20px;background:var(--color-danger);color:white;border-radius:var(--radius-md);border:none;cursor:pointer;font-weight:500;">
          Delete account
        </button>
        <AlertDialog v-bind="args" v-model="open" @confirm="open = false" @cancel="open = false" />
      </div>
    `,
  }),
  args: {
    title:        'Delete account?',
    description:  'This action is permanent and cannot be undone. All your data will be erased.',
    confirmLabel: 'Yes, delete forever',
    cancelLabel:  'Keep account',
    variant:      'danger',
  },
}
