import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed } from 'vue'
import { userEvent, within, expect } from 'storybook/test'
import Tooltip from './Tooltip.vue'
import Button from '@/components/atoms/Button/Button.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type Copy = {
  storyNames: {
    default: string
    allPlacements: string
    clickTrigger: string
    noArrow: string
    richContent: string
  }
  content: string
  placements: Record<'top' | 'bottom' | 'left' | 'right', string>
  click: string
  noArrow: string
  rich: {
    title: string
    body: string
    trigger: string
  }
}

const copyMap: Record<Locale, Copy> = {
  en: {
    storyNames: {
      default: 'Default',
      allPlacements: 'All Placements',
      clickTrigger: 'Click Trigger',
      noArrow: 'No Arrow',
      richContent: 'Rich Content',
    },
    content: 'Tooltip text',
    placements: {
      top: 'Tooltip on top',
      bottom: 'Tooltip on bottom',
      left: 'Tooltip on left',
      right: 'Tooltip on right',
    },
    click: 'Click-triggered tooltip',
    noArrow: 'No arrow on this tooltip',
    rich: {
      title: 'Pro tip',
      body: 'Use Esc key to close modals quickly.',
      trigger: 'Rich tooltip',
    },
  },
  id: {
    storyNames: {
      default: 'Bawaan',
      allPlacements: 'Semua Posisi',
      clickTrigger: 'Pemicu Klik',
      noArrow: 'Tanpa Panah',
      richContent: 'Konten Kaya',
    },
    content: 'Teks tooltip',
    placements: {
      top: 'Tooltip di atas',
      bottom: 'Tooltip di bawah',
      left: 'Tooltip di kiri',
      right: 'Tooltip di kanan',
    },
    click: 'Tooltip dipicu klik',
    noArrow: 'Tooltip tanpa panah',
    rich: {
      title: 'Tips pro',
      body: 'Gunakan tombol Esc untuk menutup modal dengan cepat.',
      trigger: 'Tooltip kaya',
    },
  },
  zh: {
    storyNames: {
      default: '默认',
      allPlacements: '所有位置',
      clickTrigger: '点击触发',
      noArrow: '无箭头',
      richContent: '富内容',
    },
    content: '提示文本',
    placements: {
      top: '顶部提示',
      bottom: '底部提示',
      left: '左侧提示',
      right: '右侧提示',
    },
    click: '点击触发的提示',
    noArrow: '此提示没有箭头',
    rich: {
      title: '专业提示',
      body: '使用 Esc 键可快速关闭弹窗。',
      trigger: '富提示',
    },
  },
}

const getLocale = (): Locale => resolveLocale(getI18nLocale())
const useCopy = () => computed(() => copyMap[getLocale()])
const getStoryName = (key: keyof Copy['storyNames']) => copyMap[getLocale()].storyNames[key]

// ── Canvas decorator — consistent with Alert/Toast ────────────────────────────
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

const meta: Meta<typeof Tooltip> = {
  title: 'Molecules/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    content: { control: 'text' },
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    trigger: { control: 'select', options: ['hover', 'click', 'focus'] },
    delay: { control: 'number' },
    maxWidth: { control: 'text' },
    arrow: { control: 'boolean' },
  },
  args: {
    content: 'Tooltip text',
    placement: 'top',
    trigger: 'hover',
    delay: 200,
    maxWidth: '200px',
    arrow: true,
  },
}
export default meta
type Story = StoryObj<typeof Tooltip>

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  get name() {
    return getStoryName('default')
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)

    // Hover over the trigger button
    const trigger = canvas.getByRole('button')
    await userEvent.hover(trigger)

    // Wait for the tooltip delay (default 200ms + buffer)
    await new Promise((r) => setTimeout(r, 300))

    // Tooltip renders via Teleport — query against document.body
    const body = within(document.body)
    await expect(body.getByRole('tooltip')).toBeVisible()

    // Move mouse away to hide tooltip
    await userEvent.unhover(trigger)
  },
  render: (args) => ({
    components: { Tooltip, Button },
    setup: () => ({ args, copy: useCopy() }),
    template: `
      <div style="display:flex;align-items:center;justify-content:center;padding:80px;">
        <Tooltip v-bind="args">
          <Button>{{ copy.rich.trigger }}</Button>
        </Tooltip>
      </div>
    `,
  }),
}

// ── All Placements ────────────────────────────────────────────────────────────

export const AllPlacements: Story = {
  get name() {
    return getStoryName('allPlacements')
  },
  render: () => ({
    components: { Tooltip, Button },
    setup: () => ({ copy: useCopy() }),
    template: `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:48px;padding:80px;place-items:center;min-height:300px;">
        <Tooltip :content="copy.placements.top"    placement="top">    <Button variant="secondary" size="sm">Top</Button></Tooltip>
        <Tooltip :content="copy.placements.bottom" placement="bottom"> <Button variant="secondary" size="sm">Bottom</Button></Tooltip>
        <Tooltip :content="copy.placements.left"   placement="left">   <Button variant="secondary" size="sm">Left</Button></Tooltip>
        <Tooltip :content="copy.placements.right"  placement="right">  <Button variant="secondary" size="sm">Right</Button></Tooltip>
      </div>
    `,
  }),
}

// ── Click Trigger ─────────────────────────────────────────────────────────────

export const ClickTrigger: Story = {
  get name() {
    return getStoryName('clickTrigger')
  },
  render: () => ({
    components: { Tooltip, Button },
    setup: () => ({ copy: useCopy() }),
    template: `
      <div style="display:flex;align-items:center;justify-content:center;padding:80px;">
        <Tooltip :content="copy.click" trigger="click">
          <Button>{{ copy.rich.trigger }}</Button>
        </Tooltip>
      </div>
    `,
  }),
}

// ── No Arrow ──────────────────────────────────────────────────────────────────

export const NoArrow: Story = {
  get name() {
    return getStoryName('noArrow')
  },
  render: () => ({
    components: { Tooltip, Button },
    setup: () => ({ copy: useCopy() }),
    template: `
      <div style="display:flex;align-items:center;justify-content:center;padding:80px;">
        <Tooltip :content="copy.noArrow" :arrow="false">
          <Button variant="secondary">{{ copy.storyNames.noArrow }}</Button>
        </Tooltip>
      </div>
    `,
  }),
}

// ── Rich Content ──────────────────────────────────────────────────────────────

export const RichContent: Story = {
  get name() {
    return getStoryName('richContent')
  },
  render: () => ({
    components: { Tooltip, Button },
    setup: () => ({ copy: useCopy() }),
    template: `
      <div style="display:flex;align-items:center;justify-content:center;padding:80px;">
        <Tooltip placement="bottom" max-width="260px">
          <Button variant="secondary">{{ copy.rich.trigger }}</Button>
          <template #content>
            <div style="display:flex;flex-direction:column;gap:4px;">
              <span style="font-weight:600;">{{ copy.rich.title }}</span>
              <span style="font-size:12px;opacity:0.8;">
                {{ copy.rich.body }}
              </span>
            </div>
          </template>
        </Tooltip>
      </div>
    `,
  }),
}
