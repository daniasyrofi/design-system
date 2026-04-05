import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, ref } from 'vue'
import * as RemixIcons from '@remixicon/vue'
import Icon from './Icon.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type Copy = {
  storyNames: {
    default: string
    allSizes: string
    iconGrid: string
    coloredIcons: string
  }
  sizeLabels: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', string>
  titleLabels: {
    copyToClipboard: string
    searchPlaceholder: string
    allStyles: string
    boldStyle: string
    lineStyle: string
  }
  colorLabels: Record<'danger' | 'success' | 'warning' | 'info' | 'primary' | 'muted', string>
}

const allRemixIcons = Object.keys(RemixIcons)
  .filter((name) => name.startsWith('Ri'))
  .sort((a, b) => a.localeCompare(b))

const copyMap: Record<Locale, Copy> = {
  en: {
    storyNames: {
      default: 'Default',
      allSizes: 'All Sizes',
      iconGrid: 'Icon Grid',
      coloredIcons: 'Colored Icons',
    },
    sizeLabels: {
      xs: 'Extra Small',
      sm: 'Small',
      md: 'Medium',
      lg: 'Large',
      xl: 'Extra Large',
    },
    titleLabels: {
      copyToClipboard: 'Click to copy',
      searchPlaceholder: 'Search icon...',
      allStyles: 'All',
      boldStyle: 'Bold',
      lineStyle: 'Line',
    },
    colorLabels: {
      danger: 'Danger',
      success: 'Success',
      warning: 'Warning',
      info: 'Info',
      primary: 'Primary',
      muted: 'Muted',
    },
  },
  id: {
    storyNames: {
      default: 'Bawaan',
      allSizes: 'Semua Ukuran',
      iconGrid: 'Kisi Ikon',
      coloredIcons: 'Ikon Berwarna',
    },
    sizeLabels: {
      xs: 'Ekstra Kecil',
      sm: 'Kecil',
      md: 'Sedang',
      lg: 'Besar',
      xl: 'Ekstra Besar',
    },
    titleLabels: {
      copyToClipboard: 'Klik untuk menyalin',
      searchPlaceholder: 'Cari ikon...',
      allStyles: 'Semua',
      boldStyle: 'Bold',
      lineStyle: 'Line',
    },
    colorLabels: {
      danger: 'Bahaya',
      success: 'Berhasil',
      warning: 'Peringatan',
      info: 'Info',
      primary: 'Utama',
      muted: 'Pudar',
    },
  },
  zh: {
    storyNames: {
      default: '默认',
      allSizes: '全部尺寸',
      iconGrid: '图标网格',
      coloredIcons: '彩色图标',
    },
    sizeLabels: {
      xs: '超小',
      sm: '小',
      md: '中',
      lg: '大',
      xl: '超大',
    },
    titleLabels: {
      copyToClipboard: '点击复制',
      searchPlaceholder: '搜索图标...',
      allStyles: '全部',
      boldStyle: '粗体',
      lineStyle: '线框',
    },
    colorLabels: {
      danger: '危险',
      success: '成功',
      warning: '警告',
      info: '信息',
      primary: '主要',
      muted: '弱化',
    },
  },
}

const getLocale = (): Locale => resolveLocale(getI18nLocale())
const useCopy = () => computed(() => copyMap[getLocale()])
const getStoryName = (key: keyof Copy['storyNames']) => copyMap[getLocale()].storyNames[key]

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: { layout: 'centered', icon: 'component' },
  argTypes: {
    name: { control: 'text' },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    color: { control: 'color' },
  },
  args: {
    name: 'RiHomeLine',
    size: 'md',
  },
}
export default meta
type Story = StoryObj<typeof Icon>

export const Default: Story = {
  get name() {
    return getStoryName('default')
  },
  render: (args) => ({
    components: { Icon },
    setup: () => ({ args }),
    template: '<Icon v-bind="args" />',
  }),
}

export const AllSizes: Story = {
  get name() {
    return getStoryName('allSizes')
  },
  render: () => ({
    components: { Icon },
    setup: () => ({ copy: useCopy() }),
    template: `
      <div style="display:flex;align-items:flex-end;gap:20px;">
        <div v-for="s in ['xs','sm','md','lg','xl']" :key="s" style="display:flex;flex-direction:column;align-items:center;gap:8px;">
          <Icon name="RiHomeLine" :size="s" />
          <span style="font-size:11px;color:var(--color-text-tertiary);">{{ copy.sizeLabels[s] }}</span>
        </div>
      </div>
    `,
  }),
}

