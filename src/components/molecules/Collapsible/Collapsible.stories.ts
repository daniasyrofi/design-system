import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Collapsible from './Collapsible.vue'

const meta: Meta<typeof Collapsible> = {
  title: 'Molecules/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Collapsible>

export const Default: Story = {
  render: () => ({
    components: { Collapsible },
    setup: () => ({ open: ref(false) }),
    template: `
      <div style="max-width:480px;">
        <Collapsible v-model="open">
          <template #trigger="{ open, toggle, contentId }">
            <button
              :aria-expanded="open"
              :aria-controls="contentId"
              @click="toggle"
              style="width:100%;display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);cursor:pointer;font-size:14px;font-weight:500;color:var(--color-text-primary);"
            >
              What is the refund policy?
              <span style="transition:transform 0.2s;" :style="open ? 'transform:rotate(180deg)' : ''">▾</span>
            </button>
          </template>
          <div style="padding:12px 16px 16px;border:1px solid var(--color-border);border-top:none;border-radius:0 0 var(--radius-lg) var(--radius-lg);font-size:14px;color:var(--color-text-secondary);line-height:1.6;">
            We offer a 30-day money-back guarantee on all purchases. If you are not satisfied, contact support and we'll issue a full refund.
          </div>
        </Collapsible>
      </div>
    `,
  }),
}

export const FAQ: Story = {
  render: () => ({
    components: { Collapsible },
    setup: () => ({
      items: [
        { q: 'How do I create an account?', a: 'Click the Sign Up button on the homepage and fill in your details.' },
        { q: 'What payment methods do you accept?', a: 'We accept Visa, MasterCard, PayPal, and bank transfers.' },
        { q: 'Can I cancel my subscription?', a: 'Yes, you can cancel anytime from your account settings.' },
      ],
    }),
    template: `
      <div style="max-width:480px;display:flex;flex-direction:column;gap:8px;">
        <Collapsible v-for="(item, i) in items" :key="i">
          <template #trigger="{ open, toggle, contentId }">
            <button
              :aria-expanded="open"
              :aria-controls="contentId"
              @click="toggle"
              style="width:100%;display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-lg);cursor:pointer;font-size:14px;font-weight:500;color:var(--color-text-primary);"
            >
              {{ item.q }}
              <span :style="open ? 'transform:rotate(180deg);transition:transform .2s' : 'transition:transform .2s'">▾</span>
            </button>
          </template>
          <div style="padding:12px 16px 16px;border:1px solid var(--color-border);border-top:none;border-radius:0 0 var(--radius-lg) var(--radius-lg);font-size:13px;color:var(--color-text-secondary);line-height:1.6;">
            {{ item.a }}
          </div>
        </Collapsible>
      </div>
    `,
  }),
}
