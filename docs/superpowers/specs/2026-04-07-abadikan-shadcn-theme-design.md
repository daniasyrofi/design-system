# Abadikan Theme for shadcn-vue — Design Spec v2.1

Date: 2026-04-07 | Version: 2.1 | Status: Final Draft

---

## Changelog v2.0 ke v2.1

| No | Perubahan |
|---|---|
| 1 | Fix: duration token names sesuai actual (8 values, bukan 4) |
| 2 | Fix: Abadikan Sans source = base64 embedded, bukan local file |
| 3 | Fix: transition classes = 6 (tambah ds-slide-down, ds-collapse) |
| 4 | Fix: z-index = 9 levels, bukan 10 |
| 5 | Fix: chart-3/4/5 diisi actual OKLCH values |
| 6 | Fix: dark mode selector = `.dark` + `[data-theme='dark']` + `.sb-main-dark` |
| 7 | Add: scope split recommendation — 3 independent plans |

---

## 1. Prinsip

1. Repo abadikan/ds TIDAK dimodifikasi — semua pekerjaan di repo baru
2. shadcn-vue adalah base — accessibility via reka-ui TIDAK di-override
3. Design tokens dari abadikan/ds adalah source of truth — shadcn-vue values di-override
4. Semua komponen editable — developer bisa edit langsung di project
5. Zero runtime dependency ke abadikan/ds — semua di-copy/inline
6. Setiap fase punya checkpoint — npm run dev, vue-tsc, visual check

---

## 2. Arsitektur

```
abadikan-theme/
├── src/
│   ├── assets/
│   │   ├── index.css                 <- Tailwind v4 + token overrides
│   │   └── fonts.css                 <- @font-face declarations (base64 embedded)
│   ├── components/
│   │   ├── ui/                       <- shadcn-vue (di-theme Abadikan)
│   │   │   ├── accordion/
│   │   │   ├── button/
│   │   │   └── ... (~47 components)
│   │   └── custom/                   <- Eksklusif abadikan/ds
│   │       ├── atoms/
│   │       │   ├── Icon/
│   │       │   ├── Center/
│   │       │   ├── Container/
│   │       │   ├── Stack/
│   │       │   └── VisuallyHidden/
│   │       ├── molecules/
│   │       │   ├── AvatarGroup/
│   │       │   ├── FileUpload/
│   │       │   ├── LanguageToggle/
│   │       │   ├── Rating/
│   │       │   ├── SearchInput/
│   │       │   ├── SegmentedControl/
│   │       │   ├── Stat/
│   │       │   ├── Tag/
│   │       │   └── ThemeToggle/
│   │       ├── organisms/
│   │       │   ├── ChatInput/
│   │       │   ├── ChatMessage/
│   │       │   └── Navbar/
│   │       └── index.ts
│   ├── composables/
│   │   ├── useTheme.ts
│   │   ├── useClickOutside.ts
│   │   ├── useFocusTrap.ts
│   │   ├── useSpacing.ts
│   │   ├── useFormField.ts
│   │   ├── useVirtualList.ts
│   │   ├── useInvitationTheme.ts
│   │   └── createTheme.ts
│   ├── tokens/
│   │   ├── colors.ts
│   │   ├── semantic.ts
│   │   └── index.ts
│   ├── lib/
│   │   └── utils.ts                  <- cn() = clsx + tailwind-merge
│   └── transitions/
│       └── index.css                 <- ds-fade, ds-slide-up, ds-slide-down, ds-scale, ds-collapse, ds-toast
├── .storybook/
│   ├── main.ts
│   ├── preview.ts
│   └── theme.ts
├── components.json
├── package.json
├── vite.config.ts
├── tsconfig.json
├── MIGRATION-MAP.md
└── README.md
```

---

## 3. Tech Stack (Pinned Versions)

Diambil dari `npm ls` di repo abadikan/ds — versi yang sudah proven:

| Layer | Teknologi | Versi |
|---|---|---|
| Framework | Vue 3 (Composition API + script setup) | ^3.4.0 |
| Language | TypeScript | ~5.9.3 |
| Styling | Tailwind CSS v4 + @tailwindcss/vite | ^4.2.2 |
| Components | shadcn-vue | latest at init |
| Primitives | reka-ui | ^2.x.x |
| Class merge | clsx + tailwind-merge | ^2.1.1 / ^3.x.x |
| Icons | @remixicon/vue | ^4.9.0 |
| Fonts | Inter (^5.2.8), JetBrains Mono (^5.2.8), Abadikan Sans (base64 embed) | - |
| Build | Vite | ^8.0.1 |
| Docs | Storybook | ^10.3.3 |
| Storybook addons | addon-docs, addon-a11y, storybook-dark-mode | ^10.3.3 / ^5.0.0 |
| Testing | Vitest ^4.1.2 + Playwright ^1.58.2 | - |

