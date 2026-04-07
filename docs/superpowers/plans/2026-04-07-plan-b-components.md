# Abadikan Theme — Plan B: Components

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Install all shadcn-vue components, copy 17 custom components from abadikan/ds, and customize 5 components that need code changes (Button, Input, Badge, Alert, AlertDialog).

**Architecture:** shadcn-vue components go in `src/components/ui/`, custom components in `src/components/custom/`. Most shadcn-vue components only need CSS token override (done in Plan A). Five components need source code customization to match abadikan/ds API.

**Tech Stack:** Vue 3.4+, shadcn-vue, reka-ui, TypeScript 5.9

**Prerequisite:** Plan A must be completed first (project scaffold, tokens, utils, composables).

---

## File Structure

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `src/components/ui/*` (~47 dirs) | shadcn-vue components |
| Create | `src/components/custom/atoms/Icon/` | Icon wrapper |
| Create | `src/components/custom/atoms/Center/` | Centering utility |
| Create | `src/components/custom/atoms/Container/` | Layout container |
| Create | `src/components/custom/atoms/Stack/` | Flex layout |
| Create | `src/components/custom/atoms/VisuallyHidden/` | Screen-reader only |
| Create | `src/components/custom/molecules/*` (9 dirs) | Custom molecules |
| Create | `src/components/custom/organisms/*` (3 dirs) | Custom organisms |
| Create | `src/components/custom/index.ts` | Barrel export |
| Copy | `src/lib/icons.ts` | SVG icon strings |
| Copy | `src/lib/opticalAlign.ts` | Optical alignment utility |

---

### Task 1: Copy shared lib files

**Files:**
- Create: `src/lib/icons.ts`
- Create: `src/lib/opticalAlign.ts`

- [ ] **Step 1: Copy lib files from abadikan/ds**

```bash
cp /Users/User/claude/ds/src/lib/icons.ts src/lib/icons.ts
cp /Users/User/claude/ds/src/lib/opticalAlign.ts src/lib/opticalAlign.ts
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx vue-tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/
git commit -m "feat: add icons and opticalAlign lib files"
```

---

### Task 2: Install shadcn-vue components — batch 1 (foundational)

**Files:**
- Create: `src/components/ui/button/`
- Create: `src/components/ui/input/`
- Create: `src/components/ui/badge/`
- Create: `src/components/ui/avatar/`
- Create: `src/components/ui/separator/`
- Create: `src/components/ui/skeleton/`
- Create: `src/components/ui/switch/`
- Create: `src/components/ui/checkbox/`
- Create: `src/components/ui/radio-group/`
- Create: `src/components/ui/textarea/`
- Create: `src/components/ui/aspect-ratio/`
- Create: `src/components/ui/kbd/`

- [ ] **Step 1: Install foundational components**

```bash
npx shadcn-vue@latest add button input badge avatar separator skeleton switch checkbox radio-group textarea aspect-ratio -y
```

Note: `kbd` may not be available in shadcn-vue — check output. If not available, skip and create manually later.

- [ ] **Step 2: Verify components installed**

```bash
ls src/components/ui/
```

Expected: Directories for each installed component.

- [ ] **Step 3: Verify dev server**

```bash
npm run dev
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/
git commit -m "feat: install shadcn-vue foundational components"
```

---

### Task 3: Install shadcn-vue components — batch 2 (overlay & navigation)

**Files:**
- Create: `src/components/ui/dialog/`
- Create: `src/components/ui/alert-dialog/`
- Create: `src/components/ui/sheet/`
- Create: `src/components/ui/popover/`
- Create: `src/components/ui/tooltip/`
- Create: `src/components/ui/hover-card/`
- Create: `src/components/ui/dropdown-menu/`
- Create: `src/components/ui/command/`
- Create: `src/components/ui/breadcrumb/`
- Create: `src/components/ui/pagination/`
- Create: `src/components/ui/tabs/`

- [ ] **Step 1: Install overlay & navigation components**

```bash
npx shadcn-vue@latest add dialog alert-dialog sheet popover tooltip hover-card dropdown-menu command breadcrumb pagination tabs -y
```

- [ ] **Step 2: Verify**

```bash
npx vue-tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/
git commit -m "feat: install shadcn-vue overlay and navigation components"
```

---

### Task 4: Install shadcn-vue components — batch 3 (form & data)

