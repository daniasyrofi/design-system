import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, ref } from 'vue'
import { userEvent, within, expect } from 'storybook/test'
import DatePicker from './DatePicker.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type Copy = {
  storyNames: {
    default: string
    withLabel: string
    minMaxDate: string
    disabled: string
    withError: string
    allSizes: string
  }
  defaultPlaceholder: string
  valueLabel: string
  nullValue: string
  withLabel: {
    label: string
    placeholder: string
  }
  minMax: {
    label: string
    helper: string
  }
  disabled: {
    label: string
  }
  withError: {
    label: string
    error: string
  }
  allSizes: {
    sm: string
    md: string
    lg: string
  }
}

const copyMap: Record<Locale, Copy> = {
  en: {
    storyNames: {
      default: 'Default',
      withLabel: 'With Label',
      minMaxDate: 'Min / Max Date',
      disabled: 'Disabled',
      withError: 'With Error',
      allSizes: 'All Sizes',
    },
    defaultPlaceholder: 'Select date',
    valueLabel: 'Value',
    nullValue: 'none',
    withLabel: {
      label: 'Date of birth',
      placeholder: 'DD/MM/YYYY',
    },
    minMax: {
      label: 'Appointment date',
      helper: 'Only dates in the current month are selectable.',
    },
    disabled: {
      label: 'Start date',
    },
    withError: {
      label: 'Due date',
      error: 'Please select a valid date.',
    },
    allSizes: {
      sm: 'Small',
      md: 'Medium',
      lg: 'Large',
    },
  },
  id: {
    storyNames: {
      default: 'Bawaan',
      withLabel: 'Dengan Label',
      minMaxDate: 'Tanggal Min / Maks',
      disabled: 'Nonaktif',
      withError: 'Dengan Error',
      allSizes: 'Semua Ukuran',
    },
    defaultPlaceholder: 'Pilih tanggal',
    valueLabel: 'Nilai',
    nullValue: 'tidak ada',
    withLabel: {
      label: 'Tanggal lahir',
      placeholder: 'DD/MM/YYYY',
    },
    minMax: {
      label: 'Tanggal janji',
      helper: 'Hanya tanggal pada bulan ini yang dapat dipilih.',
    },
    disabled: {
      label: 'Tanggal mulai',
    },
    withError: {
      label: 'Tanggal jatuh tempo',
      error: 'Silakan pilih tanggal yang valid.',
    },
    allSizes: {
      sm: 'Kecil',
      md: 'Sedang',
      lg: 'Besar',
    },
  },
  zh: {
    storyNames: {
      default: '默认',
      withLabel: '带标签',
      minMaxDate: '最小 / 最大日期',
      disabled: '禁用',
      withError: '带错误',
      allSizes: '所有尺寸',
    },
    defaultPlaceholder: '选择日期',
    valueLabel: '值',
    nullValue: '无',
    withLabel: {
      label: '出生日期',
      placeholder: 'DD/MM/YYYY',
    },
    minMax: {
      label: '预约日期',
      helper: '仅可选择当月日期。',
    },
    disabled: {
      label: '开始日期',
    },
    withError: {
      label: '截止日期',
      error: '请选择有效日期。',
    },
    allSizes: {
      sm: '小',
      md: '中',
      lg: '大',
    },
  },
}

const getLocale = (): Locale => resolveLocale(getI18nLocale())
const useCopy = () => computed(() => copyMap[getLocale()])
const getStoryName = (key: keyof Copy['storyNames']) => copyMap[getLocale()].storyNames[key]

const meta: Meta<typeof DatePicker> = {
  title: 'Molecules/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: { layout: 'centered', icon: 'calendar' },
  argTypes: {
    modelValue: { control: 'text' },
    mode: { control: 'select', options: ['single', 'range'] },
    minDate: { control: 'text' },
    maxDate: { control: 'text' },
    format: { control: 'text' },
    placeholder: { control: 'text' },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    label: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    modelValue: null,
    mode: 'single',
    format: 'dd/MM/yyyy',
    placeholder: 'Select date',
    size: 'md',
    disabled: false,
  },
  decorators: [() => ({ template: '<div style="width:320px;"><story /></div>' })],
}
export default meta
type Story = StoryObj<typeof DatePicker>

export const Default: Story = {
  get name() {
    return getStoryName('default')
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)

    // Click the trigger button to open the calendar
    const trigger = canvas.getByRole('button')
    await userEvent.click(trigger)

    // Calendar panel should now be visible — find an enabled day button and click it
    const dayButtons = canvas.getAllByRole('button').filter(
      (btn) =>
        btn.getAttribute('aria-label') !== 'Previous month' &&
        btn.getAttribute('aria-label') !== 'Next month' &&
        !btn.hasAttribute('disabled')
    )
    // Pick the first available day
    const firstDay = dayButtons[0]
    await userEvent.click(firstDay)

    // Calendar should close after selecting a date
    const navButtons = canvas.queryAllByRole('button', { name: /previous month|next month/i })
    await expect(navButtons.length).toBe(0)
  },
  render: (args) => ({
    components: { DatePicker },
    setup() {
      const date = ref<string | null>(null)
      return { date, args, copy: useCopy() }
    },
    template: `
      <DatePicker v-bind="args" v-model="date" :placeholder="copy.defaultPlaceholder" />
    `,
  }),
}

export const WithLabel: Story = {
  get name() {
    return getStoryName('withLabel')
  },
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref<string | null>(null)
      return { date, copy: useCopy() }
    },
    template: `
      <DatePicker v-model="date" :label="copy.withLabel.label" :placeholder="copy.withLabel.placeholder" />
    `,
  }),
}

export const MinMaxDate: Story = {
  get name() {
    return getStoryName('minMaxDate')
  },
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref<string | null>(null)
      const today = new Date()
      const minDate = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0]
      const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0)
        .toISOString()
        .split('T')[0]
      return { date, minDate, maxDate, copy: useCopy() }
    },
    template: `
      <div>
        <DatePicker
          v-model="date"
          :label="copy.minMax.label"
          :min-date="minDate"
          :max-date="maxDate"
        />
        <p style="font-size:12px;color:var(--color-text-tertiary);margin-top:8px;">
          {{ copy.minMax.helper }}
        </p>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  get name() {
    return getStoryName('disabled')
  },
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref('2026-03-15')
      return { date, copy: useCopy() }
    },
    template: `
      <DatePicker v-model="date" :label="copy.disabled.label" disabled />
    `,
  }),
}

export const WithError: Story = {
  get name() {
    return getStoryName('withError')
  },
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref<string | null>(null)
      return { date, copy: useCopy() }
    },
    template: `
      <DatePicker
        v-model="date"
        :label="copy.withError.label"
        :error="copy.withError.error"
      />
    `,
  }),
}

export const AllSizes: Story = {
  get name() {
    return getStoryName('allSizes')
  },
  render: () => ({
    components: { DatePicker },
    setup() {
      const sm = ref<string | null>(null)
      const md = ref<string | null>(null)
      const lg = ref<string | null>(null)
      return { sm, md, lg, copy: useCopy() }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <DatePicker v-model="sm" size="sm" :label="copy.allSizes.sm" />
        <DatePicker v-model="md" size="md" :label="copy.allSizes.md" />
        <DatePicker v-model="lg" size="lg" :label="copy.allSizes.lg" />
      </div>
    `,
  }),
}