---

## 4. Token Mapping

SOURCE OF TRUTH: File `src/styles/tokens.css` di repo abadikan/ds. Semua nilai OKLCH di tabel ini adalah REFERENSI. Developer WAJIB cross-check dengan file sumber. Jika ada perbedaan, file tokens.css yang menang.

### 4.1 Semantic Colors — Light Mode

| shadcn-vue var | Abadikan source | Nilai (referensi) |
|---|---|---|
| --background | --color-bg | oklch(0.98 0.005 80) |
| --foreground | --color-text-primary | oklch(0.4 0.01 80) |
| --card | --color-surface | #ffffff |
| --card-foreground | --color-text-primary | oklch(0.4 0.01 80) |
| --popover | --color-surface-overlay | #ffffff |
| --popover-foreground | --color-text-primary | oklch(0.4 0.01 80) |
| --primary | --color-primary | oklch(0.55 0.22 18) |
| --primary-foreground | --color-text-inverse | #ffffff |
| --secondary | --color-secondary | oklch(0.60 0.18 350) |
| --secondary-foreground | --color-text-inverse | #ffffff |
| --muted | --color-bg-subtle | oklch(0.95 0.008 80) |
| --muted-foreground | --color-text-secondary | oklch(0.65 0.01 80) |
| --accent | --color-neutral-light | oklch(0.95 0.008 80) |
| --accent-foreground | --color-text-heading | oklch(0.2 0.01 80) |
| --destructive | --color-danger | oklch(0.6 0.22 28) |
| --border | --color-border | oklch(0.9 0.01 80) |
| --input | --color-border | oklch(0.9 0.01 80) |
| --ring | --color-primary | oklch(0.55 0.22 18) |
| --radius | --radius-2xl | 20px (VALIDASI: mungkin terlalu bulat, coba 12-16px) |

### 4.2 Semantic Colors — Dark Mode

| shadcn-vue var | Abadikan source | Nilai (referensi) |
|---|---|---|
| --background | dark --color-bg | oklch(0.15 0.005 80) |
| --foreground | dark --color-text-primary | oklch(0.9 0.005 80) |
| --card | dark --color-surface | oklch(0.2 0.008 80) |
| --card-foreground | dark --color-text-primary | oklch(0.9 0.005 80) |
| --popover | dark --color-surface-overlay | oklch(0.22 0.008 80) |
| --popover-foreground | dark --color-text-primary | oklch(0.9 0.005 80) |
| --primary | dark --color-primary | oklch(0.65 0.2 18) |
| --primary-foreground | dark --color-text-inverse | oklch(0.15 0.005 80) |
| --secondary | dark --color-secondary | oklch(0.68 0.16 350) |
| --secondary-foreground | dark --color-text-inverse | oklch(0.15 0.005 80) |
| --muted | dark --color-bg-subtle | oklch(0.18 0.006 80) |
| --muted-foreground | dark --color-text-secondary | oklch(0.7 0.005 80) |
| --accent | dark --color-neutral-light | oklch(0.25 0.008 80) |
| --accent-foreground | dark --color-text-heading | oklch(0.96 0.005 80) |
| --destructive | dark --color-danger | oklch(0.6 0.22 28) |
| --border | dark --color-border | oklch(0.3 0.01 80) |
| --input | dark --color-border | oklch(0.3 0.01 80) |
| --ring | dark --color-primary | oklch(0.65 0.2 18) |

### 4.3 Sidebar Variables

| shadcn-vue var | Light | Dark |
|---|---|---|
| --sidebar | #ffffff | oklch(0.2 0.008 80) |
| --sidebar-foreground | oklch(0.4 0.01 80) | oklch(0.9 0.005 80) |
| --sidebar-primary | oklch(0.55 0.22 18) | oklch(0.65 0.2 18) |
| --sidebar-primary-foreground | #ffffff | oklch(0.15 0.005 80) |
| --sidebar-accent | oklch(0.95 0.008 80) | oklch(0.25 0.008 80) |
| --sidebar-accent-foreground | oklch(0.2 0.01 80) | oklch(0.96 0.005 80) |
| --sidebar-border | oklch(0.9 0.01 80) | oklch(0.3 0.01 80) |
| --sidebar-ring | oklch(0.55 0.22 18) | oklch(0.65 0.2 18) |

### 4.4 Chart Variables

| shadcn-vue var | Light | Dark |
|---|---|---|
| --chart-1 | oklch(0.55 0.22 18) | oklch(0.65 0.2 18) |
| --chart-2 | oklch(0.60 0.18 350) | oklch(0.68 0.16 350) |
| --chart-3 | oklch(0.65 0.12 240) | oklch(0.65 0.12 240) |
| --chart-4 | oklch(0.65 0.17 145) | oklch(0.65 0.17 145) |
| --chart-5 | oklch(0.75 0.15 75) | oklch(0.75 0.15 75) |

