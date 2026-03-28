import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref, computed } from 'vue'
import NumberInput from './NumberInput.vue'

// ── Canvas decorator ───────────────────────────────────────────────────────────
const withCanvas = () => ({
  template: `
    <div style="
      min-height:100vh;display:flex;align-items:center;justify-content:center;
      padding:48px 32px;background-color:var(--color-bg);
      background-image:radial-gradient(circle,var(--color-border) 1px,transparent 1px);
      background-size:24px 24px;
    "><story /></div>`,
})

const label = (text: string) =>
  `<p style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:6px;">${text}</p>`

const meta: Meta<typeof NumberInput> = {
  title: 'Molecules/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  decorators: [withCanvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    modelValue: { control: 'number' },
    min:        { control: 'number' },
    max:        { control: 'number' },
    step:       { control: 'number' },
    size:       { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled:   { control: 'boolean' },
    label:      { control: 'text' },
  },
}
export default meta
type Story = StoryObj<typeof NumberInput>

// ── Cart Quantity ──────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Cart Quantity',
  render: () => ({
    components: { NumberInput },
    setup() {
      const qty = ref(1)
      const unitPrice = 480000
      const total = computed(() => (qty.value * unitPrice).toLocaleString('id-ID'))
      return { qty, total }
    },
    template: `
      <div style="
        background:var(--color-surface);border-radius:var(--radius-xl);
        border:1px solid var(--color-border);padding:20px;width:100%;max-width:360px;
        display:flex;flex-direction:column;gap:16px;
      ">
        <div style="display:flex;gap:14px;align-items:flex-start;">
          <div style="
            width:64px;height:64px;border-radius:var(--radius-lg);flex-shrink:0;
            background:var(--color-neutral-light);display:flex;align-items:center;justify-content:center;
            font-size:24px;
          ">🎴</div>
          <div style="flex:1;min-width:0;">
            <p style="font-size:14px;font-weight:600;color:var(--color-text-heading);margin-bottom:2px;">Undangan Digital Premium</p>
            <p style="font-size:12px;color:var(--color-text-tertiary);">Paket Lengkap</p>
            <p style="font-size:14px;font-weight:700;color:var(--color-text-primary);margin-top:6px;">
              Rp 480.000
            </p>
          </div>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;padding-top:12px;border-top:1px solid var(--color-border-subtle);">
          <div style="width:140px;">
            <NumberInput v-model="qty" :min="1" :max="10" label="Jumlah" />
          </div>
          <div style="text-align:right;">
            <p style="font-size:11px;color:var(--color-text-tertiary);margin-bottom:2px;">Total</p>
            <p style="font-size:16px;font-weight:700;color:var(--color-text-heading);">Rp {{ total }}</p>
          </div>
        </div>
      </div>
    `,
  }),
}

// ── Guest Count ────────────────────────────────────────────────────────────────
export const GuestCount: Story = {
  name: 'Guest Count',
  render: () => ({
    components: { NumberInput },
    setup() {
      const guests = ref(50)
      const perTable = 8
      const tables = computed(() => Math.ceil(guests.value / perTable))
      return { guests, tables }
    },
    template: `
      <div style="width:100%;max-width:380px;display:flex;flex-direction:column;gap:16px;">
        ${label('Event Planning')}
        <div style="
          background:var(--color-surface);border-radius:var(--radius-xl);
          border:1px solid var(--color-border);padding:20px;
          display:flex;flex-direction:column;gap:16px;
        ">
          <div>
            <p style="font-size:14px;font-weight:600;color:var(--color-text-heading);margin-bottom:4px;">Perkiraan Tamu</p>
            <p style="font-size:12px;color:var(--color-text-secondary);">Masukkan estimasi jumlah tamu undangan</p>
          </div>
          <NumberInput v-model="guests" :min="10" :max="500" :step="5" label="Jumlah Tamu" />
          <div style="
            display:grid;grid-template-columns:1fr 1fr;gap:10px;
            padding-top:12px;border-top:1px solid var(--color-border-subtle);
          ">
            <div style="padding:12px;background:var(--color-neutral-light);border-radius:var(--radius-lg);text-align:center;">
              <p style="font-size:22px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.02em;">{{ guests }}</p>
              <p style="font-size:11px;color:var(--color-text-tertiary);margin-top:2px;">Tamu</p>
            </div>
            <div style="padding:12px;background:var(--color-neutral-light);border-radius:var(--radius-lg);text-align:center;">
              <p style="font-size:22px;font-weight:700;color:var(--color-text-heading);letter-spacing:-0.02em;">{{ tables }}</p>
              <p style="font-size:11px;color:var(--color-text-tertiary);margin-top:2px;">Meja</p>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

// ── Step Values ────────────────────────────────────────────────────────────────
export const StepValues: Story = {
  name: 'Step Values',
  render: () => ({
    components: { NumberInput },
    setup() {
      const temp   = ref(22.5)
      const budget = ref(5000000)
      return { temp, budget }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;width:100%;max-width:280px;">
        <div>
          ${label('Decimal step (0.5)')}
          <NumberInput v-model="temp" label="Suhu Ruangan (°C)" :min="-10" :max="40" :step="0.5" />
          <p style="font-size:12px;color:var(--color-text-tertiary);margin-top:6px;">Nilai: {{ temp }}°C</p>
        </div>
        <div>
          ${label('Large step (500000)')}
          <NumberInput v-model="budget" label="Anggaran (Rp)" :min="0" :max="50000000" :step="500000" />
          <p style="font-size:12px;color:var(--color-text-tertiary);margin-top:6px;">
            Rp {{ budget.toLocaleString('id-ID') }}
          </p>
        </div>
      </div>
    `,
  }),
}

// ── All Sizes ──────────────────────────────────────────────────────────────────
export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => ({
    components: { NumberInput },
    setup() {
      const sm = ref(2)
      const md = ref(5)
      const lg = ref(8)
      return { sm, md, lg }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:20px;width:100%;max-width:200px;">
        <div>
          ${label('Small')}
          <NumberInput v-model="sm" size="sm" label="sm" :min="0" :max="10" />
        </div>
        <div>
          ${label('Medium (default)')}
          <NumberInput v-model="md" size="md" label="md" :min="0" :max="10" />
        </div>
        <div>
          ${label('Large')}
          <NumberInput v-model="lg" size="lg" label="lg" :min="0" :max="10" />
        </div>
      </div>
    `,
  }),
}

// ── Disabled ───────────────────────────────────────────────────────────────────
export const Disabled: Story = {
  name: 'Disabled',
  render: () => ({
    components: { NumberInput },
    setup() { return { val: ref(3) } },
    template: `
      <div style="width:100%;max-width:200px;">
        ${label('Disabled state')}
        <NumberInput v-model="val" label="Terkunci" :min="0" :max="10" disabled />
        <p style="font-size:12px;color:var(--color-text-tertiary);margin-top:6px;">
          Nilai dikunci, tidak dapat diubah.
        </p>
      </div>
    `,
  }),
}
