# Abadikan Design System v2 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Overhaul the Abadikan design system tokens (spacing, radius, typography) and cascade changes through all 56 components with optical alignment fixes and enhanced Storybook docs.

**Architecture:** Surgical Token Swap — redesign CSS custom property tokens first, then cascade updates atoms → molecules → organisms. New repo created by copying current, so changes can be compared side-by-side. Color system, motion tokens, and component logic/behavior stay unchanged.

**Tech Stack:** Vue 3.4+ · TypeScript 5.9 · Tailwind CSS v4 · Vite 8 · Storybook 10 · Vitest · Chromatic

---

## File Map

### New/Modified Token Files
- **Modify:** `src/styles/globals.css` — spacing tokens, radius tokens, typography system (Layer 1 + 3), base typography utilities
- **Modify:** `src/styles/tokens.css` — if exists separately (currently inlined in globals.css — not separate)
- **Modify:** `src/tokens/semantic.ts` — update spacing/radius/typography JS exports to match new tokens
- **Modify:** `src/tokens/colors.ts` — no changes (color system stays)

### Atom Components (18 files to modify)
Each atom folder has: `Component.vue`, `Component.test.ts`, `Component.stories.ts`, `index.ts`
- `src/components/atoms/Button/Button.vue` — pill radius, new spacing tokens, typography aliases
- `src/components/atoms/Input/Input.vue` — sm radius, spacing tokens, typography aliases
- `src/components/atoms/Badge/Badge.vue` — pill radius, spacing tokens, typography aliases
- `src/components/atoms/Avatar/Avatar.vue` — radius mapping (circle=full, rounded=md)
- `src/components/atoms/Checkbox/Checkbox.vue` — xs radius, spacing tokens, optical alignment
- `src/components/atoms/Radio/Radio.vue` — xs radius, spacing tokens, optical alignment
- `src/components/atoms/Toggle/Toggle.vue` — pill radius, spacing tokens, optical alignment
- `src/components/atoms/Textarea/Textarea.vue` — sm radius, spacing tokens, typography
- `src/components/atoms/Icon/Icon.vue` — no spacing changes (size-only component)
- `src/components/atoms/Spinner/Spinner.vue` — no changes expected (size-only)
- `src/components/atoms/Skeleton/Skeleton.vue` — radius tokens only
- `src/components/atoms/Divider/Divider.vue` — spacing token for label gap
- `src/components/atoms/KBD/KBD.vue` — radius + spacing + typography tokens
- `src/components/atoms/Stack/Stack.vue` — verify gap system aligns with new spacing scale
- `src/components/atoms/Container/Container.vue` — spacing tokens for padding
- `src/components/atoms/Center/Center.vue` — spacing tokens for padding
- `src/components/atoms/AspectRatio/AspectRatio.vue` — no changes expected
- `src/components/atoms/VisuallyHidden/VisuallyHidden.vue` — no changes expected

### Molecule Components (36+ files to modify)
Key molecules requiring significant work:
- `src/components/molecules/Card/Card.vue` — md radius, spacing overhaul, nested radius formula
- `src/components/molecules/Modal/Modal.vue` — lg radius, spacing overhaul
- `src/components/molecules/Alert/Alert.vue` — md radius, replace hardcoded px with tokens
- `src/components/molecules/Select/SelectTrigger.vue` — sm radius, spacing, typography
- `src/components/molecules/SegmentedControl/SegmentedControl.vue` — pill radius, spacing
- `src/components/molecules/Tabs/TabsList.vue` — pill variant radius, spacing
- `src/components/molecules/Drawer/Drawer.vue` — lg radius, spacing
- `src/components/molecules/DropdownMenu/DropdownMenu.vue` — sm radius, spacing
- `src/components/molecules/Tooltip/Tooltip.vue` — sm radius, spacing
- `src/components/molecules/Popover/Popover.vue` — sm radius, spacing
- `src/components/molecules/HoverCard/HoverCard.vue` — sm radius, spacing
- `src/components/molecules/Combobox/Combobox.vue` — sm radius, spacing
- `src/components/molecules/CommandPalette/CommandPalette.vue` — spacing, radius
- `src/components/molecules/Tag/Tag.vue` — pill radius, spacing, typography
- `src/components/molecules/Breadcrumb/Breadcrumb.vue` — spacing, baseline alignment
- `src/components/molecules/Pagination/Pagination.vue` — spacing, radius
- All remaining molecules: token swap + optical alignment audit

### Organism Components (6 files to modify)
- `src/components/organisms/Navbar/Navbar.vue` — spacing, radius, baseline alignment
- `src/components/organisms/Sidebar/Sidebar.vue` — spacing, radius, optical alignment
- `src/components/organisms/ChatMessage/ChatMessage.vue` — spacing, radius, typography
- `src/components/organisms/ChatInput/ChatInput.vue` — spacing, radius, typography
- `src/components/organisms/Table/Table.vue` — spacing, typography, baseline alignment
- `src/components/organisms/Form/Form.vue` — spacing, typography

### Storybook Files
- **Modify:** `.storybook/preview.ts` — viewport presets for 4 breakpoints
- **Modify:** All `*.stories.ts` files — enhanced docs, variant grids, state stories

---

## Task 1: Create New Repository

**Files:**
- Create: `/Users/User/claude/ds-v2/` (entire new repo)

- [ ] **Step 1: Copy current repo to new location**

```bash
cp -r /Users/User/claude/ds /Users/User/claude/ds-v2
cd /Users/User/claude/ds-v2
```

- [ ] **Step 2: Clean git history for fresh start**

```bash
cd /Users/User/claude/ds-v2
rm -rf .git
git init
git add -A
git commit -m "chore: fork ds v1 as starting point for v2 overhaul"
```

- [ ] **Step 3: Verify project runs**

```bash
cd /Users/User/claude/ds-v2
npm install
npm run type-check
npm run test -- --run
```

Expected: All type checks pass, all tests pass.

- [ ] **Step 4: Verify Storybook runs**

```bash
cd /Users/User/claude/ds-v2
npm run storybook -- --ci --port 6007 &
sleep 5
curl -s http://localhost:6007 | head -5
kill %1
```

Expected: Storybook serves HTML.

---

## Task 2: Redesign Spacing Tokens

**Files:**
- Modify: `src/styles/globals.css:150-172` (`:root` spacing section)
- Modify: `src/styles/globals.css:7-28` (`@theme` spacing block)
- Modify: `src/tokens/semantic.ts` (spacing exports)

- [ ] **Step 1: Update CSS spacing tokens in `:root`**

