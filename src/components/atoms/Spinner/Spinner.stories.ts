import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, ref } from 'vue'
import Spinner from './Spinner.vue'
import Button from '@/components/atoms/Button/Button.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type Copy = {
  storyNames: {
    default: string
    allSizes: string
    colorVariants: string
    inButton: string
    loadingOverlay: string
  }
  sizeLabels: Record<Size, string>
  colorLabels: Record<'primary' | 'secondary' | 'neutral' | 'danger' | 'white', string>
  labels: {
    loading: string
    clickToLoad: string
    cardTitle: string
    cardDescription: string
    triggerLoad: string
    customHexPurple: string
  }
}

const sizeOptions = ['xs', 'sm', 'md', 'lg', 'xl'] as const

const copyMap: Record<Locale, Copy> = {
  en: {
    storyNames: {
      default: 'Default',
      allSizes: 'All Sizes',
      colorVariants: 'Color Variants',
      inButton: 'In Button',
      loadingOverlay: 'Loading Overlay',
    },
    sizeLabels: {
      xs: 'Extra Small',
      sm: 'Small',
      md: 'Medium',
      lg: 'Large',
      xl: 'Extra Large',
    },
    colorLabels: {
      primary: 'Primary - Brand',
      secondary: 'Secondary - Accent',
      neutral: 'Neutral - Black',
      danger: 'Danger - Red',
      white: 'White',
    },
    labels: {
      loading: 'Loading',
      clickToLoad: 'Click to load',
      cardTitle: 'Card title',
      cardDescription: 'Some card content that gets obscured when loading.',
      triggerLoad: 'Trigger load',
      customHexPurple: 'Custom Hex - Purple',
    },
  },
  id: {
    storyNames: {
      default: 'Bawaan',
      allSizes: 'Semua Ukuran',
      colorVariants: 'Varian Warna',
      inButton: 'Di Dalam Tombol',
      loadingOverlay: 'Lapisan Memuat',
    },
    sizeLabels: {
      xs: 'Ekstra Kecil',
      sm: 'Kecil',
      md: 'Sedang',
      lg: 'Besar',
      xl: 'Ekstra Besar',
    },
    colorLabels: {
      primary: 'Utama - Merek',
      secondary: 'Sekunder - Aksen',
      neutral: 'Netral - Hitam',
      danger: 'Bahaya - Merah',
      white: 'Putih',
    },
    labels: {
      loading: 'Memuat',
      clickToLoad: 'Klik untuk memuat',
      cardTitle: 'Judul kartu',
      cardDescription: 'Sebagian konten kartu tertutup saat dimuat.',
      triggerLoad: 'Mulai memuat',
      customHexPurple: 'Hex Kustom - Ungu',
    },
  },
  zh: {
    storyNames: {
      default: '默认',
      allSizes: '全部尺寸',
      colorVariants: '颜色变体',
      inButton: '在按钮中',
      loadingOverlay: '加载遮罩',
    },
    sizeLabels: {
      xs: '超小',
      sm: '小',
      md: '中',
      lg: '大',
      xl: '超大',
    },
    colorLabels: {
      primary: '主要 - 品牌',
      secondary: '次要 - 强调',
      neutral: '中性 - 黑色',
      danger: '危险 - 红色',
      white: '白色',
    },
    labels: {
      loading: '加载中',
      clickToLoad: '点击加载',
      cardTitle: '卡片标题',
      cardDescription: '加载时会遮住这部分卡片内容。',
      triggerLoad: '触发加载',
      customHexPurple: '自定义 Hex - 紫色',
    },
  },
}

const getLocale = (): Locale => resolveLocale(getI18nLocale())
const useCopy = () => computed(() => copyMap[getLocale()])
const getStoryName = (key: keyof Copy['storyNames']) => copyMap[getLocale()].storyNames[key]

const meta: Meta<typeof Spinner> = {
  title: 'Atoms/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: { layout: 'centered', icon: 'sync' },
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    color: { control: 'color' },
    label: { control: 'text' },
  },
  args: { size: 'md' },
}
export default meta
type Story = StoryObj<typeof Spinner>