**Files:**
- Create: `src/components/ui/select/`
- Create: `src/components/ui/combobox/` (or auto-complete)
- Create: `src/components/ui/date-picker/`
- Create: `src/components/ui/range-calendar/`
- Create: `src/components/ui/number-field/`
- Create: `src/components/ui/pin-input/`
- Create: `src/components/ui/slider/`
- Create: `src/components/ui/progress/`
- Create: `src/components/ui/tags-input/`
- Create: `src/components/ui/form/`
- Create: `src/components/ui/table/`
- Create: `src/components/ui/scroll-area/`

- [ ] **Step 1: Install form & data components**

```bash
npx shadcn-vue@latest add select date-picker range-calendar number-field pin-input slider progress tags-input form table scroll-area -y
```

Note: `combobox` might be part of `command` in shadcn-vue. Check available components with `npx shadcn-vue@latest add --help` or the docs.

- [ ] **Step 2: Verify**

```bash
npx vue-tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/
git commit -m "feat: install shadcn-vue form and data components"
```

---

### Task 5: Install shadcn-vue components — batch 4 (layout & feedback)

**Files:**
- Create: `src/components/ui/accordion/`
- Create: `src/components/ui/alert/`
- Create: `src/components/ui/card/`
- Create: `src/components/ui/collapsible/`
- Create: `src/components/ui/sidebar/`
- Create: `src/components/ui/stepper/`
- Create: `src/components/ui/sonner/` (toast)

- [ ] **Step 1: Install layout & feedback components**

```bash
npx shadcn-vue@latest add accordion alert card collapsible sidebar stepper sonner -y
```

- [ ] **Step 2: Verify**

```bash
npx vue-tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/
git commit -m "feat: install shadcn-vue layout and feedback components"
```

---

### Task 6: Copy custom atom components

**Files:**
- Create: `src/components/custom/atoms/Icon/Icon.vue`
- Create: `src/components/custom/atoms/Icon/index.ts`
- Create: `src/components/custom/atoms/Center/Center.vue`
- Create: `src/components/custom/atoms/Center/index.ts`
- Create: `src/components/custom/atoms/Container/Container.vue`
- Create: `src/components/custom/atoms/Container/index.ts`
- Create: `src/components/custom/atoms/Stack/Stack.vue`
- Create: `src/components/custom/atoms/Stack/index.ts`
- Create: `src/components/custom/atoms/VisuallyHidden/VisuallyHidden.vue`
- Create: `src/components/custom/atoms/VisuallyHidden/index.ts`

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p src/components/custom/atoms/{Icon,Center,Container,Stack,VisuallyHidden}
```

- [ ] **Step 2: Copy .vue and index.ts files**

```bash
# Icon
cp /Users/User/claude/ds/src/components/atoms/Icon/Icon.vue src/components/custom/atoms/Icon/
cp /Users/User/claude/ds/src/components/atoms/Icon/index.ts src/components/custom/atoms/Icon/

# Center
cp /Users/User/claude/ds/src/components/atoms/Center/Center.vue src/components/custom/atoms/Center/
cp /Users/User/claude/ds/src/components/atoms/Center/index.ts src/components/custom/atoms/Center/

# Container
cp /Users/User/claude/ds/src/components/atoms/Container/Container.vue src/components/custom/atoms/Container/
cp /Users/User/claude/ds/src/components/atoms/Container/index.ts src/components/custom/atoms/Container/

# Stack
cp /Users/User/claude/ds/src/components/atoms/Stack/Stack.vue src/components/custom/atoms/Stack/
cp /Users/User/claude/ds/src/components/atoms/Stack/index.ts src/components/custom/atoms/Stack/

# VisuallyHidden
cp /Users/User/claude/ds/src/components/atoms/VisuallyHidden/VisuallyHidden.vue src/components/custom/atoms/VisuallyHidden/
cp /Users/User/claude/ds/src/components/atoms/VisuallyHidden/index.ts src/components/custom/atoms/VisuallyHidden/
```

- [ ] **Step 3: Fix import paths in all copied files**

Search and replace in each `.vue` file:
- `from '@/lib/utils'` — keep as-is (same path in new project)
- `from '@/lib/icons'` — keep as-is
- Any cross-references to other atoms (e.g., `from '../Spinner/Spinner.vue'`) — no Spinner in custom, check if used

```bash
# Check what imports exist
grep -r "from '@/" src/components/custom/atoms/ || echo "All imports OK"
grep -r "from '\.\./" src/components/custom/atoms/ || echo "No relative imports"
```

Fix any broken imports found.

- [ ] **Step 4: Verify TypeScript**

```bash
npx vue-tsc --noEmit
```

Expected: No errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/custom/atoms/
git commit -m "feat: add custom atom components from abadikan/ds"
```