Replace the spacing section in the `@layer ds.tokens { :root { ... } }` block in `src/styles/globals.css`:

```css
    /* Spacing system: 4px grid + 2px sub-steps */
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
    --space-24: 96px;
```

Key change: remove `--space-20: 80px` (not on 4px grid naming). Values 0–24 map to multiplier × 4px.

- [ ] **Step 2: Update @theme spacing block for Tailwind**

Replace the `@theme` spacing block at the top of `src/styles/globals.css`:

```css
@theme {
  --spacing-0: var(--space-0);
  --spacing-px: var(--space-px);
  --spacing-0\.5: var(--space-0-5);
  --spacing-1: var(--space-1);
  --spacing-1\.5: var(--space-1-5);
  --spacing-2: var(--space-2);
  --spacing-2\.5: var(--space-2-5);
  --spacing-3: var(--space-3);
  --spacing-4: var(--space-4);
  --spacing-5: var(--space-5);
  --spacing-6: var(--space-6);
  --spacing-8: var(--space-8);
  --spacing-10: var(--space-10);
  --spacing-12: var(--space-12);
  --spacing-16: var(--space-16);
  --spacing-24: var(--space-24);
}
```

Remove `--spacing-20` and duplicate alias entries (keep only canonical names).

- [ ] **Step 3: Update semantic.ts spacing exports**

In `src/tokens/semantic.ts`, update the spacing object:

```typescript
export const spacing = {
  0: '0px',
  px: '1px',
  0.5: '2px',
  1: '4px',
  1.5: '6px',
  2: '8px',
  2.5: '10px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  24: '96px',
} as const
```

- [ ] **Step 4: Run tests to verify nothing breaks**

```bash
cd /Users/User/claude/ds-v2
npm run type-check
npm run test -- --run
```

Expected: All pass. Spacing tokens are CSS variables — components using Tailwind classes (p-4, gap-2) auto-inherit new values since the Tailwind theme maps to the same CSS vars.

- [ ] **Step 5: Commit**

```bash
cd /Users/User/claude/ds-v2
git add src/styles/globals.css src/tokens/semantic.ts
git commit -m "feat(tokens): redesign spacing system — 4px grid + 2px sub-steps"
```

---

## Task 3: Redesign Border Radius Tokens

**Files:**
- Modify: `src/styles/globals.css:89-96` (`@theme` radius block)
- Modify: `src/tokens/semantic.ts` (radii exports)

- [ ] **Step 1: Update CSS radius tokens in @theme**

Replace the radius section in the `@theme` block:

```css
  /* ── Border radii: Container family + Pill family ────────── */
  /* Container: consistent radius with nested formula: inner = max(outer - padding, radius-xs) */
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  /* Pill: fully rounded for buttons, badges, tags, toggles */
  --radius-full: 9999px;
```

Key changes: `xs: 2→4`, `sm: 4→8`, `md: 8→12`, `lg: 12→16`, `xl: 16→20`. Removed `2xl` (use `xl` instead). Added comments documenting the two families.

- [ ] **Step 2: Update semantic.ts radii exports**

```typescript
export const radii = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  full: '9999px',
} as const
```

- [ ] **Step 3: Run tests**

```bash
cd /Users/User/claude/ds-v2
npm run type-check
npm run test -- --run
```

Expected: Tests pass. Some visual changes expected (radius values shifted up) but no logic breaks.

- [ ] **Step 4: Commit**

```bash
cd /Users/User/claude/ds-v2
git add src/styles/globals.css src/tokens/semantic.ts
git commit -m "feat(tokens): redesign border radius — container + pill families"
```

---

## Task 4: Redesign Typography System (3-Layer)

**Files:**
- Modify: `src/styles/globals.css:116-143` (`@theme` typography)
- Modify: `src/styles/globals.css:351-417` (base typography utilities)
- Modify: `src/tokens/semantic.ts` (typography exports)

- [ ] **Step 1: Replace @theme typography with new font tokens**

Replace the typography scale section in `@theme`:

```css
  /* ── Typography: font weights ─────────────────────────────── */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  /* ── Typography: body scale (fixed, ratio ~1.25) ──────────── */
  --body-lg-size: 1.125rem;    /* 18px */
  --body-lg-leading: 1.75rem;  /* 28px — snaps to 4px grid */
  --body-md-size: 1rem;        /* 16px */
  --body-md-leading: 1.5rem;   /* 24px */
  --body-sm-size: 0.875rem;    /* 14px */
  --body-sm-leading: 1.25rem;  /* 20px */
  --caption-size: 0.75rem;     /* 12px */
  --caption-leading: 1rem;     /* 16px */

  /* ── Typography: line-height scale (kept for Tailwind compat) */
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;

  /* ── Typography: letter-spacing scale ─────────────────────── */
  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0em;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;
```

Remove the old `--text-2xs` through `--text-5xl` scale (replaced by semantic body/display/heading tokens).

- [ ] **Step 2: Add Layer 1 responsive tokens + Layer 2 component tokens to :root**

Add to the `@layer ds.tokens { :root { ... } }` block, after spacing:

