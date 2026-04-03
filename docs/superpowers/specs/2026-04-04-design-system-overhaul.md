# Abadikan Design System v2 — Full Overhaul Spec

**Date:** 2026-04-04
**Approach:** Surgical Token Swap — redesign tokens first, cascade down atoms → molecules → organisms
**Repo:** Separate folder/repo for side-by-side comparison with current system

---

## 1. Spacing System (4px Grid + 2px Sub-steps)

Replaces the current 17-value irregular scale with a strict 15-token system.

### Token Definition

| Token | Value | Use case |
|-------|-------|----------|
| `--space-0` | `0px` | Reset |
| `--space-0.5` | `2px` | Micro wrapper padding, ring offset |
| `--space-1` | `4px` | Tight inline gaps (icon-to-text) |
| `--space-1.5` | `6px` | Inner wrapper padding, compact UI |
| `--space-2` | `8px` | Default inline gap, small input padding-x |
| `--space-2.5` | `10px` | Medium wrapper padding |
| `--space-3` | `12px` | Input padding-x, small card padding |
| `--space-4` | `16px` | Default component padding, gap between items |
| `--space-5` | `20px` | Medium card padding |
| `--space-6` | `24px` | Section gap, large card padding |
| `--space-8` | `32px` | Section separation |
| `--space-10` | `40px` | Major section gap |
| `--space-12` | `48px` | Page section spacing |
| `--space-16` | `64px` | Hero/page-level spacing |
| `--space-24` | `96px` | Max page-level spacing |

### Rules

- Naming: number = multiplier of 4px. `--space-3` = 3 × 4 = 12px
- `.5` suffix = 2px step between whole numbers (matches Tailwind convention)
- Sub-4px values (1px borders, dividers) use literal values, not tokens — these are visual details, not spacing decisions
- No 14px, 18px, 22px — intentionally limited to force clear decisions (Apple HIG philosophy)

---

## 2. Border Radius System

Replaces the current 7 fixed values with two shape families and a nested formula.

### Container Family (consistent radius)

| Token | Value | Use case |
|-------|-------|----------|
| `--radius-xs` | `4px` | Small nested elements (checkbox, radio) |
| `--radius-sm` | `8px` | Inputs, inner cards, dropdowns, popovers, tooltips |
| `--radius-md` | `12px` | Cards, alerts, avatars (rounded) |
| `--radius-lg` | `16px` | Modals, drawers, large cards |
| `--radius-xl` | `20px` | Hero cards, page-level containers |

### Pill Family (fully rounded)

| Token | Value | Use case |
|-------|-------|----------|
| `--radius-full` | `9999px` | Buttons, badges, tags, segmented controls, toggles, avatars (circle) |

### Nested Formula

`inner-radius = max(outer-radius - padding, radius-xs)`

Example: Card (`--radius-md: 12px`) with `--space-4: 16px` padding → inner element = `max(12 - 16, 4)` = `4px` (`--radius-xs`)

### Component-to-Radius Mapping

| Component | Radius |
|-----------|--------|
| Button | `full` (pill) |
| Badge, Tag | `full` (pill) |
| SegmentedControl | `full` (pill) |
| Toggle | `full` (pill) |
| Avatar (circle) | `full` (pill) |
| Input, Textarea, Select | `sm` |
| Dropdown, Popover, HoverCard, Tooltip | `sm` |
| Card, Alert, Avatar (rounded) | `md` |
| Modal, Drawer | `lg` |
| Checkbox, Radio | `xs` |

---

## 3. Typography System (3-Layer Architecture)

### Layer 1: Base Typography (Source of Truth)

All sizes responsive per breakpoint. All line-heights snap to 4px grid.

#### Font Families

| Token | Font | Use case |
|-------|------|----------|
| `--font-display` | Abadikan Sans | Display, headings |
| `--font-body` | Inter | Body, captions, UI text |
| `--font-mono` | JetBrains Mono | Code, pin input, technical |

#### Font Weights

| Token | Value | Use case |
|-------|-------|----------|
| `--font-normal` | `400` | Body text |
| `--font-medium` | `500` | Labels, emphasis |
| `--font-semibold` | `600` | Headings, buttons |
| `--font-bold` | `700` | Display headings, strong emphasis |

