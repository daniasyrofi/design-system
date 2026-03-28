import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Icon from './Icon.vue'

const commonIcons = [
  'RiHomeLine', 'RiUser3Line', 'RiSettings3Line', 'RiSearchLine',
  'RiHeartLine', 'RiStarLine', 'RiBellLine', 'RiMailLine',
  'RiLockLine', 'RiCheckLine', 'RiCloseLine', 'RiArrowRightLine',
  'RiAddLine', 'RiDeleteBinLine', 'RiEditLine', 'RiDownloadLine',
  'RiEyeLine', 'RiEyeOffLine', 'RiInformationLine', 'RiAlertLine',
  'RiCalendarLine', 'RiPhoneLine', 'RiMapPinLine', 'RiGlobeLine',
]

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    name:  { control: 'text' },
    size:  { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    color: { control: 'color' },
  },
  args: {
    name: 'RiHomeLine',
    size: 'md',
  },
}
export default meta
type Story = StoryObj<typeof Icon>

export const Default: Story = {
  render: (args) => ({
    components: { Icon },
    setup: () => ({ args }),
    template: '<Icon v-bind="args" />',
  }),
}

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => ({
    components: { Icon },
    template: `
      <div style="display:flex;align-items:flex-end;gap:20px;">
        <div v-for="s in ['xs','sm','md','lg','xl']" :key="s" style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Icon name="RiHomeLine" :size="s" />
          <span style="font-size:11px;color:var(--color-text-tertiary);">{{ s }}</span>
        </div>
      </div>
    `,
  }),
}

export const IconGrid: Story = {
  name: 'Icon Grid',
  render: () => ({
    components: { Icon },
    setup() {
      const copied = ref<string | null>(null)
      function copyName(name: string) {
        navigator.clipboard?.writeText(name)
        copied.value = name
        setTimeout(() => { copied.value = null }, 1500)
      }
      return { icons: commonIcons, copied, copyName }
    },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:8px;max-width:480px;">
        <button
          v-for="icon in icons"
          :key="icon"
          style="display:flex;flex-direction:column;align-items:center;gap:6px;padding:10px 8px;border-radius:var(--radius-md);border:1px solid var(--color-border);background:var(--color-surface);min-width:80px;cursor:pointer;transition:background 150ms;"
          :style="{ background: copied === icon ? 'var(--color-primary-light)' : 'var(--color-surface)' }"
          :title="'Click to copy: ' + icon"
          @click="copyName(icon)"
        >
          <Icon :name="icon" size="md" />
          <span style="font-size:10px;color:var(--color-text-secondary);text-align:center;line-height:1.2;">{{ icon.replace('Ri','').replace('Line','') }}</span>
        </button>
      </div>
    `,
  }),
}

export const ColoredIcons: Story = {
  name: 'Colored Icons',
  render: () => ({
    components: { Icon },
    template: `
      <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
        <div v-for="[name, color, label] in [
          ['RiHeartLine', 'var(--color-danger)', 'danger'],
          ['RiCheckLine', 'var(--color-success)', 'success'],
          ['RiAlertLine', 'var(--color-warning)', 'warning'],
          ['RiInformationLine', 'var(--color-info)', 'info'],
          ['RiStarLine', 'var(--color-primary)', 'primary'],
          ['RiSettings3Line', 'var(--color-text-secondary)', 'muted'],
        ]" :key="name" style="display:flex;flex-direction:column;align-items:center;gap:6px;">
          <Icon :name="name" size="lg" :color="color" />
          <span style="font-size:10px;color:var(--color-text-tertiary);">{{ label }}</span>
        </div>
      </div>
    `,
  }),
}