```css
    /* ═══ TYPOGRAPHY LAYER 1: Responsive heading/display tokens ═══ */
    /* Mobile-first values — overridden per breakpoint below */

    /* Display scale (font: Abadikan Sans, ratio ~phi) */
    --display-lg-size: 2.25rem;   /* 36px */
    --display-lg-leading: 2.5rem; /* 40px */
    --display-md-size: 1.875rem;  /* 30px */
    --display-md-leading: 2.25rem;/* 36px */
    --display-sm-size: 1.5rem;    /* 24px */
    --display-sm-leading: 2rem;   /* 32px */

    /* Heading scale (font: Abadikan Sans) */
    --h1-size: 1.875rem;  /* 30px */
    --h1-leading: 2.25rem;/* 36px */
    --h2-size: 1.5rem;    /* 24px */
    --h2-leading: 2rem;   /* 32px */
    --h3-size: 1.25rem;   /* 20px */
    --h3-leading: 1.75rem;/* 28px */
    --h4-size: 1.125rem;  /* 18px */
    --h4-leading: 1.5rem; /* 24px */

    /* ═══ TYPOGRAPHY LAYER 2: Component aliases ═══ */
    /* Each component references Layer 1 — single source of truth */

    /* Button */
    --btn-font-size-sm: var(--body-sm-size);
    --btn-font-size-md: var(--body-md-size);
    --btn-font-size-lg: var(--body-lg-size);
    --btn-leading-sm: var(--body-sm-leading);
    --btn-leading-md: var(--body-md-leading);
    --btn-leading-lg: var(--body-lg-leading);

    /* Input */
    --input-font-size-sm: var(--body-sm-size);
    --input-font-size-md: var(--body-md-size);
    --input-font-size-lg: var(--body-lg-size);
    --input-leading-sm: var(--body-sm-leading);
    --input-leading-md: var(--body-md-leading);
    --input-leading-lg: var(--body-lg-leading);

    /* Textarea */
    --textarea-font-size-sm: var(--body-sm-size);
    --textarea-font-size-md: var(--body-md-size);
    --textarea-font-size-lg: var(--body-lg-size);

    /* Badge */
    --badge-font-size-sm: var(--caption-size);
    --badge-font-size-md: var(--body-sm-size);
    --badge-font-size-lg: var(--body-md-size);

    /* Tag */
    --tag-font-size-sm: var(--caption-size);
    --tag-font-size-md: var(--body-sm-size);
    --tag-font-size-lg: var(--body-md-size);

    /* Select */
    --select-font-size-sm: var(--body-sm-size);
    --select-font-size-md: var(--body-md-size);
    --select-font-size-lg: var(--body-lg-size);

    /* Card */
    --card-title-font-size: var(--h4-size);
    --card-title-leading: var(--h4-leading);

    /* Modal */
    --modal-title-font-size: var(--h3-size);
    --modal-title-leading: var(--h3-leading);

    /* Alert */
    --alert-title-font-size-sm: var(--body-sm-size);
    --alert-title-font-size-md: var(--body-md-size);
    --alert-title-font-size-lg: var(--body-lg-size);
    --alert-body-font-size-sm: var(--caption-size);
    --alert-body-font-size-md: var(--body-sm-size);
    --alert-body-font-size-lg: var(--body-md-size);

    /* Label / Helper text (shared by Input, Select, Textarea, Checkbox) */
    --label-font-size: var(--body-sm-size);
    --helper-font-size: var(--caption-size);

    /* Navbar */
    --navbar-font-size: var(--body-sm-size);

    /* Sidebar */
    --sidebar-font-size: var(--body-sm-size);

    /* Table */
    --table-header-font-size: var(--caption-size);
    --table-cell-font-size: var(--body-sm-size);
```

- [ ] **Step 3: Add Layer 3 responsive breakpoint overrides**

Add after the dark mode block in `src/styles/globals.css`, still inside `@layer ds.tokens`:

```css
  /* ═══ TYPOGRAPHY LAYER 3: Breakpoint overrides ═══ */
  /* Display and heading tokens auto-switch per viewport */

  /* Tablet (≥640px) */
  @media (width >= 640px) {
    :root {
      --display-lg-size: 3rem;       /* 48px */
      --display-lg-leading: 3.25rem; /* 52px */
      --display-md-size: 2.25rem;    /* 36px */
      --display-md-leading: 2.5rem;  /* 40px */
      --display-sm-size: 1.875rem;   /* 30px */
      --display-sm-leading: 2.25rem; /* 36px */

      --h1-size: 2.25rem;    /* 36px */
      --h1-leading: 2.5rem;  /* 40px */
      --h2-size: 1.75rem;    /* 28px */
      --h2-leading: 2rem;    /* 32px */
      --h3-size: 1.5rem;     /* 24px */
      --h3-leading: 2rem;    /* 32px */
      --h4-size: 1.25rem;    /* 20px */
      --h4-leading: 1.75rem; /* 28px */
    }
  }

  /* Desktop (≥1024px) */
  @media (width >= 1024px) {
    :root {
      --display-lg-size: 3.75rem;    /* 60px */
      --display-lg-leading: 4rem;    /* 64px */
      --display-md-size: 3rem;       /* 48px */
      --display-md-leading: 3.25rem; /* 52px */
      --display-sm-size: 2.25rem;    /* 36px */
      --display-sm-leading: 2.5rem;  /* 40px */

      --h1-size: 3rem;       /* 48px */
      --h1-leading: 3.25rem; /* 52px */
      --h2-size: 2rem;       /* 32px */
      --h2-leading: 2.25rem; /* 36px */
      --h3-size: 1.5rem;     /* 24px */
      --h3-leading: 2rem;    /* 32px */
      --h4-size: 1.25rem;    /* 20px */
      --h4-leading: 1.75rem; /* 28px */
    }
  }

  /* XLarge (≥1440px) */
  @media (width >= 1440px) {
    :root {
      --display-lg-size: 4.5rem;     /* 72px */
      --display-lg-leading: 4.75rem; /* 76px */
      --display-md-size: 3.75rem;    /* 60px */
      --display-md-leading: 4rem;    /* 64px */
      --display-sm-size: 3rem;       /* 48px */
      --display-sm-leading: 3.25rem; /* 52px */

      --h1-size: 3.75rem;    /* 60px */
      --h1-leading: 4rem;    /* 64px */
      --h2-size: 2.25rem;    /* 36px */
      --h2-leading: 2.5rem;  /* 40px */
      --h3-size: 1.75rem;    /* 28px */
      --h3-leading: 2rem;    /* 32px */
      --h4-size: 1.5rem;     /* 24px */
      --h4-leading: 2rem;    /* 32px */
    }
  }
```

- [ ] **Step 4: Replace base typography utility classes**

Replace the typography utilities section in `@layer ds.base`:

```css
  /* ── Typography utilities ─────────────────────────────────────── */

  /* Display scale — for landing pages, hero sections */
  .text-display-lg {
    font-family: var(--font-display);
    font-size: var(--display-lg-size);
    line-height: var(--display-lg-leading);
    font-weight: var(--font-bold);
    letter-spacing: -0.02em;
  }
  .text-display-md {
    font-family: var(--font-display);
    font-size: var(--display-md-size);
    line-height: var(--display-md-leading);
    font-weight: var(--font-bold);
    letter-spacing: -0.02em;
  }
  .text-display-sm {
    font-family: var(--font-display);
    font-size: var(--display-sm-size);
    line-height: var(--display-sm-leading);
    font-weight: var(--font-bold);
    letter-spacing: -0.015em;
  }

  /* Heading scale — for page/section headings */
  .text-h1 {
    font-family: var(--font-display);
    font-size: var(--h1-size);
    line-height: var(--h1-leading);
    font-weight: var(--font-bold);
    letter-spacing: -0.015em;
  }
  .text-h2 {
    font-family: var(--font-display);
    font-size: var(--h2-size);
    line-height: var(--h2-leading);
    font-weight: var(--font-semibold);
    letter-spacing: -0.01em;
  }
  .text-h3 {
    font-family: var(--font-display);
    font-size: var(--h3-size);
    line-height: var(--h3-leading);
    font-weight: var(--font-semibold);
  }
  .text-h4 {
    font-family: var(--font-display);
    font-size: var(--h4-size);
    line-height: var(--h4-leading);
    font-weight: var(--font-semibold);
  }

  /* Body scale — for UI text */
  .text-body-lg {
    font-size: var(--body-lg-size);
    line-height: var(--body-lg-leading);
  }
  .text-body {
    font-size: var(--body-md-size);
    line-height: var(--body-md-leading);
  }
  .text-body-sm {
    font-size: var(--body-sm-size);
    line-height: var(--body-sm-leading);
  }

  /* Caption — helper text, timestamps */
  .text-caption {
    font-size: var(--caption-size);
    line-height: var(--caption-leading);
  }
  .text-overline {
    font-size: var(--caption-size);
    line-height: var(--caption-leading);
    font-weight: var(--font-semibold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* Code */
  .text-code {
    font-family: var(--font-mono);
    font-size: var(--body-sm-size);
    line-height: var(--body-sm-leading);
  }
  .text-code-sm {
    font-family: var(--font-mono);
    font-size: var(--caption-size);
    line-height: var(--caption-leading);
  }
```

