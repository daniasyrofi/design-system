import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Modal from './Modal.vue'
import Button from '@/components/atoms/Button/Button.vue'
import Input from '@/components/atoms/Input/Input.vue'
import Textarea from '@/components/atoms/Textarea/Textarea.vue'

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

const meta: Meta<typeof Modal> = {
  title: 'Molecules/Modal',
  component: Modal,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    size:           { control: 'select', options: ['sm', 'md', 'lg', 'xl', 'full'] },
    closable:       { control: 'boolean' },
    closeOnOverlay: { control: 'boolean' },
    preventClose:   { control: 'boolean' },
    scrollBehavior: { control: 'select', options: ['inside', 'outside'] },
  },
  args: {
    size:           'md',
    closable:       true,
    closeOnOverlay: true,
    preventClose:   false,
    scrollBehavior: 'inside',
  },
}
export default meta
type Story = StoryObj<typeof Modal>

export const Default: Story = {
  render: (args) => ({
    components: { Modal, Button },
    setup() {
      const open = ref(false)
      return { open, args }
    },
    template: `
      <div>
        <Button @click="open = true">Open Modal</Button>
        <Modal v-bind="args" v-model="open">
          <template #title>Modal title</template>
          <template #description>This is a description of the modal content.</template>
          <p style="font-size:14px;color:var(--color-text-secondary);">
            This is the body content of the modal. It can contain any kind of content
            including text, forms, images, and other components.
          </p>
          <template #footer>
            <Button variant="secondary" @click="open = false">Cancel</Button>
            <Button @click="open = false">Confirm</Button>
          </template>
        </Modal>
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => ({
    components: { Modal, Button },
    setup() {
      const activeSize = ref<string | null>(null)
      return { activeSize }
    },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:12px;">
        <Button
          v-for="size in ['sm', 'md', 'lg', 'xl', 'full']"
          :key="size"
          variant="secondary"
          @click="activeSize = size"
        >
          {{ size.toUpperCase() }}
        </Button>
        <Modal
          v-for="size in ['sm', 'md', 'lg', 'xl', 'full']"
          :key="size"
          :model-value="activeSize === size"
          :size="size"
          @update:model-value="activeSize = $event ? size : null"
        >
          <template #title>{{ size.toUpperCase() }} Modal</template>
          <template #description>This modal uses the "{{ size }}" size variant.</template>
          <p style="font-size:14px;color:var(--color-text-secondary);">
            Modal panel content at the {{ size }} breakpoint.
          </p>
          <template #footer>
            <Button @click="activeSize = null">Close</Button>
          </template>
        </Modal>
      </div>
    `,
  }),
}

export const WithForm: Story = {
  name: 'With Form',
  render: () => ({
    components: { Modal, Button, Input, Textarea },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div>
        <Button @click="open = true">Edit Profile</Button>
        <Modal v-model="open" size="md">
          <template #title>Edit Profile</template>
          <template #description>Update your personal information below.</template>
          <form style="display:flex;flex-direction:column;gap:16px;" @submit.prevent="open = false">
            <Input label="Full name" modelValue="Jane Cooper" />
            <Input label="Email" type="email" modelValue="jane@example.com" />
            <Textarea label="Bio" :rows="3" modelValue="Product designer with 8 years of experience." />
          </form>
          <template #footer>
            <Button variant="secondary" @click="open = false">Cancel</Button>
            <Button @click="open = false">Save changes</Button>
          </template>
        </Modal>
      </div>
    `,
  }),
}

export const PreventClose: Story = {
  name: 'Prevent Close',
  render: () => ({
    components: { Modal, Button },
    setup() {
      const open = ref(false)
      const confirmed = ref(false)
      return { open, confirmed }
    },
    template: `
      <div>
        <Button variant="danger" @click="open = true; confirmed = false">Delete Account</Button>
        <Modal v-model="open" size="sm" prevent-close>
          <template #title>Are you sure?</template>
          <template #description>This action cannot be undone.</template>
          <div style="display:flex;align-items:flex-start;gap:12px;">
            <input
              id="confirm-check"
              type="checkbox"
              v-model="confirmed"
              style="margin-top:2px;accent-color:var(--color-danger);"
            />
            <label for="confirm-check" style="font-size:14px;color:var(--color-text-secondary);">
              I understand that deleting my account is permanent and all my data will be lost.
            </label>
          </div>
          <template #footer>
            <Button variant="secondary" @click="open = false">Cancel</Button>
            <Button variant="danger" :disabled="!confirmed" @click="open = false">Delete Account</Button>
          </template>
        </Modal>
      </div>
    `,
  }),
}

export const ScrollBehavior: Story = {
  name: 'Scroll Behavior',
  render: () => ({
    components: { Modal, Button },
    setup() {
      const insideOpen = ref(false)
      const outsideOpen = ref(false)
      return { insideOpen, outsideOpen }
    },
    template: `
      <div style="display:flex;gap:12px;">
        <Button variant="secondary" @click="insideOpen = true">Scroll Inside</Button>
        <Button variant="secondary" @click="outsideOpen = true">Scroll Outside</Button>

        <Modal v-model="insideOpen" scroll-behavior="inside">
          <template #title>Inside scroll</template>
          <template #description>The modal body scrolls while header and footer stay fixed.</template>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <p v-for="i in 20" :key="i" style="font-size:14px;color:var(--color-text-secondary);">
              Paragraph {{ i }} — Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <template #footer>
            <Button @click="insideOpen = false">Close</Button>
          </template>
        </Modal>

        <Modal v-model="outsideOpen" scroll-behavior="outside">
          <template #title>Outside scroll</template>
          <template #description>The entire modal scrolls within the overlay.</template>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <p v-for="i in 20" :key="i" style="font-size:14px;color:var(--color-text-secondary);">
              Paragraph {{ i }} — Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <template #footer>
            <Button @click="outsideOpen = false">Close</Button>
          </template>
        </Modal>
      </div>
    `,
  }),
}
