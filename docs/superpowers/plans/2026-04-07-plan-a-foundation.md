# Abadikan Theme — Plan A: Foundation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Set up the abadikan-theme project with all tokens, fonts, transitions, composables, and utilities — ready for component installation.

**Architecture:** New Vue 3 + Vite 8 + Tailwind v4 project. CSS tokens copied from abadikan/ds `tokens.css` + `globals.css`, mapped to shadcn-vue variable names. Composables copied and adapted (useTheme must support both `.dark` class and `[data-theme='dark']`).

**Tech Stack:** Vue 3.4+, TypeScript 5.9, Tailwind CSS v4, Vite 8, clsx + tailwind-merge

---

## File Structure

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `package.json` | Dependencies and scripts |
| Create | `vite.config.ts` | Vite + Tailwind + path aliases |
| Create | `tsconfig.json` | TypeScript config |
| Create | `tsconfig.app.json` | App-specific TS config |
| Create | `tsconfig.node.json` | Node/Vite TS config |
| Create | `components.json` | shadcn-vue configuration |
| Create | `src/main.ts` | App entry point |
| Create | `src/App.vue` | Root component |
| Create | `src/assets/index.css` | Tailwind v4 + all token overrides + shadcn-vue variable mapping |
| Create | `src/assets/fonts.css` | @font-face declarations (base64 Abadikan Sans) |
| Create | `src/transitions/index.css` | Vue transition classes (ds-fade, ds-slide-up, etc.) |
| Create | `src/lib/utils.ts` | cn() utility |
| Create | `src/composables/useTheme.ts` | Theme toggle (adapted for .dark class) |
| Create | `src/composables/useClickOutside.ts` | Click outside detection |
| Create | `src/composables/useFocusTrap.ts` | Focus trap |
| Create | `src/composables/useSpacing.ts` | Spacing utilities |
| Create | `src/composables/useFormField.ts` | Form field validation |
| Create | `src/composables/useVirtualList.ts` | Virtual list scrolling |
| Create | `src/composables/useInvitationTheme.ts` | Invitation theming |
| Create | `src/composables/createTheme.ts` | Theme creation helper |
| Create | `src/composables/index.ts` | Barrel export |
| Create | `src/tokens/colors.ts` | Primitive color token exports |
| Create | `src/tokens/semantic.ts` | Semantic token exports |
| Create | `src/tokens/index.ts` | Barrel export |

---

### Task 1: Scaffold Vue + Vite project

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `src/main.ts`
- Create: `src/App.vue`
- Create: `env.d.ts`

- [ ] **Step 1: Create project with Vite**

```bash
cd /Users/User/claude
npm create vite@latest abadikan-theme -- --template vue-ts
cd abadikan-theme
```

- [ ] **Step 2: Verify scaffold works**

```bash
npm install
npm run dev -- --host
```

Expected: Vite dev server starts on localhost, no errors.

- [ ] **Step 3: Kill dev server and commit**

```bash
# Ctrl+C to stop dev server
git init
git add -A
git commit -m "chore: scaffold Vue + Vite project"
```

---

### Task 2: Install dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install production dependencies**

```bash
npm install tailwindcss@^4.2.2 @tailwindcss/vite@^4.2.2 clsx@^2.1.1 tailwind-merge@^3 @fontsource/inter@^5.2.8 @fontsource/jetbrains-mono@^5.2.8 @remixicon/vue@^4.9.0
```

- [ ] **Step 2: Install dev dependencies**

```bash
npm install -D @types/node
```

- [ ] **Step 3: Verify install**

```bash
npm ls --depth=0
```

Expected: All packages listed, no peer dependency warnings.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install core dependencies"
```

---

### Task 3: Configure Vite + TypeScript

**Files:**
- Modify: `vite.config.ts`
- Modify: `tsconfig.json`
- Modify: `tsconfig.app.json`

- [ ] **Step 1: Update vite.config.ts**

Replace the entire content of `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
```

- [ ] **Step 2: Update tsconfig.app.json — add path alias**

Ensure `tsconfig.app.json` has the `@` path alias:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue", "env.d.ts"]
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx vue-tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add vite.config.ts tsconfig.json tsconfig.app.json
git commit -m "chore: configure Vite path aliases and TypeScript"
```

---

### Task 4: Create cn() utility

**Files:**
- Create: `src/lib/utils.ts`

- [ ] **Step 1: Write the utility**

Create `src/lib/utils.ts`:

```ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx vue-tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/utils.ts
git commit -m "feat: add cn() utility (clsx + tailwind-merge)"
```

---

