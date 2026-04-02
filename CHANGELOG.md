# Changelog

All notable changes to `@abadikan/ds` are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project adheres to [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### Added
- **Advanced Data Table** — `Table` component now supports:
  - `filterBy` prop — global real-time filter (case-insensitive, respects `filterable: false`)
  - Client-side sorting — rows sorted internally via computed, sort event still emitted
  - Virtual scrolling — `virtual`, `rowHeight`, `containerHeight` props; backed by new `useVirtualList` composable
  - Exported types: `TableColumn`, `TableSortDirection`
- **Central TypeScript types** (`src/types.ts`) — 30+ public variant/size/color types now importable directly from `@abadikan/ds`
  - `ButtonVariant`, `ButtonSize`, `BadgeVariant`, `BadgeSize`, `BadgeStyle`
  - `AvatarSize`, `AvatarShape`, `AvatarStatus`
  - `InputType`, `InputSize`, `CheckboxSize`, `CheckboxColor`
  - `ModalSize`, `DrawerPlacement`, `DrawerSize`
  - `TagVariant`, `TagSize`, `ProgressBarVariant`, `ProgressBarSize`
  - `TooltipPlacement`, `BreadcrumbSeparator`, and more
- **Bundle size monitoring** — `size-limit` with limits: JS ≤ 100 kB, CSS ≤ 30 kB; `npm run size`; CI job added
- **Design Token Storybook story** — `Foundation/Design Tokens` page showing all color, spacing, radius, shadow tokens and component override tokens
- **Component-level CSS override tokens** — consumers can now override per-instance without touching global theme:
  - `Button` — `--btn-bg`, `--btn-text`, `--btn-border`, `--btn-hover-bg`
  - `Input` — `--input-bg`, `--input-border`, `--input-text`, `--input-placeholder`, `--input-border-focus`, `--input-border-error`
  - `Badge` — `--badge-bg`, `--badge-text`, `--badge-border`
  - `Card` — `--card-bg`, `--card-border`, `--card-shadow`
  - `Tag` — `--tag-bg`, `--tag-text`, `--tag-border`
  - `Toggle` — `--toggle-bg-on`, `--toggle-bg-off`, `--toggle-thumb`
  - `ProgressBar` — `--progress-fill`, `--progress-track`
- **CONTRIBUTING.md** — full contributor guide
- **useVirtualList** composable — windowed list rendering for large datasets

### Changed
- Coverage config: `all: true` — untested files now counted toward coverage thresholds
- CI: `coverage` artifact always uploaded (including on test failure)

---

## [0.1.0] — 2026-01-15

### Added

#### Components (46 total)

**Atoms (12)**
- `Avatar` — circular/rounded/square, 6 sizes, status indicators
- `Badge` — 7 variants × 3 styles (subtle/solid/outline), dot mode, removable
- `Button` — 7 variants, 5 sizes, loading state, icon-only, polymorphic (`as` prop)
- `Checkbox` — indeterminate support, 4 colors, 3 sizes
- `Divider` — horizontal/vertical, solid/dashed/dotted, label slot
- `Icon` — remixicon wrapper, 5 sizes
- `Input` — all HTML input types, password toggle, clearable, counter, prefix/suffix/leading/trailing slots
- `Radio` — 4 colors, 3 sizes, fully accessible
- `Skeleton` — text/circular/rectangular/rounded variants, animated
- `Spinner` — 5 sizes, custom color
- `Textarea` — resize control, counter, auto-height
- `Toggle` — 4 colors, 3 sizes, aria-checked

**Molecules (28)**
- `Accordion` / `AccordionItem` — single/multiple open, smooth animation
- `Alert` — 4 variants, 2 sizes, dismissible, icon + action slots
- `AvatarGroup` — stacked avatars, overflow badge, sizing
- `Breadcrumb` — 3 separator styles, custom item slot
- `Card` — 5 variants, 4 padding sizes, hoverable/clickable
- `Combobox` — searchable, multi-select, async-ready
- `CommandPalette` — Cmd+K, group headings, keyboard navigation, fuzzy filter
- `DatePicker` — keyboard navigation, locale-aware, min/max date
- `DateRangePicker` — dual calendar, `DateRange` type exported
- `Drawer` — 4 placements, 5 sizes, focus trap
- `DropdownMenu` — sub-menus, icons, keyboard nav, `DropdownMenuItem` type exported
- `FileUpload` — drag-and-drop, multi-file, accept filter, progress
- `InputGroup` — addon slots, validation state
- `LanguageToggle` — locale switcher integrated with vue-i18n
- `Modal` — 5 sizes, scroll inside/outside, focus trap, a11y
- `NumberInput` — min/max/step, stepper buttons
- `Pagination` — page range, ellipsis, keyboard
- `Popover` — 4 placements, click/hover/manual trigger
- `ProgressBar` — 5 variants, 3 sizes, indeterminate
- `SearchInput` — debounce prop, clear button, size variants
- `Select` — compound components (Trigger/Content/Item/Group/Separator), multi-select, search, loading
- `Slider` — min/max/step, range mode, custom thumb
- `Stepper` — horizontal/vertical, clickable steps
- `Tabs` — 3 variants, horizontal/vertical, keyboard navigation
- `Tag` — 7 variants, removable, clickable
- `ThemeToggle` — light/dark/system
- `Toast` / `ToastContainer` + `useToast` composable
- `Tooltip` — 4 placements, hover/click/focus trigger

**Organisms (6)**
- `ChatInput` — auto-resize textarea, file attach, send button
- `ChatMessage` — avatar, timestamp, actions, code block highlight
- `Form` — validation, error display, native submit
- `Navbar` — logo, nav links, actions, mobile menu
- `Sidebar` — collapsible, nested items, active state
- `Table` — sortable columns, row selection, sticky header, loading, custom cell slots

#### Testing
- 599 unit tests across 48 files — 100% component coverage
- axe-core 4.11.1 WCAG 2.1 AA audit for all key components

#### CI/CD
- `.github/workflows/ci.yml` — typecheck, unit tests + coverage, a11y, build, Storybook build
- `.github/workflows/chromatic.yml` — visual regression via Chromatic (TurboSnap)

#### Design Tokens
- Tier 1: primitive OKLCH colors
- Tier 2: semantic CSS custom properties (light + dark mode)
- JS token exports: `colors`, `spacing`, `radii`, `shadows`, `duration`, `fonts`, `zIndex`

---

[Unreleased]: https://github.com/abadikan/ds/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/abadikan/ds/releases/tag/v0.1.0