---

### Task 7: Copy custom molecule components

**Files:**
- Create: `src/components/custom/molecules/AvatarGroup/`
- Create: `src/components/custom/molecules/FileUpload/`
- Create: `src/components/custom/molecules/LanguageToggle/`
- Create: `src/components/custom/molecules/Rating/`
- Create: `src/components/custom/molecules/SearchInput/`
- Create: `src/components/custom/molecules/SegmentedControl/`
- Create: `src/components/custom/molecules/Stat/`
- Create: `src/components/custom/molecules/Tag/`
- Create: `src/components/custom/molecules/ThemeToggle/`

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p src/components/custom/molecules/{AvatarGroup,FileUpload,LanguageToggle,Rating,SearchInput,SegmentedControl,Stat,Tag,ThemeToggle}
```

- [ ] **Step 2: Copy .vue and index.ts files**

```bash
for comp in AvatarGroup FileUpload LanguageToggle Rating SearchInput SegmentedControl Stat Tag ThemeToggle; do
  cp /Users/User/claude/ds/src/components/molecules/$comp/$comp.vue src/components/custom/molecules/$comp/
  cp /Users/User/claude/ds/src/components/molecules/$comp/index.ts src/components/custom/molecules/$comp/
done
```

- [ ] **Step 3: Fix import paths**

Critical import rewiring for molecules that reference atoms/composables:

```bash
# Find all imports to fix
grep -rn "from '@/components/atoms/" src/components/custom/molecules/
grep -rn "from '@/components/molecules/" src/components/custom/molecules/
grep -rn "from '\.\./" src/components/custom/molecules/
```

Apply these replacements in each file that needs it:

| Old import | New import |
|---|---|
| `from '@/components/atoms/Avatar/Avatar.vue'` | `from '@/components/ui/avatar'` (AvatarGroup) |
| `from '@/components/atoms/Input/Input.vue'` | `from '@/components/ui/input'` (SearchInput) |
| `from '@/components/atoms/Icon/Icon.vue'` | `from '@/components/custom/atoms/Icon/Icon.vue'` |
| `from '@/components/atoms/Button/Button.vue'` | `from '@/components/ui/button'` |
| `from '@/composables/useTheme'` | `from '@/composables/useTheme'` (keep as-is) |

For **ThemeToggle**: Also verify it uses `.dark` class toggling (not just `data-theme`). The adapted `useTheme` composable handles both.

For **AvatarGroup**: The shadcn-vue `Avatar` component has a different API than abadikan/ds. Check if AvatarGroup uses the Avatar sub-components. If so, adapt the template to use shadcn-vue's `<Avatar>`, `<AvatarImage>`, `<AvatarFallback>` pattern.

For **SearchInput**: Same — shadcn-vue Input has a different API. Verify the template works or adapt it.

- [ ] **Step 4: Verify TypeScript**

```bash
npx vue-tsc --noEmit
```

Fix any remaining import errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/custom/molecules/
git commit -m "feat: add custom molecule components from abadikan/ds"
```

---

### Task 8: Copy custom organism components

**Files:**
- Create: `src/components/custom/organisms/ChatInput/`
- Create: `src/components/custom/organisms/ChatMessage/`
- Create: `src/components/custom/organisms/Navbar/`

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p src/components/custom/organisms/{ChatInput,ChatMessage,Navbar}
```

- [ ] **Step 2: Copy .vue and index.ts files**

```bash
for comp in ChatInput ChatMessage Navbar; do
  cp /Users/User/claude/ds/src/components/organisms/$comp/$comp.vue src/components/custom/organisms/$comp/
  cp /Users/User/claude/ds/src/components/organisms/$comp/index.ts src/components/custom/organisms/$comp/
