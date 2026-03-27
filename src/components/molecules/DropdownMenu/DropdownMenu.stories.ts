import type { Meta, StoryObj } from '@storybook/vue3-vite'
import {
  RiEditLine,
  RiDeleteBinLine,
  RiFileCopyLine,
  RiShareLine,
  RiDownloadLine,
  RiArrowDownSLine,
  RiMore2Fill,
} from '@remixicon/vue'
import DropdownMenu from './DropdownMenu.vue'
import Button from '@/components/atoms/Button/Button.vue'

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

const meta: Meta<typeof DropdownMenu> = {
  title: 'Molecules/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    placement: { control: 'select', options: ['bottom-start', 'bottom-end', 'top-start', 'top-end'] },
    width:     { control: 'text' },
  },
  args: {
    placement: 'bottom-start',
    width: 'auto',
  },
}
export default meta
type Story = StoryObj<typeof DropdownMenu>

export const Default: Story = {
  render: (args) => ({
    components: { DropdownMenu, Button },
    setup() {
      const items = [
        { label: 'Edit', action: () => console.log('Edit') },
        { label: 'Duplicate', action: () => console.log('Duplicate') },
        { label: 'Archive', action: () => console.log('Archive') },
        { label: 'Delete', action: () => console.log('Delete') },
      ]
      return { args, items }
    },
    template: `
      <div style="padding:80px;">
        <DropdownMenu v-bind="args" :items="items">
          <template #trigger>
            <Button variant="secondary">Open Menu</Button>
          </template>
        </DropdownMenu>
      </div>
    `,
  }),
}

export const WithIcons: Story = {
  name: 'With Icons',
  render: () => ({
    components: { DropdownMenu, Button, RiArrowDownSLine },
    setup() {
      const items = [
        { label: 'Edit', icon: RiEditLine, action: () => console.log('Edit') },
        { label: 'Duplicate', icon: RiFileCopyLine, action: () => console.log('Duplicate') },
        { label: 'Share', icon: RiShareLine, action: () => console.log('Share') },
        { label: 'Download', icon: RiDownloadLine, action: () => console.log('Download') },
        { separator: true, label: '' },
        { label: 'Delete', icon: RiDeleteBinLine, action: () => console.log('Delete') },
      ]
      return { items }
    },
    template: `
      <div style="padding:80px;">
        <DropdownMenu :items="items">
          <template #trigger>
            <Button>
              Actions
              <template #trailing><RiArrowDownSLine style="width:16px;height:16px;" /></template>
            </Button>
          </template>
        </DropdownMenu>
      </div>
    `,
  }),
}

export const WithShortcuts: Story = {
  name: 'With Shortcuts',
  render: () => ({
    components: { DropdownMenu, Button },
    setup() {
      const items = [
        { label: 'Undo', shortcut: '⌘Z', action: () => console.log('Undo') },
        { label: 'Redo', shortcut: '⇧⌘Z', action: () => console.log('Redo') },
        { separator: true, label: '' },
        { label: 'Cut', shortcut: '⌘X', action: () => console.log('Cut') },
        { label: 'Copy', shortcut: '⌘C', action: () => console.log('Copy') },
        { label: 'Paste', shortcut: '⌘V', action: () => console.log('Paste') },
        { separator: true, label: '' },
        { label: 'Select All', shortcut: '⌘A', action: () => console.log('Select All') },
      ]
      return { items }
    },
    template: `
      <div style="padding:80px;">
        <DropdownMenu :items="items" width="220px">
          <template #trigger>
            <Button variant="secondary">Edit</Button>
          </template>
        </DropdownMenu>
      </div>
    `,
  }),
}

export const WithSeparators: Story = {
  name: 'With Separators',
  render: () => ({
    components: { DropdownMenu, Button, RiMore2Fill },
    setup() {
      const items = [
        { label: 'View profile', action: () => console.log('View profile') },
        { label: 'Settings', action: () => console.log('Settings') },
        { separator: true, label: '' },
        { label: 'Help & Support', action: () => console.log('Help') },
        { label: 'Keyboard shortcuts', action: () => console.log('Shortcuts') },
        { separator: true, label: '' },
        { label: 'Sign out', action: () => console.log('Sign out') },
      ]
      return { items }
    },
    template: `
      <div style="padding:80px;">
        <DropdownMenu :items="items" placement="bottom-end">
          <template #trigger>
            <Button variant="ghost" size="sm" :iconOnly="true" aria-label="More options">
              <template #icon><RiMore2Fill style="width:16px;height:16px;" /></template>
            </Button>
          </template>
        </DropdownMenu>
      </div>
    `,
  }),
}
