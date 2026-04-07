import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref, computed } from 'vue'
import { userEvent, within, expect } from 'storybook/test'
import Table from './Table.vue'
import Badge from '../../atoms/Badge/Badge.vue'
import Avatar from '../../atoms/Avatar/Avatar.vue'
import SearchInput from '../../molecules/SearchInput/SearchInput.vue'
import Tag from '../../molecules/Tag/Tag.vue'

// ── Shared data ──────────────────────────────────────────────────────────────

const COLUMNS = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'company', label: 'Company', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'role', label: 'Role', sortable: false },
  { key: 'lastActive', label: 'Last Active', sortable: true, align: 'right' as const },
]

const ROWS = [
  {
    name: 'Olivia Martin',
    email: 'olivia@acme.com',
    company: 'Acme Inc.',
    status: 'Active',
    role: 'Admin',
    lastActive: '2 min ago',
  },
  {
    name: 'James Chen',
    email: 'james@vortex.io',
    company: 'Vortex IO',
    status: 'Active',
    role: 'Member',
    lastActive: '1 hr ago',
  },
  {
    name: 'Sophia Rodriguez',
    email: 'sophia@nova.co',
    company: 'Nova Co.',
    status: 'Inactive',
    role: 'Member',
    lastActive: '3 days ago',
  },
  {
    name: 'Liam Patel',
    email: 'liam@brightlab.dev',
    company: 'BrightLab',
    status: 'Active',
    role: 'Editor',
    lastActive: '5 min ago',
  },
  {
    name: 'Emma Wilson',
    email: 'emma@mesh.xyz',
    company: 'Mesh XYZ',
    status: 'Pending',
    role: 'Member',
    lastActive: '2 days ago',
  },
  {
    name: 'Noah Kim',
    email: 'noah@stackflow.app',
    company: 'Stackflow',
    status: 'Active',
    role: 'Admin',
    lastActive: 'just now',
  },
  {
    name: 'Ava Thompson',
    email: 'ava@prismdata.io',
    company: 'PrismData',
    status: 'Inactive',
    role: 'Member',
    lastActive: '1 week ago',
  },
  {
    name: 'Mason Garcia',
    email: 'mason@loopfx.com',
    company: 'LoopFX',
    status: 'Active',
    role: 'Editor',
    lastActive: '30 min ago',
  },
]

const STATUS_VARIANT: Record<string, 'success' | 'warning' | 'danger'> = {
  Active: 'success',
  Pending: 'warning',
  Inactive: 'danger',
}

// ── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Table> = {
  title: 'Organisms/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    loading: { control: 'boolean', description: 'Show loading overlay' },
    selectable: { control: 'boolean', description: 'Enable row checkboxes' },
    hoverable: { control: 'boolean', description: 'Highlight rows on hover' },
    striped: { control: 'boolean', description: 'Alternating row backgrounds' },
    stickyHeader: { control: 'boolean', description: 'Pin header while scrolling' },
    filterBy: { control: 'text', description: 'Global filter string' },
    virtual: { control: 'boolean', description: 'Enable virtual scrolling' },
    emptyText: { control: 'text', description: 'Empty-state message' },
  },
  args: {
    columns: COLUMNS,
    data: ROWS,
    loading: false,
    selectable: false,
    hoverable: true,
    striped: false,
    stickyHeader: false,
    filterBy: '',
    virtual: false,
    emptyText: 'No results found',
  },
}
export default meta
type Story = StoryObj<typeof Table>

// ── Stories ───────────────────────────────────────────────────────────────────

/** Default table — no frills. */
export const Default: Story = {}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Search + filter toolbar wired to `filterBy`.
 * Mirrors the common CRM / admin list pattern shown in production apps.
 */
