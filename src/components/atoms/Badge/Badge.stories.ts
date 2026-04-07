import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, ref, watch } from 'vue'
import { RiStarLine, RiCheckLine, RiAlertLine, RiFlashlightLine } from '@remixicon/vue'
import Badge from './Badge.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

const variants = [
  'neutral',
  'primary',
  'danger',
  'success',
  'warning',
  'info',
  'secondary',
] as const
const styles = ['subtle', 'solid', 'outline'] as const
const sizes = ['sm', 'md', 'lg'] as const

type Locale = SupportedLocale
type Variant = (typeof variants)[number]
type Style = (typeof styles)[number]
type Size = (typeof sizes)[number]

const storyRadiusBySize: Record<Size, string> = {
  sm: '8px',
  md: '10px',
  lg: '12px',
}

const getStoryRadiusStyle = (size: Size) => ({ borderRadius: storyRadiusBySize[size] })

type Copy = {
  defaultLabel: string
  variantLabels: Record<Variant, string>
  styleLabels: Record<Style, string>
  sizeLabels: Record<Size, string>
  iconLabels: {
    featured: string
    verified: string
    warning: string
    critical: string
  }
  tags: string[]
  emptyState: string
  storyNames: {
    default: string
    allVariants: string
    allStyles: string
    allSizes: string
    withIcon: string
    withDot: string
    removable: string
    fullMatrix: string
  }
  docs: {
    categoryProps: string
    categoryEvents: string
    categorySlots: string
    propNames: {
      variant: string
      size: string
      badgeStyle: string
      dot: string
      removable: string
    }
    descriptions: {
      variant: string
      size: string
      badgeStyle: string
      dot: string
      removable: string
      remove: string
      leading: string
      defaultSlot: string
    }
    typeLabels: {
      variant: string
      size: string
      badgeStyle: string
      boolean: string
      event: string
      slot: string
      text: string
    }
    boolLabels: {
      false: string
      true: string
    }
    eventName: string
    slotNames: {
      leading: string
      defaultSlot: string
    }
  }
}

