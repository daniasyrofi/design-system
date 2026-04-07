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

// ── Styles (tokens + base — no Tailwind dep) ──────────────────
import './styles/tokens.css'

// ── Components ────────────────────────────────────────────────
export * from './components/index'

// ── Composables ───────────────────────────────────────────────
export { useTheme } from './composables/useTheme'
export { useClickOutside } from './composables/useClickOutside'
export { useFocusTrap } from './composables/useFocusTrap'
export { useSpacing } from './composables/useSpacing'
export { useInvitationTheme } from './composables/useInvitationTheme'
export { createTheme, applyTheme } from './composables/createTheme'
export type { ThemeTokens } from './composables/createTheme'
export { useMediaQuery } from './composables/useMediaQuery'
export { useBreakpoint } from './composables/useBreakpoint'
export type { Breakpoint } from './composables/useBreakpoint'
export { useResponsiveProp } from './composables/useResponsiveProp'
export type { ResponsiveProp } from './composables/useResponsiveProp'
export { useFormField, required, minLength, maxLength, pattern, email, min, max } from './composables/useFormField'
export type { ValidationRule, UseFormFieldOptions, UseFormFieldReturn } from './composables/useFormField'
export { useVirtualList } from './composables/useVirtualList'
export type { VirtualListOptions } from './composables/useVirtualList'

// ── Variant & Size Types ──────────────────────────────────────
export type * from './types'

// ── Design Tokens ─────────────────────────────────────────────
export { primitives } from './tokens/colors'
export type { PrimitiveColor } from './tokens/colors'
