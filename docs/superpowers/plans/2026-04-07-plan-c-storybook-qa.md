# Abadikan Theme — Plan C: Storybook & QA

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Set up Storybook with Abadikan branding, write stories for key components, and run the full validation checklist.

**Architecture:** Storybook 10 with dark mode addon. Stories written for shadcn-vue components (new) and custom components (copied from abadikan/ds with import fixes). Final QA runs all validation checks.

**Tech Stack:** Storybook 10, @storybook/vue3-vite, storybook-dark-mode, addon-a11y, addon-docs

**Prerequisite:** Plans A and B must be completed first.

---

## File Structure

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `.storybook/main.ts` | Storybook config |
| Create | `.storybook/preview.ts` | Decorators, dark mode, viewport |
| Create | `.storybook/theme.ts` | Abadikan branded theme |
| Create | `src/stories/Button.stories.ts` | Button stories (shadcn-vue customized) |
| Create | `src/stories/Badge.stories.ts` | Badge stories |
| Create | `src/stories/Alert.stories.ts` | Alert stories |
| Create | `src/stories/Input.stories.ts` | Input stories |
| Copy | `src/stories/*.stories.ts` | Custom component stories from abadikan/ds |

---

### Task 1: Install Storybook dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install Storybook and addons**

```bash
npx storybook@latest init --type vue3-vite --skip-install
npm install -D @storybook/vue3-vite @storybook/addon-docs @storybook/addon-a11y storybook-dark-mode
```

Note: If `storybook init` creates config files, we'll overwrite them in the next tasks.

- [ ] **Step 2: Verify install**

```bash
npm ls @storybook/vue3-vite storybook-dark-mode @storybook/addon-a11y
```

Expected: All packages listed.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install Storybook dependencies"
```

---

### Task 2: Create Storybook theme file

**Files:**
- Create: `.storybook/theme.ts`

- [ ] **Step 1: Create .storybook/theme.ts**

```ts
import { create } from 'storybook/theming/create'

export const lightTheme = create({
  base: 'light',
  brandTitle: 'Abadikan Design System',
  brandUrl: '/',

  colorPrimary: '#E53A71',
  colorSecondary: '#E53A71',

  appBg: '#FCFAF9',
  appContentBg: '#FFFFFF',
  appPreviewBg: '#FFFFFF',
  appBorderColor: '#EBE8E0',
  appBorderRadius: 8,

  fontBase: '"Abadikan Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontCode: '"JetBrains Mono", "SF Mono", monospace',

  textColor: '#2E3029',
  textInverseColor: '#FFFFFF',
  textMutedColor: '#808578',

  barTextColor: '#808578',
  barSelectedColor: '#E53A71',
  barHoverColor: '#E53A71',
  barBg: '#FFFFFF',

  inputBg: '#FFFFFF',
  inputBorder: '#EBE8E0',
  inputTextColor: '#2E3029',
  inputBorderRadius: 6,

  booleanBg: '#EBE8E0',
  booleanSelectedBg: '#E53A71',

  buttonBg: '#FCFAF9',
  buttonBorder: '#EBE8E0',
})

export const darkTheme = create({
  base: 'dark',
  brandTitle: 'Abadikan Design System',
  brandUrl: '/',

  colorPrimary: '#FF7396',
  colorSecondary: '#FF7396',

  appBg: '#22231F',
  appContentBg: '#1C1C1A',
  appPreviewBg: '#1C1C1A',
  appBorderColor: '#3A3C34',
  appBorderRadius: 8,

  fontBase: '"Abadikan Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontCode: '"JetBrains Mono", "SF Mono", monospace',

  textColor: '#F2F2F2',
  textInverseColor: '#22231F',
  textMutedColor: '#FFFFFF',

  barTextColor: '#FFFFFF',
  barSelectedColor: '#FF7396',
  barHoverColor: '#FF7396',
  barBg: '#1C1C1A',

  inputBg: '#22231F',
  inputBorder: '#3A3C34',
  inputTextColor: '#F2F2F2',
  inputBorderRadius: 6,

  booleanBg: '#3A3C34',
  booleanSelectedBg: '#FF7396',

  buttonBg: '#22231F',
  buttonBorder: '#3A3C34',
})
```

- [ ] **Step 2: Commit**

```bash
git add .storybook/theme.ts
git commit -m "feat: add Storybook Abadikan brand theme"
```

---

### Task 3: Create Storybook main config

**Files:**
- Create: `.storybook/main.ts`

- [ ] **Step 1: Create .storybook/main.ts**

```ts
import type { StorybookConfig } from '@storybook/vue3-vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  staticDirs: ['../public'],
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    'storybook-dark-mode',
  ],
  framework: '@storybook/vue3-vite',
  docs: {
    autodocs: 'tag',
  },
  viteFinal: async (config) => {
    const { mergeConfig } = await import('vite')
    const tailwindcss = (await import('@tailwindcss/vite')).default
    return mergeConfig(config, {
      plugins: [tailwindcss()],
      resolve: {
        alias: {
          '@': path.resolve(dirname, '../src'),
        },
      },
    })
  },
}