### Task 5: Create fonts.css with Abadikan Sans base64

**Files:**
- Create: `src/assets/fonts.css`

- [ ] **Step 1: Copy fonts.css from abadikan/ds**

```bash
cp /Users/User/claude/ds/src/styles/fonts.css src/assets/fonts.css
```

This file contains the Abadikan Sans font embedded as base64 — no changes needed.

- [ ] **Step 2: Verify file exists and has content**

```bash
wc -l src/assets/fonts.css
```

Expected: Non-zero line count (the file should contain @font-face with base64 data).

- [ ] **Step 3: Commit**

```bash
git add src/assets/fonts.css
git commit -m "feat: add Abadikan Sans font (base64 embedded)"
```

---

### Task 6: Create transitions CSS

**Files:**
- Create: `src/transitions/index.css`

- [ ] **Step 1: Create the transitions file**

Create `src/transitions/index.css` — copy ONLY the transition preset section from abadikan/ds `src/styles/globals.css` (lines 528-627) plus `tokens.css` keyframes + reduced motion:

```css
/* ── Keyframe animations ──────────────────────────────────────── */

@keyframes shimmer {
  from {
    background-position: -400px 0;
  }
  to {
    background-position: 400px 0;
  }
}

.skel {
  background: linear-gradient(
    90deg,
    var(--color-neutral-light) 25%,
    var(--color-border) 50%,
    var(--color-neutral-light) 75%
  );
  background-size: 800px 100%;
  animation: shimmer 1.4s ease-in-out infinite;
}

@keyframes ds-fade-in {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes typingBounce {
  0%,
  60%,
  100% {
    transform: translateY(0);
    opacity: 0.5;
  }
  30% {
    transform: translateY(-4px);
    opacity: 1;
  }
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  50%,
  90% {
    transform: translateX(-4px);
  }
  30%,
  70% {
    transform: translateX(4px);
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes slideDown {
  from {
    transform: translateY(-4px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* ── Vue Transition Presets ───────────────────────────────────── */

/* Fade */
.ds-fade-enter-active {
  transition: opacity var(--duration-enter) var(--ease-out);
}
.ds-fade-leave-active {
  transition: opacity var(--duration-exit) var(--ease-in);
}
.ds-fade-enter-from,
.ds-fade-leave-to {
  opacity: 0;
}

/* Slide up (menus, dropdowns, popovers) */
.ds-slide-up-enter-active {
  transition:
    opacity var(--duration-enter) var(--ease-out),
    transform var(--duration-enter) var(--ease-out);
}
.ds-slide-up-leave-active {
  transition:
    opacity var(--duration-exit) var(--ease-in),
    transform var(--duration-exit) var(--ease-in);
}
.ds-slide-up-enter-from,
.ds-slide-up-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

/* Slide down (from top, e.g. nav menus) */
.ds-slide-down-enter-active {
  transition:
    opacity var(--duration-enter) var(--ease-out),
    transform var(--duration-enter) var(--ease-out);
}
.ds-slide-down-leave-active {
  transition:
    opacity var(--duration-exit) var(--ease-in),
    transform var(--duration-exit) var(--ease-in);
}
.ds-slide-down-enter-from,
.ds-slide-down-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* Scale (modals, dialogs, popovers) */
.ds-scale-enter-active {
  transition:
    opacity var(--duration-enter) var(--ease-spring),
    transform var(--duration-enter) var(--ease-spring);
}
.ds-scale-leave-active {
  transition:
    opacity var(--duration-exit) var(--ease-in),
    transform var(--duration-exit) var(--ease-in);
}
.ds-scale-enter-from,
.ds-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Collapse (Accordion, Collapsible — works with v-show height) */
.ds-collapse-enter-active {
  transition: opacity var(--duration-expand) var(--ease-out);
}
.ds-collapse-leave-active {
  transition: opacity var(--duration-exit) var(--ease-in);
}
.ds-collapse-enter-from,
.ds-collapse-leave-to {
  opacity: 0;
}

/* Toast slide-in from right */
.ds-toast-enter-active {
  transition:
    opacity var(--duration-enter) var(--ease-out),
    transform var(--duration-enter) var(--ease-spring);
}
.ds-toast-leave-active {
  transition:
    opacity var(--duration-exit) var(--ease-in),
    transform var(--duration-exit) var(--ease-in);
}
.ds-toast-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}
.ds-toast-leave-to {
  opacity: 0;
  transform: translateX(8px) scale(0.95);
}

/* ── Reduced Motion ───────────────────────────────────────────── */

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .skel {
    animation: none;
    background: var(--color-neutral-light);
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/transitions/index.css
git commit -m "feat: add Vue transition presets and keyframe animations"
```

