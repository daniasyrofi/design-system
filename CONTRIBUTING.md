# Contributing to @abadikan/ds

Thank you for contributing to the Abadikan Design System! This guide explains how to set up your environment, add or modify components, and get your changes merged.

---

## Table of Contents

1. [Stack](#stack)
2. [Local Setup](#local-setup)
3. [Project Structure](#project-structure)
4. [Adding a New Component](#adding-a-new-component)
5. [Component Checklist](#component-checklist)
6. [Tests](#tests)
7. [Storybook](#storybook)
8. [CSS Tokens Convention](#css-tokens-convention)
9. [Commit Convention](#commit-convention)
10. [Pull Request Process](#pull-request-process)

---

## Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Vue | 3.4+ | Component framework |
| TypeScript | 5.9+ | Type safety |
| Tailwind CSS | v4 | Utility classes |
| Vite | 8+ | Dev server + library build |
| Vitest | 4+ | Unit tests |
| Storybook | 10 | Component explorer |
| axe-core | 4.11+ | Accessibility auditing |

---

## Local Setup

```bash
# 1. Clone
git clone https://github.com/abadikan/ds.git
cd ds

# 2. Install
npm install

# 3. Start Storybook (component explorer)
npm run storybook

# 4. Run tests (watch mode)
npx vitest --project unit

# 5. Typecheck
npx vue-tsc --noEmit

# 6. Build library
npm run build

# 7. Check bundle size
npm run size
```

---

## Project Structure

```
src/
├── components/
│   ├── atoms/          # Primitive UI elements (Button, Input, Badge…)
│   ├── molecules/      # Composed components (Modal, Select, Toast…)
│   └── organisms/      # Complex sections (Table, Navbar, Sidebar…)
├── composables/        # Reusable Vue composables
├── stories/            # Top-level Storybook pages (Welcome, DesignTokens…)
├── styles/             # Global CSS (Tailwind config, tokens)
├── tokens/             # JS/TS token exports
├── test/               # Shared test utilities + a11y suite
├── types.ts            # All public variant/size/color types
└── index.ts            # Library entry — re-exports everything
```

---

## Adding a New Component

### 1. Choose the right category
- **Atom** — standalone, no children components (e.g. `Avatar`, `Spinner`)
- **Molecule** — composed of atoms (e.g. `Modal`, `DatePicker`)
- **Organism** — page-level section (e.g. `Navbar`, `Table`)

### 2. Scaffold the files

```
src/components/{category}/{Name}/
├── {Name}.vue          # Component implementation
├── {Name}.test.ts      # Vitest unit tests (required)
├── {Name}.stories.ts   # Storybook stories (required)
└── index.ts            # Re-export
```

### 3. Component implementation rules

```vue
<script setup lang="ts">
// ✅ Export types that consumers might need
export type MyVariant = 'primary' | 'secondary'

interface Props {
  /** JSDoc for every prop */
  variant?: MyVariant
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
})
</script>
```

- Use `defineProps` with TypeScript interface (no runtime type objects)
- Always `withDefaults` for every optional prop
- JSDoc every prop (shows in Storybook controls)
- Use `cn()` from `@/lib/utils` for conditional classes
- Reference design tokens via `var(--color-*)`, `var(--radius-*)`, `var(--space-*)`
- Add **component-level CSS override tokens** (see [CSS Tokens Convention](#css-tokens-convention))

### 4. Register the export

```ts
// src/components/{category}/index.ts
export { default as MyComponent } from './MyComponent/MyComponent.vue'
export type { MyVariant } from './MyComponent/MyComponent.vue'
```

Also add the type to `src/types.ts` for central discoverability.

---

## Component Checklist

Before submitting a PR, verify all of the following:

- [ ] **TypeScript** — all props typed, no `any`, no TS errors (`npm run build`)
- [ ] **Defaults** — all optional props have sensible defaults via `withDefaults`
- [ ] **JSDoc** — every prop documented with `/** */`
- [ ] **Tests** — at least 5 unit tests; happy path + edge cases + empty state
- [ ] **Storybook** — minimum 3 stories: Default, Playground (all controls), Dark Mode
- [ ] **a11y** — keyboard navigable, aria roles/labels correct, passes axe-core
- [ ] **CSS tokens** — component-level override vars documented in `<style>` comment
- [ ] **Export** — added to category `index.ts` and `src/types.ts`

---

## Tests

We use **Vitest** + **@vue/test-utils** + **happy-dom**.

```bash
# Run all unit tests once
npx vitest run --project unit

# Watch mode during development
npx vitest --project unit

# With coverage report
npx vitest run --project unit --coverage

# Run a single file
npx vitest run --project unit src/components/atoms/Button/Button.test.ts
```

### Coverage thresholds

| Metric     | Minimum |
|-----------|---------|
| Statements | 70% |
| Branches   | 65% |
| Functions  | 70% |
| Lines      | 70% |

CI fails if any threshold is not met.

### Accessibility tests

```bash
# Run a11y suite only
npx vitest run --project unit src/test/a11y.test.ts
```

Add new components to `src/test/a11y.test.ts` following the existing pattern.

---

## Storybook

```bash
npm run storybook           # Start on :6006
npm run build-storybook     # Production build
```

Story naming convention:
```ts
const meta: Meta<typeof MyComponent> = {
  title: 'Atoms/MyComponent',   // or Molecules / Organisms
  component: MyComponent,
  parameters: { layout: 'centered' },
  argTypes: { /* controls */ },
}
```

Every story file should export at minimum:
- `Default` — most common usage
- `Playground` — all props wired to Storybook controls

---

## CSS Tokens Convention

Use **component-level CSS override tokens** so consumers can customize appearance without modifying global theme variables:

```vue
<style scoped>
/*
 * Component-level CSS override tokens:
 * --mycomp-bg      default: var(--color-surface)
 * --mycomp-border  default: var(--color-border)
 * --mycomp-text    default: var(--color-text-primary)
 */
.ds-mycomp {
  background-color: var(--mycomp-bg, var(--color-surface));
  border-color: var(--mycomp-border, var(--color-border));
  color: var(--mycomp-text, var(--color-text-primary));
}
</style>
```

For computed inline styles (variant-driven components):

```ts
const style = computed(() => ({
  backgroundColor: `var(--mycomp-bg, ${variantColor})`,
}))
```

Consumers can then override per-instance:
```html
<MyComp style="--mycomp-bg: purple; --mycomp-text: white;" />
```

Or globally via CSS:
```css
:root { --mycomp-bg: purple; }
```

---

## Commit Convention

We follow **Conventional Commits**:

```
type(scope): short description

feat(Button): add `icon-only` prop
fix(Input): clear button now emits clear event
docs(Table): add virtual scroll example to story
refactor(Modal): extract focus trap to composable
test(Toggle): add a11y axe-core test
```

Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `ci`

---

## Pull Request Process

1. **Branch** from `develop`: `git checkout -b feat/my-feature`
2. **Implement** following the [component checklist](#component-checklist)
3. **Test**: `npx vitest run --project unit --coverage`
4. **Typecheck**: `npx vue-tsc --noEmit`
5. **Size check**: `npm run size`
6. **Open PR** against `develop` with a clear description
7. All CI checks must pass (typecheck, unit, a11y, build, size)
8. Request review from a maintainer

---

Questions? Open a GitHub Discussion or ping `@abadikan/ds-maintainers`.