export default config
```

- [ ] **Step 2: Commit**

```bash
git add .storybook/main.ts
git commit -m "feat: add Storybook main config"
```

---

### Task 4: Create Storybook preview config

**Files:**
- Create: `.storybook/preview.ts`

- [ ] **Step 1: Create .storybook/preview.ts**

Note: Simplified from abadikan/ds — no i18n setup (LanguageToggle is optional).

```ts
import type { Preview } from '@storybook/vue3-vite'
import { addons } from 'storybook/preview-api'
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode'
import { lightTheme, darkTheme } from './theme'
import '../src/assets/index.css'

type ThemeMode = 'light' | 'dark'

const applyThemeMode = (theme: ThemeMode) => {
  const el = document.documentElement
  el.classList.toggle('dark', theme === 'dark')
  el.setAttribute('data-theme', theme)
  if (document.body) {
    document.body.setAttribute('data-theme', theme)
  }
}

const channel = addons.getChannel()
channel.on(DARK_MODE_EVENT_NAME, (isDark: boolean) => {
  applyThemeMode(isDark ? 'dark' : 'light')
})
applyThemeMode('light')

const preview: Preview = {
  decorators: [
    (story) => {
      return {
        template: '<story />',
      }
    },
  ],

  parameters: {
    darkMode: {
      dark: darkTheme,
      light: lightTheme,
      stylePreview: true,
    },
    viewport: {
      viewports: {
        phonePortrait: {
          name: 'Phone Portrait',
          styles: { width: '375px', height: '812px' },
        },
        phoneLandscape: {
          name: 'Phone Landscape',
          styles: { width: '812px', height: '375px' },
        },
        tabletPortrait: {
          name: 'Tablet Portrait',
          styles: { width: '768px', height: '1024px' },
        },
        tabletLandscape: {
          name: 'Tablet Landscape',
          styles: { width: '1024px', height: '768px' },
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1280px', height: '800px' },
        },
        desktopLarge: {
          name: 'Desktop Large',
          styles: { width: '1536px', height: '960px' },
        },
      },
    },
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'padded',
  },
}

export default preview
```

- [ ] **Step 2: Verify Storybook starts**

```bash
npm run storybook
```

Expected: Storybook opens in browser with Abadikan branding. Dark mode toggle works.

- [ ] **Step 3: Commit**

```bash
git add .storybook/preview.ts
git commit -m "feat: add Storybook preview config with dark mode"
```

---

### Task 5: Write Button stories

**Files:**
- Create: `src/stories/Button.stories.ts`

- [ ] **Step 1: Create Button.stories.ts**

```ts
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Button } from '@/components/ui/button'
import { RiSearchLine, RiArrowRightLine } from '@remixicon/vue'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'outline', 'ghost', 'danger', 'link'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const AllVariants: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex flex-wrap items-center gap-3">
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
      <div class="flex flex-wrap items-center gap-3">
        <Button variant="primary" size="xs">XS</Button>
        <Button variant="primary" size="sm">SM</Button>
        <Button variant="primary" size="md">MD</Button>
        <Button variant="primary" size="lg">LG</Button>
        <Button variant="primary" size="xl">XL</Button>
      </div>
    `,
  }),
}

export const Loading: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <Button variant="primary" loading>Loading</Button>
        <Button variant="secondary" loading>Loading</Button>
        <Button variant="outline" loading>Loading</Button>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <Button variant="primary" disabled>Disabled</Button>
        <Button variant="outline" disabled>Disabled</Button>
        <Button variant="ghost" disabled>Disabled</Button>
      </div>
    `,
  }),
}

