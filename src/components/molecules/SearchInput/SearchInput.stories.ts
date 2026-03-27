import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import SearchInput from './SearchInput.vue'

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

const meta: Meta<typeof SearchInput> = {
  title: 'Molecules/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  decorators: [canvas],
  argTypes: {
    size:      { control: 'select', options: ['sm', 'md', 'lg'] },
    loading:   { control: 'boolean' },
    clearable: { control: 'boolean' },
    disabled:  { control: 'boolean' },
    debounce:  { control: 'number' },
  },
  args: {
    modelValue: '',
    size:       'md',
    loading:    false,
    clearable:  true,
    disabled:   false,
    debounce:   300,
    placeholder: 'Search...',
  },
}
export default meta
type Story = StoryObj<typeof SearchInput>

export const Default: Story = {
  render: (args) => ({
    components: { SearchInput },
    setup() {
      const value = ref('')
      const lastSearch = ref('')
      return { value, args, lastSearch }
    },
    template: `
      <div style="max-width:360px">
        <SearchInput
          v-bind="args"
          v-model="value"
          @search="lastSearch = $event"
        />
        <p class="mt-2 text-xs text-[--color-text-tertiary]">
          Value: "{{ value }}" &mdash; Last debounced search: "{{ lastSearch }}"
        </p>
      </div>
    `,
  }),
}

export const Loading: Story = {
  render: () => ({
    components: { SearchInput },
    setup() {
      const value = ref('design tokens')
      return { value }
    },
    template: `
      <div style="max-width:360px">
        <SearchInput v-model="value" loading placeholder="Searching..." />
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { SearchInput },
    setup() {
      const sm = ref('')
      const md = ref('')
      const lg = ref('')
      return { sm, md, lg }
    },
    template: `
      <div class="flex flex-col gap-4" style="max-width:360px">
        <SearchInput v-model="sm" size="sm" placeholder="Small search..." />
        <SearchInput v-model="md" size="md" placeholder="Medium search..." />
        <SearchInput v-model="lg" size="lg" placeholder="Large search..." />
      </div>
    `,
  }),
}
