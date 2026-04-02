/**
 * createTheme — Multi-brand / multi-tenant theming API.
 *
 * Returns a plain CSS variable record that can be bound to any container
 * element's `style` attribute. The token overrides are scoped to that
 * element's subtree, so multiple themes can coexist on the same page.
 *
 * @example Basic usage — single global brand
 * ```ts
 * import { createTheme } from '@abadikan/ds'
 *
 * const theme = createTheme({ primary: 'oklch(0.55 0.22 240)' })
 * // In your app root: <div :style="theme"> ... </div>
 * ```
 *
 * @example Multiple brands on one page
 * ```vue
 * <template>
 *   <div :style="brandA"> <Button>Brand A</Button> </div>
 *   <div :style="brandB"> <Button>Brand B</Button> </div>
 * </template>
 * <script setup>
 * import { createTheme } from '@abadikan/ds'
 * const brandA = createTheme({ primary: 'oklch(0.55 0.22 240)' })  // blue
 * const brandB = createTheme({ primary: 'oklch(0.60 0.20 145)' })  // green
 * </script>
 * ```
 *
 * @example Apply globally (SSR-unsafe — call inside onMounted)
 * ```ts
 * import { applyTheme } from '@abadikan/ds'
 * onMounted(() => applyTheme({ primary: 'oklch(0.55 0.22 240)' }))
 * ```
 */

export interface ThemeTokens {
  // ── Brand colors ───────────────────────────────────────────────────────────
  /** Primary brand color. Any CSS color value (oklch recommended). */
  primary?:        string
  /** Primary hover state. Defaults to a slightly darker primary. */
  primaryHover?:   string
  /** Primary light / tinted surface. Defaults to a very light primary. */
  primaryLight?:   string

  /** Secondary accent color. */
  secondary?:      string
  secondaryHover?: string
  secondaryLight?: string

  /** Semantic danger color override. */
  danger?:         string
  dangerHover?:    string
  dangerLight?:    string

  // ── Radius preset ──────────────────────────────────────────────────────────
  /**
   * Predefined radius scale.
   * - `'sharp'`   — all radii set to 0 (flat/square style)
   * - `'default'` — leaves radii unchanged (xs=2 sm=4 md=8 lg=12 xl=16)
   * - `'soft'`    — every step ×1.5 (xs=3 sm=6 md=12 lg=18 xl=24)
   * - `'round'`   — aggressive rounding (xs=6 sm=10 md=16 lg=24 xl=32)
   * - `'pill'`    — everything pill-shaped (all = 9999px)
   */
  radiusScale?: 'sharp' | 'default' | 'soft' | 'round' | 'pill'

  // ── Typography ─────────────────────────────────────────────────────────────
  /** Override the UI font family. */
  fontUi?:      string
  /** Override the display/heading font family. */
  fontDisplay?: string
  /** Override the monospace font family. */
  fontMono?:    string

  // ── Raw overrides ──────────────────────────────────────────────────────────
  /**
   * Escape hatch: set any CSS custom property directly.
   * Keys should be full property names (e.g. `'--color-bg'`).
   */
  vars?: Record<string, string>
}

const RADIUS_PRESETS: Record<Exclude<ThemeTokens['radiusScale'], undefined>, Record<string, string>> = {
  sharp: {
    '--radius-xs':   '0px',
    '--radius-sm':   '0px',
    '--radius-md':   '0px',
    '--radius-lg':   '0px',
    '--radius-xl':   '0px',
    '--radius-2xl':  '0px',
  },
  default: {},  // no overrides — use globals.css values
  soft: {
    '--radius-xs':   '3px',
    '--radius-sm':   '6px',
    '--radius-md':   '12px',
    '--radius-lg':   '18px',
    '--radius-xl':   '24px',
    '--radius-2xl':  '30px',
  },
  round: {
    '--radius-xs':   '6px',
    '--radius-sm':   '10px',
    '--radius-md':   '16px',
    '--radius-lg':   '24px',
    '--radius-xl':   '32px',
    '--radius-2xl':  '40px',
  },
  pill: {
    '--radius-xs':   '9999px',
    '--radius-sm':   '9999px',
    '--radius-md':   '9999px',
    '--radius-lg':   '9999px',
    '--radius-xl':   '9999px',
    '--radius-2xl':  '9999px',
  },
}

/**
 * Build a CSS variable record from a `ThemeTokens` object.
 * Bind the returned object to an element's `style` prop to scope the theme.
 */
export function createTheme(tokens: ThemeTokens): Record<string, string> {
  const vars: Record<string, string> = {}

  if (tokens.primary)      vars['--color-primary']       = tokens.primary
  if (tokens.primaryHover) vars['--color-primary-hover']  = tokens.primaryHover
  if (tokens.primaryLight) vars['--color-primary-light']  = tokens.primaryLight

  if (tokens.secondary)      vars['--color-secondary']        = tokens.secondary
  if (tokens.secondaryHover) vars['--color-secondary-hover']  = tokens.secondaryHover
  if (tokens.secondaryLight) vars['--color-secondary-light']  = tokens.secondaryLight

  if (tokens.danger)      vars['--color-danger']        = tokens.danger
  if (tokens.dangerHover) vars['--color-danger-hover']  = tokens.dangerHover
  if (tokens.dangerLight) vars['--color-danger-light']  = tokens.dangerLight

  if (tokens.fontUi)      vars['--font-ui']      = tokens.fontUi
  if (tokens.fontDisplay) vars['--font-display'] = tokens.fontDisplay
  if (tokens.fontMono)    vars['--font-mono']    = tokens.fontMono

  if (tokens.radiusScale && tokens.radiusScale !== 'default') {
    Object.assign(vars, RADIUS_PRESETS[tokens.radiusScale])
  }

  if (tokens.vars) {
    Object.assign(vars, tokens.vars)
  }

  return vars
}

/**
 * Apply a theme globally to `document.documentElement` (or a custom element).
 * Must be called in a browser context (inside `onMounted` for SSR safety).
 *
 * Returns a cleanup function that removes the applied variables.
 */
export function applyTheme(tokens: ThemeTokens, target?: HTMLElement | null): () => void {
  const el = target ?? (typeof document !== 'undefined' ? document.documentElement : null)
  if (!el) return () => {}

  const vars = createTheme(tokens)
  const applied = Object.keys(vars)

  for (const [prop, value] of Object.entries(vars)) {
    el.style.setProperty(prop, value)
  }

  return function cleanup() {
    for (const prop of applied) {
      el.style.removeProperty(prop)
    }
  }
}