---

### Task 7: Create main CSS with token mapping

**Files:**
- Create: `src/assets/index.css`

This is the most critical file — it imports Tailwind v4, defines ALL Abadikan tokens, AND maps them to shadcn-vue CSS variable names.

- [ ] **Step 1: Create src/assets/index.css**

```css
@import './fonts.css';
@import 'tailwindcss';
@import '../transitions/index.css';

/* ═══════════════════════════════════════════════════════════════
   TAILWIND v4 @theme — Register primitives + scales
   These become Tailwind utility classes (e.g., bg-primitive-red-base)
═══════════════════════════════════════════════════════════════ */
@theme {
  /* ── Spacing ─────────────────────────────────────────────── */
  --spacing-0: var(--space-0);
  --spacing-px: var(--space-px);
  --spacing-0-5: var(--space-0-5);
  --spacing-0\.5: var(--space-0-5);
  --spacing-1: var(--space-1);
  --spacing-1-5: var(--space-1-5);
  --spacing-1\.5: var(--space-1-5);
  --spacing-2: var(--space-2);
  --spacing-2-5: var(--space-2-5);
  --spacing-2\.5: var(--space-2-5);
  --spacing-3: var(--space-3);
  --spacing-4: var(--space-4);
  --spacing-5: var(--space-5);
  --spacing-6: var(--space-6);
  --spacing-8: var(--space-8);
  --spacing-10: var(--space-10);
  --spacing-12: var(--space-12);
  --spacing-16: var(--space-16);
  --spacing-20: var(--space-20);
  --spacing-24: var(--space-24);

  /* ── Breakpoints ─────────────────────────────────────────── */
  --breakpoint-xs: 480px;
  --breakpoint-sm: 480px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;

  /* ── Primitive: Red (primary brand) ──────────────────────── */
  --primitive-red-light: oklch(0.92 0.04 18);
  --primitive-red-base: oklch(0.55 0.22 18);
  --primitive-red-dark: oklch(0.42 0.22 18);

  /* ── Primitive: Danger (true red) ────────────────────────── */
  --primitive-danger-light: oklch(0.92 0.05 28);
  --primitive-danger-base: oklch(0.6 0.22 28);
  --primitive-danger-dark: oklch(0.45 0.22 28);

  /* ── Primitive: Pink (secondary accent) ──────────────────── */
  --primitive-pink-light: oklch(0.92 0.04 350);
  --primitive-pink-base: oklch(0.6 0.18 350);
  --primitive-pink-dark: oklch(0.47 0.18 350);

  /* ── Primitive: Neutral (warm gray, hue 80) ──────────────── */
  --primitive-neutral-50: oklch(0.98 0.005 80);
  --primitive-neutral-100: oklch(0.95 0.008 80);
  --primitive-neutral-200: oklch(0.9 0.01 80);
  --primitive-neutral-300: oklch(0.82 0.01 80);
  --primitive-neutral-400: oklch(0.73 0.01 80);
  --primitive-neutral-500: oklch(0.65 0.01 80);
  --primitive-neutral-600: oklch(0.55 0.01 80);
  --primitive-neutral-700: oklch(0.4 0.01 80);
  --primitive-neutral-800: oklch(0.28 0.01 80);
  --primitive-neutral-900: oklch(0.2 0.01 80);
  --primitive-neutral-950: oklch(0.13 0.008 80);

  /* ── Primitive: Semantic ─────────────────────────────────── */
  --primitive-success-light: oklch(0.92 0.04 145);
  --primitive-success-base: oklch(0.65 0.17 145);
  --primitive-success-dark: oklch(0.5 0.17 145);
  --primitive-warning-light: oklch(0.94 0.04 80);
  --primitive-warning-base: oklch(0.75 0.15 75);
  --primitive-warning-dark: oklch(0.6 0.15 75);
  --primitive-info-light: oklch(0.92 0.04 240);
  --primitive-info-base: oklch(0.65 0.12 240);
  --primitive-info-dark: oklch(0.5 0.12 240);

  /* ── Font families ───────────────────────────────────────── */
  --font-display: 'Abadikan Sans', sans-serif;
  --font-ui: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* ── Border radii ────────────────────────────────────────── */
  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 20px;
  --radius-full: 9999px;

  /* ── Motion: duration ────────────────────────────────────── */
  --duration-instant: 50ms;
  --duration-fast: 100ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --duration-enter: 200ms;
  --duration-exit: 150ms;
  --duration-expand: 280ms;
  --duration-page: 400ms;

  /* ── Motion: easing ──────────────────────────────────────── */
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ease-sharp: cubic-bezier(0.4, 0, 0.6, 1);

  /* ── Typography scale ────────────────────────────────────── */
  --text-2xs: 0.625rem;
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;

  /* ── Line height ─────────────────────────────────────────── */
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;

  /* ── Letter spacing ──────────────────────────────────────── */
  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0em;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;
}

/* ── Register extra Abadikan colors in Tailwind ────────────── */
@theme inline {
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);
}

/* ═══════════════════════════════════════════════════════════════
   SEMANTIC TOKENS — Light Mode (default)
   Maps Abadikan tokens to shadcn-vue CSS variable convention.
═══════════════════════════════════════════════════════════════ */
:root {
  color-scheme: light;

  /* ── Spacing ─────────────────────────────────────────────── */
  --space-0: 0px;
  --space-px: 1px;
  --space-0-5: 2px;
  --space-1: 4px;
  --space-1-5: 6px;
  --space-2: 8px;
  --space-2-5: 10px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;

  /* ── Abadikan semantic colors (light) ────────────────────── */
  --color-bg: var(--primitive-neutral-50);
  --color-bg-subtle: var(--primitive-neutral-100);
  --color-surface: #ffffff;
  --color-surface-raised: #ffffff;
  --color-surface-overlay: #ffffff;

  --color-border: var(--primitive-neutral-200);
  --color-border-subtle: color-mix(in oklch, var(--primitive-neutral-200) 50%, transparent);
  --color-border-strong: var(--primitive-neutral-300);

  --color-text-heading: var(--primitive-neutral-900);
  --color-text-primary: var(--primitive-neutral-700);
  --color-text-secondary: var(--primitive-neutral-500);
  --color-text-tertiary: var(--primitive-neutral-400);
  --color-text-muted: var(--primitive-neutral-400);
  --color-text-disabled: var(--primitive-neutral-300);
  --color-text-inverse: #ffffff;

  --color-primary: var(--primitive-red-base);
  --color-primary-hover: var(--primitive-red-dark);
  --color-primary-light: var(--primitive-red-light);
  --color-primary-text: #ffffff;

  --color-secondary: var(--primitive-pink-base);
  --color-secondary-hover: var(--primitive-pink-dark);
  --color-secondary-light: var(--primitive-pink-light);

  --color-neutral: var(--primitive-neutral-900);
  --color-neutral-hover: var(--primitive-neutral-800);
  --color-neutral-light: var(--primitive-neutral-100);

  --color-success: var(--primitive-success-base);
  --color-success-hover: var(--primitive-success-dark);
  --color-success-light: var(--primitive-success-light);

  --color-warning: var(--primitive-warning-base);
  --color-warning-hover: var(--primitive-warning-dark);
  --color-warning-light: var(--primitive-warning-light);

  --color-info: var(--primitive-info-base);
  --color-info-hover: var(--primitive-info-dark);
  --color-info-light: var(--primitive-info-light);

  --color-danger: var(--primitive-danger-base);
  --color-danger-hover: var(--primitive-danger-dark);
  --color-danger-light: var(--primitive-danger-light);

  /* ── Shadows (light — warm-tinted) ───────────────────────── */
  --shadow-xs: 0 1px 2px oklch(0.2 0.005 80 / 0.06);
  --shadow-sm: 0 1px 2px oklch(0.2 0.005 80 / 0.06), 0 2px 4px oklch(0.2 0.005 80 / 0.04);
  --shadow-md: 0 2px 4px oklch(0.2 0.005 80 / 0.05), 0 6px 12px oklch(0.2 0.005 80 / 0.07);
  --shadow-lg:
    0 4px 6px oklch(0.2 0.005 80 / 0.05), 0 10px 20px oklch(0.2 0.005 80 / 0.1),
    0 20px 40px oklch(0.2 0.005 80 / 0.06);
  --shadow-xl:
    0 8px 12px oklch(0.2 0.005 80 / 0.07), 0 20px 40px oklch(0.2 0.005 80 / 0.13),
    0 40px 80px oklch(0.2 0.005 80 / 0.08);
  --shadow-2xl:
    0 12px 24px oklch(0.2 0.005 80 / 0.1), 0 32px 64px oklch(0.2 0.005 80 / 0.16),
    0 64px 96px oklch(0.2 0.005 80 / 0.1);
  --shadow-inset:
    inset 0 1px 3px oklch(0.2 0.005 80 / 0.12), inset 0 1px 1px oklch(0.2 0.005 80 / 0.08);
  --shadow-highlight: inset 0 1px 0 oklch(1 0 0 / 0.12);
  --ring-primary: 0 0 0 2px var(--color-surface), 0 0 0 4px var(--color-primary);
  --ring-danger: 0 0 0 2px var(--color-surface), 0 0 0 4px var(--color-danger);

  /* ── Elevation ───────────────────────────────────────────── */
  --elevation-0: none;
  --elevation-1: var(--shadow-xs);
  --elevation-2: var(--shadow-md);
  --elevation-3: var(--shadow-lg);
  --elevation-4: var(--shadow-xl);

  /* ── Glass ───────────────────────────────────────────────── */
  --color-surface-glass: oklch(1 0 0 / 0.72);
  --glass-border: oklch(1 0 0 / 0.2);
  --glass-blur: blur(16px) saturate(180%);

  /* ── Avatar ──────────────────────────────────────────────── */
  --avatar-bg-l: 0.88;
  --avatar-text-l: 0.38;

  /* ── Focus ring ──────────────────────────────────────────── */
  --focus-ring: 0 0 0 2px var(--color-surface), 0 0 0 4px var(--color-primary);
  --focus-ring-color: var(--color-primary);

  /* ═══════════════════════════════════════════════════════════
     shadcn-vue VARIABLE MAPPING (light mode)
     Maps Abadikan semantic tokens -> shadcn-vue expected vars.
  ═══════════════════════════════════════════════════════════ */
  --background: var(--color-bg);
  --foreground: var(--color-text-primary);

  --card: var(--color-surface);
  --card-foreground: var(--color-text-primary);

  --popover: var(--color-surface-overlay);
  --popover-foreground: var(--color-text-primary);

  --primary: var(--color-primary);
  --primary-foreground: var(--color-text-inverse);

  --secondary: var(--color-secondary);
  --secondary-foreground: var(--color-text-inverse);

  --muted: var(--color-bg-subtle);
  --muted-foreground: var(--color-text-secondary);

  --accent: var(--color-neutral-light);
  --accent-foreground: var(--color-text-heading);

  --destructive: var(--color-danger);

  --border: var(--color-border);
  --input: var(--color-border);
  --ring: var(--color-primary);

  --radius: var(--radius-2xl);

  /* ── Extra semantic (not in shadcn-vue) ──────────────────── */
  --success: var(--color-success);
  --success-foreground: #ffffff;
  --warning: var(--color-warning);
  --warning-foreground: oklch(0.2 0.01 80);
  --info: var(--color-info);
  --info-foreground: #ffffff;

  /* ── Sidebar ─────────────────────────────────────────────── */
  --sidebar: #ffffff;
  --sidebar-foreground: var(--color-text-primary);
  --sidebar-primary: var(--color-primary);
  --sidebar-primary-foreground: var(--color-text-inverse);
  --sidebar-accent: var(--color-neutral-light);
  --sidebar-accent-foreground: var(--color-text-heading);
  --sidebar-border: var(--color-border);
  --sidebar-ring: var(--color-primary);

  /* ── Chart ───────────────────────────────────────────────── */
  --chart-1: var(--color-primary);
  --chart-2: var(--color-secondary);
  --chart-3: var(--color-info);
  --chart-4: var(--color-success);
  --chart-5: var(--color-warning);
}

/* ═══════════════════════════════════════════════════════════════
   DARK MODE
   Supports both .dark class (shadcn-vue) and
   [data-theme='dark'] (abadikan/ds backward compat).
═══════════════════════════════════════════════════════════════ */
.dark,
[data-theme='dark'] {
  color-scheme: dark;

  /* ── Abadikan semantic colors (dark) ─────────────────────── */
  --color-bg: oklch(0.15 0.005 80);
  --color-bg-subtle: oklch(0.18 0.006 80);
  --color-surface: oklch(0.2 0.008 80);
  --color-surface-raised: oklch(0.25 0.008 80);
  --color-surface-overlay: oklch(0.22 0.008 80);

  --color-border: oklch(0.3 0.01 80);
  --color-border-subtle: oklch(0.25 0.01 80);
  --color-border-strong: oklch(0.35 0.01 80);

  --color-text-heading: oklch(0.96 0.005 80);
  --color-text-primary: oklch(0.9 0.005 80);
  --color-text-secondary: oklch(0.7 0.005 80);
  --color-text-tertiary: oklch(0.55 0.005 80);
  --color-text-muted: oklch(0.55 0.005 80);
  --color-text-disabled: oklch(0.4 0.005 80);
  --color-text-inverse: oklch(0.15 0.005 80);

  --color-primary: oklch(0.65 0.2 18);
  --color-primary-hover: oklch(0.7 0.2 18);
  --color-primary-light: oklch(0.25 0.06 18);

  --color-secondary: oklch(0.68 0.16 350);
  --color-secondary-hover: oklch(0.73 0.16 350);
  --color-secondary-light: oklch(0.25 0.05 350);

  --color-neutral: oklch(0.9 0.005 80);
  --color-neutral-hover: oklch(0.96 0.005 80);
  --color-neutral-light: oklch(0.25 0.008 80);

  --color-danger: oklch(0.6 0.22 28);
  --color-danger-hover: oklch(0.65 0.22 28);
  --color-danger-light: oklch(0.3 0.06 28);

  /* ── Shadows (dark — higher opacity) ─────────────────────── */
  --shadow-xs: 0 1px 2px oklch(0.05 0 0 / 0.25);
  --shadow-sm: 0 1px 2px oklch(0.05 0 0 / 0.25), 0 2px 4px oklch(0.05 0 0 / 0.2);
  --shadow-md: 0 2px 4px oklch(0.05 0 0 / 0.25), 0 6px 12px oklch(0.05 0 0 / 0.3);
  --shadow-lg:
    0 4px 6px oklch(0.05 0 0 / 0.25), 0 12px 24px oklch(0.05 0 0 / 0.35),
    0 24px 48px oklch(0.05 0 0 / 0.2);
  --shadow-xl:
    0 8px 10px oklch(0.05 0 0 / 0.25), 0 20px 40px oklch(0.05 0 0 / 0.4),
    0 40px 80px oklch(0.05 0 0 / 0.25);
  --shadow-inset: inset 0 1px 3px oklch(0.05 0 0 / 0.3), inset 0 1px 1px oklch(0.05 0 0 / 0.2);
  --shadow-highlight: inset 0 1px 0 oklch(1 0 0 / 0.06);
  --ring-primary: 0 0 0 2px var(--color-surface), 0 0 0 4px var(--color-primary);
  --ring-danger: 0 0 0 2px var(--color-surface), 0 0 0 4px var(--color-danger);

  --color-surface-glass: oklch(0.2 0.008 80 / 0.75);
  --glass-border: oklch(1 0 0 / 0.08);

  --avatar-bg-l: 0.28;
  --avatar-text-l: 0.78;

  /* ── shadcn-vue dark overrides ───────────────────────────── */
  --background: var(--color-bg);
  --foreground: var(--color-text-primary);

  --card: var(--color-surface);
  --card-foreground: var(--color-text-primary);

  --popover: var(--color-surface-overlay);
  --popover-foreground: var(--color-text-primary);

  --primary: var(--color-primary);
  --primary-foreground: var(--color-text-inverse);

  --secondary: var(--color-secondary);
  --secondary-foreground: var(--color-text-inverse);

  --muted: var(--color-bg-subtle);
  --muted-foreground: var(--color-text-secondary);

  --accent: var(--color-neutral-light);
  --accent-foreground: var(--color-text-heading);

  --destructive: var(--color-danger);

  --border: var(--color-border);
  --input: var(--color-border);
  --ring: var(--color-primary);

  /* ── Extra semantic dark ─────────────────────────────────── */
  --success: oklch(0.65 0.17 145);
  --success-foreground: var(--color-text-inverse);
  --warning: oklch(0.75 0.15 75);
  --warning-foreground: var(--color-text-inverse);
  --info: oklch(0.65 0.12 240);
  --info-foreground: var(--color-text-inverse);

  /* ── Sidebar dark ────────────────────────────────────────── */
  --sidebar: var(--color-surface);
  --sidebar-foreground: var(--color-text-primary);
  --sidebar-primary: var(--color-primary);
  --sidebar-primary-foreground: var(--color-text-inverse);
  --sidebar-accent: var(--color-neutral-light);
  --sidebar-accent-foreground: var(--color-text-heading);
  --sidebar-border: var(--color-border);
  --sidebar-ring: var(--color-primary);

  /* ── Chart dark ──────────────────────────────────────────── */
  --chart-1: var(--color-primary);
  --chart-2: var(--color-secondary);
  --chart-3: var(--color-info);
  --chart-4: var(--color-success);
  --chart-5: var(--color-warning);
}

/* ═══════════════════════════════════════════════════════════════
   BASE STYLES
═══════════════════════════════════════════════════════════════ */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-family: var(--font-ui);
  font-size: 16px;
  line-height: 1.6;
  color: var(--color-text-primary);
  background-color: var(--color-bg);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body {
  min-height: 100vh;
}

/* ── Typography utilities ──────────────────────────────────── */
.text-display {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 1rem + 2vw, 2.25rem);
  line-height: 1.15;
  font-weight: 700;
  letter-spacing: -0.02em;
}
.text-h1 {
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 0.9rem + 1.5vw, 1.875rem);
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: -0.015em;
}
.text-h2 {
  font-family: var(--font-display);
  font-size: clamp(1.125rem, 0.9rem + 1vw, 1.5rem);
  line-height: 1.25;
  font-weight: 600;
  letter-spacing: -0.01em;
}
.text-h3 {
  font-family: var(--font-ui);
  font-size: clamp(1rem, 0.95rem + 0.4vw, 1.25rem);
  line-height: 1.35;
  font-weight: 600;
}
.text-h4 {
  font-family: var(--font-ui);
  font-size: clamp(0.9375rem, 0.9rem + 0.25vw, 1.125rem);
  line-height: 1.4;
  font-weight: 600;
}
.text-body-lg {
  font-size: clamp(0.9375rem, 0.9rem + 0.25vw, 1.125rem);
  line-height: 1.6;
}
.text-body {
  font-size: clamp(0.875rem, 0.85rem + 0.15vw, 1rem);
  line-height: 1.6;
}
.text-body-sm {
  font-size: clamp(0.8125rem, 0.8rem + 0.1vw, 0.875rem);
  line-height: 1.5;
}
.text-caption {
  font-size: 0.75rem;
  line-height: 1.5;
}
.text-overline {
  font-size: 0.75rem;
  line-height: 1.5;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.text-code {
  font-family: var(--font-mono);
  font-size: clamp(0.8125rem, 0.8rem + 0.1vw, 0.875rem);
  line-height: 1.6;
}
.text-code-sm {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  line-height: 1.5;
}

/* ── Focus ring ────────────────────────────────────────────── */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* ── Scrollbar ─────────────────────────────────────────────── */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: var(--color-border-strong);
  border-radius: var(--radius-full);
}
::-webkit-scrollbar-thumb:hover {
  background: var(--color-text-tertiary);
}
```

