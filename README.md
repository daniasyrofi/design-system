# Abadikan DS

A Vue 3 component library with semantic design tokens, full dark mode, and WCAG-accessible components.

## Installation

```bash
npm install @abadikan/ds
```

**Peer dependencies:**
```bash
npm install vue@^3.4.0
```

## Setup

Import the stylesheet once in your app entry point:

```ts
// main.ts
import { createApp } from 'vue'
import '@abadikan/ds/styles'
import App from './App.vue'

createApp(App).mount('#app')
```

## Usage

### Components

```vue
<script setup lang="ts">
import { Button, Input, Modal, Select, Toast } from '@abadikan/ds'
</script>

<template>
  <Button variant="primary" size="md" @click="open = true">
    Open Modal
  </Button>

  <Modal v-model="open" title="Confirm action" size="sm">
    Are you sure?
    <template #footer>
      <Button variant="ghost" @click="open = false">Cancel</Button>
      <Button variant="primary" @click="confirm">Confirm</Button>
    </template>
  </Modal>
</template>
```

### Select (compound component)

```vue
<script setup lang="ts">
import { Select, SelectTrigger, SelectContent, SelectItem } from '@abadikan/ds'
import { ref } from 'vue'

const country = ref('')
</script>

<template>
  <Select v-model="country" label="Country">
    <SelectTrigger placeholder="Choose a country..." clearable />
    <SelectContent>
      <SelectItem value="id">Indonesia</SelectItem>
      <SelectItem value="sg">Singapore</SelectItem>
      <SelectItem value="my">Malaysia</SelectItem>
    </SelectContent>
  </Select>
</template>
```

### Combobox (searchable select)

```vue
<script setup lang="ts">
import { Combobox } from '@abadikan/ds'
import type { ComboboxOption } from '@abadikan/ds'
import { ref } from 'vue'

const value = ref('')
const options: ComboboxOption[] = [
  { value: 'id', label: 'Indonesia' },
  { value: 'sg', label: 'Singapore' },
  { value: 'my', label: 'Malaysia' },
]
</script>

<template>
  <Combobox
    v-model="value"
    :options="options"
    label="Country"
    placeholder="Search..."
    clearable
  />
</template>
```

### Toast notifications

Add `<ToastContainer />` once in your app root, then use `useToast` anywhere:

```vue
<!-- App.vue -->
<script setup lang="ts">
import { ToastContainer } from '@abadikan/ds'
</script>
<template>
  <RouterView />
  <ToastContainer />
</template>
```

```vue
<!-- Any component -->
<script setup lang="ts">
import { useToast } from '@abadikan/ds'

const { toast } = useToast()

function save() {
  toast({ title: 'Saved!', variant: 'success' })
}
</script>
```

### Form validation with `useFormField`

```vue
<script setup lang="ts">
import { Input } from '@abadikan/ds'
import { useFormField, required, email } from '@abadikan/ds'

const emailField = useFormField({
  initialValue: '',
  rules: [required(), email()],
})
</script>

<template>
  <Input
    v-model="emailField.value.value"
    label="Email"
    type="email"
    :error="emailField.error.value"
    @blur="emailField.touch"
  />
</template>
```

## Design Tokens

Tokens are available as JavaScript values and CSS custom properties.

```ts
import { colors, spacing, radii, shadows, fonts, zIndex, getCSSVar } from '@abadikan/ds/tokens'

// CSS variable references (auto-swap in dark mode)
el.style.color = colors.primary          // 'var(--color-primary)'
el.style.padding = spacing[4]            // '16px'
el.style.borderRadius = radii.md         // '8px'

// Runtime resolved value (for canvas/chart contexts)
const primaryHex = getCSSVar('--color-primary', canvasElement)
```

### Available token groups

| Group | Example keys |
|---|---|
| `colors` | `primary`, `textPrimary`, `surface`, `border`, `success`, `danger` |
| `spacing` | `0`, `1`, `2`, `4`, `8`, `16`, `24` |
| `radii` | `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `full` |
| `shadows` | `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `inset` |
| `duration` | `fast` (100ms), `normal` (200ms), `slow` (300ms) |
| `zIndex` | `dropdown` (40), `modal` (70), `toast` (90), `tooltip` (100) |
| `fonts` | `display`, `ui`, `mono` |

## Theming

The library uses CSS custom properties. Override them in your app:

```css
:root {
  --color-primary: oklch(0.55 0.22 250);   /* Blue instead of default */
  --radius-lg: 4px;                         /* Sharper corners */
}
```

Dark mode is applied automatically via the `dark` class on `<html>`:

```ts
import { useTheme } from '@abadikan/ds'

const { toggle } = useTheme()
```

Or use the built-in `<ThemeToggle />` component.

## Components

### Atoms
`Avatar` · `Badge` · `Button` · `Checkbox` · `Divider` · `Icon` · `Input` · `Radio` · `Skeleton` · `Spinner` · `Textarea` · `Toggle`

### Molecules
`Accordion` · `Alert` · `AvatarGroup` · `Breadcrumb` · `Card` · `Combobox` · `DatePicker` · `Drawer` · `DropdownMenu` · `FileUpload` · `InputGroup` · `LanguageToggle` · `Modal` · `NumberInput` · `Pagination` · `Popover` · `ProgressBar` · `SearchInput` · `Select` · `Slider` · `Stepper` · `Tabs` · `Tag` · `ThemeToggle` · `Toast` · `Tooltip`

### Organisms
`ChatInput` · `ChatMessage` · `Form` · `Navbar` · `Sidebar` · `Table`

## Composables

| Composable | Description |
|---|---|
| `useToast()` | Show/dismiss toast notifications |
| `useTheme()` | Toggle light/dark mode |
| `useFormField(options)` | Reactive form field with validation |
| `useClickOutside(ref, handler)` | Run callback when clicking outside an element |
| `useFocusTrap(ref)` | Trap keyboard focus within an element |

### `useFormField` built-in rules

```ts
import { required, minLength, maxLength, email, pattern, min, max } from '@abadikan/ds'

useFormField({
  initialValue: '',
  rules: [required(), email()],
})

useFormField({
  initialValue: '',
  rules: [required(), minLength(8), maxLength(64)],
})

useFormField({
  initialValue: 0,
  rules: [min(1), max(100)],
})
```

## Development

```bash
# Install dependencies
npm install

# Start Storybook
npm run storybook

# Run unit tests
npx vitest run --project unit

# Type check
npx vue-tsc --noEmit

# Build library
npm run build
```

## Browser Support

Requires a modern browser with CSS custom properties and `oklch()` color support (Chrome 111+, Firefox 113+, Safari 16.4+).

## License

MIT
