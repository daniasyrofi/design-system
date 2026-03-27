import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { RiHome4Line, RiFolder3Line, RiFileLine } from '@remixicon/vue'
import Breadcrumb from './Breadcrumb.vue'

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

const meta: Meta<typeof Breadcrumb> = {
  title: 'Molecules/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    separator: { control: 'select', options: ['chevron', 'slash', 'dot'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}

export default meta
type Story = StoryObj<typeof Breadcrumb>

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Projects', href: '#' },
      { label: 'Design System', href: '#' },
      { label: 'Components' },
    ],
  },
}

export const WithIcons: Story = {
  args: {
    items: [
      { label: 'Home', href: '#', icon: RiHome4Line },
      { label: 'Documents', href: '#', icon: RiFolder3Line },
      { label: 'Report.pdf', icon: RiFileLine },
    ],
  },
}

export const SlashSeparator: Story = {
  args: {
    separator: 'slash',
    items: [
      { label: 'Home', href: '#' },
      { label: 'Settings', href: '#' },
      { label: 'Profile' },
    ],
  },
}

export const DotSeparator: Story = {
  args: {
    separator: 'dot',
    items: [
      { label: 'Dashboard', href: '#' },
      { label: 'Analytics', href: '#' },
      { label: 'Overview' },
    ],
  },
}

export const Sizes: Story = {
  render: () => ({
    components: { Breadcrumb },
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;width:100%;max-width:480px;">
        <Breadcrumb size="sm" :items="items" />
        <Breadcrumb size="md" :items="items" />
        <Breadcrumb size="lg" :items="items" />
      </div>
    `,
    setup() {
      const items = [
        { label: 'Home', href: '#' },
        { label: 'Category', href: '#' },
        { label: 'Current Page' },
      ]
      return { items }
    },
  }),
}
