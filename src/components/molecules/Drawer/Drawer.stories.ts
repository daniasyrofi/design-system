import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { userEvent, within, expect } from 'storybook/test'
import Drawer from './Drawer.vue'
import Button from '@/components/atoms/Button/Button.vue'
import Input from '@/components/atoms/Input/Input.vue'

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

const meta: Meta<typeof Drawer> = {
  title: 'Molecules/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj<typeof Drawer>

export const Default: Story = {
  name: 'Right (default)',
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)

    // Click the trigger button to open the drawer
    const trigger = canvas.getByRole('button', { name: /open drawer/i })
    await userEvent.click(trigger)

    // Drawer renders via Teleport — query against document.body
    const body = within(document.body)
    await expect(body.getByRole('dialog')).toBeVisible()

    // Press Escape to close
    await userEvent.keyboard('{Escape}')
    await expect(body.queryByRole('dialog')).not.toBeVisible()
  },
  render: () => ({
    components: { Drawer, Button },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div>
        <Button @click="open = true">Open Drawer</Button>
        <Drawer v-model="open">
          <template #title>Settings</template>
          <p style="color: var(--color-text-secondary); font-size: 14px;">
            Adjust your preferences here. This is the drawer body content area.
          </p>
          <template #footer>
            <Button variant="ghost" @click="open = false">Cancel</Button>
            <Button @click="open = false">Save changes</Button>
          </template>
        </Drawer>
      </div>
    `,
  }),
}

export const Left: Story = {
  name: 'Left',
  render: () => ({
    components: { Drawer, Button },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div>
        <Button @click="open = true">Open Left Drawer</Button>
        <Drawer v-model="open" placement="left">
          <template #title>Navigation</template>
          <p style="color: var(--color-text-secondary); font-size: 14px;">Side navigation content.</p>
        </Drawer>
      </div>
    `,
  }),
}

export const Bottom: Story = {
  name: 'Bottom Sheet',
  render: () => ({
    components: { Drawer, Button },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div>
        <Button @click="open = true">Open Bottom Sheet</Button>
        <Drawer v-model="open" placement="bottom" size="sm">
          <template #title>Pick an option</template>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <Button variant="ghost" style="justify-content: flex-start;" @click="open = false">Option A</Button>
            <Button variant="ghost" style="justify-content: flex-start;" @click="open = false">Option B</Button>
            <Button variant="ghost" style="justify-content: flex-start;" @click="open = false">Option C</Button>
          </div>
        </Drawer>
      </div>
    `,
  }),
}

export const WithForm: Story = {
  name: 'With Form',
  render: () => ({
    components: { Drawer, Button, Input },
    setup() {
      const open = ref(false)
      const name = ref('')
      const email = ref('')
      return { open, name, email }
    },
    template: `
      <div>
        <Button @click="open = true">Edit Profile</Button>
        <Drawer v-model="open" size="md">
          <template #title>Edit Profile</template>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <Input v-model="name" label="Full name" placeholder="Alice Johnson" />
            <Input v-model="email" label="Email" placeholder="alice@example.com" />
          </div>
          <template #footer>
            <Button variant="ghost" @click="open = false">Cancel</Button>
            <Button @click="open = false">Save</Button>
          </template>
        </Drawer>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  name: 'All Sizes',
  render: () => ({
    components: { Drawer, Button },
    setup() {
      const active = ref<string | null>(null)
      return { active }
    },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <Button v-for="size in ['sm', 'md', 'lg', 'xl']" :key="size" variant="secondary"
          @click="active = size">
          {{ size }}
        </Button>
        <Drawer v-for="size in ['sm', 'md', 'lg', 'xl']" :key="size"
          :model-value="active === size" size="lg"
          :style="{ '--ds-drawer-width': size === 'sm' ? '320px' : size === 'md' ? '400px' : size === 'lg' ? '540px' : '720px' }"
          @update:model-value="active = null">
          <template #title>Drawer — {{ size }}</template>
          <p style="color: var(--color-text-secondary); font-size: 14px;">Size: {{ size }}</p>
        </Drawer>
      </div>
    `,
  }),
}