const copyMap: Record<Locale, Copy> = {
  en: {
    defaultLabel: 'Badge',
    variantLabels: {
      neutral: 'Neutral',
      primary: 'Primary',
      danger: 'Danger',
      success: 'Success',
      warning: 'Warning',
      info: 'Info',
      secondary: 'Secondary',
    },
    styleLabels: {
      subtle: 'Subtle',
      solid: 'Solid',
      outline: 'Outline',
    },
    sizeLabels: {
      sm: 'Small',
      md: 'Medium',
      lg: 'Large',
    },
    iconLabels: {
      featured: 'Featured',
      verified: 'Verified',
      warning: 'Warning',
      critical: 'Critical',
    },
    tags: ['Design', 'Vue 3', 'TypeScript', 'Storybook'],
    emptyState: 'All removed - refresh to reset',
    storyNames: {
      default: 'Default',
      allVariants: 'All Variants',
      allStyles: 'All Styles',
      allSizes: 'All Sizes',
      withIcon: 'With Icon',
      withDot: 'With Dot',
      removable: 'Removable',
      fullMatrix: 'Full Matrix',
    },
    docs: {
      categoryProps: 'Props',
      categoryEvents: 'Events',
      categorySlots: 'Slots',
      propNames: {
        variant: 'variant',
        size: 'size',
        badgeStyle: 'badgeStyle',
        dot: 'dot',
        removable: 'removable',
      },
      descriptions: {
        variant: 'Color semantic variant',
        size: 'Badge size',
        badgeStyle: 'Visual style',
        dot: 'Show status dot',
        removable: 'Show remove button',
        remove: 'Emitted when remove button is clicked',
        leading: 'Leading icon/content slot',
        defaultSlot: 'Main badge text/content slot',
      },
      typeLabels: {
        variant: 'Variant',
        size: 'Size',
        badgeStyle: 'BadgeStyle',
        boolean: 'boolean',
        event: 'event',
        slot: 'slot',
        text: 'string',
      },
      boolLabels: {
        false: 'False',
        true: 'True',
      },
      eventName: 'remove',
      slotNames: {
        leading: 'leading',
        defaultSlot: 'default',
      },
    },
  },
  id: {
    defaultLabel: 'Lencana',
    variantLabels: {
      neutral: 'Netral',
      primary: 'Utama',
      danger: 'Bahaya',
      success: 'Berhasil',
      warning: 'Peringatan',
      info: 'Info',
      secondary: 'Sekunder',
    },
    styleLabels: {
      subtle: 'Lembut',
      solid: 'Penuh',
      outline: 'Garis',
    },
    sizeLabels: {
      sm: 'Kecil',
      md: 'Sedang',
      lg: 'Besar',
    },
    iconLabels: {
      featured: 'Unggulan',
      verified: 'Terverifikasi',
      warning: 'Peringatan',
      critical: 'Kritis',
    },
    tags: ['Desain', 'Vue 3', 'TypeScript', 'Storybook'],
    emptyState: 'Semua dihapus - muat ulang untuk reset',
    storyNames: {
      default: 'Bawaan',
      allVariants: 'Semua Varian',
      allStyles: 'Semua Gaya',
      allSizes: 'Semua Ukuran',
      withIcon: 'Dengan Ikon',
      withDot: 'Dengan Titik',
      removable: 'Dapat Dihapus',
      fullMatrix: 'Matriks Lengkap',
    },
    docs: {
      categoryProps: 'Properti',
      categoryEvents: 'Event',
      categorySlots: 'Slot',
      propNames: {
        variant: 'varian',
        size: 'ukuran',
        badgeStyle: 'gayaLencana',
        dot: 'titik',
        removable: 'dapatDihapus',
      },
      descriptions: {
        variant: 'Varian semantik warna',
        size: 'Ukuran badge',
        badgeStyle: 'Gaya visual',
        dot: 'Tampilkan titik status',
        removable: 'Tampilkan tombol hapus',
        remove: 'Dipicu saat tombol hapus diklik',
        leading: 'Slot ikon/konten di depan',
        defaultSlot: 'Slot teks/konten utama badge',
      },
      typeLabels: {
        variant: 'Varian',
        size: 'Ukuran',
        badgeStyle: 'Gaya Lencana',
        boolean: 'boolean',
        event: 'event',
        slot: 'slot',
        text: 'string',
      },
      boolLabels: {
        false: 'Tidak',
        true: 'Ya',
      },
      eventName: 'hapus',
      slotNames: {
        leading: 'depan',
        defaultSlot: 'utama',
      },
    },
  },
  zh: {
    defaultLabel: '徽章',
    variantLabels: {
      neutral: '中性',
      primary: '主要',
      danger: '危险',
      success: '成功',
      warning: '警告',
      info: '信息',
      secondary: '次要',
    },
    styleLabels: {
      subtle: '柔和',
      solid: '实心',
      outline: '描边',
    },
    sizeLabels: {
      sm: '小',
      md: '中',
      lg: '大',
    },
    iconLabels: {
      featured: '精选',
      verified: '已验证',
      warning: '警告',
      critical: '严重',
    },
    tags: ['设计', 'Vue 3', 'TypeScript', 'Storybook'],
    emptyState: '已全部移除 - 刷新以重置',
    storyNames: {
      default: '默认',
      allVariants: '所有变体',
      allStyles: '所有样式',
      allSizes: '所有尺寸',
      withIcon: '带图标',
      withDot: '带圆点',
      removable: '可移除',
      fullMatrix: '完整矩阵',
    },
    docs: {
      categoryProps: '属性',
      categoryEvents: '事件',
      categorySlots: '插槽',
      propNames: {
        variant: '变体',
        size: '尺寸',
        badgeStyle: '徽章样式',
        dot: '圆点',
        removable: '可移除',
      },
      descriptions: {
        variant: '颜色语义变体',
        size: '徽章尺寸',
        badgeStyle: '视觉样式',
        dot: '显示状态圆点',
        removable: '显示移除按钮',
        remove: '点击移除按钮时触发',
        leading: '前置图标/内容插槽',
        defaultSlot: '徽章主文本/内容插槽',
      },
      typeLabels: {
        variant: '变体',
        size: '尺寸',
        badgeStyle: '徽章样式',
        boolean: '布尔',
        event: '事件',
        slot: '插槽',
        text: '字符串',
      },
      boolLabels: {
        false: '否',
        true: '是',
      },
      eventName: '移除',
      slotNames: {
        leading: '前置',
        defaultSlot: '默认',
      },
    },
  },
}

