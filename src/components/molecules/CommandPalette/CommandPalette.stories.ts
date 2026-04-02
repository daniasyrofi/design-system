import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import CommandPalette from './CommandPalette.vue'
import Button from '@/components/atoms/Button/Button.vue'
import {
  RiHome2Line,
  RiLayoutLine,
  RiFileChartLine,
  RiMailLine,
  RiTeamLine,
  RiSettings3Line,
  RiUserLine,
  RiLogoutBoxLine,
  RiFileLine,
  RiFolderLine,
  RiDatabase2Line,
  RiCodeBoxLine,
  RiGitBranchLine,
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiIndeterminateCircleLine,
  RiLoader2Line,
  RiPaletteLine,
  RiKeyboardLine,
  RiQuestionLine,
  RiSearchLine,
} from '@remixicon/vue'

const meta: Meta<typeof CommandPalette> = {
  title: 'Molecules/CommandPalette',
  component: CommandPalette,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A Cmd+K command palette for quick navigation and actions. ' +
          'Press <kbd>⌘K</kbd> / <kbd>Ctrl+K</kbd> anywhere on the page to open it.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof CommandPalette>

// ── Navigation ────────────────────────────────────────────────────────────────

export const Navigation: Story = {
  name: 'Navigation',
  render: () => ({
    components: { CommandPalette },
    setup() {
      const open = ref(true)
      const items = [
        { id: 'home',       label: 'Home',         group: 'Pages',    icon: RiHome2Line },
        { id: 'dashboard',  label: 'Dashboard',    group: 'Pages',    icon: RiLayoutLine },
        { id: 'reports',    label: 'Reports',      group: 'Pages',    icon: RiFileChartLine },
        { id: 'campaigns',  label: 'Campaigns',    group: 'Pages',    icon: RiMailLine },
        { id: 'audience',   label: 'Audience',     group: 'Pages',    icon: RiTeamLine },
        { id: 'settings',   label: 'Settings',     group: 'Pages',    icon: RiSettings3Line },
        { id: 'profile',    label: 'My Profile',   group: 'Account',  icon: RiUserLine },
        { id: 'logout',     label: 'Log Out',      group: 'Account',  icon: RiLogoutBoxLine },
      ]
      return { open, items }
    },
    template: `
      <div class="p-8">
        <CommandPalette
          v-model="open"
          :items="items"
          placeholder="Type a command or search..."
          :global-shortcut="false"
        />
      </div>
    `,
  }),
}

// ── Contextual Actions ────────────────────────────────────────────────────────

export const ContextualActions: Story = {
  name: 'Contextual Actions',
  render: () => ({
    components: { CommandPalette },
    setup() {
      const open = ref(true)
      const items = [
        { id: 'backlog',     label: 'Backlog',     icon: RiIndeterminateCircleLine, shortcut: '⌘⌥1' },
        { id: 'todo',        label: 'Todo',        icon: RiCheckboxCircleLine,      shortcut: '⌘⌥2' },
        { id: 'in-progress', label: 'In Progress', icon: RiLoader2Line,             shortcut: '⌘⌥3' },
        { id: 'done',        label: 'Done',        icon: RiCheckboxCircleLine,      shortcut: '⌘⌥4' },
        { id: 'cancelled',   label: 'Cancelled',   icon: RiCloseCircleLine,         shortcut: '⌘⌥5' },
      ]
      return { open, items }
    },
    template: `
      <div class="p-8">
        <CommandPalette
          v-model="open"
          :items="items"
          placeholder="Change status..."
          :global-shortcut="false"
        />
      </div>
    `,
  }),
}

// ── Quick Open ────────────────────────────────────────────────────────────────

export const QuickOpen: Story = {
  name: 'Quick Open',
  render: () => ({
    components: { CommandPalette },
    setup() {
      const open = ref(true)
      const items = [
        { id: 'admin-panel',    label: 'Admin Panel',     group: 'Apps',    icon: RiLayoutLine,   description: 'Retool App' },
        { id: 'apps-page',     label: 'Apps',            group: 'Pages',   icon: RiFileLine },
        { id: 'archive',       label: 'archive',         group: 'Folders', icon: RiFolderLine },
        { id: 'basic-admin',   label: 'Basic Admin',     group: 'Modules', icon: RiCodeBoxLine },
        { id: 'country-search',label: 'Country Search',  group: 'Queries', icon: RiSearchLine },
        { id: 'data-editor',   label: 'Data Editor',     group: 'Pages',   icon: RiDatabase2Line },
        { id: 'get-users',     label: 'getUsers',        group: 'Queries', icon: RiSearchLine },
        { id: 'workflows',     label: 'Workflows',       group: 'Pages',   icon: RiGitBranchLine },
      ]
      return { open, items }
    },
    template: `
      <div class="p-8">
        <CommandPalette
          v-model="open"
          :items="items"
          placeholder="Quick open..."
          :global-shortcut="false"
        />
      </div>
    `,
  }),
}

// ── Full Featured ─────────────────────────────────────────────────────────────

export const FullFeatured: Story = {
  name: 'Full Featured',
  render: () => ({
    components: { CommandPalette },
    setup() {
      const open = ref(true)
      const items = [
        { id: 'new-file',     label: 'New File',          group: 'File',    icon: RiFileLine,        shortcut: '⌘N' },
        { id: 'open-file',    label: 'Open File…',        group: 'File',    icon: RiFolderLine,      shortcut: '⌘O' },
        { id: 'settings',     label: 'Settings',          group: 'App',     icon: RiSettings3Line,   description: 'Preferences & configuration' },
        { id: 'appearance',   label: 'Appearance',        group: 'App',     icon: RiPaletteLine,     description: 'Theme, fonts, colors' },
        { id: 'keybindings',  label: 'Keyboard Shortcuts',group: 'App',     icon: RiKeyboardLine },
        { id: 'profile',      label: 'My Profile',        group: 'Account', icon: RiUserLine },
        { id: 'team',         label: 'Team Members',      group: 'Account', icon: RiTeamLine,        description: 'Manage your team' },
        { id: 'logout',       label: 'Log Out',           group: 'Account', icon: RiLogoutBoxLine },
        { id: 'help',         label: 'Help & Support',    group: 'Help',    icon: RiQuestionLine },
      ]
      return { open, items }
    },
    template: `
      <div class="p-8">
        <CommandPalette
          v-model="open"
          :items="items"
          :global-shortcut="false"
        />
      </div>
    `,
  }),
}

// ── With Trigger ──────────────────────────────────────────────────────────────

export const WithTrigger: Story = {
  name: 'With Trigger',
  render: () => ({
    components: { CommandPalette, Button, RiSearchLine },
    setup() {
      const open = ref(false)
      const items = [
        { id: 'home',      label: 'Home',       group: 'Pages',   icon: RiHome2Line },
        { id: 'reports',   label: 'Reports',    group: 'Pages',   icon: RiFileChartLine },
        { id: 'settings',  label: 'Settings',   group: 'Pages',   icon: RiSettings3Line },
        { id: 'profile',   label: 'My Profile', group: 'Account', icon: RiUserLine },
        { id: 'logout',    label: 'Log Out',    group: 'Account', icon: RiLogoutBoxLine },
      ]
      return { open, items }
    },
    template: `
      <div class="p-8 flex items-center gap-3">
        <Button variant="outline" @click="open = true">
          <template #leading><RiSearchLine :size="14" /></template>
          Search
          <template #trailing>
            <kbd class="px-1.5 py-0.5 rounded text-xs font-mono" style="background:oklch(0 0 0/0.06);border:1px solid oklch(0 0 0/0.12)">⌘K</kbd>
          </template>
        </Button>
        <CommandPalette v-model="open" :items="items" />
      </div>
    `,
  }),
}
