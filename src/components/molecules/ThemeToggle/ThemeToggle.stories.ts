import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ThemeToggle from './ThemeToggle.vue'

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

const meta: Meta<typeof ThemeToggle> = {
  title: 'Molecules/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],
  decorators: [withCanvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: { size: 'md' },
}
export default meta
type Story = StoryObj<typeof ThemeToggle>

// ── Default ────────────────────────────────────────────────────────────────────
export const Default: Story = {
  name: 'Default',
  render: (args) => ({
    components: { ThemeToggle },
    setup: () => ({ args }),
    template: `
      <div style="display:flex;flex-direction:column;gap:8px;align-items:center;">
        ${label('Theme Toggle')}
        <ThemeToggle v-bind="args" />
      </div>
    `,
  }),
}

// ── All Sizes ──────────────────────────────────────────────────────────────────
export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => ({
    components: { ThemeToggle },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:flex-start;">
        <div style="display:flex;align-items:center;gap:14px;">
          <ThemeToggle size="sm" />
          <span style="font-size:12px;color:var(--color-text-tertiary);">sm</span>
        </div>
        <div style="display:flex;align-items:center;gap:14px;">
          <ThemeToggle size="md" />
          <span style="font-size:12px;color:var(--color-text-tertiary);">md</span>
        </div>
        <div style="display:flex;align-items:center;gap:14px;">
          <ThemeToggle size="lg" />
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
    components: { ThemeToggle },
    template: `
      <div style="width:100%;max-width:600px;display:flex;flex-direction:column;gap:12px;">
        ${label('Navbar context')}
        <div style="
          display:flex;align-items:center;justify-content:space-between;
          padding:10px 20px;background:var(--color-surface);
          border:1px solid var(--color-border);border-radius:var(--radius-xl);
        ">
          <span style="font-size:15px;font-weight:700;color:var(--color-text-heading);">Undangan.id</span>
          <div style="display:flex;align-items:center;gap:8px;">
            <ThemeToggle />
          </div>
        </div>
        <p style="font-size:12px;color:var(--color-text-tertiary);text-align:center;">
          Toggle menyimpan preferensi ke localStorage dan menerapkan data-theme ke &lt;html&gt;
        </p>
      </div>
    `,
  }),
}

// ── With Language Toggle ───────────────────────────────────────────────────────
export const WithLanguageToggle: Story = {
  name: 'With Language Toggle',
  render: () => ({
    components: { ThemeToggle },
    template: `
      <div style="width:100%;max-width:600px;display:flex;flex-direction:column;gap:12px;">
        ${label('Combined controls')}
        <div style="
          display:flex;align-items:center;justify-content:space-between;
          padding:10px 20px;background:var(--color-surface);
          border:1px solid var(--color-border);border-radius:var(--radius-xl);
        ">
          <span style="font-size:15px;font-weight:700;color:var(--color-text-heading);">Undangan.id</span>
          <div style="display:flex;align-items:center;gap:6px;">
            <ThemeToggle size="sm" />
            <div style="width:1px;height:16px;background:var(--color-border);"></div>
            <span style="font-size:12px;font-weight:600;color:var(--color-text-secondary);">ID</span>
          </div>
        </div>
      </div>
    `,
  }),
}