const getLocale = (): Locale => resolveLocale(getI18nLocale())
const useCopy = () => computed(() => copyMap[getLocale()])
const getStoryName = (key: keyof Copy['storyNames']) => copyMap[getLocale()].storyNames[key]

const buildArgTypes = (locale: Locale): NonNullable<Meta<typeof Badge>['argTypes']> => {
  const copy = copyMap[locale]

  return {
    variant: {
      name: copy.docs.propNames.variant,
      description: copy.docs.descriptions.variant,
      control: { type: 'select', labels: copy.variantLabels },
      options: [...variants],
      table: {
        category: copy.docs.categoryProps,
        type: { summary: copy.docs.typeLabels.variant },
        defaultValue: { summary: copy.variantLabels.neutral },
      },
    },
    size: {
      name: copy.docs.propNames.size,
      description: copy.docs.descriptions.size,
      control: { type: 'select', labels: copy.sizeLabels },
      options: [...sizes],
      table: {
        category: copy.docs.categoryProps,
        type: { summary: copy.docs.typeLabels.size },
        defaultValue: { summary: copy.sizeLabels.md },
      },
    },
    badgeStyle: {
      name: copy.docs.propNames.badgeStyle,
      description: copy.docs.descriptions.badgeStyle,
      control: { type: 'select', labels: copy.styleLabels },
      options: [...styles],
      table: {
        category: copy.docs.categoryProps,
        type: { summary: copy.docs.typeLabels.badgeStyle },
        defaultValue: { summary: copy.styleLabels.subtle },
      },
    },
    dot: {
      name: copy.docs.propNames.dot,
      description: copy.docs.descriptions.dot,
      control: { type: 'boolean' },
      table: {
        category: copy.docs.categoryProps,
        type: { summary: copy.docs.typeLabels.boolean },
        defaultValue: { summary: 'false' },
      },
    },
    removable: {
      name: copy.docs.propNames.removable,
      description: copy.docs.descriptions.removable,
      control: { type: 'boolean' },
      table: {
        category: copy.docs.categoryProps,
        type: { summary: copy.docs.typeLabels.boolean },
        defaultValue: { summary: 'false' },
      },
    },
    onRemove: {
      name: copy.docs.eventName,
      description: copy.docs.descriptions.remove,
      control: false,
      table: {
        category: copy.docs.categoryEvents,
        type: { summary: copy.docs.typeLabels.event },
      },
    },
    leading: {
      name: copy.docs.slotNames.leading,
      description: copy.docs.descriptions.leading,
      control: false,
      table: {
        category: copy.docs.categorySlots,
        type: { summary: copy.docs.typeLabels.slot },
      },
    },
    default: {
      name: copy.docs.slotNames.defaultSlot,
      description: copy.docs.descriptions.defaultSlot,
      control: false,
      table: {
        category: copy.docs.categorySlots,
        type: { summary: copy.docs.typeLabels.slot },
      },
    },
  }
}

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: { layout: 'centered', icon: 'bookmark' },
  decorators: [
    (story, context) => {
      const locale = resolveLocale(context.globals.locale)
      ;(context as { argTypes: Record<string, unknown> }).argTypes = {
        ...(context.argTypes as Record<string, unknown>),
        ...(buildArgTypes(locale) as Record<string, unknown>),
      }
      return story()
    },
  ],
  argTypes: buildArgTypes('en'),
  args: {
    variant: 'primary',
    size: 'md',
    badgeStyle: 'subtle',
    dot: false,
    removable: false,
  },
}

export default meta

type Story = StoryObj<typeof Badge>

export const Default: Story = {
  get name() {
    return getStoryName('default')
  },
  render: (args: Record<string, unknown>) => ({
    components: { Badge },
    setup: () => {
      const copy = useCopy()
      return { args, copy }
    },
    template: '<Badge v-bind="args">{{ copy.defaultLabel }}</Badge>',
  }),
}

