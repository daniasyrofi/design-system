import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import TimePicker from './TimePicker.vue'

const meta: Meta<typeof TimePicker> = {
  title: 'Molecules/TimePicker',
  component: TimePicker,
  tags: ['autodocs'],
  parameters: { layout: 'centered', icon: 'clock' },
  argTypes: {
    modelValue: { control: 'text' },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    minuteStep: { control: 'number' },
    use24h: { control: 'boolean' },
  },
  args: {
    size: 'md',
    disabled: false,
    minuteStep: 1,
    use24h: true,
  },
  decorators: [() => ({ template: '<div style="width:240px;"><story /></div>' })],
}
export default meta
type Story = StoryObj<typeof TimePicker>

export const Default: Story = {
  name: 'Default',
  render: (args) => ({
    components: { TimePicker },
    setup() {
      const time = ref<string | undefined>(undefined)
      return { time, args }
    },
    template: `<TimePicker v-bind="args" v-model="time" />`,
  }),
}

export const WithValue: Story = {
  name: 'With Value',
  render: () => ({
    components: { TimePicker },
    setup() {
      const time = ref('14:30')
      return { time }
    },
    template: `<TimePicker v-model="time" />`,
  }),
}

export const WithLabel: Story = {
  name: 'With Label',
  render: () => ({
    components: { TimePicker },
    setup() {
      const time = ref<string | undefined>(undefined)
      return { time }
    },
    template: `<TimePicker v-model="time" label="Meeting time" placeholder="HH:MM" />`,
  }),
}

export const WithError: Story = {
  name: 'With Error',
  render: () => ({
    components: { TimePicker },
    setup() {
      const time = ref<string | undefined>(undefined)
      return { time }
    },
    template: `<TimePicker v-model="time" label="Departure time" error="Please enter a valid time." />`,
  }),
}

export const TwelveHour: Story = {
  name: '12-Hour Mode',
  render: () => ({
    components: { TimePicker },
    setup() {
      const time = ref('14:30')
      return { time }
    },
    template: `<TimePicker v-model="time" label="Appointment time" :use24h="false" />`,
  }),
}

export const Disabled: Story = {
  name: 'Disabled',
  render: () => ({
    components: { TimePicker },
    setup() {
      const time = ref('09:00')
      return { time }
    },
    template: `<TimePicker v-model="time" label="Start time" disabled />`,
  }),
}

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => ({
    components: { TimePicker },
    setup() {
      const sm = ref('08:00')
      const md = ref('12:00')
      const lg = ref('18:30')
      return { sm, md, lg }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <TimePicker v-model="sm" size="sm" label="Small" />
        <TimePicker v-model="md" size="md" label="Medium" />
        <TimePicker v-model="lg" size="lg" label="Large" />
      </div>
    `,
  }),
}

export const WithMinuteStep: Story = {
  name: 'Minute Step (15 min)',
  render: () => ({
    components: { TimePicker },
    setup() {
      const time = ref('09:00')
      return { time }
    },
    template: `<TimePicker v-model="time" label="Schedule time" :minute-step="15" />`,
  }),
}