### 4.5 Extra Semantic Colors (shadcn-vue tidak punya)

```css
:root {
  --success: oklch(0.65 0.17 145);
  --success-foreground: #ffffff;
  --warning: oklch(0.75 0.15 75);
  --warning-foreground: oklch(0.2 0.01 80);
  --info: oklch(0.65 0.12 240);
  --info-foreground: #ffffff;
}

.dark, [data-theme='dark'] {
  --success: oklch(0.65 0.17 145);
  --success-foreground: oklch(0.15 0.005 80);
  --warning: oklch(0.75 0.15 75);
  --warning-foreground: oklch(0.15 0.005 80);
  --info: oklch(0.65 0.12 240);
  --info-foreground: oklch(0.15 0.005 80);
}

@theme inline {
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);
}
```

### 4.6 Additional Tokens (shadcn-vue tidak punya)

| Kategori | Token | Detail |
|---|---|---|
| Spacing | --space-0 s/d --space-24 | 0-96px (4px base grid) |
| Shadows | --shadow-xs s/d --shadow-2xl | + --shadow-inset, --shadow-highlight |
| Elevation | --elevation-0 s/d --elevation-4 | 5 levels (flat, raised, floating, dialog, notification) |
| Motion duration | --duration-instant, --duration-fast, --duration-normal, --duration-slow, --duration-enter, --duration-exit, --duration-expand, --duration-page | 8 values: 50ms-400ms |
| Motion easing | --ease-default, --ease-in, --ease-out, --ease-spring, --ease-bounce, --ease-sharp | 6 curves |
| Typography | --font-display, --font-ui, --font-mono | 3 families |
| Font sizes | --font-size-2xs s/d --font-size-5xl | from tokens/semantic.ts |
| Z-index | --z-base, --z-raised, --z-dropdown, --z-sticky, --z-overlay, --z-modal, --z-popover, --z-toast, --z-tooltip | 9 levels |
| Glass | --color-surface-glass, --glass-border, --glass-blur | Glassmorphism tokens |

---

## 5. Strategi per Komponen

### 5.1 Pakai shadcn-vue + theme override — 47 komponen

**Token-only (hanya perlu CSS override, TIDAK perlu edit kode):**

Checkbox, Radio, Toggle, Avatar, Skeleton, Spinner, Divider, KBD, Textarea, AspectRatio,
Accordion, Breadcrumb, Card, Collapsible, Combobox, CommandPalette, DatePicker,
DateRangePicker, Drawer, DropdownMenu, EmptyState, HoverCard, InputGroup, Modal,
NumberInput, Pagination, PinInput, Popover, ProgressBar, ScrollArea, Select, Slider,
Stepper, Tabs, TagInput, Toast (sonner), Tooltip, Form, Sidebar, Table

**Perlu edit kode (custom variants/sizes/slots):**

| Komponen | shadcn-vue base | Customisasi kode |
|---|---|---|
| Button | button | +variants: primary, secondary, danger, link; +sizes: xs, xl; +loading, iconOnly, leading/trailing slots, polymorphic `as` prop |
| Input | input | +focus ring Abadikan, +error state styling |
| Badge | badge | +variants: success, warning, info, danger |
| Alert | alert | +variants: success, warning, info, danger |
| AlertDialog | alert-dialog | +motion ds-scale |

### 5.2 Copy dari abadikan/ds — 17 komponen

| Komponen | Tipe | Copy strategy |
|---|---|---|
| Icon | atom | Copy .vue + fix imports |
| Center | atom | Copy .vue + fix imports |
| Container | atom | Copy .vue + fix imports |
| Stack | atom | Copy .vue + fix imports |
| VisuallyHidden | atom | Copy .vue + fix imports |
| AvatarGroup | molecule | Copy .vue, ganti Avatar import ke shadcn-vue |
| FileUpload | molecule | Copy .vue + fix imports |
| LanguageToggle | molecule | Copy .vue + fix imports, cek vue-i18n dependency |
| Rating | molecule | Copy .vue + fix imports |
| SearchInput | molecule | Copy .vue, ganti Input import ke shadcn-vue |
| SegmentedControl | molecule | Copy .vue + fix imports |
| Stat | molecule | Copy .vue + fix imports |
| Tag | molecule | Copy .vue + fix imports |
| ThemeToggle | molecule | Copy .vue, sesuaikan ke class dark convention |
| ChatInput | organism | Copy .vue + fix imports |
| ChatMessage | organism | Copy .vue + fix imports |
| Navbar | organism | Copy .vue + fix imports |

