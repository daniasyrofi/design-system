import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import InputGroup from './InputGroup.vue'
import Input from '@/components/atoms/Input/Input.vue'
import Button from '@/components/atoms/Button/Button.vue'

const withCanvas = () => ({
  template: `
    <div style="
      min-height:100vh;display:flex;align-items:center;justify-content:center;
      padding:48px 32px;background-color:var(--color-bg);
      background-image:radial-gradient(circle,var(--color-border) 1px,transparent 1px);
      background-size:24px 24px;
    "><story /></div>`,
})

const meta: Meta<typeof InputGroup> = {
  title: 'Molecules/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  decorators: [withCanvas],
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj<typeof InputGroup>

const label = (text: string) =>
  `<p style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:6px;">${text}</p>`

// ── Email Subscribe ───────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Email Subscribe',
  render: () => ({
    components: { InputGroup, Input, Button },
    setup() { return { email: ref('') } },
    template: `
      <div style="width:100%;max-width:480px;">
        ${label('Newsletter')}
        <InputGroup>
          <Input v-model="email" placeholder="Enter your email address" type="email" />
          <Button>Subscribe</Button>
        </InputGroup>
        <p style="font-size:12px;color:var(--color-text-tertiary);margin-top:6px;">No spam. Unsubscribe anytime.</p>
      </div>
    `,
  }),
}

// ── Search ────────────────────────────────────────────────────────────────────
export const WithSearch: Story = {
  name: 'Search Bar',
  render: () => ({
    components: { InputGroup, Input, Button },
    setup() { return { q: ref('') } },
    template: `
      <div style="width:100%;max-width:480px;">
        ${label('Guest Search')}
        <InputGroup>
          <Input v-model="q" placeholder="Search guests, invitations..." />
          <Button variant="secondary">Search</Button>
        </InputGroup>
      </div>
    `,
  }),
}

// ── URL Builder ───────────────────────────────────────────────────────────────
export const URLInput: Story = {
  name: 'URL Builder',
  render: () => ({
    components: { InputGroup, Input, Button },
    setup() { return { slug: ref('') } },
    template: `
      <div style="width:100%;max-width:480px;">
        ${label('Custom Invitation URL')}
        <InputGroup>
          <Button variant="secondary">undangan.id/</Button>
          <Input v-model="slug" placeholder="syrofi-nadira-2025" />
        </InputGroup>
        <p style="font-size:12px;color:var(--color-text-tertiary);margin-top:6px;">
          Your link:
          <span style="color:var(--color-text-primary);font-weight:500;">
            undangan.id/{{ slug || 'syrofi-nadira-2025' }}
          </span>
        </p>
      </div>
    `,
  }),
}

// ── Promo Code ────────────────────────────────────────────────────────────────
export const PromoCode: Story = {
  name: 'Promo Code',
  render: () => ({
    components: { InputGroup, Input, Button },
    setup() {
      const code   = ref('')
      const status = ref<'idle'|'ok'|'error'>('idle')
      function apply() {
        status.value = code.value.toUpperCase() === 'SAVE20' ? 'ok' : 'error'
      }
      return { code, status, apply }
    },
    template: `
      <div style="width:100%;max-width:380px;">
        ${label('Promo Code')}
        <InputGroup>
          <Input
            v-model="code"
            placeholder="Enter code (try SAVE20)"
            :error="status === 'error' ? ' ' : ''"
          />
          <Button @click="apply">Apply</Button>
        </InputGroup>
        <p v-if="status === 'ok'" style="font-size:12px;color:var(--color-success);margin-top:6px;font-weight:500;">✓ 20% discount applied</p>
        <p v-else-if="status === 'error'" style="font-size:12px;color:var(--color-danger);margin-top:6px;">Code not found. Try <strong>SAVE20</strong>.</p>
      </div>
    `,
  }),
}

// ── All Patterns ──────────────────────────────────────────────────────────────
export const AllPatterns: Story = {
  name: 'All Patterns',
  render: () => ({
    components: { InputGroup, Input, Button },
    setup() {
      return { v1: ref(''), v2: ref(''), v3: ref('') }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:20px;width:100%;max-width:480px;">
        <div>
          ${label('Input → Button (right)')}
          <InputGroup>
            <Input v-model="v1" placeholder="your@email.com" type="email" />
            <Button>Subscribe</Button>
          </InputGroup>
        </div>
        <div>
          ${label('Button → Input (prefix)')}
          <InputGroup>
            <Button variant="secondary">undangan.id/</Button>
            <Input v-model="v2" placeholder="event-name" />
          </InputGroup>
        </div>
        <div>
          ${label('Button → Input → Button (wrap)')}
          <InputGroup>
            <Button variant="secondary">https://</Button>
            <Input v-model="v3" placeholder="yourdomain.com" />
            <Button variant="secondary">/rsvp</Button>
          </InputGroup>
        </div>
      </div>
    `,
  }),
}
