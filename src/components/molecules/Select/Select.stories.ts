import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, ref } from 'vue'
import Select from './Select.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type Option = { label: string; value: string; group?: string }

type Copy = {
  storyNames: {
    default: string
    multiple: string
    searchable: string
    withGroups: string
    clearable: string
    disabled: string
    allSizes: string
  }
  fruitOptions: Option[]
  groupedOptions: Option[]
  default: {
    label: string
    selected: string
    placeholder: string
  }
  multiple: {
    label: string
    placeholder: string
    selected: string
  }
  searchable: {
    label: string
    placeholder: string
  }
  grouped: {
    label: string
    placeholder: string
  }
  clearable: {
    label: string
    helper: string
  }
  disabled: {
    label: string
  }
  sizePlaceholders: {
    small: string
    medium: string
    large: string
  }
  sizes: {
    small: string
    medium: string
    large: string
  }
}

const copyMap: Record<Locale, Copy> = {
  en: {
    storyNames: {
      default: 'Default',
      multiple: 'Multiple',
      searchable: 'Searchable',
      withGroups: 'With Groups',
      clearable: 'Clearable',
      disabled: 'Disabled',
      allSizes: 'All Sizes',
    },
    fruitOptions: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Cherry', value: 'cherry' },
      { label: 'Dragonfruit', value: 'dragonfruit' },
      { label: 'Elderberry', value: 'elderberry' },
      { label: 'Fig', value: 'fig' },
      { label: 'Grape', value: 'grape' },
    ],
    groupedOptions: [
      { label: 'Apple', value: 'apple', group: 'Fruits' },
      { label: 'Banana', value: 'banana', group: 'Fruits' },
      { label: 'Cherry', value: 'cherry', group: 'Fruits' },
      { label: 'Carrot', value: 'carrot', group: 'Vegetables' },
      { label: 'Broccoli', value: 'broccoli', group: 'Vegetables' },
      { label: 'Spinach', value: 'spinach', group: 'Vegetables' },
      { label: 'Salmon', value: 'salmon', group: 'Protein' },
      { label: 'Chicken', value: 'chicken', group: 'Protein' },
    ],
    default: { label: 'Favorite fruit', selected: 'Selected:', placeholder: 'Select...' },
    multiple: { label: 'Pick fruits', placeholder: 'Choose fruits...', selected: 'Selected:' },
    searchable: { label: 'Search and select', placeholder: 'Type to search...' },
    grouped: { label: 'Food category', placeholder: 'Select food...' },
    clearable: { label: 'Clearable select', helper: 'Click the x to clear the selection.' },
    disabled: { label: 'Disabled select' },
    sizePlaceholders: {
      small: 'Select small size',
      medium: 'Select medium size',
      large: 'Select large size',
    },
    sizes: { small: 'Small', medium: 'Medium', large: 'Large' },
  },
  id: {
    storyNames: {
      default: 'Bawaan',
      multiple: 'Banyak',
      searchable: 'Bisa Dicari',
      withGroups: 'Dengan Grup',
      clearable: 'Dapat Dikosongkan',
      disabled: 'Nonaktif',
      allSizes: 'Semua Ukuran',
    },
    fruitOptions: [
      { label: 'Apel', value: 'apple' },
      { label: 'Pisang', value: 'banana' },
      { label: 'Ceri', value: 'cherry' },
      { label: 'Buah Naga', value: 'dragonfruit' },
      { label: 'Mengkudu', value: 'elderberry' },
      { label: 'Ara', value: 'fig' },
      { label: 'Anggur', value: 'grape' },
    ],
    groupedOptions: [
      { label: 'Apel', value: 'apple', group: 'Buah' },
      { label: 'Pisang', value: 'banana', group: 'Buah' },
      { label: 'Ceri', value: 'cherry', group: 'Buah' },
      { label: 'Wortel', value: 'carrot', group: 'Sayuran' },
      { label: 'Brokoli', value: 'broccoli', group: 'Sayuran' },
      { label: 'Bayam', value: 'spinach', group: 'Sayuran' },
      { label: 'Salmon', value: 'salmon', group: 'Protein' },
      { label: 'Ayam', value: 'chicken', group: 'Protein' },
    ],
    default: { label: 'Buah favorit', selected: 'Dipilih:', placeholder: 'Pilih...' },
    multiple: { label: 'Pilih buah', placeholder: 'Pilih buah...', selected: 'Dipilih:' },
    searchable: { label: 'Cari dan pilih', placeholder: 'Ketik untuk mencari...' },
    grouped: { label: 'Kategori makanan', placeholder: 'Pilih makanan...' },
    clearable: { label: 'Pilihan yang bisa dikosongkan', helper: 'Klik x untuk menghapus pilihan.' },
    disabled: { label: 'Pilihan nonaktif' },
    sizePlaceholders: {
      small: 'Pilih ukuran kecil',
      medium: 'Pilih ukuran sedang',
      large: 'Pilih ukuran besar',
    },
    sizes: { small: 'Kecil', medium: 'Sedang', large: 'Besar' },
  },
  zh: {
    storyNames: {
      default: '默认',
      multiple: '多选',
      searchable: '可搜索',
      withGroups: '带分组',
      clearable: '可清除',
      disabled: '禁用',
      allSizes: '所有尺寸',
    },
    fruitOptions: [
      { label: '苹果', value: 'apple' },
      { label: '香蕉', value: 'banana' },
      { label: '樱桃', value: 'cherry' },
      { label: '火龙果', value: 'dragonfruit' },
      { label: '接骨木莓', value: 'elderberry' },
      { label: '无花果', value: 'fig' },
      { label: '葡萄', value: 'grape' },
    ],
    groupedOptions: [
      { label: '苹果', value: 'apple', group: '水果' },
      { label: '香蕉', value: 'banana', group: '水果' },
      { label: '樱桃', value: 'cherry', group: '水果' },
      { label: '胡萝卜', value: 'carrot', group: '蔬菜' },
      { label: '西兰花', value: 'broccoli', group: '蔬菜' },
      { label: '菠菜', value: 'spinach', group: '蔬菜' },
      { label: '三文鱼', value: 'salmon', group: '蛋白质' },
      { label: '鸡肉', value: 'chicken', group: '蛋白质' },
    ],
    default: { label: '最喜欢的水果', selected: '已选择：', placeholder: '请选择...' },
    multiple: { label: '选择水果', placeholder: '请选择水果...', selected: '已选择：' },
    searchable: { label: '搜索并选择', placeholder: '输入以搜索...' },
    grouped: { label: '食物分类', placeholder: '选择食物...' },
    clearable: { label: '可清除选择', helper: '点击 x 可清除选择。' },
    disabled: { label: '禁用选择器' },
    sizePlaceholders: {
      small: '选择小尺寸',
      medium: '选择中尺寸',
      large: '选择大尺寸',
    },
    sizes: { small: '小', medium: '中', large: '大' },
  },
}