- [ ] **Step 5: Update semantic.ts typography exports**

Replace fontSizes and add new typography exports in `src/tokens/semantic.ts`:

```typescript
export const typography = {
  body: {
    lg: { size: '18px', leading: '28px' },
    md: { size: '16px', leading: '24px' },
    sm: { size: '14px', leading: '20px' },
  },
  caption: { size: '12px', leading: '16px' },
  weights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  fonts: {
    display: "'Abadikan Sans', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
} as const

// Keep fontSizes for backwards compat during migration
export const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
} as const
```

- [ ] **Step 6: Run tests**

```bash
cd /Users/User/claude/ds-v2
npm run type-check
npm run test -- --run
```

Expected: Type check passes. Some tests that assert specific text sizes (e.g., `text-sm` class) may need updating — note any failures for the component update tasks.

- [ ] **Step 7: Commit**

```bash
cd /Users/User/claude/ds-v2
git add src/styles/globals.css src/tokens/semantic.ts
git commit -m "feat(tokens): 3-layer responsive typography system — display/heading/body/caption"
```

---

## Task 5: Update Core Atoms — Button

**Files:**
- Modify: `src/components/atoms/Button/Button.vue`
- Modify: `src/components/atoms/Button/Button.test.ts`
- Modify: `src/components/atoms/Button/Button.stories.ts`

- [ ] **Step 1: Write failing test for new token usage**

Add to `Button.test.ts`:

```typescript
it('applies pill border radius', () => {
  const wrapper = mount(Button, { props: { variant: 'primary' } })
  // Button should use rounded-full (pill shape) per spec
  expect(wrapper.find('button').classes()).toContain('rounded-full')
})
```

- [ ] **Step 2: Run test to verify it fails or passes**

```bash
cd /Users/User/claude/ds-v2
npx vitest run src/components/atoms/Button/Button.test.ts
```

Note: Button already uses `rounded-full` — this test should pass. If it does, proceed. If not, this confirms what needs fixing.

- [ ] **Step 3: Update Button.vue spacing and typography**

In `Button.vue`, update the size classes to use new spacing tokens and typography aliases. Replace the size computation with:

```typescript
const sizeClasses: Record<string, string> = {
  xs: 'min-h-7 px-3 py-1 gap-1 text-[length:var(--btn-font-size-sm)] leading-[--btn-leading-sm]',
  sm: 'min-h-8 px-4 py-1.5 gap-1.5 text-[length:var(--btn-font-size-sm)] leading-[--btn-leading-sm]',
  md: 'min-h-10 px-5 py-2 gap-1.5 text-[length:var(--btn-font-size-md)] leading-[--btn-leading-md]',
  lg: 'min-h-12 px-6 py-2.5 gap-2 text-[length:var(--btn-font-size-lg)] leading-[--btn-leading-lg]',
  xl: 'min-h-14 px-8 py-3 gap-2 text-[length:var(--btn-font-size-lg)] leading-[--btn-leading-lg]',
}
```

Key optical alignment changes:
- Pill shape: horizontal padding ~1.5-2x vertical (px-5 vs py-2 for md)
- Icon-to-text gap: `gap-1` (4px) for xs/sm, `gap-1.5` (6px) for md, `gap-2` (8px) for lg/xl
- Font sizes via Layer 2 tokens instead of Tailwind `text-sm`/`text-base`

- [ ] **Step 4: Run all Button tests**

```bash
cd /Users/User/claude/ds-v2
npx vitest run src/components/atoms/Button/Button.test.ts
```

Expected: All tests pass. Fix any assertions that check for old Tailwind size classes.

- [ ] **Step 5: Update Button.stories.ts — add AllVariants and AllSizes grids**

Add comprehensive variant/size grid stories:

```typescript
export const AllVariants: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
        <Button variant="default">Default</Button>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="link">Link</Button>
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
        <Button size="xs">Extra Small</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="xl">Extra Large</Button>
      </div>
    `,
  }),
}
```

- [ ] **Step 6: Commit**

```bash
cd /Users/User/claude/ds-v2
git add src/components/atoms/Button/
git commit -m "feat(Button): apply v2 tokens — pill radius, spacing grid, typography aliases"
```

---

## Task 6: Update Core Atoms — Input, Textarea

**Files:**
- Modify: `src/components/atoms/Input/Input.vue`
- Modify: `src/components/atoms/Input/Input.test.ts`
- Modify: `src/components/atoms/Textarea/Textarea.vue`

- [ ] **Step 1: Update Input.vue radius and spacing**

Key changes in `Input.vue`:
1. Replace `rounded-[var(--radius-lg)]` with `rounded-[var(--radius-sm)]` (inputs use `sm` radius per spec)
2. Replace hardcoded font sizes (`text-sm`, `text-base`) with Layer 2 tokens:
   ```
   text-[length:var(--input-font-size-sm)]  (was text-sm)
   text-[length:var(--input-font-size-md)]  (was text-base)
   text-[length:var(--input-font-size-lg)]  (was text-base)
   ```
3. Replace label font: `text-[length:var(--label-font-size)] font-medium`
4. Replace helper text font: `text-[length:var(--helper-font-size)]`
5. Ensure padding uses spacing tokens: `px-3` (sm), `px-4` (md), `px-5` (lg)
6. Min heights: `min-h-8` (sm/32px), `min-h-10` (md/40px), `min-h-12` (lg/48px)

- [ ] **Step 2: Update Textarea.vue with same patterns**

Apply same radius (`--radius-sm`) and typography token changes as Input.

- [ ] **Step 3: Run tests**

```bash
cd /Users/User/claude/ds-v2
npx vitest run src/components/atoms/Input/Input.test.ts
```

Fix any assertions checking for old radius values or class names.

- [ ] **Step 4: Commit**

```bash
cd /Users/User/claude/ds-v2
git add src/components/atoms/Input/ src/components/atoms/Textarea/
git commit -m "feat(Input,Textarea): apply v2 tokens — sm radius, spacing grid, typography aliases"
```

---

## Task 7: Update Remaining Atoms — Badge, Avatar, Checkbox, Radio, Toggle, KBD

**Files:**
- Modify: `src/components/atoms/Badge/Badge.vue`
- Modify: `src/components/atoms/Avatar/Avatar.vue`
- Modify: `src/components/atoms/Checkbox/Checkbox.vue`
- Modify: `src/components/atoms/Radio/Radio.vue`
- Modify: `src/components/atoms/Toggle/Toggle.vue`
- Modify: `src/components/atoms/KBD/KBD.vue`

- [ ] **Step 1: Update Badge.vue**

1. Radius: replace `rounded-[var(--radius-sm)]` → `rounded-full` (pill family per spec)
2. Font sizes: use `--badge-font-size-sm/md/lg` tokens
3. Spacing: ensure padding uses `px-2` (sm), `px-2.5` (md), `px-3` (lg) with `py-0.5`/`py-1`

- [ ] **Step 2: Update Avatar.vue**

1. Shape mapping: `circle` → `rounded-full`, `rounded` → `rounded-[var(--radius-md)]`, `square` → `rounded-[var(--radius-xs)]`
2. Font sizes for initials: use `--caption-size` (xs/sm), `--body-sm-size` (md), `--body-md-size` (lg), etc.

- [ ] **Step 3: Update Checkbox.vue**

1. Radius: ensure `--radius-xs` (4px) for checkbox box
2. Optical alignment: fix `mt-[2px]`/`mt-[3px]`/`mt-[4px]` nudges — use `mt-px` or `mt-0.5` tokens where possible
3. Gap: `gap-2` (8px) between checkbox and label
4. Typography: label uses `--label-font-size`, description uses `--helper-font-size`

- [ ] **Step 4: Update Radio.vue**

Same optical alignment and spacing patterns as Checkbox.

- [ ] **Step 5: Update Toggle.vue**

1. Radius: already `rounded-full` (pill) — verify
2. Gap: `gap-2.5` → `gap-2` (8px) for consistency
3. Typography: label uses `--label-font-size`
4. Optical alignment: same mt-nudge pattern as Checkbox

- [ ] **Step 6: Update KBD.vue**

1. Radius: `--radius-xs` (4px)
2. Font: `--caption-size`
3. Padding: `px-1.5 py-0.5`

- [ ] **Step 7: Run all atom tests**

```bash
cd /Users/User/claude/ds-v2
npx vitest run src/components/atoms/ --run
```

Fix any failures.

- [ ] **Step 8: Commit**

```bash
cd /Users/User/claude/ds-v2
git add src/components/atoms/Badge/ src/components/atoms/Avatar/ src/components/atoms/Checkbox/ src/components/atoms/Radio/ src/components/atoms/Toggle/ src/components/atoms/KBD/
git commit -m "feat(atoms): apply v2 tokens to Badge, Avatar, Checkbox, Radio, Toggle, KBD"
```

---

## Task 8: Update Layout Atoms — Stack, Container, Center, Divider, Skeleton, Spinner, Icon, AspectRatio, VisuallyHidden

**Files:**
- Modify: `src/components/atoms/Stack/Stack.vue`
- Modify: `src/components/atoms/Container/Container.vue`
- Modify: `src/components/atoms/Center/Center.vue`
- Modify: `src/components/atoms/Divider/Divider.vue`
- Modify: `src/components/atoms/Skeleton/Skeleton.vue`
- Others: review only, changes if needed

- [ ] **Step 1: Verify Stack.vue gap system**

Stack uses `gap * 4 + 'px'` for numeric gaps — this already aligns with 4px grid. Verify the default gap maps to a valid token value. No changes if already aligned.

- [ ] **Step 2: Update Container.vue padding**

Ensure padding uses spacing tokens: `px-4` (default), verify size variants use correct tokens.

- [ ] **Step 3: Update Divider.vue label gap**

Label gap should use `--space-2` (8px) or `--space-3` (12px) token.

- [ ] **Step 4: Update Skeleton.vue radius**

Map skeleton variants to new radius tokens:
- `rectangular` → `--radius-sm`
- `rounded` → `--radius-md`
- `circular` → `--radius-full`

- [ ] **Step 5: Review remaining atoms**

Check Icon, Spinner, Center, AspectRatio, VisuallyHidden — most are size-only or have no spacing to update. Make changes only where needed.

- [ ] **Step 6: Run atom tests**

```bash
cd /Users/User/claude/ds-v2
npx vitest run src/components/atoms/ --run
```

- [ ] **Step 7: Commit**

```bash
cd /Users/User/claude/ds-v2
git add src/components/atoms/
git commit -m "feat(atoms): apply v2 tokens to layout atoms — Stack, Container, Divider, Skeleton"
```

---

## Task 9: Update Key Molecules — Card, Modal, Alert, Drawer

**Files:**
- Modify: `src/components/molecules/Card/Card.vue`
- Modify: `src/components/molecules/Modal/Modal.vue`
- Modify: `src/components/molecules/Alert/Alert.vue`
- Modify: `src/components/molecules/Drawer/Drawer.vue`

- [ ] **Step 1: Update Card.vue**

1. Radius: map `radius` prop to new tokens — `sm→--radius-sm`, `md→--radius-md`, `lg→--radius-lg`, `xl→--radius-xl`
2. Padding: map `padding` prop — `sm→--space-3`, `md→--space-4`, `lg→--space-6`
3. Nested elements inside card: apply nested radius formula `max(outer - padding, radius-xs)`
4. Title typography: use `--card-title-font-size` / `--card-title-leading`

- [ ] **Step 2: Update Modal.vue**

1. Radius: `rounded-[var(--radius-lg)]` (16px)
2. Padding: `px-6` → keep (24px = `--space-6`), verify all padding uses token values
3. Title: `--modal-title-font-size` / `--modal-title-leading`
4. Body text: `--body-md-size`

- [ ] **Step 3: Update Alert.vue**

Alert uses a `sizeScale` object with hardcoded pixel values. Replace with token references:

```typescript
const sizeScale = {
  sm: {
    padding: 'var(--space-3) var(--space-3)',   // 12px
    gap: 'var(--space-2-5)',                     // 10px
    iconSide: '28px',
    iconRadius: 'var(--radius-sm)',              // 8px
    titleSize: 'var(--alert-title-font-size-sm)',
    bodySize: 'var(--alert-body-font-size-sm)',
  },
  md: {
    padding: 'var(--space-3) var(--space-4)',    // 12px 16px (optically balanced)
    gap: 'var(--space-3)',                       // 12px
    iconSide: '32px',
    iconRadius: 'var(--radius-sm)',
    titleSize: 'var(--alert-title-font-size-md)',
    bodySize: 'var(--alert-body-font-size-md)',
  },
  lg: {
    padding: 'var(--space-4) var(--space-5)',    // 16px 20px
    gap: 'var(--space-3)',                       // 12px
    iconSide: '36px',
    iconRadius: 'var(--radius-md)',
    titleSize: 'var(--alert-title-font-size-lg)',
    bodySize: 'var(--alert-body-font-size-lg)',
  },
}
```

Alert container radius: `--radius-md` (12px).

- [ ] **Step 4: Update Drawer.vue**

1. Radius: `--radius-lg` (16px) for the drawer panel
2. Padding: use spacing tokens for header/body/footer sections

- [ ] **Step 5: Run tests**

```bash
cd /Users/User/claude/ds-v2
npx vitest run src/components/molecules/Card/ src/components/molecules/Modal/ src/components/molecules/Alert/ src/components/molecules/Drawer/ --run
```

- [ ] **Step 6: Commit**

```bash
cd /Users/User/claude/ds-v2
git add src/components/molecules/Card/ src/components/molecules/Modal/ src/components/molecules/Alert/ src/components/molecules/Drawer/
git commit -m "feat(molecules): apply v2 tokens to Card, Modal, Alert, Drawer"
```

---

## Task 10: Update Pill-Family Molecules — SegmentedControl, Tabs, Tag, Breadcrumb, Pagination

**Files:**
- Modify: `src/components/molecules/SegmentedControl/SegmentedControl.vue`
- Modify: `src/components/molecules/Tabs/TabsList.vue`
- Modify: `src/components/molecules/Tabs/TabsTrigger.vue`
- Modify: `src/components/molecules/Tag/Tag.vue`
- Modify: `src/components/molecules/Breadcrumb/Breadcrumb.vue`
- Modify: `src/components/molecules/Pagination/Pagination.vue`

- [ ] **Step 1: Update SegmentedControl.vue**

1. Track radius: `rounded-full` (pill)
2. Button radius: `rounded-full` (pill) — was `calc(var(--radius-md)-3px)`, now just pill
3. Padding: `sm→px-3 py-1`, `md→px-4 py-1.5`, `lg→px-5 py-2`
4. Icon sizes: `sm→12`, `md→14`, `lg→16` (keep)
5. Track padding: `p-0.5` (2px micro wrapper — uses `--space-0-5`)

- [ ] **Step 2: Update TabsList.vue**

1. Pill variant: `rounded-full`, `p-1` (4px wrapper padding)
2. Gap: `gap-1` (4px) for pill/boxed, `gap-0.5` (2px) for line
3. Boxed variant radius: `--radius-sm`

- [ ] **Step 3: Update Tag.vue**

1. Radius: `rounded-full` (pill)
2. Font: `--tag-font-size-sm/md/lg` tokens
3. Padding: `px-2 py-0.5` (sm), `px-2.5 py-1` (md), `px-3 py-1` (lg)

- [ ] **Step 4: Update Breadcrumb.vue**

1. Spacing between items: `gap-1.5` (6px) or `gap-2` (8px)
2. Ensure text baseline alignment (Rule 4)
3. Typography: `--body-sm-size`

- [ ] **Step 5: Update Pagination.vue**

1. Button radius: `rounded-full` (pill)
2. Spacing: `gap-1` (4px) between page buttons
3. Button min-size: 36px (touch target minimum)

- [ ] **Step 6: Run tests**

```bash
cd /Users/User/claude/ds-v2
npx vitest run src/components/molecules/SegmentedControl/ src/components/molecules/Tabs/ src/components/molecules/Tag/ src/components/molecules/Breadcrumb/ src/components/molecules/Pagination/ --run
```

- [ ] **Step 7: Commit**

```bash
cd /Users/User/claude/ds-v2
git add src/components/molecules/SegmentedControl/ src/components/molecules/Tabs/ src/components/molecules/Tag/ src/components/molecules/Breadcrumb/ src/components/molecules/Pagination/
git commit -m "feat(molecules): apply v2 tokens to pill-family components"
```

---

## Task 11: Update Overlay Molecules — Select, DropdownMenu, Combobox, CommandPalette, Popover, Tooltip, HoverCard

**Files:**
- Modify: `src/components/molecules/Select/SelectTrigger.vue`
- Modify: `src/components/molecules/Select/SelectContent.vue`
- Modify: `src/components/molecules/Select/SelectItem.vue`
- Modify: `src/components/molecules/DropdownMenu/DropdownMenu.vue`
- Modify: `src/components/molecules/Combobox/Combobox.vue`
- Modify: `src/components/molecules/CommandPalette/CommandPalette.vue`
- Modify: `src/components/molecules/Popover/Popover.vue`
- Modify: `src/components/molecules/Tooltip/Tooltip.vue`
- Modify: `src/components/molecules/HoverCard/HoverCard.vue`

- [ ] **Step 1: Update SelectTrigger.vue**

1. Radius: `rounded-[var(--radius-sm)]` (8px)
2. Typography: `--select-font-size-sm/md/lg` tokens
3. Padding: `px-3` (sm), `px-4` (md), `px-5` (lg)
4. Icon sizes and gap: per optical alignment rules

- [ ] **Step 2: Update SelectContent.vue and SelectItem.vue**

1. Dropdown radius: `--radius-sm` (8px)
2. Item padding: `px-3 py-2` for comfortable touch targets
3. Item min-height: 36px (touch target minimum)

- [ ] **Step 3: Update DropdownMenu.vue**

1. Panel radius: `--radius-sm` (8px)
2. Item spacing: `px-3 py-2`
3. Typography: `--body-sm-size`

- [ ] **Step 4: Update Combobox.vue**

1. Input radius: `--radius-sm`
2. Dropdown radius: `--radius-sm`
3. Spacing: consistent with Select patterns

- [ ] **Step 5: Update CommandPalette.vue**

1. Container radius: `--radius-lg` (larger, dialog-like)
2. Input section padding: `px-4 py-3`
3. Item list padding: `px-2 py-2`

- [ ] **Step 6: Update Popover.vue, Tooltip.vue, HoverCard.vue**

All floating elements:
1. Radius: `--radius-sm` (8px)
2. Padding: Tooltip `px-3 py-1.5`, Popover `p-4`, HoverCard `p-4`

- [ ] **Step 7: Run tests**

```bash
cd /Users/User/claude/ds-v2
npx vitest run src/components/molecules/Select/ src/components/molecules/DropdownMenu/ src/components/molecules/Combobox/ src/components/molecules/CommandPalette/ src/components/molecules/Popover/ src/components/molecules/Tooltip/ src/components/molecules/HoverCard/ --run
```

- [ ] **Step 8: Commit**

```bash
cd /Users/User/claude/ds-v2
git add src/components/molecules/Select/ src/components/molecules/DropdownMenu/ src/components/molecules/Combobox/ src/components/molecules/CommandPalette/ src/components/molecules/Popover/ src/components/molecules/Tooltip/ src/components/molecules/HoverCard/
git commit -m "feat(molecules): apply v2 tokens to overlay/floating components"
```

---

## Task 12: Update Remaining Molecules — Accordion, AlertDialog, AvatarGroup, Collapsible, DatePicker, DateRangePicker, EmptyState, FileUpload, InputGroup, LanguageToggle, NumberInput, PinInput, ProgressBar, Rating, ScrollArea, SearchInput, Slider, Stat, Stepper, TagInput, ThemeToggle, Toast

**Files:**
- Modify: All remaining molecule `.vue` files

- [ ] **Step 1: Update form-adjacent molecules**

**NumberInput:** same spacing/radius as Input (`--radius-sm`, spacing tokens)
**SearchInput:** same as Input
**PinInput:** `--radius-sm` per cell, gap `--space-2`
**InputGroup:** wrapper spacing, pass-through radius
**TagInput:** input `--radius-sm`, tags `rounded-full` (pill)
**FileUpload:** drop zone `--radius-md`, dashed border

- [ ] **Step 2: Update feedback molecules**

**AlertDialog:** same as Modal (`--radius-lg`, spacing tokens)
**Toast:** `--radius-md`, padding `--space-4`
**ProgressBar:** `--radius-full` (pill)
**Stepper:** step indicators `--radius-full`, connector spacing `--space-2`

- [ ] **Step 3: Update data display molecules**

**Stat:** typography `--h3-size` for value, `--body-sm-size` for label
**Rating:** star spacing `--space-1`
**AvatarGroup:** overlap offset, uses Avatar (already updated)
**EmptyState:** spacing between icon/text/action, `--space-4` gap

- [ ] **Step 4: Update collapsible molecules**

**Accordion:** header padding `--space-4`, content padding `--space-4`
**Collapsible:** trigger padding, content spacing

- [ ] **Step 5: Update date/calendar molecules**

**DatePicker:** cell size 36px (touch target), radius `--radius-sm`
**DateRangePicker:** same as DatePicker, range highlight `--radius-sm`

- [ ] **Step 6: Update utility molecules**

**ScrollArea:** scrollbar width stays 6px (visual detail, not token)
**Slider:** track height, thumb `--radius-full`
**ThemeToggle:** icon size, `--radius-full`
**LanguageToggle:** consistent with other toggles

- [ ] **Step 7: Run all molecule tests**

```bash
cd /Users/User/claude/ds-v2
npx vitest run src/components/molecules/ --run
```

Fix any failures.

- [ ] **Step 8: Commit**

```bash
cd /Users/User/claude/ds-v2
git add src/components/molecules/
git commit -m "feat(molecules): apply v2 tokens to all remaining molecules"
```

---

## Task 13: Update Organisms — Navbar, Sidebar, ChatMessage, ChatInput, Table, Form

**Files:**
- Modify: `src/components/organisms/Navbar/Navbar.vue`
- Modify: `src/components/organisms/Sidebar/Sidebar.vue`
- Modify: `src/components/organisms/ChatMessage/ChatMessage.vue`
- Modify: `src/components/organisms/ChatInput/ChatInput.vue`
- Modify: `src/components/organisms/Table/Table.vue`
- Modify: `src/components/organisms/Form/Form.vue`

- [ ] **Step 1: Update Navbar.vue**

1. Height: keep 64px (multiple of 4)
2. Floating state radius: `rounded-b-[var(--radius-xl)]` (20px)
3. Typography: `--navbar-font-size` token
4. Inner spacing: `px-4` (16px), `gap-3` (12px)
5. Baseline alignment: ensure all nav items align to text baseline (Rule 4)

- [ ] **Step 2: Update Sidebar.vue**

1. Width values: keep 240/280/320 (multiples of 4)
2. Item padding: `px-3 py-2` (expanded), centered (collapsed)
3. Active indicator: keep 3px border
4. Typography: `--sidebar-font-size` token
5. Icon size: keep `size-5` parent, `size-4` children
6. Group gap: `--space-1` between items
7. Section gap: `--space-4` between groups

- [ ] **Step 3: Update ChatMessage.vue**

1. Bubble radius: `--radius-md` (12px) — not too round for readability
2. Bubble padding: `px-4 py-3` (keep)
3. Max width: keep `max-w-[75%]`
4. Avatar size: keep `sm`
5. Gap between avatar and bubble: `--space-3` (12px)
6. Typography: `text-body-sm` class for message text
7. Timestamp: `text-caption`

- [ ] **Step 4: Update ChatInput.vue**

1. Input container radius: `--radius-sm`
2. Padding: spacing tokens
3. Button (send): pill, proper touch target size

- [ ] **Step 5: Update Table.vue**

1. Header typography: `--table-header-font-size` (caption)
2. Cell typography: `--table-cell-font-size` (body-sm)
3. Cell padding: `px-4 py-3` (consistent spacing)
4. Header font-weight: `--font-semibold`
5. Row baseline alignment (Rule 4)
6. Table container radius: `--radius-md`

- [ ] **Step 6: Update Form.vue**

1. Field gap: `--space-6` (24px) between form fields
2. Section gap: `--space-8` (32px) between form sections
3. Action buttons gap: `--space-3` (12px)

- [ ] **Step 7: Run organism tests**

```bash
cd /Users/User/claude/ds-v2
npx vitest run src/components/organisms/ --run
```

- [ ] **Step 8: Commit**

```bash
cd /Users/User/claude/ds-v2
git add src/components/organisms/
git commit -m "feat(organisms): apply v2 tokens — spacing, radius, typography, optical alignment"
```

---

## Task 14: Update Storybook Config — Viewport Presets

**Files:**
- Modify: `.storybook/preview.ts`

- [ ] **Step 1: Update viewport presets to match 4 breakpoints**

In `.storybook/preview.ts`, update or add viewport configuration:

```typescript
const customViewports = {
  mobile: {
    name: 'Mobile',
    styles: { width: '375px', height: '812px' },
  },
  tablet: {
    name: 'Tablet',
    styles: { width: '768px', height: '1024px' },
  },
  desktop: {
    name: 'Desktop',
    styles: { width: '1280px', height: '800px' },
  },
  xlarge: {
    name: 'XLarge',
    styles: { width: '1440px', height: '900px' },
  },
}
```

These match the breakpoints: mobile (<640px), tablet (≥640px), desktop (≥1024px), xlarge (≥1440px).

- [ ] **Step 2: Verify dark mode toggle still works**

```bash
cd /Users/User/claude/ds-v2
npm run storybook -- --ci --port 6007 &
sleep 5
curl -s http://localhost:6007 | head -5
kill %1
```

- [ ] **Step 3: Commit**

```bash
cd /Users/User/claude/ds-v2
git add .storybook/
git commit -m "feat(storybook): update viewport presets to match v2 breakpoints"
```

---

## Task 15: Enhance Storybook Stories — Atoms

**Files:**
- Modify: All `src/components/atoms/*/stories.ts` files

- [ ] **Step 1: Update Button.stories.ts**

Each story file should follow this structure:
1. `Default` — playground with all controls
2. `AllVariants` — visual grid of every variant
3. `AllSizes` — visual grid of every size
4. Component-specific states (WithIcons, Loading, Disabled)

For Button, ensure:
- All 7 variants × 5 sizes visible in grid stories
- Loading state story
- Disabled state story
- Icon positions (left, right, icon-only)
- Each story has descriptive `parameters.docs.description`

- [ ] **Step 2: Update Input.stories.ts**

- Default playground
- AllSizes grid
- States: error, disabled, readonly, clearable, password
- With prefix/suffix icons
- With label + helper text

- [ ] **Step 3: Update remaining atom stories**

Apply same pattern: Default + AllVariants/AllSizes + key states for:
Badge, Avatar, Checkbox, Radio, Toggle, Divider, Skeleton, KBD, Spinner, Textarea

- [ ] **Step 4: Run Storybook build to verify**

```bash
cd /Users/User/claude/ds-v2
npm run build-storybook 2>&1 | tail -5
```

Expected: Build succeeds without errors.

- [ ] **Step 5: Commit**

```bash
cd /Users/User/claude/ds-v2
git add src/components/atoms/
git commit -m "feat(storybook): enhance atom stories — variant grids, state coverage, docs"
```

---

## Task 16: Enhance Storybook Stories — Molecules & Organisms

**Files:**
- Modify: All `src/components/molecules/*/stories.ts` files
- Modify: All `src/components/organisms/*/stories.ts` files

- [ ] **Step 1: Update key molecule stories**

Priority molecules (most visible in Storybook):
- Card: variants, padding sizes, with media slot
- Modal: sizes, scroll modes
- Alert: variants × sizes
- Select: single/multi, sizes, states
- Tabs: variants (line/pill/boxed)
- SegmentedControl: sizes, with icons
- DatePicker/DateRangePicker: default states
- Toast: all variants
- Tooltip/Popover/HoverCard: placements

- [ ] **Step 2: Update organism stories**

- Navbar: default, transparent, with floating scroll
- Sidebar: expanded, collapsed, with groups
- ChatMessage: user/assistant, with typing, with error/retry
- Table: with data, sorting, pagination
- Form: with validation

- [ ] **Step 3: Build storybook and verify**

```bash
cd /Users/User/claude/ds-v2
npm run build-storybook 2>&1 | tail -5
```

- [ ] **Step 4: Commit**

```bash
cd /Users/User/claude/ds-v2
git add src/components/molecules/ src/components/organisms/
git commit -m "feat(storybook): enhance molecule & organism stories — comprehensive state coverage"
```

---

## Task 17: Full Test Suite Verification & Fixes

**Files:**
- Modify: Any test files with failures

- [ ] **Step 1: Run full test suite**

```bash
cd /Users/User/claude/ds-v2
npm run test -- --run 2>&1
```

- [ ] **Step 2: Fix any failing tests**

Common expected failures:
- Tests asserting specific Tailwind classes (e.g., `text-sm` → now `text-[length:var(--btn-font-size-md)]`)
- Tests asserting specific radius classes (values changed)
- Tests asserting specific padding classes (if changed)

For each failure: update the assertion to match the new class/value. Do NOT change the component to match the old test.

- [ ] **Step 3: Run type check**

```bash
cd /Users/User/claude/ds-v2
npm run type-check
```

- [ ] **Step 4: Run linter**

```bash
cd /Users/User/claude/ds-v2
npm run lint
```

Fix any lint errors.

- [ ] **Step 5: Verify coverage thresholds still met**

```bash
cd /Users/User/claude/ds-v2
npx vitest run --coverage 2>&1 | tail -20
```

Expected: ≥80% statements/lines/functions, ≥75% branches.

- [ ] **Step 6: Commit all fixes**

```bash
cd /Users/User/claude/ds-v2
git add -A
git commit -m "fix(tests): update assertions for v2 token changes"
```

---

## Task 18: Final Build Verification

**Files:**
- No file changes expected

- [ ] **Step 1: Build the library**

```bash
cd /Users/User/claude/ds-v2
npm run build 2>&1
```

Expected: Clean build, no warnings.

- [ ] **Step 2: Check bundle size**

```bash
cd /Users/User/claude/ds-v2
npx size-limit 2>&1
```

Expected: Within limits (480kB JS, 25kB CSS).

- [ ] **Step 3: Build Storybook**

```bash
cd /Users/User/claude/ds-v2
npm run build-storybook 2>&1 | tail -10
```

Expected: Clean build.

- [ ] **Step 4: Verify all entry points export correctly**

```bash
cd /Users/User/claude/ds-v2
node -e "const ds = require('./dist/index.cjs'); console.log(Object.keys(ds).length + ' exports')"
node -e "const tokens = require('./dist/tokens.cjs'); console.log(Object.keys(tokens).length + ' token exports')"
```

- [ ] **Step 5: Final commit**

```bash
cd /Users/User/claude/ds-v2
git add -A
git commit -m "chore: v2 overhaul complete — all tokens, components, and stories updated"
```
