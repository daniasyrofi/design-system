import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, ref } from 'vue'
import { within, expect } from 'storybook/test'
import { RiAddLine, RiArrowRightLine, RiDeleteBinLine, RiDownloadLine } from '@remixicon/vue'
import Button from './Button.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type Copy = {
  defaultLabel: string
  variantLabels: Record<
    'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link',
    string
  >
  sizeLabels: Record<Size, string>
  downloadAria: Record<Size, string>
  storyNames: {
    default: string
    allVariants: string
    allSizes: string
    withLeadingIcon: string
    withTrailingIcon: string
    opticalSpacing: string
    iconOnly: string
    loading: string
    states: string
    danger: string
  }
  labels: {
    addItem: string
    continue: string
    add: string
    delete: string
    deletePermanently: string
    cancel: string
    loading: string
    save: string
    disabled: string
    fullWidth: string
    redReserved: string
    continueWithEmail: string
    headingDisabled: string
    headingFullWidth: string
  }
}

const sizeOptions = ['xs', 'sm', 'md', 'lg', 'xl'] as const

const textPaddingBySize: Record<Size, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
}

const iconSidePaddingBySize: Record<Size, number> = {
  xs: 8,
  sm: 10,
  md: 12,
  lg: 14,
  xl: 20,
}

const iconTextPaddingBySize: Record<Size, number> = {
  xs: 10,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
}

const getButtonStyle = (size: Size, iconPlacement: 'none' | 'leading' | 'trailing' = 'none') => {
  const sharedStyle = {
    borderRadius: '999px',
    gap: '4px',
  }

  if (iconPlacement === 'leading') {
    return {
      ...sharedStyle,
      paddingInlineStart: `${iconSidePaddingBySize[size]}px`,
      paddingInlineEnd: `${iconTextPaddingBySize[size]}px`,
    }
  }

  if (iconPlacement === 'trailing') {
    return {
      ...sharedStyle,
      paddingInlineStart: `${iconTextPaddingBySize[size]}px`,
      paddingInlineEnd: `${iconSidePaddingBySize[size]}px`,
    }
  }

  return {
    ...sharedStyle,
    paddingInlineStart: `${textPaddingBySize[size]}px`,
    paddingInlineEnd: `${textPaddingBySize[size]}px`,
  }
}