export const WithIcons: Story = {
  render: () => ({
    components: { Button, RiSearchLine, RiArrowRightLine },
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <Button variant="primary">
          <template #leading><RiSearchLine class="size-4" /></template>
          Search
        </Button>
        <Button variant="outline">
          Next
          <template #trailing><RiArrowRightLine class="size-4" /></template>
        </Button>
      </div>
    `,
  }),
}
```

- [ ] **Step 2: Verify in Storybook**

```bash
npm run storybook
```

Expected: Button stories visible with all variants, sizes, loading, disabled, icons.

- [ ] **Step 3: Commit**

```bash
git add src/stories/Button.stories.ts
git commit -m "feat: add Button stories"
```

---

### Task 6: Write Badge stories

**Files:**
- Create: `src/stories/Badge.stories.ts`

- [ ] **Step 1: Create Badge.stories.ts**

```ts
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Badge } from '@/components/ui/badge'

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'primary', 'secondary', 'success', 'warning', 'info', 'danger'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const AllVariants: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <Badge variant="neutral">Neutral</Badge>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="danger">Danger</Badge>
      </div>
    `,
  }),
}

export const BadgeStyles: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div class="space-y-4">
        <div class="flex flex-wrap items-center gap-3">
          <Badge variant="primary" badge-style="subtle">Subtle</Badge>
          <Badge variant="primary" badge-style="solid">Solid</Badge>
          <Badge variant="primary" badge-style="outline">Outline</Badge>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <Badge variant="success" badge-style="subtle">Subtle</Badge>
          <Badge variant="success" badge-style="solid">Solid</Badge>
          <Badge variant="success" badge-style="outline">Outline</Badge>
        </div>
      </div>
    `,
  }),
}

export const WithDot: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <Badge variant="success" dot>Active</Badge>
        <Badge variant="danger" dot>Offline</Badge>
        <Badge variant="warning" dot>Pending</Badge>
      </div>
    `,
  }),
}

