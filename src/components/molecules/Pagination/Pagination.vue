<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiSkipBackLine,
  RiSkipForwardLine,
} from '@remixicon/vue'

type Size = 'sm' | 'md' | 'lg'

interface Props {
  modelValue: number
  total: number
  perPage?: number
  maxVisiblePages?: number
  showFirstLast?: boolean
  size?: Size
}

const props = withDefaults(defineProps<Props>(), {
  perPage: 10,
  maxVisiblePages: 5,
  showFirstLast: true,
  size: 'md',
})

const emit = defineEmits<{
  'update:modelValue': [page: number]
}>()

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.perPage)))

const isFirstPage = computed(() => props.modelValue <= 1)
const isLastPage = computed(() => props.modelValue >= totalPages.value)

const visiblePages = computed(() => {
  const total = totalPages.value
  const current = props.modelValue
  const max = props.maxVisiblePages

  if (total <= max) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const half = Math.floor(max / 2)
  let start = current - half
  let end = current + half

  if (start < 1) {
    start = 1
    end = max
  }

  if (end > total) {
    end = total
    start = total - max + 1
  }

  const pages: (number | 'ellipsis-start' | 'ellipsis-end')[] = []

  if (start > 1) {
    pages.push(1)
    if (start > 2) {
      pages.push('ellipsis-start')
    }
  }

  for (let i = start; i <= end; i++) {
    if (!pages.includes(i)) {
      pages.push(i)
    }
  }

  if (end < total) {
    if (end < total - 1) {
      pages.push('ellipsis-end')
    }
    if (!pages.includes(total)) {
      pages.push(total)
    }
  }

  return pages
})

function goTo(page: number) {
  const clamped = Math.max(1, Math.min(page, totalPages.value))
  if (clamped !== props.modelValue) {
    emit('update:modelValue', clamped)
  }
}

import Button from '@/components/atoms/Button/Button.vue'

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// Map Pagination size to Button atom size
const btnSizeMap: Record<Size, ButtonSize> = {
  sm: 'xs',
  md: 'sm',
  lg: 'md',
}

const iconSize: Record<Size, number> = {
  sm: 14,
  md: 16,
  lg: 18,
}

function ellipsisClasses() {
  return cn(
    'inline-flex items-center justify-center',
    props.size === 'sm' ? 'w-7 h-7 text-xs' : props.size === 'md' ? 'w-8 h-8 text-sm' : 'w-9 h-9 text-sm',
    'text-[--color-text-tertiary] select-none',
  )
}
</script>

<template>
  <nav aria-label="Pagination" class="flex items-center gap-1">
    <!-- First page -->
    <Button
      v-if="showFirstLast"
      variant="ghost"
      icon-only
      :size="btnSizeMap[size]"
      :disabled="isFirstPage"
      aria-label="First page"
      @click="goTo(1)"
    >
      <template #icon>
        <RiSkipBackLine :size="String(iconSize[size])" />
      </template>
    </Button>

    <!-- Previous page -->
    <Button
      variant="ghost"
      icon-only
      :size="btnSizeMap[size]"
      :disabled="isFirstPage"
      aria-label="Previous page"
      @click="goTo(modelValue - 1)"
    >
      <template #icon>
        <RiArrowLeftSLine :size="String(iconSize[size])" />
      </template>
    </Button>

    <!-- Page numbers -->
    <template v-for="page in visiblePages" :key="page">
      <span v-if="typeof page === 'string'" :class="ellipsisClasses()">
        &hellip;
      </span>
      <Button
        v-else
        :variant="page === modelValue ? 'secondary' : 'ghost'"
        icon-only
        :size="btnSizeMap[size]"
        :aria-current="page === modelValue ? 'page' : undefined"
        :aria-label="`Page ${page}`"
        @click="goTo(page)"
      >
        <template #icon>
          <span :class="page === modelValue ? 'font-semibold text-[--color-text-primary]' : ''">
            {{ page }}
          </span>
        </template>
      </Button>
    </template>

    <!-- Next page -->
    <Button
      variant="ghost"
      icon-only
      :size="btnSizeMap[size]"
      :disabled="isLastPage"
      aria-label="Next page"
      @click="goTo(modelValue + 1)"
    >
      <template #icon>
        <RiArrowRightSLine :size="String(iconSize[size])" />
      </template>
    </Button>

    <!-- Last page -->
    <Button
      v-if="showFirstLast"
      variant="ghost"
      icon-only
      :size="btnSizeMap[size]"
      :disabled="isLastPage"
      aria-label="Last page"
      @click="goTo(totalPages)"
    >
      <template #icon>
        <RiSkipForwardLine :size="String(iconSize[size])" />
      </template>
    </Button>
  </nav>
</template>
