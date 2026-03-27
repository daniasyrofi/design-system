import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Pagination from './Pagination.vue'

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

const meta: Meta<typeof Pagination> = {
  title: 'Molecules/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  decorators: [canvas],
  argTypes: {
    modelValue:      { control: 'number' },
    total:           { control: 'number' },
    perPage:         { control: 'number' },
    maxVisiblePages: { control: 'number' },
    showFirstLast:   { control: 'boolean' },
    size:            { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    modelValue: 1,
    total: 100,
    perPage: 10,
    maxVisiblePages: 5,
    showFirstLast: true,
    size: 'md',
  },
}
export default meta
type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  render: (args) => ({
    components: { Pagination },
    setup() {
      const page = ref(1)
      return { page, args }
    },
    template: `
      <div class="flex flex-col gap-3">
        <Pagination v-bind="args" v-model="page" :total="100" />
        <p class="text-sm text-[--color-text-secondary]">Current page: {{ page }}</p>
      </div>
    `,
  }),
}

export const ManyPages: Story = {
  render: () => ({
    components: { Pagination },
    setup() {
      const page = ref(25)
      return { page }
    },
    template: `
      <div class="flex flex-col gap-3">
        <Pagination v-model="page" :total="500" :per-page="10" />
        <p class="text-sm text-[--color-text-secondary]">Page {{ page }} of 50</p>
      </div>
    `,
  }),
}

export const FewPages: Story = {
  render: () => ({
    components: { Pagination },
    setup() {
      const page = ref(1)
      return { page }
    },
    template: `
      <div class="flex flex-col gap-3">
        <Pagination v-model="page" :total="25" :per-page="10" />
        <p class="text-sm text-[--color-text-secondary]">Page {{ page }} of 3</p>
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { Pagination },
    setup() {
      const sm = ref(3)
      const md = ref(3)
      const lg = ref(3)
      return { sm, md, lg }
    },
    template: `
      <div class="flex flex-col gap-6">
        <div class="flex flex-col gap-1">
          <span class="text-xs font-medium text-[--color-text-secondary]">Small</span>
          <Pagination v-model="sm" :total="100" size="sm" />
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-xs font-medium text-[--color-text-secondary]">Medium</span>
          <Pagination v-model="md" :total="100" size="md" />
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-xs font-medium text-[--color-text-secondary]">Large</span>
          <Pagination v-model="lg" :total="100" size="lg" />
        </div>
      </div>
    `,
  }),
}
