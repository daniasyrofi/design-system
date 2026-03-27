import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Card from './Card.vue'

// ── Canvas decorator ──────────────────────────────────────────────────────────
const canvas = () => ({
  template: `
    <div style="
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 48px 32px;
      background-color: #eceae4;
      background-image: radial-gradient(circle, rgba(0,0,0,0.11) 1px, transparent 1px);
      background-size: 22px 22px;
    ">
      <story />
    </div>
  `,
})

const meta: Meta<typeof Card> = {
  title: 'Molecules/Card',
  component: Card,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    variant:   { control: 'select', options: ['default', 'outlined', 'elevated', 'flat'] },
    padding:   { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
    radius:    { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    hoverable: { control: 'boolean' },
    clickable: { control: 'boolean' },
    as:        { control: 'text' },
  },
  args: {
    variant:   'default',
    padding:   'md',
    radius:    'lg',
    hoverable: false,
    clickable: false,
    as:        'div',
  },
}
export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: (args) => ({
    components: { Card },
    setup: () => ({ args }),
    template: `
      <Card v-bind="args" style="max-width:320px">
        <p style="color:var(--color-text-secondary);font-size:14px;">
          This is the card body. Add any content here.
        </p>
      </Card>
    `,
  }),
}

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => ({
    components: { Card },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:24px;padding:24px;">
        <Card variant="default" style="width:220px;min-height:100px">
          <p style="font-size:14px;color:var(--color-text-secondary);">Default — border + shadow-sm</p>
        </Card>
        <Card variant="outlined" style="width:220px;min-height:100px">
          <p style="font-size:14px;color:var(--color-text-secondary);">Outlined — border only</p>
        </Card>
        <Card variant="elevated" style="width:220px;min-height:100px">
          <p style="font-size:14px;color:var(--color-text-secondary);">Elevated — shadow-lg, no border</p>
        </Card>
        <Card variant="flat" style="width:220px;min-height:100px">
          <p style="font-size:14px;color:var(--color-text-secondary);">Flat — no shadow, no border</p>
        </Card>
      </div>
    `,
  }),
}

export const WithSlots: Story = {
  name: 'With Slots',
  render: () => ({
    components: { Card },
    template: `
      <Card style="max-width:340px">
        <template #header>
          <div>
            <h3 style="font-weight:600;color:var(--color-text-heading);">Card Title</h3>
            <p style="font-size:12px;color:var(--color-text-secondary);margin-top:2px;">Subtitle or metadata</p>
          </div>
          <span style="font-size:12px;color:var(--color-text-secondary);">Tag</span>
        </template>
        <p style="font-size:14px;color:var(--color-text-secondary);">
          This card uses header, body, and footer slots matching Figma anatomy.
        </p>
        <template #footer>
          <button style="font-size:12px;color:var(--color-primary);font-weight:500;background:none;border:none;cursor:pointer;">Learn more →</button>
        </template>
      </Card>
    `,
  }),
}

export const WithMedia: Story = {
  name: 'With Media',
  render: () => ({
    components: { Card },
    template: `
      <Card style="max-width:320px">
        <template #media>
          <div style="height:160px;width:100%;background:linear-gradient(135deg,var(--color-primary) 0%,var(--color-info) 100%);" />
        </template>
        <template #header>
          <div>
            <h3 style="font-weight:600;color:var(--color-text-heading);">Media Card</h3>
            <p style="font-size:12px;color:var(--color-text-secondary);">With top image area</p>
          </div>
        </template>
        <p style="font-size:14px;color:var(--color-text-secondary);">Content below the image.</p>
        <template #footer>
          <button style="font-size:12px;padding:6px 12px;border-radius:var(--radius-md);background:var(--color-neutral);color:var(--color-text-inverse);font-weight:500;border:none;cursor:pointer;">Action</button>
        </template>
      </Card>
    `,
  }),
}

export const AllPaddings: Story = {
  name: 'All Paddings',
  render: () => ({
    components: { Card },
    template: `
      <div style="display:flex;flex-wrap:wrap;align-items:flex-start;gap:16px;padding:24px;">
        <Card v-for="p in ['none','sm','md','lg']" :key="p" :padding="p" variant="outlined" style="width:160px">
          <div style="background:var(--color-neutral-light);border-radius:4px;font-size:12px;text-align:center;padding:8px 0;color:var(--color-text-secondary);">
            padding="{{ p }}"
          </div>
        </Card>
      </div>
    `,
  }),
}

export const AllRadii: Story = {
  name: 'All Radii',
  render: () => ({
    components: { Card },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:16px;padding:24px;">
        <Card v-for="r in ['sm','md','lg','xl']" :key="r" :radius="r" variant="default" style="width:140px;min-height:80px">
          <p style="font-size:12px;color:var(--color-text-secondary);text-align:center;">radius="{{ r }}"</p>
        </Card>
      </div>
    `,
  }),
}

