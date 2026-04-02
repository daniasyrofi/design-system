/**
 * Abadikan Design System
 *
 * Import components:
 *   import { Button, Input, Modal } from '@abadikan/ds'
 *
 * Import composables:
 *   import { useTheme, useToast } from '@abadikan/ds'
 *
 * Import design tokens:
 *   import { primitives } from '@abadikan/ds/tokens'
 *
 * Import styles (required once in your app entry):
 *   import '@abadikan/ds/styles'
 */

// ── Components ────────────────────────────────────────────────
export * from './components/index'

// ── Composables ───────────────────────────────────────────────
export { useTheme }             from './composables/useTheme'
export { useClickOutside }      from './composables/useClickOutside'
export { useFocusTrap }         from './composables/useFocusTrap'
export { useSpacing }           from './composables/useSpacing'
export { useInvitationTheme }   from './composables/useInvitationTheme'
export { createTheme, applyTheme } from './composables/createTheme'
export type { ThemeTokens }     from './composables/createTheme'

// ── Variant & Size Types ──────────────────────────────────────
export type * from './types'

// ── Design Tokens ─────────────────────────────────────────────
export { primitives }         from './tokens/colors'
export type { PrimitiveColor } from './tokens/colors'
