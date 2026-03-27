import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Select from './Select.vue'

const fruitOptions = [
  { label: 'Apple',      value: 'apple' },
  { label: 'Banana',     value: 'banana' },
  { label: 'Cherry',     value: 'cherry' },
  { label: 'Dragonfruit', value: 'dragonfruit' },
  { label: 'Elderberry', value: 'elderberry' },
  { label: 'Fig',        value: 'fig' },
  { label: 'Grape',      value: 'grape' },
]

const groupedOptions = [
  { label: 'Apple',   value: 'apple',   group: 'Fruits' },
  { label: 'Banana',  value: 'banana',  group: 'Fruits' },
  { label: 'Cherry',  value: 'cherry',  group: 'Fruits' },
  { label: 'Carrot',  value: 'carrot',  group: 'Vegetables' },
  { label: 'Broccoli', value: 'broccoli', group: 'Vegetables' },
  { label: 'Spinach', value: 'spinach', group: 'Vegetables' },
  { label: 'Salmon',  value: 'salmon',  group: 'Protein' },
  { label: 'Chicken', value: 'chicken', group: 'Protein' },
]

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

const meta: Meta<typeof Select> = {
  title: 'Molecules/Select',
  component: Select,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    size:       { control: 'select', options: ['sm', 'md', 'lg'] },
    multiple:   { control: 'boolean' },
    searchable: { control: 'boolean' },
    clearable:  { control: 'boolean' },
    disabled:   { control: 'boolean' },
  },
  args: {
    size:       'md',
    multiple:   false,
    searchable: false,
    clearable:  false,
    disabled:   false,
    placeholder: 'Select...',
  },
}
export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  render: (args) => ({
    components: { Select },
    setup() {
      const value = ref('')
      return { value, args, fruitOptions }
    },
    template: `
      <div style="max-width:320px;">
        <Select
          v-bind="args"
          v-model="value"
          label="Favorite fruit"
          :options="fruitOptions"
        />
        <p style="margin-top:8px;font-size:12px;color:var(--color-text-tertiary);">Selected: {{ value || 'none' }}</p>
      </div>
    `,
  }),
}

export const Multiple: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const value = ref<string[]>([])
      return { value, fruitOptions }
    },
    template: `
      <div style="max-width:320px;">
        <Select
          v-model="value"
          label="Pick fruits"
          :options="fruitOptions"
          multiple
          placeholder="Choose fruits..."
        />
        <p style="margin-top:8px;font-size:12px;color:var(--color-text-tertiary);">Selected: {{ value.join(', ') || 'none' }}</p>
      </div>
    `,
  }),
}

export const Searchable: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const value = ref('')
      return { value, fruitOptions }
    },
    template: `
      <div style="max-width:320px;">
        <Select
          v-model="value"
          label="Search and select"
          :options="fruitOptions"
          searchable
          placeholder="Type to search..."
        />
      </div>
    `,
  }),
}

export const WithGroups: Story = {
  name: 'With Groups',
  render: () => ({
    components: { Select },
    setup() {
      const value = ref('')
      return { value, groupedOptions }
    },
    template: `
      <div style="max-width:320px;">
        <Select
          v-model="value"
          label="Food category"
          :options="groupedOptions"
          searchable
          placeholder="Select food..."
        />
      </div>
    `,
  }),
}

export const Clearable: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const value = ref('banana')
      return { value, fruitOptions }
    },
    template: `
      <div style="max-width:320px;">
        <Select
          v-model="value"
          label="Clearable select"
          :options="fruitOptions"
          clearable
          helper-text="Click the x to clear the selection."
        />
      </div>
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const value = ref('cherry')
      return { value, fruitOptions }
    },
    template: `
      <div style="max-width:320px;">
        <Select
          v-model="value"
          label="Disabled select"
          :options="fruitOptions"
          disabled
        />
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => ({
    components: { Select },
    setup() {
      const sm = ref('')
      const md = ref('')
      const lg = ref('')
      return { sm, md, lg, fruitOptions }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;max-width:320px;">
        <Select v-model="sm" size="sm" label="Small" :options="fruitOptions" placeholder="Small select" />
        <Select v-model="md" size="md" label="Medium" :options="fruitOptions" placeholder="Medium select" />
        <Select v-model="lg" size="lg" label="Large" :options="fruitOptions" placeholder="Large select" />
      </div>
    `,
  }),
}
