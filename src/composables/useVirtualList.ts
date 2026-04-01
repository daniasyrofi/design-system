import { ref, computed, type Ref } from 'vue'

export interface VirtualListOptions {
  itemHeight: number
  containerHeight: number
  overscan?: number
}

export function useVirtualList<T>(items: Ref<T[]>, options: VirtualListOptions) {
  const scrollTop = ref(0)
  const overscan  = options.overscan ?? 3

  const startIndex = computed(() =>
    Math.max(0, Math.floor(scrollTop.value / options.itemHeight) - overscan),
  )

  const endIndex = computed(() =>
    Math.min(
      items.value.length - 1,
      Math.ceil((scrollTop.value + options.containerHeight) / options.itemHeight) - 1 + overscan,
    ),
  )

  const visibleItems = computed(() =>
    items.value.slice(startIndex.value, endIndex.value + 1).map((item, i) => ({
      item,
      index: startIndex.value + i,
    })),
  )

  const totalHeight = computed(() => items.value.length * options.itemHeight)
  const offsetTop   = computed(() => startIndex.value * options.itemHeight)

  function onScroll(e: Event) {
    scrollTop.value = (e.target as HTMLElement).scrollTop
  }

  return { visibleItems, totalHeight, offsetTop, onScroll }
}
