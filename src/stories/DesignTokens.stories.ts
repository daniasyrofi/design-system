import type { Meta, StoryObj } from '@storybook/vue3'
import DesignTokens from './DesignTokens.vue'

const meta: Meta<typeof DesignTokens> = {
  title: 'Foundation/Design Tokens',
  component: DesignTokens,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
All CSS custom properties exposed by \`@abadikan/ds\`.

**Usage in CSS:**
\`\`\`css
.my-element {
  color: var(--color-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}
\`\`\`

**Usage in inline styles (Vue):**
\`\`\`html
<div :style="{ color: 'var(--color-primary)' }">Hello</div>
\`\`\`

**Import tokens in TypeScript:**
\`\`\`ts
import { colors, spacing, radii, shadows } from '@abadikan/ds/tokens'
\`\`\`
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof DesignTokens>

export const AllTokens: Story = {
  name: 'All Tokens',
}

export const LightMode: Story = {
  name: 'Light Mode',
  parameters: {
    backgrounds: { default: 'light' },
  },
}

export const DarkMode: Story = {
  name: 'Dark Mode',
  parameters: {
    backgrounds: { default: 'dark' },
  },
}