export const Default: Story = {
  get name() {
    return getStoryName('default')
  },
  render: (args) => ({
    components: { Spinner },
    setup: () => ({ args }),
    template: '<Spinner v-bind="args" />',
  }),
}

export const AllSizes: Story = {
  get name() {
    return getStoryName('allSizes')
  },
  render: () => ({
    components: { Spinner },
    setup: () => ({ copy: useCopy(), sizes: sizeOptions }),
    template: `
      <div style="display:flex;align-items:flex-end;gap:24px;">
        <div v-for="s in sizes" :key="s" style="display:flex;flex-direction:column;align-items:center;gap:10px;">
          <Spinner :size="s" />
          <span style="font-size:11px;color:var(--color-text-tertiary);">{{ copy.sizeLabels[s] }}</span>
        </div>
      </div>
    `,
  }),
}

export const ColorVariants: Story = {
  get name() {
    return getStoryName('colorVariants')
  },
  render: () => ({
    components: { Spinner },
    setup: () => ({ copy: useCopy() }),
    template: `
      <div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap;">
        <div v-for="[color, label, bg] in [
          ['primary', copy.colorLabels.primary, 'transparent'],
          ['secondary', copy.colorLabels.secondary, 'transparent'],
          ['neutral', copy.colorLabels.neutral, 'transparent'],
          ['danger', copy.colorLabels.danger, 'transparent'],
          ['#ffffff', copy.colorLabels.white, 'var(--color-neutral)'],
          ['#8b5cf6', copy.labels.customHexPurple, 'transparent'],
        ]" :key="label" style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <div :style="{ background: bg, borderRadius: 'var(--radius-md)', padding: bg !== 'transparent' ? '8px' : '0' }">
            <Spinner size="md" :color="color" />
          </div>
          <span style="font-size:11px;color:var(--color-text-tertiary);">{{ label }}</span>
        </div>
      </div>
    `,
  }),
}

export const InButton: Story = {
  get name() {
    return getStoryName('inButton')
  },
  render: () => ({
    components: { Spinner, Button },
    setup() {
      const copy = useCopy()
      const loading = ref(false)
      async function handleClick() {
        loading.value = true
        await new Promise((r) => setTimeout(r, 2000))
        loading.value = false
      }
      return { copy, loading, handleClick }
    },
    template: `
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
        <Button :loading="loading" @click="handleClick">
          {{ loading ? copy.labels.loading : copy.labels.clickToLoad }}
        </Button>
        <Button variant="secondary" loading>{{ copy.labels.loading }}</Button>
        <Button variant="ghost" loading>{{ copy.labels.loading }}</Button>
      </div>
    `,
  }),
}

export const LoadingOverlay: Story = {
  get name() {
    return getStoryName('loadingOverlay')
  },
  render: () => ({
    components: { Spinner, Button },
    setup() {
      const copy = useCopy()
      const loading = ref(false)
      async function load() {
        loading.value = true
        await new Promise((r) => setTimeout(r, 2500))
        loading.value = false
      }
      return { copy, loading, load }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:center;">
        <div style="position:relative;width:280px;padding:20px;border-radius:var(--radius-lg);border:1px solid var(--color-border);background:var(--color-surface);">
          <p style="font-size:15px;font-weight:600;color:var(--color-text-heading);margin-bottom:4px;">{{ copy.labels.cardTitle }}</p>
          <p style="font-size:13px;color:var(--color-text-secondary);">{{ copy.labels.cardDescription }}</p>
          <!-- Overlay -->
          <div v-if="loading" style="position:absolute;inset:0;background:var(--color-surface);opacity:0.75;border-radius:var(--radius-lg);display:flex;align-items:center;justify-content:center;">
            <Spinner size="md" />
          </div>
        </div>
        <Button @click="load" :disabled="loading">{{ loading ? copy.labels.loading : copy.labels.triggerLoad }}</Button>
      </div>
    `,
  }),
}
