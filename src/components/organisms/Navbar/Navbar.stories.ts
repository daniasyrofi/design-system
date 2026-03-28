import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Navbar from './Navbar.vue'

const meta: Meta<typeof Navbar> = {
  title: 'Organisms/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'transparent', 'colored'] },
    sticky:  { control: 'boolean' },
    border:  { control: 'boolean' },
    title:   { control: 'text' },
  },
  args: {
    variant: 'default',
    sticky:  false,
    border:  true,
    title:   'Acme',
  },
  decorators: [
    () => ({
      template: '<div style="width:100%;min-width:640px;"><story /></div>',
    }),
  ],
}
export default meta
type Story = StoryObj<typeof Navbar>

// ── Shared slot helpers ────────────────────────────────────────────────────────

const navLinks = `
  <template #center>
    <nav style="display:flex;align-items:center;gap:4px;">
      <a href="#" style="
        padding:6px 12px;font-size:14px;font-weight:500;
        border-radius:var(--radius-md);color:var(--color-text-primary);
        text-decoration:none;transition:background 0.15s;
      ">Home</a>
      <a href="#" style="
        padding:6px 12px;font-size:14px;font-weight:500;
        border-radius:var(--radius-md);color:var(--color-text-primary);
        text-decoration:none;transition:background 0.15s;
      ">Products</a>
      <a href="#" style="
        padding:6px 12px;font-size:14px;font-weight:500;
        border-radius:var(--radius-md);color:var(--color-text-primary);
        text-decoration:none;transition:background 0.15s;
      ">About</a>
    </nav>
  </template>
`

const actions = `
  <template #end>
    <div style="display:flex;align-items:center;gap:8px;">
      <div style="
        width:32px;height:32px;border-radius:var(--radius-md);flex-shrink:0;
        background:var(--color-neutral-light);display:flex;align-items:center;
        justify-content:center;font-size:12px;color:var(--color-text-secondary);
      " title="Theme toggle">T</div>
      <div style="
        width:32px;height:32px;border-radius:var(--radius-md);flex-shrink:0;
        background:var(--color-neutral-light);display:flex;align-items:center;
        justify-content:center;font-size:12px;color:var(--color-text-secondary);
      " title="Language toggle">ID</div>
      <div style="
        width:32px;height:32px;border-radius:9999px;flex-shrink:0;
        background:var(--color-primary-light);display:flex;align-items:center;
        justify-content:center;font-size:12px;font-weight:600;color:var(--color-primary);
      " title="User avatar">A</div>
    </div>
  </template>
`

const coloredActions = `
  <template #end>
    <div style="display:flex;align-items:center;gap:8px;">
      <div style="
        width:32px;height:32px;border-radius:var(--radius-md);flex-shrink:0;
        background:rgba(255,255,255,0.1);display:flex;align-items:center;
        justify-content:center;font-size:12px;color:white;
      " title="Theme toggle">T</div>
      <div style="
        width:32px;height:32px;border-radius:var(--radius-md);flex-shrink:0;
        background:rgba(255,255,255,0.1);display:flex;align-items:center;
        justify-content:center;font-size:12px;color:white;
      " title="Language toggle">ID</div>
      <div style="
        width:32px;height:32px;border-radius:9999px;flex-shrink:0;
        background:rgba(255,255,255,0.2);display:flex;align-items:center;
        justify-content:center;font-size:12px;font-weight:600;color:white;
      " title="User avatar">A</div>
    </div>
  </template>
`

export const Default: Story = {
  render: (args) => ({
    components: { Navbar },
    setup: () => ({ args }),
    template: `
      <Navbar v-bind="args">
        ${navLinks}
        ${actions}
      </Navbar>
    `,
  }),
}

export const Transparent: Story = {
  args: {
    variant: 'transparent',
    border:  false,
  },
  render: (args) => ({
    components: { Navbar },
    setup: () => ({ args }),
    template: `
      <div style="
        background:linear-gradient(to right, var(--color-primary-light), var(--color-secondary-light));
        border-radius:var(--radius-lg);overflow:hidden;
      ">
        <Navbar v-bind="args">
          ${navLinks}
          ${actions}
        </Navbar>
      </div>
    `,
  }),
}

export const Colored: Story = {
  args: {
    variant: 'colored',
  },
  render: (args) => ({
    components: { Navbar },
    setup: () => ({ args }),
    template: `
      <Navbar v-bind="args">
        <template #center>
          <nav style="display:flex;align-items:center;gap:4px;">
            <a href="#" style="
              padding:6px 12px;font-size:14px;font-weight:500;
              border-radius:var(--radius-md);color:white;
              text-decoration:none;transition:background 0.15s;
            ">Home</a>
            <a href="#" style="
              padding:6px 12px;font-size:14px;font-weight:500;
              border-radius:var(--radius-md);color:white;
              text-decoration:none;transition:background 0.15s;
            ">Products</a>
            <a href="#" style="
              padding:6px 12px;font-size:14px;font-weight:500;
              border-radius:var(--radius-md);color:white;
              text-decoration:none;transition:background 0.15s;
            ">About</a>
          </nav>
        </template>
        ${coloredActions}
      </Navbar>
    `,
  }),
}

export const Sticky: Story = {
  args: {
    sticky: true,
  },
  render: (args) => ({
    components: { Navbar },
    setup: () => ({ args }),
    template: `
      <div style="
        height:400px;overflow-y:auto;
        border:1px solid var(--color-border);border-radius:var(--radius-lg);
      ">
        <Navbar v-bind="args">
          ${navLinks}
          ${actions}
        </Navbar>
        <div style="padding:24px;display:flex;flex-direction:column;gap:16px;">
          <p v-for="i in 20" :key="i" style="font-size:14px;color:var(--color-text-secondary);">
            Scroll down to see the sticky navbar remain at the top. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </div>
    `,
  }),
}
