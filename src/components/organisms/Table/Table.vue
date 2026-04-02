<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { cn } from '@/lib/utils'
import { RiArrowUpSLine, RiArrowDownSLine } from '@remixicon/vue'
import Checkbox from '../../atoms/Checkbox/Checkbox.vue'
import Spinner  from '../../atoms/Spinner/Spinner.vue'
import { useVirtualList } from '@/composables/useVirtualList'

export interface TableColumn {
interface Column {
  /** Unique key mapping to a property in each data row. */
  key:       string
  /** Display label for the column header. */
  label:     string
  /** Enables click-to-sort on this column. @default false */
  sortable?: boolean
  /** CSS width of the column (e.g. '120px', '20%'). */
  width?:    string
  /** Text alignment within the column. @default 'left' */
  align?:    'left' | 'center' | 'right'
  /** Include this column's value in global filter matching. @default true */
  filterable?: boolean
}

export type TableSortDirection = 'asc' | 'desc'

interface Props {
  /** Array of column definitions. */
  columns:       TableColumn[]
  /** Array of row data objects. Each key should match a column key. */
  data:          Record<string, unknown>[]
  /** Shows a loading overlay with a spinner. @default false */
  loading?:      boolean
  /** Adds row selection checkboxes and a select-all header. @default false */
  selectable?:   boolean
  /** Highlights rows on hover. @default true */
  hoverable?:    boolean
  /** Applies alternating row background colors. @default false */
  striped?:      boolean
  /** Keeps the table header fixed while the body scrolls. @default false */
  stickyHeader?: boolean
  /** Text displayed when the data array is empty. @default 'No data' */
  emptyText?:    string
  /**
   * Global filter string — rows where no filterable column contains this value
   * (case-insensitive) are hidden. Leave empty / undefined to show all rows.
   */
  filterBy?:     string
  /**
   * Enable virtual scrolling for large datasets.
   * Requires `containerHeight` to be set. @default false
   */
  virtual?:      boolean
  /** Height of each data row in pixels. Used only when `virtual` is true. @default 48 */
  rowHeight?:    number
  /** Height of the scrollable container in pixels. Used only when `virtual` is true. @default 400 */
  containerHeight?: number
  columns:      Column[]
  /** Array of row data objects. Each key should match a column key. */
  data:         Record<string, any>[]
  /** Shows a loading overlay with a spinner. @default false */
  loading?:     boolean
  /** Adds row selection checkboxes and a select-all header. @default false */
  selectable?:  boolean
  /** Highlights rows on hover. @default true */
  hoverable?:   boolean
  /** Applies alternating row background colors. @default false */
  striped?:     boolean
  /** Keeps the table header fixed while the body scrolls. @default false */
  stickyHeader?: boolean
  /** Text displayed when the data array is empty. @default 'No data' */
  emptyText?:   string
}

const props = withDefaults(defineProps<Props>(), {
  loading:         false,
  selectable:      false,
  hoverable:       true,
  striped:         false,
  stickyHeader:    false,
  emptyText:       'No data',
  filterBy:        '',
  virtual:         false,
  rowHeight:       48,
  containerHeight: 400,
})

const emit = defineEmits<{
  sort:   [payload: { key: string; direction: TableSortDirection }]
  select: [selectedRows: Record<string, unknown>[]]
}>()

// ── Sort state ────────────────────────────────────────────────────────────────

const sortKey       = ref<string | null>(null)
const sortDirection = ref<TableSortDirection>('asc')

function handleSort(column: TableColumn) {
  if (!column.sortable) return

  if (sortKey.value === column.key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value      = column.key
    sortDirection.value = 'asc'
  }

  emit('sort', { key: sortKey.value!, direction: sortDirection.value })
}

// ── Filter + Sort (client-side) ───────────────────────────────────────────────

const filterableKeys = computed(() =>
  props.columns
    .filter(c => c.filterable !== false)
    .map(c => c.key),
)

const processedData = computed<Record<string, unknown>[]>(() => {
  let rows = props.data

  // 1. Filter
  const term = props.filterBy?.trim().toLowerCase()
  if (term) {
    rows = rows.filter(row =>
      filterableKeys.value.some(key => {
        const val = row[key]
        return val != null && String(val).toLowerCase().includes(term)
      }),
    )
  }

  // 2. Sort
  if (sortKey.value) {
    const key = sortKey.value
    const dir = sortDirection.value === 'asc' ? 1 : -1
    rows = [...rows].sort((a, b) => {
      const va = a[key] ?? ''
      const vb = b[key] ?? ''
      if (va < vb) return -dir
      if (va > vb) return  dir
      return 0
    })
  }

  return rows
})

// ── Virtual scrolling ─────────────────────────────────────────────────────────

const { visibleItems, totalHeight, offsetTop, onScroll } = useVirtualList(
  processedData,
  {
    get itemHeight()      { return props.rowHeight! },
    get containerHeight() { return props.containerHeight! },
  },
)

// ── Selection state ───────────────────────────────────────────────────────────

const selectedRowIndices = ref<Set<number>>(new Set())

const selectAllState = computed<boolean | 'indeterminate'>(() => {
  const total = processedData.value.length
  if (total === 0 || selectedRowIndices.value.size === 0) return false
  if (selectedRowIndices.value.size === total) return true
  return 'indeterminate'
})

function handleSelectAll(_: boolean | 'indeterminate') {
  if (selectAllState.value === true) {
    selectedRowIndices.value = new Set()
  } else {
    selectedRowIndices.value = new Set(processedData.value.map((_, i) => i))
  }
  emitSelection()
}

function handleSelectRow(index: number, _: boolean | 'indeterminate') {
  const next = new Set(selectedRowIndices.value)
  if (next.has(index)) {
    next.delete(index)
  } else {
    next.add(index)
  }
  selectedRowIndices.value = next
  emitSelection()
}

function emitSelection() {
  const rows = [...selectedRowIndices.value].map(i => processedData.value[i])
  emit('select', rows)
}

// Reset selection when data or filter changes
watch([() => props.data, () => props.filterBy], () => {
  selectedRowIndices.value = new Set()
})

// ── Alignment class ───────────────────────────────────────────────────────────

const alignClass: Record<string, string> = {
  left:   'text-left',
  center: 'text-center',
  right:  'text-right',
}
</script>

<template>
  <div
    :class="cn(
      'ds-table-root relative w-full border border-[--color-border] overflow-hidden',
      'bg-[--color-surface]',
    )"
  >
    <!-- Loading overlay -->
    <div
      v-if="loading"
      :class="cn(
        'ds-table-loading absolute inset-0 z-20 flex items-center justify-center',
      )"
    >
      <Spinner size="lg" label="Loading table data" />
    </div>

    <!-- Table wrapper -->
    <div
      class="w-full overflow-x-auto"
      :class="virtual ? 'overflow-y-auto' : 'overflow-y-visible'"
      :style="virtual ? { height: `${containerHeight}px` } : undefined"
      @scroll="virtual ? onScroll($event) : undefined"
    >
      <table class="w-full border-collapse">
        <!-- Header -->
        <thead>
          <tr
            :class="cn(
              'bg-[--color-bg-subtle] border-b border-[--color-border]',
              stickyHeader && 'sticky top-0 bg-[--color-surface] z-10 ds-table-sticky-header',
            )"
          >
            <!-- Select-all checkbox column -->
            <th
              v-if="selectable"
              class="w-12 px-4 py-3 border-b border-[--color-border]"
            >
              <Checkbox
                :model-value="selectAllState"
                size="sm"
                aria-label="Select all rows"
                @update:model-value="handleSelectAll"
              />
            </th>

            <!-- Column headers -->
            <th
              v-for="col in columns"
              :key="col.key"
              :style="col.width ? { width: col.width } : undefined"
              :class="cn(
                'px-4 py-3 border-b border-[--color-border]',
                'text-xs font-semibold uppercase tracking-wider',
                'text-[--color-text-secondary]',
                alignClass[col.align ?? 'left'],
                col.sortable && 'cursor-pointer select-none hover:text-[--color-text-primary] transition-colors duration-[--duration-normal]',
              )"
              @click="handleSort(col)"
            >
              <span
                :class="cn(
                  'inline-flex items-center gap-1',
                  col.align === 'center' && 'justify-center',
                  col.align === 'right'  && 'justify-end',
                )"
              >
                {{ col.label }}

                <!-- Sort indicators -->
                <span
                  v-if="col.sortable"
                  class="inline-flex flex-col -space-y-1.5"
                  aria-hidden="true"
                >
                  <RiArrowUpSLine
                    size="14"
                    :class="cn(
                      'transition-colors duration-[--duration-fast]',
                      sortKey === col.key && sortDirection === 'asc'
                        ? 'text-[--color-text-primary]'
                        : 'text-[--color-text-tertiary]',
                    )"
                  />
                  <RiArrowDownSLine
                    size="14"
                    :class="cn(
                      'transition-colors duration-[--duration-fast]',
                      sortKey === col.key && sortDirection === 'desc'
                        ? 'text-[--color-text-primary]'
                        : 'text-[--color-text-tertiary]',
                    )"
                  />
                </span>
              </span>
            </th>
          </tr>
        </thead>

        <!-- Body -->
        <tbody>
          <!-- Virtual mode: spacer + visible slice -->
          <template v-if="virtual && processedData.length > 0">
            <!-- Top spacer -->
            <tr aria-hidden="true" :style="{ height: `${offsetTop}px` }" />

            <tr
              v-for="{ item: row, index: rowIndex } in visibleItems"
              :key="rowIndex"
              :class="cn(
                'transition-colors duration-[--duration-fast]',
                hoverable && 'hover:bg-[--color-neutral-subtle]',
                striped   && rowIndex % 2 === 1 && 'bg-[--color-bg-subtle]',
                selectedRowIndices.has(rowIndex) && 'bg-[--color-primary-subtle]',
              )"
            >
              <td
                v-if="selectable"
                class="w-12 px-4 py-3 border-b border-[--color-border]"
              >
                <Checkbox
                  :model-value="selectedRowIndices.has(rowIndex)"
                  size="sm"
                  :aria-label="`Select row ${rowIndex + 1}`"
                  @update:model-value="handleSelectRow(rowIndex, $event)"
                />
              </td>
              <td
                v-for="col in columns"
                :key="col.key"
                :style="{ height: `${rowHeight}px` }"
                :class="cn(
                  'px-4 border-b border-[--color-border]',
                  'text-sm text-[--color-text-primary]',
                  alignClass[col.align ?? 'left'],
                )"
              >
                <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
                  {{ row[col.key] }}
                </slot>
              </td>
            </tr>

            <!-- Bottom spacer -->
            <tr
              aria-hidden="true"
              :style="{ height: `${totalHeight - offsetTop - visibleItems.length * rowHeight}px` }"
            />
          </template>

          <!-- Normal mode -->
          <template v-else-if="!virtual && processedData.length > 0">
            <tr
              v-for="(row, rowIndex) in processedData"
              :key="rowIndex"
              :class="cn(
                'transition-colors duration-[--duration-fast]',
                hoverable && 'hover:bg-[--color-neutral-subtle]',
                striped   && 'even:bg-[--color-bg-subtle]',
                selectedRowIndices.has(rowIndex) && 'bg-[--color-primary-subtle]',
              )"
            >
              <td
                v-if="selectable"
                class="w-12 px-4 py-3 border-b border-[--color-border]"
              >
                <Checkbox
                  :model-value="selectedRowIndices.has(rowIndex)"
                  size="sm"
                  :aria-label="`Select row ${rowIndex + 1}`"
                  @update:model-value="handleSelectRow(rowIndex, $event)"
                />
              </td>
              <td
                v-for="col in columns"
                :key="col.key"
                :class="cn(
                  'px-4 py-3 border-b border-[--color-border]',
                  'text-sm text-[--color-text-primary]',
                  alignClass[col.align ?? 'left'],
                )"
              >
                <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
                  {{ row[col.key] }}
                </slot>
              </td>
            </tr>
          </template>

          <!-- Empty state -->
          <tr v-else-if="!loading">
            <td
              :colspan="selectable ? columns.length + 1 : columns.length"
              class="px-4 py-12 text-center text-sm text-[--color-text-tertiary]"
            >
              <slot name="empty">
                {{ emptyText }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.ds-table-root {
  border-radius: var(--radius-lg);
}
.ds-table-loading {
  background-color: color-mix(in oklch, var(--color-surface) 60%, transparent);
  backdrop-filter: blur(2px);
}
.ds-table-sticky-header {
  box-shadow: var(--shadow-sm);
}
</style>
