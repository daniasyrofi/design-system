import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import {
  RiAddLine, RiArrowRightLine, RiDeleteBinLine,
  RiDownloadLine
} from '@remixicon/vue'
import Button from './Button.vue'
const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant:   { control: 'select',  options: ['default', 'primary', 'secondary', 'outline', 'ghost', 'danger', 'link'] },
    size:      { control: 'select',  options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    disabled:  { control: 'boolean' },
    loading:   { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  args: {
    variant:   'default',
    size:      'md',
    disabled:  false,
    loading:   false,
    fullWidth: false,
  },
}
export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: '<Button v-bind="args">Button</Button>',
  }),
}

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => ({
    components: { Button },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;">
        <Button variant="default">Default</Button>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="link">Link</Button>
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => ({
    components: { Button },
    template: `
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;">
        <Button size="xs">Extra Small</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="xl">Extra Large</Button>
      </div>
    `,
  }),
}

export const WithLeadingIcon: Story = {
  name: 'With Leading Icon',
  render: () => ({
    components: { Button, RiAddLine },
    template: `
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;">
        <Button v-for="size in ['xs','sm','md','lg','xl']" :key="size" :size="size">
          <template #leading><RiAddLine style="width:1em;height:1em;" /></template>
          Add Item
        </Button>
      </div>
    `,
  }),
}

export const WithTrailingIcon: Story = {
  name: 'With Trailing Icon',
  render: () => ({
    components: { Button, RiArrowRightLine },
    template: `
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;">
        <Button>
          Continue
          <template #trailing><RiArrowRightLine style="width:1em;height:1em;" /></template>
        </Button>
      </div>
    `,
  }),
}

export const IconOnly: Story = {
  name: 'Icon Only',
  render: () => ({
    components: { Button, RiDownloadLine, RiAddLine, RiDeleteBinLine },
    template: `
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;">
        <Button v-for="size in ['xs','sm','md','lg','xl']" :key="size" :size="size" :iconOnly="true" :aria-label="'Download ' + size">
          <template #icon><RiDownloadLine style="width:1em;height:1em;" /></template>
        </Button>
        <div style="width:1px;height:32px;background:var(--color-border);"></div>
        <Button variant="outline" :iconOnly="true" aria-label="Add">
          <template #icon><RiAddLine style="width:1em;height:1em;" /></template>
        </Button>
        <Button variant="ghost" :iconOnly="true" aria-label="Delete">
          <template #icon><RiDeleteBinLine style="width:1em;height:1em;" /></template>
        </Button>
        <Button variant="danger" :iconOnly="true" aria-label="Delete permanently">
          <template #icon><RiDeleteBinLine style="width:1em;height:1em;" /></template>
        </Button>
      </div>
    `,
  }),
}

export const Loading: Story = {
  render: () => ({
    components: { Button },
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
      <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;">
        <Button :loading="loading" @click="handleClick">
          {{ loading ? $t('common.loading') : $t('common.save') }}
        </Button>
        <Button variant="outline" loading>{{ $t('common.loading') }}</Button>
        <Button variant="ghost" loading>{{ $t('common.loading') }}</Button>
      </div>
    `,
  }),
}

export const States: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <div>
          <p style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:10px;">Disabled</p>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <Button disabled>Default</Button>
            <Button variant="primary" disabled>Primary</Button>
            <Button variant="outline" disabled>Outline</Button>
            <Button variant="ghost" disabled>Ghost</Button>
            <Button variant="danger" disabled>Danger</Button>
          </div>
        </div>
        <div>
          <p style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:10px;">Full Width</p>
          <div style="width:280px;display:flex;flex-direction:column;gap:8px;">
            <Button fullWidth>Full Width Default</Button>
            <Button variant="outline" fullWidth>Full Width Outline</Button>
          </div>
        </div>
      </div>
    `,
  }),
}

export const Danger: Story = {
  name: 'Danger — Destructive',
  render: () => ({
    components: { Button, RiDeleteBinLine },
    setup() {
      const confirmed = ref(false)
      return { confirmed }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:320px;">
        <p style="font-size:14px;color:var(--color-text-secondary);">Red is reserved for destructive actions only.</p>
        <div style="display:flex;gap:8px;">
          <Button variant="danger">
            <template #leading><RiDeleteBinLine style="width:1em;height:1em;" /></template>
            {{ $t('common.delete') }}
          </Button>
          <Button variant="outline">{{ $t('common.cancel') }}</Button>
        </div>
      </div>
    `,
  }),
}
