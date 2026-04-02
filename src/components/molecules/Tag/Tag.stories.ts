import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Tag from './Tag.vue'
import { RiStarLine, RiFireLine } from '@remixicon/vue'

const canvas = () => ({
  template: `
    <div style="
      min-height: 100vh; display: flex; align-items: center; justify-content: center;
      padding: 48px 32px; background-color: #eceae4;
      background-image: radial-gradient(circle, rgba(0,0,0,0.11) 1px, transparent 1px);
      background-size: 22px 22px;
    "><story /></div>
  `,
})

const meta: Meta<typeof Tag> = {
  title:      'Molecules/Tag',
  component:  Tag,
  tags:       ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj<typeof Tag>

export const Default: Story = {
  name: 'All Variants',
  render: () => ({
    components: { Tag },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
        <Tag variant="neutral">Neutral</Tag>
        <Tag variant="primary">Primary</Tag>
        <Tag variant="secondary">Secondary</Tag>
        <Tag variant="success">Success</Tag>
        <Tag variant="warning">Warning</Tag>
        <Tag variant="danger">Danger</Tag>
        <Tag variant="info">Info</Tag>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  name: 'Sizes',
  render: () => ({
    components: { Tag },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
        <Tag size="sm" variant="primary">Small</Tag>
        <Tag size="md" variant="primary">Medium</Tag>
        <Tag size="lg" variant="primary">Large</Tag>
      </div>
    `,
  }),
}

export const Removable: Story = {
  name: 'Removable Tags',
  render: () => ({
    components: { Tag },
    setup() {
      const tags = ref(['Vue 3', 'TypeScript', 'Tailwind', 'Vite', 'Storybook'])
      return { tags }
    },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        <Tag
          v-for="tag in tags"
          :key="tag"
          variant="primary"
          removable
          @remove="tags = tags.filter(t => t !== tag)"
        >{{ tag }}</Tag>
        <span v-if="!tags.length" style="font-size: 13px; color: var(--color-text-tertiary);">
          All tags removed
        </span>
      </div>
    `,
  }),
}

export const Clickable: Story = {
  name: 'Clickable Tags',
  render: () => ({
    components: { Tag },
    setup() {
      const selected = ref<string[]>([])
      const toggle = (v: string) => {
        selected.value = selected.value.includes(v)
          ? selected.value.filter(s => s !== v)
          : [...selected.value, v]
      }
      return { selected, toggle }
    },
    template: `
      <div>
        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
          <Tag v-for="t in ['Design', 'Engineering', 'Product', 'Marketing']" :key="t"
            :variant="selected.includes(t) ? 'primary' : 'neutral'"
            clickable
            @click="toggle(t)"
          >{{ t }}</Tag>
        </div>
        <p style="font-size: 13px; color: var(--color-text-secondary);">
          Selected: {{ selected.join(', ') || 'none' }}
        </p>
      </div>
    `,
  }),
}

export const WithIcon: Story = {
  name: 'With Icon',
  render: () => ({
    components: { Tag, RiStarLine, RiFireLine },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
        <Tag variant="warning">
          <template #icon><RiStarLine :size="12" /></template>
          Featured
        </Tag>
        <Tag variant="danger">
          <template #icon><RiFireLine :size="12" /></template>
          Trending
        </Tag>
        <Tag variant="success" removable>
          <template #icon><RiStarLine :size="12" /></template>
          Active
        </Tag>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  name: 'Disabled',
  render: () => ({
    components: { Tag },
    template: `
      <div style="display: flex; gap: 8px;">
        <Tag variant="primary" disabled>Disabled</Tag>
        <Tag variant="primary" removable disabled>Non-removable</Tag>
        <Tag variant="primary" clickable disabled>Non-clickable</Tag>
      </div>
    `,
  }),
}
