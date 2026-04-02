import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Stat from './Stat.vue'

const meta: Meta<typeof Stat> = {
  title: 'Molecules/Stat',
  component: Stat,
  tags: ['autodocs'],
  argTypes: {
    trend: { control: 'select', options: ['up', 'down', 'neutral'] },
    size:  { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}
export default meta

type Story = StoryObj<typeof Stat>

export const Default: Story = {
  args: {
    label:       'Total Revenue',
    value:       '$48,295',
    delta:       '+12.5%',
    trend:       'up',
    description: 'Compared to last month',
    size:        'md',
  },
}

export const Dashboard: Story = {
  render: () => ({
    components: { Stat },
    template: `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:24px;padding:24px;background:var(--color-surface);border-radius:var(--radius-xl);box-shadow:var(--shadow-md);">
        <Stat label="Revenue"  value="$48.2K" delta="+12.5%" trend="up"   description="vs last month" />
        <Stat label="Orders"   value="1,284"  delta="+8.1%"  trend="up"   description="vs last month" />
        <Stat label="Churn"    value="2.4%"   delta="+0.3%"  trend="down" description="vs last month" />
        <Stat label="NPS"      value="72"     delta="→ 0"    trend="neutral" description="No change" />
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { Stat },
    template: `
      <div style="display:flex;gap:32px;align-items:flex-end;flex-wrap:wrap;">
        <Stat label="Small"  value="$1,200" delta="+5%" trend="up" size="sm" />
        <Stat label="Medium" value="$1,200" delta="+5%" trend="up" size="md" />
        <Stat label="Large"  value="$1,200" delta="+5%" trend="up" size="lg" />
      </div>
    `,
  }),
}
