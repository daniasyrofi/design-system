import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref, watch } from 'vue'
import Radio from './Radio.vue'

const meta: Meta<typeof Radio> = {
  title: 'Atoms/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size:     { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    label:    { control: 'text' },
    description: { control: 'text' },
    error:    { control: 'text' },
  },
  args: {
    modelValue: 'option1',
    value:      'option1',
    size:       'md',
    disabled:   false,
    label:      'Option 1',
  },
}
export default meta
type Story = StoryObj<typeof Radio>

export const Default: Story = {
  render: (args: any) => ({
    components: { Radio },
    setup() {
      const value = ref(args.modelValue ?? '')
      watch(() => args.modelValue, (val) => { value.value = val })
      return { args, value }
    },
    template: '<Radio v-bind="args" v-model="value" />',
  }),
}

export const WithDescription: Story = {
  name: 'With Description',
  render: () => ({
    components: { Radio },
    setup: () => ({ value: ref('standard') }),
    template: `
      <Radio
        v-model="value"
        label="Standard shipping"
        description="Free — Delivery in 5–7 business days"
        value="standard"
      />
    `,
  }),
}

export const WithError: Story = {
  name: 'With Error',
  render: () => ({
    components: { Radio },
    setup: () => ({ value: ref('') }),
    template: `
      <Radio
        v-model="value"
        label="Accept terms"
        error="Please select an option to continue."
        value="accept"
      />
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { Radio },
    template: `
      <div style="display:flex;flex-direction:column;gap:10px;">
        <Radio :model-value="''" value="a" disabled label="Disabled unselected" />
        <Radio :model-value="'b'" value="b" disabled label="Disabled selected" />
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => ({
    components: { Radio },
    setup: () => ({
      sm: ref('a'),
      md: ref('a'),
      lg: ref('a'),
    }),
    template: `
      <div style="display:flex;flex-direction:column;gap:20px;">
        <div>
          <p style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:8px;">Small</p>
          <div style="display:flex;flex-direction:column;gap:6px;">
            <Radio v-model="sm" size="sm" value="a" label="Option A" description="Small radio" />
            <Radio v-model="sm" size="sm" value="b" label="Option B" description="Small radio" />
          </div>
        </div>
        <div>
          <p style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:8px;">Medium</p>
          <div style="display:flex;flex-direction:column;gap:6px;">
            <Radio v-model="md" size="md" value="a" label="Option A" description="Medium radio — default" />
            <Radio v-model="md" size="md" value="b" label="Option B" description="Medium radio — default" />
          </div>
        </div>
        <div>
          <p style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:8px;">Large</p>
          <div style="display:flex;flex-direction:column;gap:6px;">
            <Radio v-model="lg" size="lg" value="a" label="Option A" description="Large radio" />
            <Radio v-model="lg" size="lg" value="b" label="Option B" description="Large radio" />
          </div>
        </div>
      </div>
    `,
  }),
}

export const RadioGroup: Story = {
  name: 'Radio Group',
  render: () => ({
    components: { Radio },
    setup() {
      const selected = ref('standard')
      const options = [
        { value: 'standard',  label: 'Standard shipping',  description: 'Free — Delivery in 5–7 business days' },
        { value: 'express',   label: 'Express shipping',   description: '$9.99 — Delivery in 2–3 business days' },
        { value: 'overnight', label: 'Overnight shipping', description: '$19.99 — Next business day' },
      ]
      return { selected, options }
    },
    template: `
      <fieldset style="display:flex;flex-direction:column;gap:10px;padding:16px;border:1px solid var(--color-border);border-radius:var(--radius-lg);max-width:320px;">
        <legend style="font-size:14px;font-weight:600;color:var(--color-text-heading);padding:0 4px;">Shipping method</legend>
        <Radio
          v-for="opt in options"
          :key="opt.value"
          v-model="selected"
          :value="opt.value"
          :label="opt.label"
          :description="opt.description"
          name="shipping"
        />
      </fieldset>
    `,
  }),
}

export const PaymentMethod: Story = {
  name: 'Payment Method',
  render: () => ({
    components: { Radio },
    setup() {
      const method = ref('card')
      const opts = [
        { value: 'card',   label: 'Credit / Debit Card', description: 'Visa, Mastercard, Amex' },
        { value: 'bank',   label: 'Bank Transfer',       description: 'Manual transfer — 1–2 business days' },
        { value: 'wallet', label: 'Digital Wallet',      description: 'GoPay, OVO, ShopeePay' },
      ]
      return { method, opts }
    },
    template: `
      <fieldset style="display:flex;flex-direction:column;gap:10px;padding:16px;border:1px solid var(--color-border);border-radius:var(--radius-lg);max-width:300px;">
        <legend style="font-size:14px;font-weight:600;color:var(--color-text-heading);padding:0 4px;">Payment method</legend>
        <Radio
          v-for="opt in opts"
          :key="opt.value"
          v-model="method"
          :value="opt.value"
          :label="opt.label"
          :description="opt.description"
          name="payment"
        />
      </fieldset>
    `,
  }),
}
