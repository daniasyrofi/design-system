import { computed, type ComputedRef } from 'vue'
import { useMediaQuery } from './useMediaQuery'

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const breakpoints: Record<Breakpoint, number> = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

/**
 * Reactively track the current responsive breakpoint.
 *
 * @returns Object with current breakpoint name and helper booleans
 */
export function useBreakpoint(): {
  current: ComputedRef<Breakpoint>
  isAbove: (bp: Breakpoint) => ComputedRef<boolean>
  isBelow: (bp: Breakpoint) => ComputedRef<boolean>
} {
  const sm = useMediaQuery(`(min-width: ${breakpoints.sm}px)`)
  const md = useMediaQuery(`(min-width: ${breakpoints.md}px)`)
  const lg = useMediaQuery(`(min-width: ${breakpoints.lg}px)`)
  const xl = useMediaQuery(`(min-width: ${breakpoints.xl}px)`)
  const xxl = useMediaQuery(`(min-width: ${breakpoints['2xl']}px)`)

  const current = computed<Breakpoint>(() => {
    if (xxl.value) return '2xl'
    if (xl.value) return 'xl'
    if (lg.value) return 'lg'
    if (md.value) return 'md'
    if (sm.value) return 'sm'
    return 'xs'
  })

  const matchMap: Record<Breakpoint, typeof sm> = {
    xs: { value: true } as typeof sm,
    sm,
    md,
    lg,
    xl,
    '2xl': xxl,
  }

  function isAbove(bp: Breakpoint): ComputedRef<boolean> {
    return computed(() => matchMap[bp].value)
  }

  function isBelow(bp: Breakpoint): ComputedRef<boolean> {
    return computed(() => !matchMap[bp].value)
  }

  return { current, isAbove, isBelow }
}
