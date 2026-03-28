<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { cn } from '@/lib/utils'
import { RiArrowUpSLine, RiArrowDownSLine } from '@remixicon/vue'
import Checkbox from '../../atoms/Checkbox/Checkbox.vue'
import Spinner from '../../atoms/Spinner/Spinner.vue'

interface Column {
  key:       string
  label:     string
  sortable?: boolean
  width?:    string
  align?:    'left' | 'center' | 'right'
}

interface Props {
  columns:      Column[]
  data:         Record<string, any>[]
  loading?:     boolean
  selectable?:  boolean
  hoverable?:   boolean
  striped?:     boolean
  stickyHeader?: boolean
  emptyText?:   string
}

const props = withDefaults(defineProps<Props>(), {
  loading:      false,
  selectable:   false,
  hoverable:    true,
  striped:      false,
  stickyHeader: false,
  emptyText:    'No data',
})

const emit = defineEmits<{
  sort:   [payload: { key: string; direction: 'asc' | 'desc' }]
  select: [selectedRows: Record<string, any>[]]
}>()

// ── Sort state ───────────────────────────────────────────────────────────────

const sortKey       = ref<string | null>(null)
const sortDirection = ref<'asc' | 'desc'>('asc')

function handleSort(column: Column) {
  if (!column.sortable) return

  if (sortKey.value === column.key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = column.key
    sortDirection.value = 'asc'
  }

  emit('sort', { key: sortKey.value!, direction: sortDirection.value })
}

// ── Selection state ──────────────────────────────────────────────────────────

const selectedRowIndices = ref<Set<number>>(new Set())

const selectAllState = computed<boolean | 'indeterminate'>(() => {
  if (props.data.length === 0 || selectedRowIndices.value.size === 0) return false
  if (selectedRowIndices.value.size === props.data.length) return true
  return 'indeterminate'
})

function handleSelectAll(_: boolean | 'indeterminate') {
  if (selectAllState.value === true) {
    selectedRowIndices.value = new Set()
  } else {
    selectedRowIndices.value = new Set(props.data.map((_, i) => i))
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
  const rows = [...selectedRowIndices.value].map(i => props.data[i])
  emit('select', rows)
}

// Reset selection when data changes
watch(() => props.data, () => {
  selectedRowIndices.value = new Set()
})

// ── Alignment class ──────────────────────────────────────────────────────────

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
    <div class="w-full overflow-x-auto">
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
                  col.align === 'right' && 'justify-end',
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
          <template v-if="data.length > 0">
            <tr
              v-for="(row, rowIndex) in data"
              :key="rowIndex"
              :class="cn(
                'transition-colors duration-[--duration-fast]',
                hoverable && 'hover:bg-[--color-neutral-subtle]',
                striped && 'even:bg-[--color-bg-subtle]',
                selectedRowIndices.has(rowIndex) && 'bg-[--color-primary-subtle]',
              )"
            >
              <!-- Row checkbox -->
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

              <!-- Data cells -->
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