export const AllVariants: Story = {
  get name() {
    return getStoryName('allVariants')
  },
  render: () => ({
    components: { Badge },
    setup: () => ({ variants, copy: useCopy() }),
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:8px;">
        <Badge v-for="v in variants" :key="v" :variant="v">{{ copy.variantLabels[v] }}</Badge>
      </div>
    `,
  }),
}

export const AllStyles: Story = {
  get name() {
    return getStoryName('allStyles')
  },
  render: () => ({
    components: { Badge },
    setup: () => ({ variants, styles, copy: useCopy() }),
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <div v-for="s in styles" :key="s" style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
          <span style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:var(--color-text-tertiary);width:52px;flex-shrink:0;">{{ copy.styleLabels[s] }}</span>
          <Badge v-for="v in variants" :key="v" :variant="v" :badge-style="s">{{ copy.variantLabels[v] }}</Badge>
        </div>
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  get name() {
    return getStoryName('allSizes')
  },
  render: () => ({
    components: { Badge },
    setup: () => ({ sizes, copy: useCopy(), getStoryRadiusStyle }),
    template: `
      <div style="display:flex;align-items:center;gap:8px;">
        <Badge
          v-for="s in sizes"
          :key="s"
          :size="s"
          variant="primary"
          :style="getStoryRadiusStyle(s)"
        >{{ copy.sizeLabels[s] }}</Badge>
      </div>
    `,
  }),
}

export const WithIcon: Story = {
  get name() {
    return getStoryName('withIcon')
  },
  render: () => ({
    components: { Badge, RiStarLine, RiCheckLine, RiAlertLine, RiFlashlightLine },
    setup: () => ({ copy: useCopy() }),
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:8px;">
        <Badge variant="primary">
          <template #leading><RiStarLine style="width:11px;height:11px;" /></template>
          {{ copy.iconLabels.featured }}
        </Badge>
        <Badge variant="success">
          <template #leading><RiCheckLine style="width:11px;height:11px;" /></template>
          {{ copy.iconLabels.verified }}
        </Badge>
        <Badge variant="warning">
          <template #leading><RiAlertLine style="width:11px;height:11px;" /></template>
          {{ copy.iconLabels.warning }}
        </Badge>
        <Badge variant="danger" badge-style="solid">
          <template #leading><RiFlashlightLine style="width:11px;height:11px;" /></template>
          {{ copy.iconLabels.critical }}
        </Badge>
      </div>
    `,
  }),
}

export const WithDot: Story = {
  get name() {
    return getStoryName('withDot')
  },
  render: () => ({
    components: { Badge },
    setup: () => ({ variants, copy: useCopy() }),
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:8px;">
        <Badge v-for="v in variants" :key="v" :variant="v" dot>{{ copy.variantLabels[v] }}</Badge>
      </div>
    `,
  }),
}

export const Removable: Story = {
  get name() {
    return getStoryName('removable')
  },
  render: () => ({
    components: { Badge },
    setup() {
      const copy = useCopy()
      const tags = ref([...copy.value.tags])
      watch(copy, (nextCopy) => {
        tags.value = [...nextCopy.tags]
      })
      return { tags, copy }
    },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:8px;min-height:32px;">
        <Badge
          v-for="tag in tags"
          :key="tag"
          variant="primary"
          removable
          @remove="tags = tags.filter(t => t !== tag)"
        >{{ tag }}</Badge>
        <span v-if="!tags.length" style="font-size:13px;color:var(--color-text-tertiary);">{{ copy.emptyState }}</span>
      </div>
    `,
  }),
}

export const FullMatrix: Story = {
  get name() {
    return getStoryName('fullMatrix')
  },
  render: () => ({
    components: { Badge },
    setup: () => ({ variants, styles, sizes, copy: useCopy(), getStoryRadiusStyle }),
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;">
        <div v-for="s in styles" :key="s">
          <p style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:10px;">{{ copy.styleLabels[s] }}</p>
          <div style="display:flex;flex-direction:column;gap:8px;">
            <div v-for="sz in sizes" :key="sz" style="display:flex;align-items:center;flex-wrap:wrap;gap:6px;">
              <span style="display:inline-flex;align-items:center;min-width:56px;white-space:nowrap;font-size:11px;color:var(--color-text-tertiary);flex-shrink:0;">{{ copy.sizeLabels[sz] }}</span>
              <Badge
                v-for="v in variants"
                :key="v"
                :variant="v"
                :badge-style="s"
                :size="sz"
                :style="getStoryRadiusStyle(sz)"
              >{{ copy.variantLabels[v] }}</Badge>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}