const copyMap: Record<Locale, Copy> = {
  en: {
    defaultLabel: 'Button',
    variantLabels: {
      default: 'Default',
      primary: 'Primary',
      secondary: 'Secondary',
      outline: 'Outline',
      ghost: 'Ghost',
      danger: 'Danger',
      link: 'Link',
    },
    sizeLabels: {
      xs: 'Extra Small',
      sm: 'Small',
      md: 'Medium',
      lg: 'Large',
      xl: 'Extra Large',
    },
    downloadAria: {
      xs: 'Download extra small',
      sm: 'Download small',
      md: 'Download medium',
      lg: 'Download large',
      xl: 'Download extra large',
    },
    storyNames: {
      default: 'Default',
      allVariants: 'All Variants',
      allSizes: 'All Sizes',
      withLeadingIcon: 'With Leading Icon',
      withTrailingIcon: 'With Trailing Icon',
      opticalSpacing: 'Optical Spacing Rules',
      iconOnly: 'Icon Only',
      loading: 'Loading',
      states: 'States',
      danger: 'Danger - Destructive',
    },
    labels: {
      addItem: 'Add Item',
      continue: 'Continue',
      add: 'Add',
      delete: 'Delete',
      deletePermanently: 'Delete permanently',
      cancel: 'Cancel',
      loading: 'Loading',
      save: 'Save',
      disabled: 'Disabled',
      fullWidth: 'Full Width',
      redReserved: 'Red is reserved for destructive actions only.',
      continueWithEmail: 'Sign in with email',
      headingDisabled: 'Disabled',
      headingFullWidth: 'Full Width',
    },
  },
  id: {
    defaultLabel: 'Tombol',
    variantLabels: {
      default: 'Bawaan',
      primary: 'Utama',
      secondary: 'Sekunder',
      outline: 'Garis',
      ghost: 'Hantu',
      danger: 'Bahaya',
      link: 'Tautan',
    },
    sizeLabels: {
      xs: 'Ekstra Kecil',
      sm: 'Kecil',
      md: 'Sedang',
      lg: 'Besar',
      xl: 'Ekstra Besar',
    },
    downloadAria: {
      xs: 'Unduh ukuran ekstra kecil',
      sm: 'Unduh ukuran kecil',
      md: 'Unduh ukuran sedang',
      lg: 'Unduh ukuran besar',
      xl: 'Unduh ukuran ekstra besar',
    },
    storyNames: {
      default: 'Bawaan',
      allVariants: 'Semua Varian',
      allSizes: 'Semua Ukuran',
      withLeadingIcon: 'Dengan Ikon Depan',
      withTrailingIcon: 'Dengan Ikon Belakang',
      opticalSpacing: 'Aturan Spasi Optical',
      iconOnly: 'Hanya Ikon',
      loading: 'Memuat',
      states: 'Status',
      danger: 'Bahaya - Destruktif',
    },
    labels: {
      addItem: 'Tambah Item',
      continue: 'Lanjutkan',
      add: 'Tambah',
      delete: 'Hapus',
      deletePermanently: 'Hapus permanen',
      cancel: 'Batal',
      loading: 'Memuat',
      save: 'Simpan',
      disabled: 'Dinonaktifkan',
      fullWidth: 'Lebar Penuh',
      redReserved: 'Merah hanya untuk aksi destruktif.',
      continueWithEmail: 'Masuk dengan email',
      headingDisabled: 'Dinonaktifkan',
      headingFullWidth: 'Lebar Penuh',
    },
  },
  zh: {
    defaultLabel: '按钮',
    variantLabels: {
      default: '默认',
      primary: '主要',
      secondary: '次要',
      outline: '描边',
      ghost: '幽灵',
      danger: '危险',
      link: '链接',
    },
    sizeLabels: {
      xs: '超小',
      sm: '小',
      md: '中',
      lg: '大',
      xl: '超大',
    },
    downloadAria: {
      xs: '下载超小尺寸',
      sm: '下载小尺寸',
      md: '下载中尺寸',
      lg: '下载大尺寸',
      xl: '下载超大尺寸',
    },
    storyNames: {
      default: '默认',
      allVariants: '全部变体',
      allSizes: '全部尺寸',
      withLeadingIcon: '带前置图标',
      withTrailingIcon: '带后置图标',
      opticalSpacing: '光学间距规则',
      iconOnly: '仅图标',
      loading: '加载',
      states: '状态',
      danger: '危险 - 破坏性',
    },
    labels: {
      addItem: '添加项目',
      continue: '继续',
      add: '添加',
      delete: '删除',
      deletePermanently: '永久删除',
      cancel: '取消',
      loading: '加载中',
      save: '保存',
      disabled: '禁用',
      fullWidth: '全宽',
      redReserved: '红色仅用于破坏性操作。',
      continueWithEmail: '使用邮箱登录',
      headingDisabled: '禁用',
      headingFullWidth: '全宽',
    },
  },
}

const getLocale = (): Locale => resolveLocale(getI18nLocale())
const useCopy = () => computed(() => copyMap[getLocale()])
const getStoryName = (key: keyof Copy['storyNames']) => copyMap[getLocale()].storyNames[key]

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered', icon: 'button' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'outline', 'ghost', 'danger', 'link'],
    },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  args: {
    variant: 'default',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
  },
}
export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  get name() {
    return getStoryName('default')
  },
  render: (args: Record<string, unknown>) => ({
    components: { Button },
    setup: () => {
      const copy = useCopy()
      const storyStyle = computed(() =>
        args.variant === 'link' ? undefined : getButtonStyle((args.size ?? 'md') as Size)
      )
      return { args, copy, storyStyle }
    },
    template: '<Button v-bind="args" :style="storyStyle">{{ copy.defaultLabel }}</Button>',
  }),
}