- [ ] **Step 2: Update src/main.ts to import the CSS**

Replace `src/main.ts`:

```ts
import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'

createApp(App).mount('#app')
```

- [ ] **Step 3: Create minimal App.vue**

Replace `src/App.vue`:

```vue
<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const { theme, toggle } = useTheme()
</script>

<template>
  <div class="min-h-screen bg-background text-foreground p-8">
    <h1 class="text-display text-accent-foreground mb-4">Abadikan Theme</h1>
    <p class="text-body text-muted-foreground mb-4">
      Theme: {{ theme }}
    </p>
    <button
      class="bg-primary text-primary-foreground px-4 py-2 rounded-lg"
      @click="toggle"
    >
      Toggle Theme
    </button>
  </div>
</template>
```

- [ ] **Step 4: Verify dev server**

```bash
npm run dev
```

Expected: Page renders with Abadikan colors, toggle button works for light/dark.
NOTE: This step depends on Task 8 (useTheme) — do Task 8 first if composables aren't copied yet.

- [ ] **Step 5: Commit**

```bash
git add src/assets/index.css src/main.ts src/App.vue
git commit -m "feat: add Abadikan token system with shadcn-vue variable mapping"
```

---

### Task 8: Copy and adapt composables

**Files:**
- Create: `src/composables/useTheme.ts`
- Create: `src/composables/useClickOutside.ts`
- Create: `src/composables/useFocusTrap.ts`
- Create: `src/composables/useSpacing.ts`
- Create: `src/composables/useFormField.ts`
- Create: `src/composables/useVirtualList.ts`
- Create: `src/composables/useInvitationTheme.ts`
- Create: `src/composables/createTheme.ts`
- Create: `src/composables/index.ts`

