import type { Meta, StoryObj } from '@storybook/vue3-vite'
import LanguageToggle from './LanguageToggle.vue'

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

const meta: Meta<typeof LanguageToggle> = {
  title: 'Molecules/LanguageToggle',
  component: LanguageToggle,
  tags: ['autodocs'],
  decorators: [withCanvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: { size: 'md' },
}
export default meta
type Story = StoryObj<typeof LanguageToggle>

// ── Default ────────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => ({
    components: { LanguageToggle },
    setup: () => ({ args }),
    template: `
      <div style="display:flex;flex-direction:column;gap:8px;align-items:center;">
        ${label('Language Toggle')}
        <LanguageToggle v-bind="args" />
      </div>
    `,
  }),
}

// ── All Sizes ──────────────────────────────────────────────────────────────────
export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => ({
    components: { LanguageToggle },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start;">
        <div style="display:flex;align-items:center;gap:14px;">
          <LanguageToggle size="sm" />
          <span style="font-size:12px;color:var(--color-text-tertiary);">sm</span>
        </div>
        <div style="display:flex;align-items:center;gap:14px;">
          <LanguageToggle size="md" />
          <span style="font-size:12px;color:var(--color-text-tertiary);">md</span>
        </div>
        <div style="display:flex;align-items:center;gap:14px;">
          <LanguageToggle size="lg" />
          <span style="font-size:12px;color:var(--color-text-tertiary);">lg</span>
        </div>
      </div>
    `,
  }),
}

// ── In Navbar ──────────────────────────────────────────────────────────────────
export const InNavbar: Story = {
  name: 'In Navbar',
  render: () => ({
    components: { LanguageToggle },
    template: `
      <div style="width:100%;max-width:600px;display:flex;flex-direction:column;gap:12px;">
        ${label('Navbar context')}
        <div style="
          display:flex;align-items:center;justify-content:space-between;
          padding:10px 20px;background:var(--color-surface);
          border:1px solid var(--color-border);border-radius:var(--radius-xl);
        ">
          <span style="font-size:15px;font-weight:700;color:var(--color-text-heading);">{{ $t('nav.settings') }}</span>
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:12px;color:var(--color-text-secondary);">{{ $t('settings.language') }}: </span>
            <LanguageToggle />
          </div>
        </div>
        <p style="font-size:12px;color:var(--color-text-tertiary);text-align:center;">
          {{ $t('common.save') }} / {{ $t('common.cancel') }}
        </p>
      </div>
    `,
  }),
}
