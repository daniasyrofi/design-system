import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import TagInput from './TagInput.vue'

const meta: Meta<typeof TagInput> = {
  title: 'Molecules/TagInput',
  component: TagInput,
  tags: ['autodocs'],
  argTypes: {
    size:            { control: 'select', options: ['sm', 'md', 'lg'] },
    maxTags:         { control: 'number' },
    allowDuplicates: { control: 'boolean' },
    disabled:        { control: 'boolean' },
    error:           { control: 'boolean' },
  },
}
export default meta

type Story = StoryObj<typeof TagInput>

export const Default: Story = {
  render: (args) => ({
    components: { TagInput },
    setup: () => {
      const tags = ref(['vue', 'typescript'])
      return { args, tags }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:8px;max-width:400px;">
        <TagInput v-bind="args" v-model="tags" />
        <p style="font-size:12px;color:var(--color-text-secondary);">Tags: {{ tags.join(', ') || '—' }}</p>
      </div>
    `,
  }),
  args: { placeholder: 'Add tag…', size: 'md' },
}

export const AllSizes: Story = {
  render: () => ({
    components: { TagInput },
    setup: () => ({
      sm: ref(['small']),
      md: ref(['medium']),
      lg: ref(['large']),
    }),
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:400px;">
        <div v-for="[size, model] in [['sm', sm], ['md', md], ['lg', lg]]" :key="size" style="display:flex;align-items:center;gap:12px;">
          <span style="width:24px;font-size:12px;color:var(--color-text-tertiary);">{{ size }}</span>
          <TagInput :size="size" v-model="model.value" style="flex:1;" />
        </div>
      </div>
    `,
  }),
}

export const ErrorState: Story = {
  render: () => ({
    components: { TagInput },
    setup: () => ({ tags: ref(['invalid']) }),
    template: `
      <div style="display:flex;flex-direction:column;gap:6px;max-width:400px;">
        <TagInput v-model="tags" error />
        <p style="font-size:12px;color:var(--color-danger);">Invalid tags detected.</p>
      </div>
    `,
  }),
}

export const WithMaxTags: Story = {
  render: () => ({
    components: { TagInput },
    setup: () => ({ tags: ref(['a', 'b', 'c']) }),
    template: `
      <div style="max-width:400px;">
        <TagInput v-model="tags" :max-tags="3" placeholder="Max 3 tags" />
      </div>
    `,
  }),
}