- [ ] **Step 1: Copy all composables from abadikan/ds**

```bash
mkdir -p src/composables
cp /Users/User/claude/ds/src/composables/useClickOutside.ts src/composables/
cp /Users/User/claude/ds/src/composables/useFocusTrap.ts src/composables/
cp /Users/User/claude/ds/src/composables/useSpacing.ts src/composables/
cp /Users/User/claude/ds/src/composables/useFormField.ts src/composables/
cp /Users/User/claude/ds/src/composables/useVirtualList.ts src/composables/
cp /Users/User/claude/ds/src/composables/useInvitationTheme.ts src/composables/
cp /Users/User/claude/ds/src/composables/createTheme.ts src/composables/
cp /Users/User/claude/ds/src/composables/index.ts src/composables/
```

- [ ] **Step 2: Create adapted useTheme.ts**

CRITICAL: The original uses `document.documentElement.setAttribute('data-theme', ...)`. For shadcn-vue compatibility, we need to ALSO toggle the `.dark` class on `<html>`.

Create `src/composables/useTheme.ts`:

```ts
import { ref, watchEffect } from 'vue'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'ds-theme'

const isClient = typeof window !== 'undefined'

function getInitialTheme(): Theme {
  if (!isClient) return 'light'
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
  if (stored) return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const theme = ref<Theme>(getInitialTheme())

if (isClient) {
  watchEffect(() => {
    const el = document.documentElement
    // shadcn-vue convention: .dark class on <html>
    el.classList.toggle('dark', theme.value === 'dark')
    // abadikan/ds backward compat: data-theme attribute
    el.setAttribute('data-theme', theme.value)
    localStorage.setItem(STORAGE_KEY, theme.value)
  })
}

export function useTheme() {
  function toggle() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  function set(value: Theme) {
    theme.value = value
  }

  return { theme, toggle, set }
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx vue-tsc --noEmit
```

