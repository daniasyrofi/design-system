import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import {
  RiDashboardLine,
  RiInboxLine,
  RiCalendarLine,
  RiTeamLine,
  RiSettingsLine,
  RiFolderLine,
  RiBarChartLine,
  RiBookOpenLine,
  RiMailLine,
} from '@remixicon/vue'
import Sidebar from './Sidebar.vue'
import type { SidebarItem } from './Sidebar.vue'

const basicItems: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard',    icon: RiDashboardLine },
  { id: 'inbox',     label: 'Inbox',        icon: RiInboxLine },
  { id: 'calendar',  label: 'Calendar',     icon: RiCalendarLine },
  { id: 'team',      label: 'Team',         icon: RiTeamLine },
  { id: 'settings',  label: 'Settings',     icon: RiSettingsLine },
]

const badgeItems: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard',    icon: RiDashboardLine },
  { id: 'inbox',     label: 'Inbox',        icon: RiInboxLine,    badge: 12 },
  { id: 'calendar',  label: 'Calendar',     icon: RiCalendarLine, badge: 3 },
  { id: 'team',      label: 'Team',         icon: RiTeamLine },
  { id: 'mail',      label: 'Messages',     icon: RiMailLine,     badge: 'New' },
  { id: 'settings',  label: 'Settings',     icon: RiSettingsLine },
]

const childrenItems: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard',    icon: RiDashboardLine },
  { id: 'inbox',     label: 'Inbox',        icon: RiInboxLine, badge: 5 },
  {
    id: 'projects',
    label: 'Projects',
    icon: RiFolderLine,
    children: [
      { id: 'proj-active',   label: 'Active' },
      { id: 'proj-archived', label: 'Archived' },
      { id: 'proj-drafts',   label: 'Drafts', badge: 2 },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: RiBarChartLine,
    children: [
      { id: 'rpt-weekly',  label: 'Weekly' },
      { id: 'rpt-monthly', label: 'Monthly' },
      { id: 'rpt-annual',  label: 'Annual' },
    ],
  },
  { id: 'docs',     label: 'Documentation', icon: RiBookOpenLine },
  { id: 'settings', label: 'Settings',      icon: RiSettingsLine },
]

// ── Logo box helper (inline-styled to avoid broken Tailwind arbitrary values)
const logoBox = `
  <div style="
    width:32px;height:32px;border-radius:var(--radius-md);flex-shrink:0;
    background:var(--color-primary);display:flex;align-items:center;
    justify-content:center;font-size:12px;font-weight:700;color:white;
  ">A</div>
`

const meta: Meta<typeof Sidebar> = {
  title: 'Organisms/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  argTypes: {
    modelValue:     { control: 'boolean' },
    collapsible:    { control: 'boolean' },
    width:          { control: 'select', options: ['narrow', 'default', 'wide'] },
    collapsedWidth: { control: 'select', options: ['icon-only', 'hidden'] },
    activeId:       { control: 'text' },
  },
  args: {
    modelValue:     false,
    collapsible:    true,
    width:          'default',
    collapsedWidth: 'icon-only',
    activeId:       'dashboard',
  },
  decorators: [
    () => ({
      template: `
        <div style="
          display:flex;height:520px;
          border:1px solid var(--color-border);border-radius:var(--radius-lg);
          overflow:hidden;
        "><story /></div>
      `,
    }),
  ],
}
export default meta
type Story = StoryObj<typeof Sidebar>

export const Default: Story = {
  render: (args) => ({
    components: { Sidebar },
    setup() {
      const collapsed = ref(args.modelValue)
      return { args, collapsed, items: basicItems }
    },
    template: `
      <Sidebar v-bind="args" v-model="collapsed" :items="items">
        <template #header="{ collapsed: c }">
          <div style="display:flex;align-items:center;gap:8px;">
            ${logoBox}
            <span v-if="!c" style="
              font-size:14px;font-weight:600;color:var(--color-text-heading);
              overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
            ">Acme Inc</span>
          </div>
        </template>
      </Sidebar>
      <div style="flex:1;background:var(--color-bg);padding:24px;">
        <p style="font-size:14px;color:var(--color-text-secondary);">Main content area</p>
      </div>
    `,
  }),
}

