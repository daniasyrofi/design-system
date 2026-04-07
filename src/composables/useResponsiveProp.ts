import { computed, type ComputedRef } from 'vue'
import { useBreakpoint, type Breakpoint } from './useBreakpoint'

export type ResponsiveProp<T> = T | Partial<Record<Breakpoint, T>>

export function useResponsiveProp<T>(
  prop: () => ResponsiveProp<T> | undefined,
  fallback: T
): ComputedRef<T> {
  const { current } = useBreakpoint()

  return computed(() => {
    const value = prop()
    if (value === undefined) return fallback
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      return value as T
    }

    // It's a responsive object — find the best matching breakpoint
    const breakpointOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
    const currentIndex = breakpointOrder.indexOf(current.value)

    // Walk from current breakpoint down to find nearest defined value
    for (let i = currentIndex; i >= 0; i--) {
      const bp = breakpointOrder[i]
      const rec = value as Partial<Record<Breakpoint, T>>
      if (rec[bp] !== undefined) return rec[bp] as T
    }

    return fallback
  })
}