Expected: No errors. If there are import path issues in copied composables, fix `@/` paths.

- [ ] **Step 4: Commit**

```bash
git add src/composables/
git commit -m "feat: add composables (useTheme adapted for shadcn-vue .dark class)"
```

---

### Task 9: Copy TypeScript token exports

**Files:**
- Create: `src/tokens/colors.ts`
- Create: `src/tokens/semantic.ts`
- Create: `src/tokens/index.ts`

- [ ] **Step 1: Copy token files from abadikan/ds**

```bash
mkdir -p src/tokens
cp /Users/User/claude/ds/src/tokens/colors.ts src/tokens/
cp /Users/User/claude/ds/src/tokens/semantic.ts src/tokens/
cp /Users/User/claude/ds/src/tokens/index.ts src/tokens/
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx vue-tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/tokens/
git commit -m "feat: add TypeScript token exports"
```

---

### Task 10: Configure shadcn-vue

**Files:**
- Create: `components.json`

- [ ] **Step 1: Initialize shadcn-vue**

```bash
npx shadcn-vue@latest init
```

When prompted:
- Style: Default
- Base color: Neutral (we override everything anyway)
- CSS file: `src/assets/index.css`
- Tailwind CSS config: (skip / auto)
- Components alias: `@/components/ui`
- Utils alias: `@/lib/utils`

