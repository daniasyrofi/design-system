import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import DatePicker from './DatePicker.vue'

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

const meta: Meta<typeof DatePicker> = {
  title: 'Molecules/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    modelValue:  { control: 'text' },
    mode:        { control: 'select', options: ['single', 'range'] },
    minDate:     { control: 'text' },
    maxDate:     { control: 'text' },
    format:      { control: 'text' },
    placeholder: { control: 'text' },
    size:        { control: 'select', options: ['sm', 'md', 'lg'] },
    label:       { control: 'text' },
    error:       { control: 'text' },
    disabled:    { control: 'boolean' },
  },
  args: {
    modelValue: null,
    mode: 'single',
    format: 'dd/MM/yyyy',
    placeholder: 'Select date',
    size: 'md',
    disabled: false,
  },
}
export default meta
type Story = StoryObj<typeof DatePicker>

export const Default: Story = {
  render: (args) => ({
    components: { DatePicker },
    setup() {
      const date = ref<string | null>(null)
      return { date, args }
    },
    template: `
      <div style="max-width:320px;">
        <DatePicker v-bind="args" v-model="date" />
        <p style="font-size:12px;color:var(--color-text-tertiary);margin-top:8px;">Value: {{ date ?? 'null' }}</p>
      </div>
    `,
  }),
}

export const WithLabel: Story = {
  name: 'With Label',
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref<string | null>(null)
      return { date }
    },
    template: `
      <div style="max-width:320px;">
        <DatePicker v-model="date" label="Date of birth" placeholder="DD/MM/YYYY" />
      </div>
    `,
  }),
}

export const MinMaxDate: Story = {
  name: 'Min / Max Date',
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref<string | null>(null)
      const today = new Date()
      const minDate = new Date(today.getFullYear(), today.getMonth(), 1)
        .toISOString().split('T')[0]
      const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0)
        .toISOString().split('T')[0]
      return { date, minDate, maxDate }
    },
    template: `
      <div style="max-width:320px;">
        <DatePicker
          v-model="date"
          label="Appointment date"
          :min-date="minDate"
          :max-date="maxDate"
        />
        <p style="font-size:12px;color:var(--color-text-tertiary);margin-top:8px;">
          Only dates in the current month are selectable.
        </p>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref('2026-03-15')
      return { date }
    },
    template: `
      <div style="max-width:320px;">
        <DatePicker v-model="date" label="Start date" disabled />
      </div>
    `,
  }),
}

export const WithError: Story = {
  name: 'With Error',
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref<string | null>(null)
      return { date }
    },
    template: `
      <div style="max-width:320px;">
        <DatePicker
          v-model="date"
          label="Due date"
          error="Please select a valid date."
        />
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => ({
    components: { DatePicker },
    setup() {
      const sm = ref<string | null>(null)
      const md = ref<string | null>(null)
      const lg = ref<string | null>(null)
      return { sm, md, lg }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;max-width:320px;">
        <DatePicker v-model="sm" size="sm" label="Small" />
        <DatePicker v-model="md" size="md" label="Medium" />
        <DatePicker v-model="lg" size="lg" label="Large" />
      </div>
    `,
  }),
}