export const Collapsed: Story = {
  args: { modelValue: true },
  render: (args) => ({
    components: { Sidebar },
    setup() {
      const collapsed = ref(args.modelValue)
      return { args, collapsed, items: basicItems }
    },
    template: `
      <Sidebar v-bind="args" v-model="collapsed" :items="items">
        <template #header="{ collapsed: c }">
          <div style="display:flex;align-items:center;gap:8px;">
            ${logoBox}
            <span v-if="!c" style="
              font-size:14px;font-weight:600;color:var(--color-text-heading);
              overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
            ">Acme Inc</span>
          </div>
        </template>
      </Sidebar>
      <div style="flex:1;background:var(--color-bg);padding:24px;">
        <p style="font-size:14px;color:var(--color-text-secondary);">
          Main content area. Click the arrow to expand the sidebar.
        </p>
      </div>
    `,
  }),
}

export const WithBadges: Story = {
  render: (args) => ({
    components: { Sidebar },
    setup() {
      const collapsed = ref(args.modelValue)
      return { args, collapsed, items: badgeItems }
    },
    template: `
      <Sidebar v-bind="args" v-model="collapsed" :items="items" active-id="inbox">
        <template #header="{ collapsed: c }">
          <div style="display:flex;align-items:center;gap:8px;">
            ${logoBox}
            <span v-if="!c" style="
              font-size:14px;font-weight:600;color:var(--color-text-heading);
              overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
            ">Acme Inc</span>
          </div>
        </template>
      </Sidebar>
      <div style="flex:1;background:var(--color-bg);padding:24px;">
        <p style="font-size:14px;color:var(--color-text-secondary);">
          Sidebar with badge counts on items.
        </p>
      </div>
    `,
  }),
}

export const WithChildren: Story = {
  render: (args) => ({
    components: { Sidebar },
    setup() {
      const collapsed = ref(args.modelValue)
      return { args, collapsed, items: childrenItems }
    },
    template: `
      <Sidebar v-bind="args" v-model="collapsed" :items="items" active-id="proj-active">
        <template #header="{ collapsed: c }">
          <div style="display:flex;align-items:center;gap:8px;">
            ${logoBox}
            <span v-if="!c" style="
              font-size:14px;font-weight:600;color:var(--color-text-heading);
              overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
            ">Acme Inc</span>
          </div>
        </template>
        <template #footer="{ collapsed: c }">
          <div style="display:flex;align-items:center;gap:8px;">
            <div style="
              width:32px;height:32px;border-radius:9999px;flex-shrink:0;
              background:var(--color-neutral-light);display:flex;align-items:center;
              justify-content:center;font-size:12px;font-weight:600;color:var(--color-text-primary);
            ">JD</div>
            <span v-if="!c" style="
              font-size:13px;color:var(--color-text-secondary);
              overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
            ">john@acme.com</span>
          </div>
        </template>
      </Sidebar>
      <div style="flex:1;background:var(--color-bg);padding:24px;">
        <p style="font-size:14px;color:var(--color-text-secondary);">
          Sidebar with expandable child items. Click "Projects" or "Reports" to toggle.
        </p>
      </div>
    `,
  }),
}

export const IconOnly: Story = {
  args: {
    modelValue:     true,
    collapsedWidth: 'icon-only',
  },
  render: (args) => ({
    components: { Sidebar },
    setup() {
      const collapsed = ref(args.modelValue)
      return { args, collapsed, items: basicItems }
    },
    template: `
      <Sidebar v-bind="args" v-model="collapsed" :items="items">
        <template #header>
          ${logoBox}
        </template>
      </Sidebar>
      <div style="flex:1;background:var(--color-bg);padding:24px;">
        <p style="font-size:14px;color:var(--color-text-secondary);">
          Icon-only collapsed mode. Hover over icons to see tooltips.
        </p>
      </div>
    `,
  }),
}
