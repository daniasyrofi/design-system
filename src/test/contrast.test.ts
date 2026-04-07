import { describe, it, expect } from 'vitest'

/**
 * Convert OKLCH to approximate sRGB luminance for contrast ratio calculation.
 *
 * OKLCH's L channel is perceptual lightness (0 = black, 1 = white).
 * For WCAG contrast ratio we need relative luminance in sRGB space.
 * The approximation L_srgb ≈ oklch_L² works well enough for AA validation.
 */
function oklchToRelativeLuminance(l: number): number {
  // OKLCH L is perceptual lightness. Convert to approximate sRGB relative luminance.
  // This is a good approximation: sRGB luminance ≈ oklch_L^3 (closer than ^2 for darker colors)
  return Math.pow(l, 3)
}

/**
 * Calculate WCAG 2.x contrast ratio between two relative luminances.
 * Returns ratio in range [1, 21].
 */
function contrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

// ── Token lightness values ──────────────────────────────────
// Extracted from src/styles/tokens.css OKLCH L channel values

// Light mode semantic colors
const lightMode = {
  // Backgrounds
  bg: 0.98,             // --primitive-neutral-50
  bgSubtle: 0.95,       // --primitive-neutral-100
  surface: 1.0,         // #ffffff
  surfaceRaised: 1.0,   // #ffffff
  surfaceOverlay: 1.0,  // #ffffff

  // Text
  textHeading: 0.2,     // --primitive-neutral-900
  textPrimary: 0.4,     // --primitive-neutral-700
  textSecondary: 0.55,  // --primitive-neutral-600
  textTertiary: 0.73,   // --primitive-neutral-400
  textMuted: 0.73,      // --primitive-neutral-400
  textDisabled: 0.82,   // --primitive-neutral-300

  // Brand
  primary: 0.55,        // --primitive-red-base
  primaryLight: 0.92,   // --primitive-red-light
  danger: 0.6,          // --primitive-danger-base
  dangerLight: 0.92,    // --primitive-danger-light
  success: 0.65,        // --primitive-success-base
  successLight: 0.92,   // --primitive-success-light
  warning: 0.75,        // --primitive-warning-base
  warningLight: 0.94,   // --primitive-warning-light
  info: 0.65,           // --primitive-info-base
  infoLight: 0.92,      // --primitive-info-light

  // Borders
  border: 0.9,          // --primitive-neutral-200
  borderStrong: 0.65,   // --primitive-neutral-500
}

// Dark mode semantic colors
const darkMode = {
  // Backgrounds
  bg: 0.15,
  bgSubtle: 0.18,
  surface: 0.2,
  surfaceRaised: 0.25,
  surfaceOverlay: 0.22,

  // Text
  textHeading: 0.96,
  textPrimary: 0.9,
  textSecondary: 0.7,
  textTertiary: 0.55,
  textMuted: 0.55,
  textDisabled: 0.4,

  // Brand
  primary: 0.65,
  primaryLight: 0.25,
  danger: 0.6,
  dangerLight: 0.3,
  success: 0.65,
  successLight: 0.25,
  warning: 0.75,
  warningLight: 0.25,
  info: 0.65,
  infoLight: 0.25,

  // Borders
  border: 0.3,
  borderStrong: 0.5,
}

// WCAG AA thresholds
const AA_NORMAL_TEXT = 4.5  // normal text (< 18pt / < 14pt bold)
const AA_LARGE_TEXT = 3.0   // large text (≥ 18pt / ≥ 14pt bold) & UI components

interface ColorPair {
  fg: string
  bg: string
  fgL: number
  bgL: number
  minRatio: number
  description: string
}

function buildPairs(mode: typeof lightMode, modeName: string): ColorPair[] {
  return [
    // Normal text on backgrounds
    { fg: 'textHeading', bg: 'bg', fgL: mode.textHeading, bgL: mode.bg, minRatio: AA_NORMAL_TEXT, description: `${modeName}: heading on bg` },
    { fg: 'textHeading', bg: 'surface', fgL: mode.textHeading, bgL: mode.surface, minRatio: AA_NORMAL_TEXT, description: `${modeName}: heading on surface` },
    { fg: 'textPrimary', bg: 'bg', fgL: mode.textPrimary, bgL: mode.bg, minRatio: AA_NORMAL_TEXT, description: `${modeName}: primary text on bg` },
    { fg: 'textPrimary', bg: 'surface', fgL: mode.textPrimary, bgL: mode.surface, minRatio: AA_NORMAL_TEXT, description: `${modeName}: primary text on surface` },
    { fg: 'textSecondary', bg: 'bg', fgL: mode.textSecondary, bgL: mode.bg, minRatio: AA_NORMAL_TEXT, description: `${modeName}: secondary text on bg` },
    { fg: 'textSecondary', bg: 'surface', fgL: mode.textSecondary, bgL: mode.surface, minRatio: AA_NORMAL_TEXT, description: `${modeName}: secondary text on surface` },

    // UI components (3:1 minimum)
    { fg: 'primary', bg: 'bg', fgL: mode.primary, bgL: mode.bg, minRatio: AA_LARGE_TEXT, description: `${modeName}: primary on bg (UI)` },
    { fg: 'primary', bg: 'surface', fgL: mode.primary, bgL: mode.surface, minRatio: AA_LARGE_TEXT, description: `${modeName}: primary on surface (UI)` },
    { fg: 'danger', bg: 'bg', fgL: mode.danger, bgL: mode.bg, minRatio: AA_LARGE_TEXT, description: `${modeName}: danger on bg (UI)` },
    { fg: 'borderStrong', bg: 'bg', fgL: mode.borderStrong, bgL: mode.bg, minRatio: AA_LARGE_TEXT, description: `${modeName}: strong border on bg (UI)` },
  ]
}

describe('WCAG AA Color Contrast Validation', () => {
  const lightPairs = buildPairs(lightMode, 'Light')
  const darkPairs = buildPairs(darkMode, 'Dark')
  const allPairs = [...lightPairs, ...darkPairs]

  for (const pair of allPairs) {
    it(`${pair.description} — ratio ≥ ${pair.minRatio}:1`, () => {
      const fgLum = oklchToRelativeLuminance(pair.fgL)
      const bgLum = oklchToRelativeLuminance(pair.bgL)
      const ratio = contrastRatio(fgLum, bgLum)
      expect(
        ratio,
        `${pair.fg} on ${pair.bg}: got ${ratio.toFixed(2)}:1, need ${pair.minRatio}:1`
      ).toBeGreaterThanOrEqual(pair.minRatio)
    })
  }
})