export const IconGrid: Story = {
  get name() {
    return getStoryName('iconGrid')
  },
  render: () => ({
    components: { Icon },
    setup() {
      const copy = useCopy()
      const search = ref('')
      const styleFilter = ref<'all' | 'fill' | 'line'>('all')
      const copied = ref<string | null>(null)

      const filteredIcons = computed(() =>
        allRemixIcons.filter((icon) => {
          const lower = icon.toLowerCase()
          const matchesSearch = lower.includes(search.value.trim().toLowerCase())
          if (!matchesSearch) return false
          if (styleFilter.value === 'fill') return icon.endsWith('Fill')
          if (styleFilter.value === 'line') return icon.endsWith('Line')
          return true
        })
      )

      function copyName(name: string) {
        navigator.clipboard?.writeText(name)
        copied.value = name
        setTimeout(() => {
          copied.value = null
        }, 1500)
      }
      return { copy, search, styleFilter, icons: filteredIcons, copied, copyName }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;width:min(1000px,92vw);">
        <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;">
          <input
            v-model="search"
            type="text"
            :placeholder="copy.titleLabels.searchPlaceholder"
            style="min-width:220px;flex:1 1 260px;height:34px;padding:0 10px;border:1px solid var(--color-border);border-radius:var(--radius-md);background:var(--color-surface);color:var(--color-text-primary);font-size:13px;"
          />
          <div style="display:flex;gap:6px;">
            <button type="button" @click="styleFilter = 'all'" :style="{ height: '34px', padding: '0 12px', borderRadius: '999px', border: '1px solid var(--color-border)', background: styleFilter === 'all' ? 'var(--color-primary-light)' : 'var(--color-surface)', color: 'var(--color-text-primary)', fontSize: '12px', cursor: 'pointer' }">{{ copy.titleLabels.allStyles }}</button>
            <button type="button" @click="styleFilter = 'fill'" :style="{ height: '34px', padding: '0 12px', borderRadius: '999px', border: '1px solid var(--color-border)', background: styleFilter === 'fill' ? 'var(--color-primary-light)' : 'var(--color-surface)', color: 'var(--color-text-primary)', fontSize: '12px', cursor: 'pointer' }">{{ copy.titleLabels.boldStyle }}</button>
            <button type="button" @click="styleFilter = 'line'" :style="{ height: '34px', padding: '0 12px', borderRadius: '999px', border: '1px solid var(--color-border)', background: styleFilter === 'line' ? 'var(--color-primary-light)' : 'var(--color-surface)', color: 'var(--color-text-primary)', fontSize: '12px', cursor: 'pointer' }">{{ copy.titleLabels.lineStyle }}</button>
          </div>
        </div>
        <p style="font-size:12px;color:var(--color-text-tertiary);margin:0;">
          Total Remix Icons: {{ icons.length }}
        </p>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:8px;max-height:70vh;overflow:auto;padding-right:4px;">
        <button
          v-for="icon in icons"
          :key="icon"
          style="display:flex;flex-direction:column;align-items:center;gap:6px;padding:10px 8px;border-radius:var(--radius-md);border:1px solid var(--color-border);background:var(--color-surface);min-width:80px;cursor:pointer;transition:background 150ms, border-color 150ms;"
          :style="{ background: copied === icon ? 'var(--color-primary-light)' : 'var(--color-surface)', borderColor: copied === icon ? 'var(--color-primary)' : 'var(--color-border)' }"
          :title="copy.titleLabels.copyToClipboard + ': ' + icon"
          @click="copyName(icon)"
        >
          <Icon :name="icon" size="md" />
          <span style="font-size:10px;color:var(--color-text-secondary);text-align:center;line-height:1.2;">{{ icon.replace('Ri','').replace('Line','') }}</span>
        </button>
        </div>
      </div>
    `,
  }),
}

export const ColoredIcons: Story = {
  get name() {
    return getStoryName('coloredIcons')
  },
  render: () => ({
    components: { Icon },
    setup: () => ({ copy: useCopy() }),
    template: `
      <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
        <div v-for="[name, color, label] in [
          ['RiHeartLine', 'var(--color-danger)', copy.colorLabels.danger],
          ['RiCheckLine', 'var(--color-success)', copy.colorLabels.success],
          ['RiAlertLine', 'var(--color-warning)', copy.colorLabels.warning],
          ['RiInformationLine', 'var(--color-info)', copy.colorLabels.info],
          ['RiStarLine', 'var(--color-primary)', copy.colorLabels.primary],
          ['RiSettings3Line', 'var(--color-text-secondary)', copy.colorLabels.muted],
        ]" :key="name" style="display:flex;flex-direction:column;align-items:center;gap:6px;">
          <Icon :name="name" size="lg" :color="color" />
          <span style="font-size:10px;color:var(--color-text-tertiary);">{{ label }}</span>
        </div>
      </div>
    `,
  }),
}