export const Removable: Story = {
  render: () => ({
    components: { Badge },
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <Badge variant="primary" removable>Tag 1</Badge>
        <Badge variant="secondary" removable>Tag 2</Badge>
        <Badge variant="info" removable>Tag 3</Badge>
      </div>
    `,
  }),
}
```

- [ ] **Step 2: Commit**

```bash
git add src/stories/Badge.stories.ts
git commit -m "feat: add Badge stories"
```

---

### Task 7: Write Alert stories

**Files:**
- Create: `src/stories/Alert.stories.ts`

- [ ] **Step 1: Create Alert.stories.ts**

```ts
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Alert } from '@/components/ui/alert'

const meta: Meta<typeof Alert> = {
  title: 'UI/Alert',
  component: Alert,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Alert>

export const AllVariants: Story = {
  render: () => ({
    components: { Alert },
    template: `
      <div class="space-y-4 max-w-lg">
        <Alert variant="info" title="Information">
          This is an informational alert with details.
        </Alert>
        <Alert variant="success" title="Success">
          Operation completed successfully.
        </Alert>
        <Alert variant="warning" title="Warning">
          Please check your input before continuing.
        </Alert>
        <Alert variant="danger" title="Error">
          Something went wrong. Please try again.
        </Alert>
      </div>
    `,
  }),
}

export const Dismissible: Story = {
  render: () => ({
    components: { Alert },
    template: `
      <div class="space-y-4 max-w-lg">
        <Alert variant="info" title="Dismissible alert" dismissible>
          Click the X to dismiss this alert.
        </Alert>
      </div>
    `,
  }),
}
```

- [ ] **Step 2: Commit**

```bash
git add src/stories/Alert.stories.ts
git commit -m "feat: add Alert stories"
```

---

### Task 8: Copy custom component stories

**Files:**
- Copy & fix: stories for custom components

- [ ] **Step 1: Copy stories from abadikan/ds**

```bash
mkdir -p src/stories

# Copy stories for custom components
for comp in Icon Center Container Stack VisuallyHidden; do
  cp /Users/User/claude/ds/src/components/atoms/$comp/$comp.stories.ts src/stories/
done

for comp in AvatarGroup FileUpload Rating SearchInput SegmentedControl Stat Tag ThemeToggle; do
  cp /Users/User/claude/ds/src/components/molecules/$comp/$comp.stories.ts src/stories/
done

for comp in ChatInput ChatMessage Navbar; do
  cp /Users/User/claude/ds/src/components/organisms/$comp/$comp.stories.ts src/stories/
done
```

- [ ] **Step 2: Fix import paths in all copied stories**

```bash
# Find imports that need fixing
grep -rn "from '@/components/atoms/" src/stories/
grep -rn "from '@/components/molecules/" src/stories/
grep -rn "from '@/components/organisms/" src/stories/
```

Apply these replacements:
- `from '@/components/atoms/Icon/Icon.vue'` -> `from '@/components/custom/atoms/Icon/Icon.vue'`
- `from '@/components/atoms/Button/Button.vue'` -> `from '@/components/ui/button'`
- `from '@/components/molecules/ThemeToggle/ThemeToggle.vue'` -> `from '@/components/custom/molecules/ThemeToggle/ThemeToggle.vue'`
- etc.

General rule:
- If component is in `src/components/ui/` -> import from `@/components/ui/{name}`
- If component is in `src/components/custom/` -> import from `@/components/custom/{tier}/{Name}/{Name}.vue`

- [ ] **Step 3: Fix story titles**

Update `title` in each story to match the new organization:
- Atoms: `title: 'Custom/Atoms/Icon'`
- Molecules: `title: 'Custom/Molecules/ThemeToggle'`
- Organisms: `title: 'Custom/Organisms/Navbar'`

- [ ] **Step 4: Verify Storybook**

```bash
npm run storybook
```

Expected: All stories render, no console errors. Navigate through each story.

- [ ] **Step 5: Commit**

```bash
git add src/stories/
git commit -m "feat: add custom component stories from abadikan/ds"
```

---

### Task 9: Full validation checklist

- [ ] **Step 1: Dev server**

```bash
npm run dev
```

Expected: Zero errors.

- [ ] **Step 2: TypeScript check**

```bash
npx vue-tsc --noEmit
```

Expected: Zero type errors.

- [ ] **Step 3: Build**

```bash
npm run build
```

Expected: Zero errors.

- [ ] **Step 4: Storybook**

```bash
npm run storybook
```

Expected: Storybook opens, all stories render.

- [ ] **Step 5: Visual check — light mode**

Open Storybook in light mode. Walk through each component story:
- Colors match Abadikan palette (warm red primary, pink secondary)
- Typography uses Inter for body, Abadikan Sans for headings
- Border radius looks correct (validate 20px base — if too bulat, adjust --radius to 12-16px)
- Shadows are warm-tinted

- [ ] **Step 6: Visual check — dark mode**

Toggle to dark mode in Storybook. Walk through each component:
- Background switches to dark warm gray
- Text colors are readable
- Primary color adjusts (lighter in dark mode)
- No white flashes or unstyled elements

- [ ] **Step 7: Keyboard navigation**

For interactive components (Button, Input, Select, Dialog, Accordion, Tabs):
- Tab navigates focus correctly
- Focus ring is visible (2px solid primary, 2px offset)
- Enter/Space activates

- [ ] **Step 8: No stale references**

```bash
grep -r "abadikan/ds" src/ || echo "CLEAN"
```

Expected: "CLEAN"

- [ ] **Step 9: No console errors**

Open browser DevTools console while browsing Storybook.
Expected: Zero warnings, zero errors.

- [ ] **Step 10: Final commit**

```bash
git add -A
git commit -m "chore: Plan C complete — Storybook and QA verified"
```

---

## Plan C Complete

After this plan, the project has:
- Storybook 10 with Abadikan branding (light + dark themes)
- Stories for all customized shadcn-vue components (Button, Badge, Alert)
- Stories for all 17 custom components (copied from abadikan/ds)
- Dark mode toggle working
- Viewport presets for responsive testing
- Full validation checklist passed

---

## All Plans Complete

The abadikan-theme project is now:
- **Plan A:** Foundation (tokens, fonts, transitions, composables, utils)
- **Plan B:** Components (47 shadcn-vue + 17 custom + 5 customized)
- **Plan C:** Storybook & QA (branded, stories, validated)

Ready for production use.
