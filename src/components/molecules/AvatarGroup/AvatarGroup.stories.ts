import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AvatarGroup from './AvatarGroup.vue'

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

const sampleAvatars = [
  { name: 'Alice Johnson' },
  { name: 'Bob Smith' },
  { name: 'Charlie Brown' },
  { name: 'Diana Prince' },
  { name: 'Eve Davis' },
  { name: 'Frank Miller' },
  { name: 'Grace Hopper' },
  { name: 'Henry Ford' },
]

const meta: Meta<typeof AvatarGroup> = {
  title: 'Molecules/AvatarGroup',
  component: AvatarGroup,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    max: { control: { type: 'number', min: 1, max: 10 } },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
}

export default meta
type Story = StoryObj<typeof AvatarGroup>

export const Default: Story = {
  args: {
    avatars: sampleAvatars,
    max: 4,
  },
}

export const Sizes: Story = {
  render: () => ({
    components: { AvatarGroup },
    template: `
      <div style="display:flex;flex-direction:column;gap:32px;align-items:flex-start;">
        <AvatarGroup :avatars="avatars" :max="4" size="xs" />
        <AvatarGroup :avatars="avatars" :max="4" size="sm" />
        <AvatarGroup :avatars="avatars" :max="4" size="md" />
        <AvatarGroup :avatars="avatars" :max="4" size="lg" />
        <AvatarGroup :avatars="avatars" :max="4" size="xl" />
      </div>
    `,
    setup() {
      return { avatars: sampleAvatars }
    },
  }),
}

export const NoOverflow: Story = {
  args: {
    avatars: sampleAvatars.slice(0, 3),
    max: 5,
  },
}

export const AllOverflow: Story = {
  args: {
    avatars: sampleAvatars,
    max: 2,
  },
}