**Import fix rules:**
- `from 'abadikan/ds/atoms/Button'` -> `from '@/components/ui/button'`
- `from '../atoms/Icon'` -> `from '@/components/custom/atoms/Icon'`
- `from '../../composables/useTheme'` -> `from '@/composables/useTheme'`

---

## 6. Animation Strategy — Hybrid

| Konteks | Sumber animasi | Alasan |
|---|---|---|
| shadcn-vue komponen | reka-ui + Tailwind animate | Sudah battle-tested |
| Custom komponen | Vue transition classes (ds-*) | Sudah proven |
| Shimmer, loading | Token Abadikan (--duration-*, --ease-*) | Konsistensi visual |

**6 Vue transition classes** di-copy dari abadikan/ds `src/styles/globals.css`:
- `ds-fade` — opacity fade
- `ds-slide-up` — menus, dropdowns, popovers
- `ds-slide-down` — from top
- `ds-scale` — modals, dialogs
- `ds-collapse` — accordion, collapsible
- `ds-toast` — toast slide-in from right

**6 keyframe animations:**
- `shimmer`, `fadeIn`, `typingBounce`, `shake`, `scaleIn`, `slideDown`

---

## 7. Font Strategy

| Font | Fungsi | Source | CSS var |
|---|---|---|---|
| Inter | UI text, body | @fontsource/inter ^5.2.8 | --font-ui |
| JetBrains Mono | Code, monospace | @fontsource/jetbrains-mono ^5.2.8 | --font-mono |
| Abadikan Sans | Display, headings | Base64 embedded di fonts.css (copy dari abadikan/ds) | --font-display |

---

## 8. Dark Mode

- Selector: `.dark` class di `<html>` (shadcn-vue convention)
- CSS juga support `[data-theme='dark']` untuk backwards compat
- `useTheme` composable: `document.documentElement.classList.toggle('dark')`
- Persist: localStorage key `'theme'`
- System preference: `prefers-color-scheme: dark` sebagai default

---

## 9. Class Merge Convention

```ts
// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Aturan wajib** untuk SETIAP komponen:
```vue
<!-- BENAR -->
<button :class="cn('bg-primary text-primary-foreground', props.class)">

<!-- SALAH -->
<button :class="['bg-primary text-primary-foreground', props.class]">
```

---

## 10. Storybook Strategy

| Tipe komponen | Story strategy |
|---|---|
| shadcn-vue components | Tulis stories baru (API berbeda dari abadikan/ds) |
| Custom components | Copy dari abadikan/ds, fix import paths |

Setiap story menampilkan: all variants, all sizes, default/hover/disabled/loading, light + dark mode.

**Config copy dari abadikan/ds:**
- `.storybook/main.ts` — adjust stories path
- `.storybook/preview.ts` — dark mode, locale, viewport decorators
- `.storybook/theme.ts` — Abadikan branding (colors, fonts)

---

## 11. Validation Checklist

Sebelum selesai, semua harus pass:

- [ ] `npm run dev` — zero errors
- [ ] `npx vue-tsc --noEmit` — zero type errors
- [ ] `npm run build` — zero errors
- [ ] Visual: setiap komponen match Storybook abadikan/ds
- [ ] Dark mode: semua komponen correct light dan dark
- [ ] Keyboard: semua komponen interaktif accessible via keyboard
- [ ] Focus visible: terlihat saat keyboard navigation
- [ ] Reduced motion: animasi disabled saat prefers-reduced-motion
- [ ] Import check: `grep -r "abadikan/ds" src/components/` returns empty
- [ ] Console: zero warnings, zero errors
- [ ] Storybook: `npm run storybook` berjalan tanpa error

---

## 12. Batasan dan Risiko

| Batasan | Mitigasi |
|---|---|
| Repo abadikan/ds TIDAK dimodifikasi | Semua di repo baru |
| Zero runtime dependency | Semua di-copy/inline |
| shadcn-vue vars TIDAK dihapus | Hanya override values |
| reka-ui accessibility TIDAK di-override | Custom hanya visual |
| Token values bisa outdated | Cross-check tokens.css sebelum implementasi |
| radius 20px mungkin terlalu bulat | Validasi visual, turunkan ke 12-16px jika perlu |
| LanguageToggle butuh vue-i18n | Install sebagai optional peer dep |

---

## Scope Split Recommendation

Spec ini mencakup 3 subsistem independen yang masing-masing bisa di-test sendiri:

1. **Plan A: Foundation** — Project setup, tokens CSS, fonts, transitions, composables, utils
2. **Plan B: Components** — shadcn-vue install + custom components + code customizations
3. **Plan C: Storybook & QA** — Storybook config, stories, validation checklist