#### Display Scale (ratio ~1.5–1.618, font: Abadikan Sans)

| Token | Mobile (size/lh) | Tablet (size/lh) | Desktop (size/lh) | XLarge (size/lh) |
|-------|------------------|-------------------|---------------------|-------------------|
| `--display-lg` | `36px / 40px` | `48px / 52px` | `60px / 64px` | `72px / 76px` |
| `--display-md` | `30px / 36px` | `36px / 40px` | `48px / 52px` | `60px / 64px` |
| `--display-sm` | `24px / 32px` | `30px / 36px` | `36px / 40px` | `48px / 52px` |

#### Heading Scale (font: Abadikan Sans)

| Token | Mobile (size/lh) | Tablet (size/lh) | Desktop (size/lh) | XLarge (size/lh) |
|-------|------------------|-------------------|---------------------|-------------------|
| `--h1` | `30px / 36px` | `36px / 40px` | `48px / 52px` | `60px / 64px` |
| `--h2` | `24px / 32px` | `28px / 32px` | `32px / 36px` | `36px / 40px` |
| `--h3` | `20px / 28px` | `24px / 32px` | `24px / 32px` | `28px / 32px` |
| `--h4` | `18px / 24px` | `20px / 28px` | `20px / 28px` | `24px / 32px` |

#### Body Scale (ratio ~1.25, font: Inter)

| Token | Size | Line-height |
|-------|------|-------------|
| `--body-lg` | `18px` | `28px` |
| `--body-md` | `16px` | `24px` |
| `--body-sm` | `14px` | `20px` |

#### Caption (font: Inter)

| Token | Size | Line-height |
|-------|------|-------------|
| `--caption` | `12px` | `16px` |

### Layer 2: Component Typography Tokens (Aliases)

Each component has its own font-size token that references Layer 1. Developer never hardcodes font sizes.

```css
/* Button */
--btn-font-size-sm: var(--body-sm);    /* 14px */
--btn-font-size-md: var(--body-md);    /* 16px */
--btn-font-size-lg: var(--body-lg);    /* 18px */

/* Input */
--input-font-size-sm: var(--body-sm);
--input-font-size-md: var(--body-md);
--input-font-size-lg: var(--body-lg);

/* Badge */
--badge-font-size: var(--body-sm);

/* Card title */
--card-title-font-size: var(--h4);

/* Modal title */
--modal-title-font-size: var(--h3);
```

Single source of truth: change `--body-md` once → every component using it updates automatically.

### Layer 3: Breakpoint Overrides (Automatic)

Breakpoints defined once in `:root`. Display and Heading tokens auto-switch per viewport.

| Breakpoint | Name | Width |
|------------|------|-------|
| Mobile | `sm` | `< 640px` |
| Tablet | `md` | `≥ 640px` |
| Desktop | `lg` | `≥ 1024px` |
| XLarge | `xl` | `≥ 1440px` |

```css
@media (width < 640px)   { :root { --h1-size: 30px; --h1-leading: 36px; } }
@media (width >= 640px)  { :root { --h1-size: 36px; --h1-leading: 40px; } }
@media (width >= 1024px) { :root { --h1-size: 48px; --h1-leading: 52px; } }
@media (width >= 1440px) { :root { --h1-size: 60px; --h1-leading: 64px; } }
```

---

## 4. Optical Alignment Rules

Applied consistently across all components during the audit pass.

### Rule 1: Icon-to-Text Alignment

- Icons optically centered to text (not mathematical center)
- Icons at text-sm/text-xs need `+1px` downward nudge
- Gap: `--space-1` (4px) for sm, `--space-1.5` (6px) for md, `--space-2` (8px) for lg

### Rule 2: Button Padding (Pill Compensation)

- Horizontal padding ~1.5–2x vertical padding for optical balance
- Pill shapes need extra horizontal padding — rounded ends "eat" visual space
- Example: `padding: 8px 20px` not `8px 16px`

### Rule 3: Nested Component Spacing

- Container padding sets the baseline: card padding = `--space-4`
- Nested elements reduce: inner group gap = `--space-2` (half of container padding)
- Consistent starting point for all content within containers

### Rule 4: Text Baseline Alignment