export const AllVariants: Story = {
  get name() {
    return getStoryName('allVariants')
  },
  render: () => ({
    components: { Button },
    setup: () => ({
      copy: useCopy(),
      variants: ['default', 'primary', 'secondary', 'outline', 'ghost', 'danger', 'link'] as const,
      getButtonStyle,
    }),
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;">
        <Button v-for="variant in variants" :key="variant" :variant="variant" :style="variant === 'link' ? undefined : getButtonStyle('md')">{{ copy.variantLabels[variant] }}</Button>
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  get name() {
    return getStoryName('allSizes')
  },
  render: () => ({
    components: { Button },
    setup: () => ({ copy: useCopy(), sizes: sizeOptions, getButtonStyle }),
    template: `
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;">
        <Button v-for="size in sizes" :key="size" :size="size" :style="getButtonStyle(size)">{{ copy.sizeLabels[size] }}</Button>
      </div>
    `,
  }),
}

export const WithLeadingIcon: Story = {
  get name() {
    return getStoryName('withLeadingIcon')
  },
  render: () => ({
    components: { Button, RiAddLine },
    setup: () => ({ copy: useCopy(), sizes: sizeOptions, getButtonStyle }),
    template: `
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;">
        <Button v-for="size in sizes" :key="size" :size="size" :style="getButtonStyle(size, 'leading')">
          <template #leading><RiAddLine style="width:1em;height:1em;" /></template>
          {{ copy.labels.addItem }}
        </Button>
      </div>
    `,
  }),
}

export const WithTrailingIcon: Story = {
  get name() {
    return getStoryName('withTrailingIcon')
  },
  render: () => ({
    components: { Button, RiArrowRightLine },
    setup: () => ({ copy: useCopy(), sizes: sizeOptions, getButtonStyle }),
    template: `
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;">
        <Button v-for="size in sizes" :key="size" :size="size" :style="getButtonStyle(size, 'trailing')">
          {{ copy.labels.continue }}
          <template #trailing><RiArrowRightLine style="width:1em;height:1em;" /></template>
        </Button>
      </div>
    `,
  }),
}

export const OpticalSpacing: Story = {
  get name() {
    return getStoryName('opticalSpacing')
  },
  render: () => ({
    components: { Button, RiArrowRightLine },
    setup: () => ({ copy: useCopy() }),
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;max-width:480px;">
        <div style="display:flex;flex-direction:column;gap:8px;">
          <p style="font-size:12px;font-weight:600;color:var(--color-text-secondary);margin:0;">Text-only (symmetrical padding)</p>
          <Button>{{ copy.labels.continueWithEmail }}</Button>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <p style="font-size:12px;font-weight:600;color:var(--color-text-secondary);margin:0;">Trailing icon (optical compensation)</p>
          <Button>
            {{ copy.labels.continue }}
            <template #trailing><RiArrowRightLine style="width:1em;height:1em;" /></template>
          </Button>
        </div>
      </div>
    `,
  }),
}

export const IconOnly: Story = {
  get name() {
    return getStoryName('iconOnly')
  },
  render: () => ({
    components: { Button, RiDownloadLine, RiAddLine, RiDeleteBinLine },
    setup: () => ({ copy: useCopy(), sizes: sizeOptions }),
    template: `
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;">
        <Button
          v-for="size in sizes"
          :key="size"
          :size="size"
          :iconOnly="true"
          :aria-label="copy.downloadAria[size]"
        >
          <template #icon><RiDownloadLine style="width:1em;height:1em;" /></template>
        </Button>
        <div style="width:1px;height:32px;background:var(--color-border);"></div>
        <Button variant="outline" :iconOnly="true" :aria-label="copy.labels.add">
          <template #icon><RiAddLine style="width:1em;height:1em;" /></template>
        </Button>
        <Button variant="ghost" :iconOnly="true" :aria-label="copy.labels.delete">
          <template #icon><RiDeleteBinLine style="width:1em;height:1em;" /></template>
        </Button>
        <Button variant="danger" :iconOnly="true" :aria-label="copy.labels.deletePermanently">
          <template #icon><RiDeleteBinLine style="width:1em;height:1em;" /></template>
        </Button>
      </div>
    `,
  }),
}

export const Loading: Story = {
  get name() {
    return getStoryName('loading')
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)

    // The always-loading buttons (outline and ghost variants) have aria-busy="true" statically
    const buttons = canvas.getAllByRole('button')
    const busyButtons = buttons.filter((btn) => btn.getAttribute('aria-busy') === 'true')
    await expect(busyButtons.length).toBeGreaterThan(0)

    for (const btn of busyButtons) {
      await expect(btn).toHaveAttribute('aria-busy', 'true')
    }
  },
  render: () => ({
    components: { Button },
    setup() {
      const copy = useCopy()
      const loading = ref(false)
      async function handleClick() {
        loading.value = true
        await new Promise((r) => setTimeout(r, 2000))
        loading.value = false
      }
      return { copy, loading, handleClick, getButtonStyle }
    },
    template: `
      <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;">
        <Button :loading="loading" :style="getButtonStyle('md', 'leading')" @click="handleClick">
          {{ loading ? copy.labels.loading : copy.labels.save }}
        </Button>
        <Button variant="outline" loading :style="getButtonStyle('md', 'leading')">{{ copy.labels.loading }}</Button>
        <Button variant="ghost" loading :style="getButtonStyle('md', 'leading')">{{ copy.labels.loading }}</Button>
      </div>
    `,
  }),
}

export const States: Story = {
  get name() {
    return getStoryName('states')
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)

    // All buttons in the disabled section should have aria-disabled="true"
    const buttons = canvas.getAllByRole('button')
    const disabledButtons = buttons.filter(
      (btn) => btn.getAttribute('aria-disabled') === 'true'
    )
    await expect(disabledButtons.length).toBeGreaterThan(0)

    // Each disabled button should have aria-disabled attribute
    for (const btn of disabledButtons) {
      await expect(btn).toHaveAttribute('aria-disabled', 'true')
    }
  },
  render: () => ({
    components: { Button },
    setup: () => ({ copy: useCopy(), getButtonStyle }),
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <div>
          <p style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:10px;">{{ copy.labels.headingDisabled }}</p>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <Button disabled :style="getButtonStyle('md')">{{ copy.variantLabels.default }}</Button>
            <Button variant="primary" disabled :style="getButtonStyle('md')">{{ copy.variantLabels.primary }}</Button>
            <Button variant="outline" disabled :style="getButtonStyle('md')">{{ copy.variantLabels.outline }}</Button>
            <Button variant="ghost" disabled :style="getButtonStyle('md')">{{ copy.variantLabels.ghost }}</Button>
            <Button variant="danger" disabled :style="getButtonStyle('md')">{{ copy.variantLabels.danger }}</Button>
          </div>
        </div>
        <div>
          <p style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:10px;">{{ copy.labels.headingFullWidth }}</p>
          <div style="width:280px;display:flex;flex-direction:column;gap:8px;">
            <Button fullWidth :style="getButtonStyle('md')">{{ copy.labels.fullWidth }} {{ copy.variantLabels.default }}</Button>
            <Button variant="outline" fullWidth :style="getButtonStyle('md')">{{ copy.labels.fullWidth }} {{ copy.variantLabels.outline }}</Button>
          </div>
        </div>
      </div>
    `,
  }),
}

export const Danger: Story = {
  get name() {
    return getStoryName('danger')
  },
  render: () => ({
    components: { Button, RiDeleteBinLine },
    setup: () => ({
      copy: useCopy(),
      confirmed: ref(false),
      getButtonStyle,
    }),
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;max-width:320px;">
        <p style="font-size:14px;color:var(--color-text-secondary);">{{ copy.labels.redReserved }}</p>
        <div style="display:flex;gap:8px;">
          <Button variant="danger" :style="getButtonStyle('md', 'leading')">
            <template #leading><RiDeleteBinLine style="width:1em;height:1em;" /></template>
            {{ copy.labels.delete }}
          </Button>
          <Button variant="outline" :style="getButtonStyle('md')">{{ copy.labels.cancel }}</Button>
        </div>
      </div>
    `,
  }),
}
