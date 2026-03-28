import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref, computed } from 'vue'
import SearchInput from './SearchInput.vue'

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
  `<p style="font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:8px;">${text}</p>`

const meta: Meta<typeof SearchInput> = {
  title: 'Molecules/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  decorators: [withCanvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    size:      { control: 'select', options: ['sm', 'md', 'lg'] },
    loading:   { control: 'boolean' },
    clearable: { control: 'boolean' },
    disabled:  { control: 'boolean' },
    debounce:  { control: 'number' },
  },
}
export default meta
type Story = StoryObj<typeof SearchInput>

// ── Guest Search ───────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Guest Search',
  render: () => ({
    components: { SearchInput },
    setup() {
      const query   = ref('')
      const allGuests = ['Budi Santoso', 'Siti Rahayu', 'Ahmad Fauzi', 'Dewi Lestari', 'Raka Pratama', 'Nurul Hidayah']
      const results = computed(() =>
        query.value.trim()
          ? allGuests.filter(g => g.toLowerCase().includes(query.value.toLowerCase()))
          : allGuests
      )
      return { query, results }
    },
    template: `
      <div style="width:100%;max-width:400px;display:flex;flex-direction:column;gap:12px;">
        ${label('Cari Tamu')}
        <SearchInput v-model="query" placeholder="Cari nama tamu..." />
        <div style="
          background:var(--color-surface);border-radius:var(--radius-xl);
          border:1px solid var(--color-border);overflow:hidden;
        ">
          <div
            v-for="(guest, i) in results"
            :key="guest"
            style="
              display:flex;align-items:center;gap:12px;padding:10px 16px;
              cursor:pointer;transition:background 0.15s;
            "
            :style="i < results.length - 1 ? 'border-bottom:1px solid var(--color-border-subtle)' : ''"
          >
            <div style="
              width:32px;height:32px;border-radius:9999px;flex-shrink:0;
              background:var(--color-primary-light);display:flex;align-items:center;
              justify-content:center;font-size:12px;font-weight:700;color:var(--color-primary);
            ">{{ guest.charAt(0) }}</div>
            <span style="font-size:14px;color:var(--color-text-primary);">{{ guest }}</span>
          </div>
          <div v-if="results.length === 0" style="padding:24px;text-align:center;">
            <p style="font-size:14px;color:var(--color-text-tertiary);">Tidak ditemukan untuk "{{ query }}"</p>
          </div>
        </div>
        <p style="font-size:12px;color:var(--color-text-tertiary);">
          {{ results.length }} dari {{ allGuests.length }} tamu
        </p>
      </div>
    `,
  }),
}

// ── Loading State ──────────────────────────────────────────────────────────────
export const Loading: Story = {
  name: 'Loading',
  render: () => ({
    components: { SearchInput },
    setup() {
      const value = ref('Syrofi Nadira')
      return { value }
    },
    template: `
      <div style="width:100%;max-width:360px;display:flex;flex-direction:column;gap:8px;">
        ${label('Mencari...')}
        <SearchInput v-model="value" loading placeholder="Cari tamu..." />
        <p style="font-size:12px;color:var(--color-text-tertiary);">
          Mencari hasil untuk "{{ value }}"
        </p>
      </div>
    `,
  }),
}

// ── All Sizes ──────────────────────────────────────────────────────────────────
export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => ({
    components: { SearchInput },
    setup() {
      const sm = ref('')
      const md = ref('')
      const lg = ref('')
      return { sm, md, lg }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:20px;width:100%;max-width:360px;">
        <div>
          ${label('Small')}
          <SearchInput v-model="sm" size="sm" placeholder="Cari tamu..." />
        </div>
        <div>
          ${label('Medium (default)')}
          <SearchInput v-model="md" size="md" placeholder="Cari tamu..." />
        </div>
        <div>
          ${label('Large')}
          <SearchInput v-model="lg" size="lg" placeholder="Cari tamu..." />
        </div>
      </div>
    `,
  }),
}

// ── In Toolbar ─────────────────────────────────────────────────────────────────
export const InToolbar: Story = {
  name: 'In Toolbar',
  render: () => ({
    components: { SearchInput },
    setup() {
      const q = ref('')
      const count = ref(247)
      return { q, count }
    },
    template: `
      <div style="width:100%;max-width:640px;display:flex;flex-direction:column;gap:12px;">
        <div style="
          background:var(--color-surface);border-radius:var(--radius-xl);
          border:1px solid var(--color-border);padding:14px 16px;
          display:flex;align-items:center;gap:12px;justify-content:space-between;
        ">
          <p style="font-size:14px;font-weight:600;color:var(--color-text-heading);white-space:nowrap;">
            Daftar Tamu
          </p>
          <div style="flex:1;max-width:280px;">
            <SearchInput v-model="q" size="sm" placeholder="Cari nama atau email..." />
          </div>
          <span style="
            font-size:12px;font-weight:600;padding:2px 10px;white-space:nowrap;
            background:var(--color-neutral-light);color:var(--color-text-secondary);
            border-radius:var(--radius-full);flex-shrink:0;
          ">{{ count }} tamu</span>
        </div>
        <div style="
          background:var(--color-surface);border-radius:var(--radius-xl);
          border:1px solid var(--color-border);padding:48px;text-align:center;
        ">
          <p style="font-size:13px;color:var(--color-text-tertiary);">
            {{ q ? 'Mencari "' + q + '"…' : 'Seluruh tamu ditampilkan di sini' }}
          </p>
        </div>
      </div>
    `,
  }),
}