export const WithSearchAndFilter: Story = {
  name: 'Search & Filter',
  parameters: { layout: 'padded' },
  render: () => ({
    components: { Table, SearchInput, Tag, Badge },
    setup() {
      const query = ref('')
      const activeFilter = ref<string | null>(null)
      const statuses = ['Active', 'Pending', 'Inactive'] as const

      const filterBy = computed(() => (activeFilter.value ? activeFilter.value : query.value))

      function toggleFilter(status: string) {
        activeFilter.value = activeFilter.value === status ? null : status
        query.value = ''
      }
      function clearAll() {
        activeFilter.value = null
        query.value = ''
      }

      return {
        query,
        activeFilter,
        statuses,
        filterBy,
        toggleFilter,
        clearAll,
        COLUMNS,
        ROWS,
        STATUS_VARIANT,
      }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <!-- Toolbar -->
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
          <SearchInput
            v-model="query"
            placeholder="Search name, company…"
            size="sm"
            style="width:220px;"
            :disabled="!!activeFilter"
          />

          <!-- Status filter chips -->
          <div style="display:flex;gap:6px;">
            <Tag
              v-for="s in statuses"
              :key="s"
              :variant="activeFilter === s ? STATUS_VARIANT[s] : 'neutral'"
              clickable
              :removable="activeFilter === s"
              @click="toggleFilter(s)"
              @remove="toggleFilter(s)"
            >
              {{ s }}
            </Tag>
          </div>

          <button
            v-if="activeFilter || query"
            style="font-size:12px;color:var(--color-text-tertiary);cursor:pointer;background:none;border:none;padding:4px 6px;border-radius:var(--radius-sm);"
            @click="clearAll"
          >
            × Clear
          </button>
        </div>

        <!-- Table -->
        <Table
          :columns="COLUMNS"
          :data="ROWS"
          :filter-by="filterBy"
          empty-text="No visitors match your search."
          hoverable
        >
          <template #cell-name="{ row }">
            <div style="display:flex;flex-direction:column;line-height:1.3;">
              <span style="font-weight:500;">{{ row.name }}</span>
              <span style="font-size:12px;color:var(--color-text-tertiary);">{{ row.email }}</span>
            </div>
          </template>
          <template #cell-status="{ value }">
            <Badge :variant="STATUS_VARIANT[value]" badge-style="subtle" size="sm" dot>
              {{ value }}
            </Badge>
          </template>
        </Table>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Type a search query — only matching rows should remain
    const input = canvas.getByRole('textbox')
    await userEvent.type(input, 'olivia')
    await expect(canvas.getByText('Olivia Martin')).toBeInTheDocument()
    await expect(canvas.queryByText('James Chen')).not.toBeInTheDocument()

    // Clear search
    await userEvent.clear(input)
    await expect(canvas.getByText('James Chen')).toBeInTheDocument()
  },
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Click a column header to sort ascending; click again for descending.
 * A third click resets to the original order.
 */
export const Sortable: Story = {
  name: 'Sorting',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // First click → ascending by Name
    const nameHeader = canvas.getByRole('columnheader', { name: /name/i })
    await userEvent.click(nameHeader)

    const rows = canvas.getAllByRole('row')
    // First data row (index 1, skip header) should be "Ava Thompson" (alphabetically first)
    await expect(rows[1]).toHaveTextContent('Ava Thompson')

    // Second click → descending
    await userEvent.click(nameHeader)
    await expect(rows[1]).toHaveTextContent('Sophia Rodriguez')
  },
}

// ─────────────────────────────────────────────────────────────────────────────

/** Row checkboxes + select-all. Emits `select` with the selected row objects. */
export const Selectable: Story = {
  name: 'Row Selection',
  args: { selectable: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const checks = canvas.getAllByRole('checkbox')
    const selectAll = checks[0]
    const firstRow = checks[1]

    // Select first row
    await userEvent.click(firstRow)
    await expect(firstRow).toBeChecked()

    // Select all
    await userEvent.click(selectAll)
    checks.slice(1).forEach((c) => expect(c).toBeChecked())

    // Deselect all
    await userEvent.click(selectAll)
    checks.slice(1).forEach((c) => expect(c).not.toBeChecked())
  },
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * `cell-name` slot renders an Avatar + two-line text block.
 * `cell-status` slot uses a Badge with semantic color.
 */
export const CustomCells: Story = {
  name: 'Custom Cells',
  render: () => ({
    components: { Table, Badge, Avatar },
    setup: () => ({ COLUMNS, ROWS, STATUS_VARIANT }),
    template: `
      <Table :columns="COLUMNS" :data="ROWS" hoverable>
        <template #cell-name="{ row }">
          <div style="display:flex;align-items:center;gap:10px;">
            <Avatar
              :name="row.name"
              size="sm"
              shape="circle"
            />
            <div style="display:flex;flex-direction:column;line-height:1.3;">
              <span style="font-weight:500;">{{ row.name }}</span>
              <span style="font-size:12px;color:var(--color-text-tertiary);">{{ row.email }}</span>
            </div>
          </div>
        </template>
        <template #cell-status="{ value }">
          <Badge :variant="STATUS_VARIANT[value]" badge-style="subtle" size="sm" dot>
            {{ value }}
          </Badge>
        </template>
        <template #cell-role="{ value }">
          <Badge variant="neutral" badge-style="outline" size="sm">{{ value }}</Badge>
        </template>
      </Table>
    `,
  }),
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Renders 500 rows efficiently using windowed rendering.
 * Only ~12 rows are in the DOM at a time regardless of dataset size.
 */
export const VirtualScroll: Story = {
  name: 'Virtual Scroll (500 rows)',
  parameters: { layout: 'padded' },
  render: () => ({
    components: { Table },
    setup() {
      const bigData = Array.from({ length: 500 }, (_, i) => ({
        name: `User ${String(i + 1).padStart(3, '0')}`,
        company: ['Acme Inc.', 'Vortex IO', 'Nova Co.', 'BrightLab'][i % 4],
        status: ['Active', 'Pending', 'Inactive'][i % 3],
        role: ['Admin', 'Member', 'Editor'][i % 3],
        lastActive: `${(i % 59) + 1} min ago`,
      }))
      return { COLUMNS, bigData }
    },
    template: `
      <Table
        :columns="COLUMNS"
        :data="bigData"
        virtual
        :row-height="52"
        :container-height="420"
        hoverable
      />
    `,
  }),
}

// ─────────────────────────────────────────────────────────────────────────────

/** Alternating row backgrounds — best for dense, read-heavy tables. */
export const Striped: Story = {
  args: { striped: true, hoverable: false },
}

// ─────────────────────────────────────────────────────────────────────────────

/** Header stays visible while the body scrolls. */
export const StickyHeader: Story = {
  name: 'Sticky Header',
  render: () => ({
    components: { Table },
    setup: () => ({ COLUMNS, ROWS: [...ROWS, ...ROWS, ...ROWS] }),
    template: `
      <div style="height:320px;overflow:auto;">
        <Table :columns="COLUMNS" :data="ROWS" sticky-header />
      </div>
    `,
  }),
}

// ─────────────────────────────────────────────────────────────────────────────

/** Loading state — spinner overlay blocks the table. */
export const Loading: Story = {
  args: { loading: true },
}

// ─────────────────────────────────────────────────────────────────────────────

/** Empty state — shown when `data` is an empty array. */
export const Empty: Story = {
  args: { data: [], emptyText: 'No visitors found. Try adjusting your filters.' },
}

// ─────────────────────────────────────────────────────────────────────────────

/** Skeleton loading state — shows animated placeholders while data loads. */
export const SkeletonLoading: Story = {
  name: 'Skeleton Loading',
  args: { data: [], skeletonLoading: true },
}

// ─────────────────────────────────────────────────────────────────────────────

/** Click any row to expand a detail panel below it. */
export const Expandable: Story = {
  name: 'Expandable Rows',
  render: () => ({
    components: { Table, Badge },
    setup: () => ({ COLUMNS, ROWS, STATUS_VARIANT }),
    template: `
      <Table :columns="COLUMNS" :data="ROWS" expandable hoverable>
        <template #cell-status="{ value }">
          <Badge :variant="STATUS_VARIANT[value]" badge-style="subtle" size="sm" dot>
            {{ value }}
          </Badge>
        </template>
        <template #expanded-row="{ row }">
          <div style="display:flex;flex-direction:column;gap:4px;font-size:13px;">
            <div><strong>Email:</strong> {{ row.email }}</div>
            <div><strong>Company:</strong> {{ row.company }}</div>
            <div><strong>Role:</strong> {{ row.role }}</div>
            <div><strong>Last Active:</strong> {{ row.lastActive }}</div>
          </div>
        </template>
      </Table>
    `,
  }),
}

// ─────────────────────────────────────────────────────────────────────────────

/** Toggle column visibility dynamically using the `hiddenColumns` prop. */
export const ColumnToggle: Story = {
  name: 'Column Toggle',
  render: () => ({
    components: { Table },
    setup() {
      const hidden = ref<string[]>([])
      function toggle(key: string) {
        if (hidden.value.includes(key)) {
          hidden.value = hidden.value.filter((k) => k !== key)
        } else {
          hidden.value = [...hidden.value, key]
        }
      }
      return { COLUMNS, ROWS, hidden, toggle }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <label
            v-for="col in COLUMNS"
            :key="col.key"
            style="display:flex;align-items:center;gap:4px;font-size:13px;cursor:pointer;"
          >
            <input
              type="checkbox"
              :checked="!hidden.includes(col.key)"
              @change="toggle(col.key)"
            />
            {{ col.label }}
          </label>
        </div>
        <Table :columns="COLUMNS" :data="ROWS" :hidden-columns="hidden" hoverable />
      </div>
    `,
  }),
}

// ─────────────────────────────────────────────────────────────────────────────

/** All props wired to Storybook controls for live experimentation. */
export const Playground: Story = {
  name: '⚙ Playground',
  args: {
    selectable: true,
    striped: false,
    hoverable: true,
    stickyHeader: false,
    filterBy: '',
  },
}
