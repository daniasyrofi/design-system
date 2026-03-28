import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { RiAttachmentLine, RiEmotionLine } from '@remixicon/vue'
import ChatInput from './ChatInput.vue'

const meta: Meta<typeof ChatInput> = {
  title: 'Organisms/ChatInput',
  component: ChatInput,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled:    { control: 'boolean' },
    maxRows:     { control: 'number' },
    loading:     { control: 'boolean' },
  },
  args: {
    placeholder: 'Type a message...',
    disabled: false,
    maxRows: 5,
    loading: false,
  },
  decorators: [
    () => ({
      template: `
        <div style="max-width:580px;margin:0 auto;padding:24px;">
          <story />
        </div>
      `,
    }),
  ],
}
export default meta
type Story = StoryObj<typeof ChatInput>

export const Default: Story = {
  render: (args) => ({
    components: { ChatInput },
    setup() {
      const value = ref('')
      const messages = ref<string[]>([])
      function onSubmit(msg: string) {
        messages.value.push(msg)
        value.value = ''
      }
      return { args, value, messages, onSubmit }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div
          v-if="messages.length"
          style="
            display:flex;flex-direction:column;gap:8px;
            max-height:200px;overflow-y:auto;
            padding:12px;border-radius:var(--radius-lg);
            background:var(--color-neutral-light);
          "
        >
          <div
            v-for="(msg, i) in messages"
            :key="i"
            style="
              align-self:flex-end;max-width:80%;padding:8px 14px;
              background:var(--color-neutral);color:white;
              border-radius:var(--radius-xl);font-size:14px;
            "
          >{{ msg }}</div>
        </div>
        <ChatInput
          v-bind="args"
          v-model="value"
          @submit="onSubmit"
        />
        <p style="font-size:12px;color:var(--color-text-tertiary);text-align:center;">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    `,
  }),
}

export const Loading: Story = {
  render: () => ({
    components: { ChatInput },
    setup() {
      const value = ref('Generating response...')
      return { value }
    },
    template: `
      <ChatInput
        v-model="value"
        :loading="true"
        placeholder="Type a message..."
      />
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { ChatInput },
    setup() {
      const value = ref('')
      return { value }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:8px;">
        <ChatInput
          v-model="value"
          :disabled="true"
          placeholder="Chat is disabled..."
        />
        <p style="font-size:12px;color:var(--color-text-tertiary);text-align:center;">
          Chat disabled — e.g. while generating a response
        </p>
      </div>
    `,
  }),
}

export const WithCustomActions: Story = {
  render: () => ({
    components: { ChatInput, RiAttachmentLine, RiEmotionLine },
    setup() {
      const value = ref('')
      return { value }
    },
    template: `
      <ChatInput v-model="value" placeholder="Type a message...">
        <template #actions-start>
          <button
            type="button"
            style="
              display:flex;align-items:center;justify-content:center;
              width:32px;height:32px;border-radius:var(--radius-md);
              color:var(--color-text-secondary);background:transparent;border:none;
              cursor:pointer;transition:background 0.15s, color 0.15s;
            "
            aria-label="Attach file"
          >
            <RiAttachmentLine :size="18" />
          </button>
          <button
            type="button"
            style="
              display:flex;align-items:center;justify-content:center;
              width:32px;height:32px;border-radius:var(--radius-md);
              color:var(--color-text-secondary);background:transparent;border:none;
              cursor:pointer;transition:background 0.15s, color 0.15s;
            "
            aria-label="Add emoji"
          >
            <RiEmotionLine :size="18" />
          </button>
        </template>
      </ChatInput>
    `,
  }),
}
