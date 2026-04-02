import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import DateRangePicker from './DateRangePicker.vue'
import type { DateRange } from './DateRangePicker.vue'

const canvas = () => ({
  template: `
    <div style="
      min-height: 100vh; display: flex; align-items: flex-start; justify-content: center;
      padding: 80px 32px; background-color: #eceae4;
      background-image: radial-gradient(circle, rgba(0,0,0,0.11) 1px, transparent 1px);
      background-size: 22px 22px;
    "><story /></div>
  `,
})

const meta: Meta<typeof DateRangePicker> = {
  title:      'Molecules/DateRangePicker',
  component:  DateRangePicker,
  tags:       ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj<typeof DateRangePicker>

export const Default: Story = {
  name: 'Default',
  render: () => ({
    components: { DateRangePicker },
    setup() {
      const range = ref<DateRange>({ start: null, end: null })
      return { range }
    },
    template: `
      <div style="width: 560px;">
        <DateRangePicker
          v-model="range"
          label="Date Range"
        />
        <p style="margin-top: 12px; font-size: 13px; color: var(--color-text-secondary);">
          Start: {{ range.start || '—' }} &nbsp;|&nbsp; End: {{ range.end || '—' }}
        </p>
      </div>
    `,
  }),
}

export const WithPreselected: Story = {
  name: 'With Preselected Range',
  render: () => ({
    components: { DateRangePicker },
    setup() {
      const range = ref<DateRange>({ start: '2026-04-01', end: '2026-04-14' })
      return { range }
    },
    template: `
      <div style="width: 560px;">
        <DateRangePicker
          v-model="range"
          label="Booking Period"
          startPlaceholder="Check-in"
          endPlaceholder="Check-out"
        />
      </div>
    `,
  }),
}

export const WithMinMax: Story = {
  name: 'With Min/Max Dates',
  render: () => ({
    components: { DateRangePicker },
    setup() {
      const range = ref<DateRange>({ start: null, end: null })
      const today = new Date()
      const minDate = today.toISOString().slice(0, 10)
      const maxDate = new Date(today.getFullYear(), today.getMonth() + 2, 0).toISOString().slice(0, 10)
      return { range, minDate, maxDate }
    },
    template: `
      <div style="width: 560px;">
        <DateRangePicker
          v-model="range"
          label="Available Dates"
          :min-date="minDate"
          :max-date="maxDate"
        />
        <p style="margin-top: 8px; font-size: 12px; color: var(--color-text-tertiary);">
          Only dates within the next 2 months can be selected
        </p>
      </div>
    `,
  }),
}

export const WithError: Story = {
  name: 'With Error',
  render: () => ({
    components: { DateRangePicker },
    setup() {
      const range = ref<DateRange>({ start: null, end: null })
      return { range }
    },
    template: `
      <div style="width: 560px;">
        <DateRangePicker
          v-model="range"
          label="Report Period"
          error="Please select a valid date range"
        />
      </div>
    `,
  }),
}

export const Disabled: Story = {
  name: 'Disabled',
  render: () => ({
    components: { DateRangePicker },
    setup() {
      const range = ref<DateRange>({ start: '2026-04-01', end: '2026-04-30' })
      return { range }
    },
    template: `
      <div style="width: 560px;">
        <DateRangePicker
          v-model="range"
          label="Locked Range"
          disabled
        />
      </div>
    `,
  }),
}

export const Sizes: Story = {
  name: 'All Sizes',
  render: () => ({
    components: { DateRangePicker },
    setup() {
      const r = ref<DateRange>({ start: null, end: null })
      return { r }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; width: 560px;">
        <DateRangePicker v-model="r" size="sm" label="Small" />
        <DateRangePicker v-model="r" size="md" label="Medium" />
        <DateRangePicker v-model="r" size="lg" label="Large" />
      </div>
    `,
  }),
}
