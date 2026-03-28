import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Spinner from './Spinner.vue'
import Button from '@/components/atoms/Button/Button.vue'

const meta: Meta<typeof Spinner> = {
  title: 'Atoms/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size:  { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    color: { control: 'color' },
    label: { control: 'text' },
  },
  args: { size: 'md' },
}
export default meta
type Story = StoryObj<typeof Spinner>

export const Default: Story = {
  render: (args) => ({
    components: { Spinner },
    setup: () => ({ args }),
    template: '<Spinner v-bind="args" />',
  }),
}

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => ({
    components: { Spinner },
    template: `
      <div style="display:flex;align-items:flex-end;gap:24px;">
        <div v-for="s in ['xs','sm','md','lg','xl']" :key="s" style="display:flex;flex-direction:column;align-items:center;gap:10px;">
          <Spinner :size="s" />
          <span style="font-size:11px;color:var(--color-text-tertiary);">{{ s }}</span>
        </div>
      </div>
    `,
  }),
}

export const ColorVariants: Story = {
  name: 'Color Variants',
  render: () => ({
    components: { Spinner },
    template: `
      <div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap;">
        <div v-for="[color, label] in [
          ['var(--color-primary)',   'primary'],
          ['var(--color-success)',   'success'],
          ['var(--color-warning)',   'warning'],
          ['var(--color-danger)',    'danger'],
          ['var(--color-info)',      'info'],
          ['var(--color-text-secondary)', 'muted'],
        ]" :key="label" style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Spinner size="md" :color="color" />
          <span style="font-size:11px;color:var(--color-text-tertiary);">{{ label }}</span>
        </div>
      </div>
    `,
  }),
}

export const InButton: Story = {
  name: 'In Button',
  render: () => ({
    components: { Spinner, Button },
    setup() {
      const loading = ref(false)
      async function handleClick() {
        loading.value = true
        await new Promise(r => setTimeout(r, 2000))
        loading.value = false
      }
      return { loading, handleClick }
    },
    template: `
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
        <Button :loading="loading" @click="handleClick">
          {{ loading ? 'Saving…' : 'Click to load' }}
        </Button>
        <Button variant="secondary" loading>Loading</Button>
        <Button variant="ghost" loading>Loading</Button>
      </div>
    `,
  }),
}

export const LoadingOverlay: Story = {
  name: 'Loading Overlay',
  render: () => ({
    components: { Spinner, Button },
    setup() {
      const loading = ref(false)
      async function load() {
        loading.value = true
        await new Promise(r => setTimeout(r, 2500))
        loading.value = false
      }
      return { loading, load }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:center;">
        <div style="position:relative;width:280px;padding:20px;border-radius:var(--radius-lg);border:1px solid var(--color-border);background:var(--color-surface);">
          <p style="font-size:15px;font-weight:600;color:var(--color-text-heading);margin-bottom:4px;">Card title</p>
          <p style="font-size:13px;color:var(--color-text-secondary);">Some card content that gets obscured when loading.</p>
          <!-- Overlay -->
          <div v-if="loading" style="position:absolute;inset:0;background:var(--color-surface);opacity:0.75;border-radius:var(--radius-lg);display:flex;align-items:center;justify-content:center;">
            <Spinner size="md" />
          </div>
        </div>
        <Button @click="load" :disabled="loading">{{ loading ? 'Loading…' : 'Trigger load' }}</Button>
      </div>
    `,
  }),
}