- All text in a row aligned to baseline, not center
- Critical for: Navbar, Table rows, List items, Breadcrumbs

### Rule 5: Touch Target Minimum

- All interactive elements: minimum `36px` height
- If visual element is smaller, extend hit area via padding or pseudo-element

### Rule 6: Visual Weight Balancing

- Border/outline variants appear "smaller" than filled variants at same dimensions
- Outline buttons: `+1px` dimension compensation to match solid buttons visually
- Prevents layout shift when switching between variant states

---

## 5. Color System

**No changes.** Current system is already well-structured:

- Neutral primary for UI interactions
- Brand primary (red) as accent/brand mark
- Brand secondary (pink)
- Status colors: success, warning, danger, info
- OKLCH color space with semantic tokens for light/dark mode

---

## 6. Storybook & Developer Experience

### Interactive Docs (Priority A)

Every component gets:

1. **Overview** — description, when to use
2. **Playground** — interactive controls for all props
3. **Variants showcase** — all variant/size combinations in one visual grid
4. **Usage guidelines** — do's & don'ts with visual examples
5. **Copy-paste snippets** — ready-to-use code examples
6. **Component token reference** — list of overridable `--btn-*`, `--input-*` tokens

### Visual Testing with Chromatic (Priority B)

- Every PR gets automatic visual diff
- Stories per state: default, hover, focus, disabled, error, loading
- Comprehensive stories = automatic high visual regression coverage

### Story Structure Per Component

```
Button/
├── Button.stories.ts
│   ├── Default (playground)
│   ├── AllVariants (visual grid)
│   ├── AllSizes (visual grid)
│   ├── WithIcons
│   ├── Loading
│   └── Disabled
```

### Global Features (Built-in, Not Per-Story)

- **Dark mode:** built-in toggle via Storybook toolbar decorator — every story auto-supports light/dark
- **i18n:** 2 languages (Indonesia & English) via toolbar toggle
- **Viewport presets:** mobile, tablet, desktop, xlarge

---

## 7. Component Inventory (56 Total — Quality Focus)

No new components added. Full audit and quality improvement of all existing:

### Atoms (18)

Avatar, AspectRatio, Badge, Button, Center, Checkbox, Container, Divider, Icon, Input, KBD, Radio, Skeleton, Spinner, Stack, Textarea, Toggle, VisuallyHidden

### Molecules (36)

Accordion, Alert, AlertDialog, AvatarGroup, Breadcrumb, Card, Collapsible, Combobox, CommandPalette, DatePicker, DateRangePicker, Drawer, DropdownMenu, EmptyState, FileUpload, HoverCard, InputGroup, LanguageToggle, Modal, NumberInput, Pagination, PinInput, Popover, ProgressBar, Rating, ScrollArea, SearchInput, SegmentedControl, Select, Slider, Stat, Stepper, Tabs, Tag, TagInput, ThemeToggle, Toast, Tooltip

### Organisms (6)

ChatInput, ChatMessage, Form, Navbar, Sidebar, Table

### Per-Component Audit Checklist

Each component will be verified against:

- [ ] Uses spacing tokens (no hardcoded px values for spacing)
- [ ] Uses radius tokens (container or pill family as mapped)
- [ ] Uses typography Layer 2 tokens (component aliases)
- [ ] Optical alignment rules applied (icon-text, padding, baseline)
- [ ] Touch targets meet 36px minimum
- [ ] Visual weight balanced across variants
- [ ] Dark mode works via token inheritance
- [ ] Storybook stories comprehensive (all states, variants, sizes)
- [ ] Tests pass and cover key interactions

---

## 8. Implementation Strategy

1. **Tokens first:** Redefine spacing, radius, and typography tokens in CSS custom properties + JS exports
2. **Atoms pass:** Update all 18 atoms to consume new tokens, fix optical alignment
3. **Molecules pass:** Update all 36 molecules, verify composition with updated atoms
4. **Organisms pass:** Update all 6 organisms, verify full component trees
5. **Storybook upgrade:** Enhance stories with interactive docs, usage guidelines, token reference
6. **Visual testing:** Configure Chromatic, create comprehensive state stories
7. **Cross-cutting:** Verify dark mode, i18n, responsive typography across all components
