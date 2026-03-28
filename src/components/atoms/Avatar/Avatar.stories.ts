import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Avatar from './Avatar.vue'

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size:         { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    shape:        { control: 'select', options: ['circle', 'rounded', 'square'] },
    status:       { control: 'select', options: [null, 'online', 'offline', 'busy', 'away'] },
    fallbackIcon: { control: 'text' },
    src:          { control: 'text' },
    name:         { control: 'text' },
  },
  args: {
    size:  'md',
    shape: 'circle',
  },
}
export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  args: {
    src:  'https://i.pravatar.cc/150?img=1',
    alt:  'Jane Doe',
    size: 'lg',
  },
  render: (args) => ({
    components: { Avatar },
    setup: () => ({ args }),
    template: '<Avatar v-bind="args" />',
  }),
}

export const WithImage: Story = {
  name: 'With Image',
  render: () => ({
    components: { Avatar },
    setup: () => ({ sizes: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const }),
    template: `
      <div style="display:flex;align-items:flex-end;gap:12px;">
        <Avatar v-for="s in sizes" :key="s" :size="s" src="https://i.pravatar.cc/150?img=3" alt="User" />
      </div>
    `,
  }),
}

export const Initials: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:12px;">
        <Avatar name="Jane Doe" size="md" />
        <Avatar name="Bob Smith" size="md" />
        <Avatar name="Alex Kim" size="md" />
        <Avatar name="María García" size="md" />
        <Avatar name="Tom" size="md" />
        <Avatar name="Yuki Tanaka" size="md" />
      </div>
    `,
  }),
}

export const IconFallback: Story = {
  name: 'Icon Fallback',
  render: () => ({
    components: { Avatar },
    template: `
      <div style="display:flex;align-items:center;gap:12px;">
        <Avatar size="md" />
        <Avatar size="md" fallback-icon="RiRobotLine" />
        <Avatar size="md" fallback-icon="RiBuildingLine" />
        <Avatar size="md" fallback-icon="RiTeamLine" />
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => ({
    components: { Avatar },
    template: `
      <div style="display:flex;flex-direction:column;gap:20px;">
        <div>
          <p style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:10px;">With image</p>
          <div style="display:flex;align-items:flex-end;gap:10px;">
            <Avatar v-for="s in ['xs','sm','md','lg','xl','2xl']" :key="s" :size="s" src="https://i.pravatar.cc/150?img=5" alt="User" />
          </div>
        </div>
        <div>
          <p style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:10px;">Initials</p>
          <div style="display:flex;align-items:flex-end;gap:10px;">
            <Avatar v-for="s in ['xs','sm','md','lg','xl','2xl']" :key="s" :size="s" name="Alex Kim" />
          </div>
        </div>
        <div>
          <p style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:10px;">Icon</p>
          <div style="display:flex;align-items:flex-end;gap:10px;">
            <Avatar v-for="s in ['xs','sm','md','lg','xl','2xl']" :key="s" :size="s" />
          </div>
        </div>
      </div>
    `,
  }),
}

export const AllStatuses: Story = {
  name: 'All Statuses',
  render: () => ({
    components: { Avatar },
    setup: () => ({ statuses: ['online', 'offline', 'busy', 'away'] as const }),
    template: `
      <div style="display:flex;gap:20px;">
        <div v-for="s in statuses" :key="s" style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Avatar name="Alex Kim" size="lg" :status="s" />
          <span style="font-size:12px;color:var(--color-text-secondary);">{{ s }}</span>
        </div>
      </div>
    `,
  }),
}

export const Shapes: Story = {
  render: () => ({
    components: { Avatar },
    template: `
      <div style="display:flex;gap:20px;">
        <div v-for="[shape, label] in [['circle','circle'],['rounded','rounded'],['square','square']]" :key="shape" style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Avatar src="https://i.pravatar.cc/150?img=7" size="lg" :shape="shape" />
          <span style="font-size:12px;color:var(--color-text-secondary);">{{ label }}</span>
        </div>
      </div>
    `,
  }),
}

export const AvatarGroup: Story = {
  name: 'Avatar Group',
  render: () => ({
    components: { Avatar },
    template: `
      <div style="display:flex;align-items:center;">
        <Avatar src="https://i.pravatar.cc/150?img=1" size="md" alt="User 1" style="outline:2px solid var(--color-surface);" />
        <Avatar src="https://i.pravatar.cc/150?img=2" size="md" alt="User 2" style="outline:2px solid var(--color-surface);margin-left:-10px;" />
        <Avatar src="https://i.pravatar.cc/150?img=3" size="md" alt="User 3" style="outline:2px solid var(--color-surface);margin-left:-10px;" />
        <Avatar name="Jane Doe" size="md" style="outline:2px solid var(--color-surface);margin-left:-10px;" />
        <div style="
          width:40px;height:40px;border-radius:9999px;
          background:var(--color-neutral-light);
          border:1px solid var(--color-border);
          display:inline-flex;align-items:center;justify-content:center;
          font-size:12px;font-weight:600;color:var(--color-text-secondary);
          outline:2px solid var(--color-surface);margin-left:-10px;
        ">+4</div>
      </div>
    `,
  }),
}
