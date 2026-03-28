import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { RiStarLine, RiCheckLine, RiAlertLine, RiFlashlightLine } from '@remixicon/vue'
import Badge from './Badge.vue'

const variants = ['neutral', 'primary', 'danger', 'success', 'warning', 'info', 'secondary'] as const
const styles   = ['subtle', 'solid', 'outline'] as const
const sizes    = ['sm', 'md', 'lg'] as const

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant:    { control: 'select',  options: [...variants] },
    size:       { control: 'select',  options: [...sizes] },
    badgeStyle: { control: 'select',  options: [...styles] },
    dot:        { control: 'boolean' },
    removable:  { control: 'boolean' },
  },
  args: {
    variant:    'primary',
    size:       'md',
    badgeStyle: 'subtle',
    dot:        false,
    removable:  false,
  },
}
export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  render: (args) => ({
    components: { Badge },
    setup: () => ({ args }),
    template: '<Badge v-bind="args">Badge</Badge>',
  }),
}

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => ({
    components: { Badge },
    setup: () => ({ variants }),
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:8px;">
        <Badge v-for="v in variants" :key="v" :variant="v">{{ v }}</Badge>
      </div>
    `,
  }),
}

export const AllStyles: Story = {
  name: 'All Styles',
  render: () => ({
    components: { Badge },
    setup: () => ({ variants, styles }),
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <div v-for="s in styles" :key="s" style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
          <span style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:var(--color-text-tertiary);width:52px;flex-shrink:0;">{{ s }}</span>
          <Badge v-for="v in variants" :key="v" :variant="v" :badge-style="s">{{ v }}</Badge>
        </div>
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => ({
    components: { Badge },
    setup: () => ({ sizes }),
    template: `
      <div style="display:flex;align-items:center;gap:8px;">
        <Badge v-for="s in sizes" :key="s" :size="s" variant="primary">{{ s }}</Badge>
      </div>
    `,
  }),
}

export const WithIcon: Story = {
  name: 'With Icon',
  render: () => ({
    components: { Badge, RiStarLine, RiCheckLine, RiAlertLine, RiFlashlightLine },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:8px;">
        <Badge variant="primary">
          <template #leading><RiStarLine style="width:11px;height:11px;" /></template>
          Featured
        </Badge>
        <Badge variant="success">
          <template #leading><RiCheckLine style="width:11px;height:11px;" /></template>
          Verified
        </Badge>
        <Badge variant="warning">
          <template #leading><RiAlertLine style="width:11px;height:11px;" /></template>
          Warning
        </Badge>
        <Badge variant="danger" badge-style="solid">
          <template #leading><RiFlashlightLine style="width:11px;height:11px;" /></template>
          Critical
        </Badge>
      </div>
    `,
  }),
}

export const WithDot: Story = {
  name: 'With Dot',
  render: () => ({
    components: { Badge },
    setup: () => ({ variants }),
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:8px;">
        <Badge v-for="v in variants" :key="v" :variant="v" dot>{{ v }}</Badge>
      </div>
    `,
  }),
}

export const Removable: Story = {
  render: () => ({
    components: { Badge },
    setup() {
      const tags = ref(['Design', 'Vue 3', 'TypeScript', 'Storybook'])
      return { tags }
    },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:8px;min-height:32px;">
        <Badge
          v-for="tag in tags"
          :key="tag"
          variant="primary"
          removable
          @remove="tags = tags.filter(t => t !== tag)"
        >{{ tag }}</Badge>
        <span v-if="!tags.length" style="font-size:13px;color:var(--color-text-tertiary);">All removed — refresh to reset</span>
      </div>
    `,
  }),
}

export const FullMatrix: Story = {
  name: 'Full Matrix',
  render: () => ({
    components: { Badge },
    setup: () => ({ variants, styles, sizes }),
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;">
        <div v-for="s in styles" :key="s">
          <p style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:10px;">{{ s }}</p>
          <div style="display:flex;flex-direction:column;gap:8px;">
            <div v-for="sz in sizes" :key="sz" style="display:flex;align-items:center;flex-wrap:wrap;gap:6px;">
              <span style="font-size:11px;color:var(--color-text-tertiary);width:20px;">{{ sz }}</span>
              <Badge v-for="v in variants" :key="v" :variant="v" :badge-style="s" :size="sz">{{ v }}</Badge>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}