export const Hoverable: Story = {
  render: () => ({
    components: { Card },
    template: `
      <div style="display:flex;gap:16px;padding:32px;">
        <Card hoverable style="width:200px">
          <p style="font-size:14px;color:var(--color-text-secondary);">Hover me — lifts on hover</p>
        </Card>
        <Card variant="elevated" hoverable style="width:200px">
          <p style="font-size:14px;color:var(--color-text-secondary);">Elevated + hoverable</p>
        </Card>
      </div>
    `,
  }),
}

export const Clickable: Story = {
  render: () => ({
    components: { Card },
    setup() {
      return { onClick: () => alert('Card clicked!') }
    },
    template: `
      <div style="display:flex;gap:16px;padding:32px;">
        <Card clickable style="width:200px" @click="onClick">
          <p style="font-size:14px;font-weight:500;color:var(--color-text-primary);">Click me</p>
          <p style="font-size:12px;color:var(--color-text-secondary);margin-top:4px;">Acts as a button</p>
        </Card>
        <Card variant="outlined" clickable style="width:200px" @click="onClick">
          <p style="font-size:14px;font-weight:500;color:var(--color-text-primary);">Outlined + clickable</p>
          <p style="font-size:12px;color:var(--color-text-secondary);margin-top:4px;">Keyboard accessible</p>
        </Card>
      </div>
    `,
  }),
}

export const ProductCard: Story = {
  name: 'Example — Product Card',
  render: () => ({
    components: { Card },
    template: `
      <div style="display:flex;gap:20px;flex-wrap:wrap;padding:24px;">
        <Card
          v-for="i in 3"
          :key="i"
          variant="default"
          hoverable
          clickable
          style="width:240px"
        >
          <template #media>
            <div
              :style="{ height:'140px', width:'100%', background: ['linear-gradient(135deg,#6366f1,#8b5cf6)', 'linear-gradient(135deg,#f59e0b,#ef4444)', 'linear-gradient(135deg,#10b981,#059669)'][i-1] }"
            />
          </template>
          <template #header>
            <div style="width:100%">
              <div style="display:flex;align-items:flex-start;justify-content:space-between;">
                <h3 style="font-weight:600;font-size:14px;color:var(--color-text-heading);">Product {{ i }}</h3>
                <span style="font-size:12px;font-weight:700;color:var(--color-text-primary);">\${{ 19 * i }}.99</span>
              </div>
              <p style="font-size:12px;color:var(--color-text-secondary);margin-top:2px;">Category</p>
            </div>
          </template>
          <p style="font-size:12px;color:var(--color-text-secondary);">Short product description goes here with some detail.</p>
          <template #footer>
            <button style="width:100%;font-size:14px;padding:6px 0;border-radius:var(--radius-md);background:var(--color-neutral);color:var(--color-text-inverse);font-weight:500;border:none;cursor:pointer;">Add to cart</button>
          </template>
        </Card>
      </div>
    `,
  }),
}