- [ ] **Step 2: Verify components.json was created**

```bash
cat components.json
```

Expected: JSON file with aliases pointing to `@/components/ui` and `@/lib/utils`.

- [ ] **Step 3: Verify dev server still works**

```bash
npm run dev
```

Expected: No errors, page renders correctly.

- [ ] **Step 4: Commit**

```bash
git add components.json src/
git commit -m "feat: initialize shadcn-vue configuration"
```

---

### Task 11: Full checkpoint verification

- [ ] **Step 1: Run dev server**

```bash
npm run dev
```

Expected: Zero errors, page renders with Abadikan colors.

- [ ] **Step 2: Run TypeScript check**

```bash
npx vue-tsc --noEmit
```

Expected: Zero errors.

- [ ] **Step 3: Test dark mode toggle**

Open browser, click Toggle Theme button.
Expected: Background, text, and button colors switch between light and dark correctly.

- [ ] **Step 4: Verify font rendering**

Open DevTools > Elements > Computed styles on heading.
Expected: `font-family` shows "Abadikan Sans".

- [ ] **Step 5: Verify no abadikan/ds references**

```bash
grep -r "abadikan/ds" src/ || echo "CLEAN: no references found"
```

Expected: "CLEAN: no references found"

- [ ] **Step 6: Commit checkpoint**

```bash
git add -A
git commit -m "chore: Plan A complete — foundation verified"
```

---

## Plan A Complete

After this plan, the project has:
- Vue 3 + Vite 8 + Tailwind v4 scaffold
- ALL Abadikan design tokens (primitives, semantic, spacing, shadows, elevation, motion, typography)
- shadcn-vue CSS variable mapping (light + dark, including sidebar + chart)
- Extra semantic colors (success, warning, info) registered in Tailwind
- Abadikan Sans font (base64 embedded)
- 6 Vue transition presets + 6 keyframe animations + reduced motion
- cn() utility
- 8 composables (useTheme adapted for .dark class)
- TypeScript token exports
- shadcn-vue initialized and ready for component installation

**Next:** Proceed to Plan B (Components) to install shadcn-vue components and copy custom components.