done
```

- [ ] **Step 3: Fix import paths**

```bash
grep -rn "from '@/components/" src/components/custom/organisms/
```

Apply same import rewiring rules:
- Atoms that exist in shadcn-vue -> use `@/components/ui/...`
- Atoms that are custom -> use `@/components/custom/atoms/...`
- Molecules that are custom -> use `@/components/custom/molecules/...`
- Composables -> keep `@/composables/...`

- [ ] **Step 4: Verify TypeScript**

```bash
npx vue-tsc --noEmit
```

- [ ] **Step 5: Commit**

```bash
git add src/components/custom/organisms/
git commit -m "feat: add custom organism components from abadikan/ds"
```

---

### Task 9: Create custom components barrel export

**Files:**
- Create: `src/components/custom/index.ts`

- [ ] **Step 1: Create barrel export**

Create `src/components/custom/index.ts`:

```ts
// Atoms
export { default as Icon } from './atoms/Icon/Icon.vue'
export { default as Center } from './atoms/Center/Center.vue'
export { default as Container } from './atoms/Container/Container.vue'
export { default as Stack } from './atoms/Stack/Stack.vue'
export { default as VisuallyHidden } from './atoms/VisuallyHidden/VisuallyHidden.vue'

// Molecules
export { default as AvatarGroup } from './molecules/AvatarGroup/AvatarGroup.vue'
export { default as FileUpload } from './molecules/FileUpload/FileUpload.vue'
export { default as LanguageToggle } from './molecules/LanguageToggle/LanguageToggle.vue'
export { default as Rating } from './molecules/Rating/Rating.vue'
export { default as SearchInput } from './molecules/SearchInput/SearchInput.vue'
export { default as SegmentedControl } from './molecules/SegmentedControl/SegmentedControl.vue'
export { default as Stat } from './molecules/Stat/Stat.vue'
export { default as Tag } from './molecules/Tag/Tag.vue'
export { default as ThemeToggle } from './molecules/ThemeToggle/ThemeToggle.vue'

// Organisms
export { default as ChatInput } from './organisms/ChatInput/ChatInput.vue'
export { default as ChatMessage } from './organisms/ChatMessage/ChatMessage.vue'
export { default as Navbar } from './organisms/Navbar/Navbar.vue'
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx vue-tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/custom/index.ts
git commit -m "feat: add custom components barrel export"
```

---

### Task 10: Customize Button component

The shadcn-vue Button needs to match abadikan/ds Button API: 7 variants (default, primary, secondary, outline, ghost, danger, link), 5 sizes (xs, sm, md, lg, xl), loading state, iconOnly, leading/trailing slots, polymorphic `as` prop.

**Files:**
- Modify: `src/components/ui/button/Button.vue` (or wherever shadcn-vue placed it)

- [ ] **Step 1: Read the installed shadcn-vue Button**

```bash
cat src/components/ui/button/Button.vue
```

Understand the existing structure — shadcn-vue uses `class-variance-authority` (cva) for variants.

- [ ] **Step 2: Extend the Button variants**

Edit the Button's variant definition to add abadikan/ds variants. The key changes:

1. Add `primary`, `danger`, `link` variants (shadcn-vue has `default`, `destructive`, `outline`, `secondary`, `ghost`)
2. Add `xs` and `xl` sizes
3. Add `loading`, `iconOnly`, `as` props
4. Add `leading` and `trailing` slots

Map the variant colors using CSS custom properties (same approach as abadikan/ds Button):

```ts
// In the variant config, add:
// primary -> bg-primary text-primary-foreground hover:bg-[var(--color-primary-hover)]
// danger -> bg-destructive text-primary-foreground hover:bg-[var(--color-danger-hover)]
// link -> text-secondary hover:underline
```

For sizes, add to the size config:
```ts
// xs -> h-7 px-3 text-xs rounded-[max(0px,calc(var(--radius)-4px))]
// xl -> h-14 px-8 text-lg rounded-[max(0px,calc(var(--radius)-12px))]
```

Add these props:
```ts
loading?: boolean    // Shows Spinner, disables interaction
iconOnly?: boolean   // Square button for icon-only
as?: string          // Polymorphic element tag (default: 'button')
```

Add these slots to the template:
```vue
<slot name="leading" />   <!-- Before label -->
<slot />                   <!-- Label -->
<slot name="trailing" />   <!-- After label -->
```

IMPORTANT: Do NOT delete any existing shadcn-vue variant or size — only ADD new ones. The `default`, `outline`, `secondary`, `ghost` variants stay.

- [ ] **Step 3: Verify TypeScript**

```bash
npx vue-tsc --noEmit
```

- [ ] **Step 4: Verify in browser**

```bash
npm run dev
```

Test the Button in App.vue with different variants:
```vue
<Button variant="primary">Primary</Button>
<Button variant="danger">Danger</Button>
<Button variant="link">Link</Button>
<Button size="xs">XS</Button>
<Button size="xl">XL</Button>
<Button loading>Loading</Button>
```

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/button/
git commit -m "feat: extend Button with abadikan variants, sizes, loading, and slots"
```

