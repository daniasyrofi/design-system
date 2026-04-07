import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { userEvent, within, expect } from 'storybook/test'
import Combobox from './Combobox.vue'
import type { ComboboxOption } from './Combobox.vue'

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

const COUNTRIES: ComboboxOption[] = [
  { value: 'id', label: 'Indonesia' },
  { value: 'my', label: 'Malaysia' },
  { value: 'sg', label: 'Singapore' },
  { value: 'th', label: 'Thailand' },
  { value: 'ph', label: 'Philippines' },
  { value: 'vn', label: 'Vietnam' },
  { value: 'au', label: 'Australia' },
  { value: 'jp', label: 'Japan' },
  { value: 'kr', label: 'South Korea' },
  { value: 'us', label: 'United States' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
]

const meta: Meta<typeof Combobox> = {
  title: 'Molecules/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj<typeof Combobox>

export const Default: Story = {
  name: 'Default',
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)

    // Click the combobox input to open the dropdown
    const input = canvas.getByRole('combobox')
    await userEvent.click(input)

    // Options list (listbox) should be visible
    await expect(canvas.getByRole('listbox')).toBeVisible()

    // Type to filter options
    await userEvent.type(input, 'sin')

    // Only "Singapore" should remain visible
    await expect(canvas.getByRole('option', { name: /singapore/i })).toBeVisible()
    await expect(canvas.queryByRole('option', { name: /indonesia/i })).not.toBeInTheDocument()
  },
  render: () => ({
    components: { Combobox },
    setup() {
      const value = ref('')
      return { value, options: COUNTRIES }
    },
    template: `
      <div style="width: 320px;">
        <Combobox
          v-model="value"
          :options="options"
          label="Country"
          placeholder="Search country..."
          clearable
        />
        <p style="margin-top: 12px; font-size: 13px; color: var(--color-text-secondary);">
          Selected: {{ value || 'none' }}
        </p>
      </div>
    `,
  }),
}

export const WithPreselected: Story = {
  name: 'With Preselected Value',
  render: () => ({
    components: { Combobox },
    setup() {
      const value = ref('sg')
      return { value, options: COUNTRIES }
    },
    template: `
      <div style="width: 320px;">
        <Combobox
          v-model="value"
          :options="options"
          label="Country"
          clearable
        />
      </div>
    `,
  }),
}

export const Sizes: Story = {
  name: 'All Sizes',
  render: () => ({
    components: { Combobox },
    setup() {
      const v = ref('')
      return { v, options: COUNTRIES }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; width: 320px;">
        <Combobox v-model="v" :options="options" size="sm" label="Small" placeholder="Search..." />
        <Combobox v-model="v" :options="options" size="md" label="Medium" placeholder="Search..." />
        <Combobox v-model="v" :options="options" size="lg" label="Large" placeholder="Search..." />
      </div>
    `,
  }),
}

export const WithError: Story = {
  name: 'With Error',
  render: () => ({
    components: { Combobox },
    setup() {
      return { v: ref(''), options: COUNTRIES }
    },
    template: `
      <div style="width: 320px;">
        <Combobox
          v-model="v"
          :options="options"
          label="Country"
          error="Please select a country"
          helperText="Choose your country of residence"
        />
      </div>
    `,
  }),
}

export const Loading: Story = {
  name: 'Loading State',
  render: () => ({
    components: { Combobox },
    setup() {
      return { v: ref(''), options: [] as ComboboxOption[] }
    },
    template: `
      <div style="width: 320px;">
        <Combobox
          v-model="v"
          :options="options"
          label="Country"
          placeholder="Loading options..."
          loading
        />
      </div>
    `,
  }),
}

export const Disabled: Story = {
  name: 'Disabled',
  render: () => ({
    components: { Combobox },
    setup() {
      return { v: ref('id'), options: COUNTRIES }
    },
    template: `
      <div style="width: 320px;">
        <Combobox
          v-model="v"
          :options="options"
          label="Country"
          disabled
        />
      </div>
    `,
  }),
}

export const WithDisabledOptions: Story = {
  name: 'With Disabled Options',
  render: () => ({
    components: { Combobox },
    setup() {
      const options: ComboboxOption[] = [
        { value: 'id', label: 'Indonesia' },
        { value: 'my', label: 'Malaysia', disabled: true },
        { value: 'sg', label: 'Singapore' },
        { value: 'th', label: 'Thailand', disabled: true },
        { value: 'ph', label: 'Philippines' },
      ]
      return { v: ref(''), options }
    },
    template: `
      <div style="width: 320px;">
        <Combobox
          v-model="v"
          :options="options"
          label="Country"
          placeholder="Select a country..."
        />
      </div>
    `,
  }),
}

export const AsyncSearch: Story = {
  name: 'Async Search (simulated)',
  render: () => ({
    components: { Combobox },
    setup() {
      const v = ref('')
      const loading = ref(false)
      const options = ref<ComboboxOption[]>(COUNTRIES)

      function onSearch(q: string) {
        loading.value = true
        setTimeout(() => {
          options.value = COUNTRIES.filter((c) => c.label.toLowerCase().includes(q.toLowerCase()))
          loading.value = false
        }, 600)
      }

      return { v, loading, options, onSearch }
    },
    template: `
      <div style="width: 320px;">
        <Combobox
          v-model="v"
          :options="options"
          :loading="loading"
          label="Country (async)"
          placeholder="Type to search..."
          clearable
          @search="onSearch"
        />
      </div>
    `,
  }),
}