const getLocale = (): Locale => resolveLocale(getI18nLocale())
const useCopy = () => computed(() => copyMap[getLocale()])
const getStoryName = (key: keyof Copy['storyNames']) => copyMap[getLocale()].storyNames[key]

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

const meta: Meta<typeof Select> = {
  title: 'Molecules/Select',
  component: Select,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    size:       { control: 'select', options: ['sm', 'md', 'lg'] },
    multiple:   { control: 'boolean' },
    searchable: { control: 'boolean' },
    clearable:  { control: 'boolean' },
    disabled:   { control: 'boolean' },
  },
  args: {
    size:       'md',
    multiple:   false,
    searchable: false,
    clearable:  false,
    disabled:   false,
  },
}
export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  get name() {
    return getStoryName('default')
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const value = ref('')
      return { value, args, copy: useCopy() }
    },
    template: `
      <div style="width:320px;">
        <Select
          v-bind="args"
          v-model="value"
          :label="copy.default.label"
          :placeholder="copy.default.placeholder"
          :options="copy.fruitOptions"
        />
        <p style="margin-top:8px;font-size:12px;color:var(--color-text-tertiary);">{{ copy.default.selected }} {{ value || 'none' }}</p>
      </div>
    `,
  }),
}

export const Multiple: Story = {
  get name() {
    return getStoryName('multiple')
  },
  render: () => ({
    components: { Select },
    setup() {
      const value = ref<string[]>([])
      return { value, copy: useCopy() }
    },
    template: `
      <div style="width:320px;">
        <Select
          v-model="value"
          :label="copy.multiple.label"
          :options="copy.fruitOptions"
          multiple
          :placeholder="copy.multiple.placeholder"
        />
        <p style="margin-top:8px;font-size:12px;color:var(--color-text-tertiary);">{{ copy.multiple.selected }} {{ value.join(', ') || 'none' }}</p>
      </div>
    `,
  }),
}

export const Searchable: Story = {
  get name() {
    return getStoryName('searchable')
  },
  render: () => ({
    components: { Select },
    setup() {
      const value = ref('')
      return { value, copy: useCopy() }
    },
    template: `
      <div style="width:320px;">
        <Select
          v-model="value"
          :label="copy.searchable.label"
          :options="copy.fruitOptions"
          searchable
          :placeholder="copy.searchable.placeholder"
        />
      </div>
    `,
  }),
}

export const WithGroups: Story = {
  get name() {
    return getStoryName('withGroups')
  },
  render: () => ({
    components: { Select },
    setup() {
      const value = ref('')
      return { value, copy: useCopy() }
    },
    template: `
      <div style="width:320px;">
        <Select
          v-model="value"
          :label="copy.grouped.label"
          :options="copy.groupedOptions"
          searchable
          :placeholder="copy.grouped.placeholder"
        />
      </div>
    `,
  }),
}

export const Clearable: Story = {
  get name() {
    return getStoryName('clearable')
  },
  render: () => ({
    components: { Select },
    setup() {
      const value = ref('banana')
      return { value, copy: useCopy() }
    },
    template: `
      <div style="width:320px;">
        <Select
          v-model="value"
          :label="copy.clearable.label"
          :options="copy.fruitOptions"
          clearable
          :helper-text="copy.clearable.helper"
        />
      </div>
    `,
  }),
}

export const Disabled: Story = {
  get name() {
    return getStoryName('disabled')
  },
  render: () => ({
    components: { Select },
    setup() {
      const value = ref('cherry')
      return { value, copy: useCopy() }
    },
    template: `
      <div style="width:320px;">
        <Select
          v-model="value"
          :label="copy.disabled.label"
          :options="copy.fruitOptions"
          disabled
        />
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  get name() {
    return getStoryName('allSizes')
  },
  render: () => ({
    components: { Select },
    setup() {
      const sm = ref('')
      const md = ref('')
      const lg = ref('')
      return { sm, md, lg, copy: useCopy() }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;width:320px;">
        <Select v-model="sm" size="sm" :label="copy.sizes.small" :options="copy.fruitOptions" :placeholder="copy.sizePlaceholders.small" />
        <Select v-model="md" size="md" :label="copy.sizes.medium" :options="copy.fruitOptions" :placeholder="copy.sizePlaceholders.medium" />
        <Select v-model="lg" size="lg" :label="copy.sizes.large" :options="copy.fruitOptions" :placeholder="copy.sizePlaceholders.large" />
      </div>
    `,
  }),
}