---

### Task 11: Customize Badge component

shadcn-vue Badge needs: `success`, `warning`, `info`, `danger` variants + `badgeStyle` prop (subtle/solid/outline) + `dot` + `removable`.

**Files:**
- Modify: `src/components/ui/badge/Badge.vue`

- [ ] **Step 1: Read the installed shadcn-vue Badge**

```bash
cat src/components/ui/badge/Badge.vue
```

- [ ] **Step 2: Extend Badge variants**

Add these variants to the cva config:
```ts
// success -> bg-[var(--success)] text-[var(--success-foreground)]
// warning -> bg-[var(--warning)] text-[var(--warning-foreground)]
// info -> bg-[var(--info)] text-[var(--info-foreground)]
// danger -> bg-destructive text-primary-foreground
```

Add these props (matching abadikan/ds Badge API):
```ts
badgeStyle?: 'subtle' | 'solid' | 'outline'  // default: 'subtle'
dot?: boolean       // Show color dot indicator
removable?: boolean // Show X button
```

For `badgeStyle`, implement the 3 visual treatments:
- `subtle`: light background (`var(--color-*-light)`), colored text
- `solid`: full color background, white text
- `outline`: transparent background, colored border

Reference implementation: `/Users/User/claude/ds/src/components/atoms/Badge/Badge.vue` (already read above).

- [ ] **Step 3: Verify TypeScript**

```bash
npx vue-tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/badge/
git commit -m "feat: extend Badge with success/warning/info variants and badgeStyle prop"
```

---

### Task 12: Customize Alert component

**Files:**
- Modify: `src/components/ui/alert/Alert.vue`

- [ ] **Step 1: Read the installed shadcn-vue Alert**

```bash
cat src/components/ui/alert/Alert.vue
```

- [ ] **Step 2: Add abadikan variants**

Add `success`, `warning`, `info`, `danger` variants. Map them using the extra semantic color tokens:

```ts
// success -> icon bg-[var(--success)], uses success icon SVG
// warning -> icon bg-[var(--warning)], uses warning icon SVG
// info -> icon bg-[var(--info)], uses info icon SVG
// danger -> icon bg-destructive, uses danger icon SVG
```

Add `dismissible` prop and `dismiss` event (matching abadikan/ds Alert API).

Reference implementation: `/Users/User/claude/ds/src/components/molecules/Alert/Alert.vue`.

- [ ] **Step 3: Verify TypeScript**

```bash
npx vue-tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/alert/
git commit -m "feat: extend Alert with semantic variants and dismissible prop"
```

---

### Task 13: Verify no stale imports

- [ ] **Step 1: Check for abadikan/ds references**

```bash
grep -r "abadikan/ds" src/components/ || echo "CLEAN"
grep -r "from '\.\.\/" src/components/custom/ | grep -v node_modules || echo "No broken relative imports"
```

Expected: "CLEAN" and no broken relative imports.

- [ ] **Step 2: Check for missing imports**

```bash
npx vue-tsc --noEmit
```

Expected: Zero errors.

- [ ] **Step 3: Run dev server**

```bash
npm run dev
```

Expected: Zero errors.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: Plan B complete — all components installed and verified"
```

---

## Plan B Complete

After this plan, the project has:
- ~47 shadcn-vue components installed (token-themed via CSS from Plan A)
- 17 custom components copied from abadikan/ds with fixed imports
- Button: 7 variants, 5 sizes, loading, iconOnly, leading/trailing slots, polymorphic `as`
- Badge: 7 variants, 3 badge styles, dot, removable
- Alert: 4 semantic variants, dismissible
- All TypeScript compiling, dev server running

**Next:** Proceed to Plan C (Storybook & QA).
