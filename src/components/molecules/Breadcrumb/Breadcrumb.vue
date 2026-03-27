<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { RiArrowRightSLine } from '@remixicon/vue'

type Separator = 'chevron' | 'slash' | 'dot'

interface BreadcrumbItem {
  label: string
  href?: string
  icon?: object
}

interface Props {
  items: BreadcrumbItem[]
  separator?: Separator
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  separator: 'chevron',
  size: 'md',
})

const textClass: Record<string, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
}

const iconPx: Record<string, number> = {
  sm: 12,
  md: 14,
  lg: 16,
}

const separatorChar = computed(() => {
  if (props.separator === 'slash') return '/'
  if (props.separator === 'dot') return '·'
  return ''
})
</script>

<template>
  <nav aria-label="Breadcrumb">
    <ol :class="cn('flex items-center flex-wrap gap-1', textClass[size])">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="inline-flex items-center gap-1"
      >
        <!-- Separator -->
        <span
          v-if="index > 0"
          class="ds-breadcrumb-sep select-none mx-0.5"
          aria-hidden="true"
        >
          <RiArrowRightSLine
            v-if="separator === 'chevron'"
            :size="String(iconPx[size])"
          />
          <span v-else>{{ separatorChar }}</span>
        </span>

        <!-- Link (not last item) -->
        <a
          v-if="index < items.length - 1 && item.href"
          :href="item.href"
          :class="cn(
            'ds-breadcrumb-link',
            'inline-flex items-center gap-1.5 rounded-[var(--radius-md)] px-1.5 py-0.5',
            'transition-colors duration-200 ease-out',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]',
          )"
        >
          <component
            v-if="item.icon"
            :is="item.icon"
            :size="String(iconPx[size])"
            class="shrink-0"
          />
          {{ item.label }}
        </a>

        <!-- Non-link intermediate -->
        <span
          v-else-if="index < items.length - 1"
          :class="cn(
            'ds-breadcrumb-link',
            'inline-flex items-center gap-1.5 px-1.5 py-0.5 cursor-default',
          )"
        >
          <component
            v-if="item.icon"
            :is="item.icon"
            :size="String(iconPx[size])"
            class="shrink-0"
          />
          {{ item.label }}
        </span>

        <!-- Current (last item) -->
        <span
          v-else
          class="ds-breadcrumb-current inline-flex items-center gap-1.5 px-1.5 py-0.5 font-medium"
          aria-current="page"
        >
          <component
            v-if="item.icon"
            :is="item.icon"
            :size="String(iconPx[size])"
            class="shrink-0"
          />
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.ds-breadcrumb-sep {
  color: var(--color-text-tertiary);
}

.ds-breadcrumb-link {
  color: var(--color-text-secondary);
}

.ds-breadcrumb-link:hover {
  color: var(--color-text-primary);
  background-color: var(--color-neutral-light);
}

.ds-breadcrumb-current {
  color: var(--color-text-primary);
}
</style>
