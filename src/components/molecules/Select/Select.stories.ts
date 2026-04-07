import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, ref } from 'vue'
import { userEvent, within, expect } from 'storybook/test'
import Select from './Select.vue'
import SelectTrigger from './SelectTrigger.vue'
import SelectContent from './SelectContent.vue'
import SelectItem from './SelectItem.vue'
import SelectGroup from './SelectGroup.vue'
import SelectSeparator from './SelectSeparator.vue'
import Avatar from '@/components/atoms/Avatar/Avatar.vue'
import Badge from '@/components/atoms/Badge/Badge.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale
type Option = { label: string; value: string; disabled?: boolean }
type GroupedOption = Option & { group: string }

type Copy = {
  storyNames: {
    default: string
    multiple: string
    searchable: string
    withGroups: string
    clearable: string
    disabled: string
    allSizes: string
    withError: string
    customItems: string
  }
  fruitOptions: Option[]
  groupedOptions: GroupedOption[]
  default: { label: string; placeholder: string; selected: string }
  multiple: { label: string; placeholder: string; selected: string }
  searchable: { label: string; placeholder: string }
  grouped: { label: string; placeholder: string }
  clearable: { label: string; helper: string }
  disabled: { label: string }
  withError: { label: string; error: string; helper: string }
  sizes: { small: string; medium: string; large: string }
  sizePlaceholders: { small: string; medium: string; large: string }
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
      withError: 'With Error',
      customItems: 'Custom Items',
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
    default: { label: 'Favorite fruit', placeholder: 'Select...', selected: 'Selected:' },
    multiple: { label: 'Pick fruits', placeholder: 'Choose fruits...', selected: 'Selected:' },
    searchable: { label: 'Search and select', placeholder: 'Type to search...' },
    grouped: { label: 'Food category', placeholder: 'Select food...' },
    clearable: { label: 'Clearable select', helper: 'Click the × to clear the selection.' },
    disabled: { label: 'Disabled select' },
    withError: {
      label: 'Allergies',
      error: 'Please select at least one option.',
      helper: 'Choose all that apply.',
    },
    sizes: { small: 'Small', medium: 'Medium', large: 'Large' },
    sizePlaceholders: { small: 'Select small', medium: 'Select medium', large: 'Select large' },
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
      withError: 'Dengan Error',
      customItems: 'Item Kustom',
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
    default: { label: 'Buah favorit', placeholder: 'Pilih...', selected: 'Dipilih:' },
    multiple: { label: 'Pilih buah', placeholder: 'Pilih buah...', selected: 'Dipilih:' },
    searchable: { label: 'Cari dan pilih', placeholder: 'Ketik untuk mencari...' },
    grouped: { label: 'Kategori makanan', placeholder: 'Pilih makanan...' },
    clearable: {
      label: 'Pilihan yang bisa dikosongkan',
      helper: 'Klik × untuk menghapus pilihan.',
    },
    disabled: { label: 'Pilihan nonaktif' },
    withError: {
      label: 'Alergi',
      error: 'Harap pilih setidaknya satu opsi.',
      helper: 'Pilih semua yang berlaku.',
    },
    sizes: { small: 'Kecil', medium: 'Sedang', large: 'Besar' },
    sizePlaceholders: { small: 'Pilih kecil', medium: 'Pilih sedang', large: 'Pilih besar' },
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
      withError: '带错误',
      customItems: '自定义选项',
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
    default: { label: '最喜欢的水果', placeholder: '请选择...', selected: '已选择：' },
    multiple: { label: '选择水果', placeholder: '请选择水果...', selected: '已选择：' },
    searchable: { label: '搜索并选择', placeholder: '输入以搜索...' },
    grouped: { label: '食物分类', placeholder: '选择食物...' },
    clearable: { label: '可清除选择', helper: '点击 × 可清除选择。' },
    disabled: { label: '禁用选择器' },
    withError: { label: '过敏情况', error: '请至少选择一项。', helper: '请选择所有适用项。' },
    sizes: { small: '小', medium: '中', large: '大' },
    sizePlaceholders: { small: '选择小尺寸', medium: '选择中尺寸', large: '选择大尺寸' },
  },
}

const getLocale = (): Locale => resolveLocale(getI18nLocale())
const useCopy = () => computed(() => copyMap[getLocale()])
const getStoryName = (key: keyof Copy['storyNames']) => copyMap[getLocale()].storyNames[key]

// Helper: group array into Record<groupName, items[]>
function groupBy<T extends { group: string }>(arr: T[]): Record<string, T[]> {
  return arr.reduce<Record<string, T[]>>((acc, item) => {
    ;(acc[item.group] ??= []).push(item)
    return acc
  }, {})
}

// ── Canvas decorator ──────────────────────────────────────────────────────────
const canvas = () => ({
  template: `
    <div style="
      min-height: 100vh; display: flex; align-items: center; justify-content: center;
      padding: 48px 32px; background-color: #eceae4;
      background-image: radial-gradient(circle, rgba(0,0,0,0.11) 1px, transparent 1px);
      background-size: 22px 22px;
    "><story /></div>
  `,
})

const meta: Meta<typeof Select> = {
  title: 'Molecules/Select',
  component: Select,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'Selected value(s). String for single, string[] for multiple.',
    },
    multiple: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    label: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'text' },
    loading: { control: 'boolean' },
    readonly: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    modelValue: '',
    size: 'md',
    multiple: false,
    disabled: false,
  },
}
export default meta
type Story = StoryObj<typeof Select>

// ── Stories ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  get name() {
    return getStoryName('default')
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)

    // Click the SelectTrigger (button with aria-haspopup="listbox") to open dropdown
    const trigger = canvas.getByRole('button', { name: /select\.\.\.|pilih\.\.\.|请选择/i })
    await userEvent.click(trigger)

    // Listbox renders via Teleport — query against document.body
    const body = within(document.body)
    const listbox = body.getByRole('listbox')
    await expect(listbox).toBeVisible()

    // Click first option
    const options = body.getAllByRole('option')
    await userEvent.click(options[0])

    // Listbox should close after selection
    await expect(body.queryByRole('listbox')).not.toBeVisible()
  },
  render: () => ({
    components: { Select, SelectTrigger, SelectContent, SelectItem },
    setup() {
      const value = ref('')
      const copy = useCopy()
      return { value, copy }
    },
    template: `
      <div style="width:320px;">
        <Select v-model="value" :label="copy.default.label">
          <SelectTrigger :placeholder="copy.default.placeholder" />
          <SelectContent>
            <SelectItem v-for="opt in copy.fruitOptions" :key="opt.value"
              :value="opt.value" :label="opt.label">
              {{ opt.label }}
            </SelectItem>
          </SelectContent>
        </Select>
        <p style="margin-top:8px;font-size:12px;color:var(--color-text-tertiary);">
          {{ copy.default.selected }} {{ value || 'none' }}
        </p>
      </div>
    `,
  }),
}

export const Multiple: Story = {
  get name() {
    return getStoryName('multiple')
  },
  render: () => ({
    components: { Select, SelectTrigger, SelectContent, SelectItem },
    setup() {
      const value = ref<string[]>([])
      const copy = useCopy()
      return { value, copy }
    },
    template: `
      <div style="width:320px;">
        <Select v-model="value" :label="copy.multiple.label" multiple>
          <SelectTrigger :placeholder="copy.multiple.placeholder" />
          <SelectContent>
            <SelectItem v-for="opt in copy.fruitOptions" :key="opt.value"
              :value="opt.value" :label="opt.label">
              {{ opt.label }}
            </SelectItem>
          </SelectContent>
        </Select>
        <p style="margin-top:8px;font-size:12px;color:var(--color-text-tertiary);">
          {{ copy.multiple.selected }} {{ value.join(', ') || 'none' }}
        </p>
      </div>
    `,
  }),
}

export const Searchable: Story = {
  get name() {
    return getStoryName('searchable')
  },
  render: () => ({
    components: { Select, SelectTrigger, SelectContent, SelectItem },
    setup() {
      const value = ref('')
      const copy = useCopy()
      return { value, copy }
    },
    template: `
      <div style="width:320px;">
        <Select v-model="value" :label="copy.searchable.label">
          <SelectTrigger :placeholder="copy.searchable.placeholder" />
          <SelectContent searchable>
            <SelectItem v-for="opt in copy.fruitOptions" :key="opt.value"
              :value="opt.value" :label="opt.label">
              {{ opt.label }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    `,
  }),
}

export const WithGroups: Story = {
  get name() {
    return getStoryName('withGroups')
  },
  render: () => ({
    components: { Select, SelectTrigger, SelectContent, SelectItem, SelectGroup },
    setup() {
      const value = ref('')
      const copy = useCopy()
      const grouped = computed(() => groupBy(copy.value.groupedOptions))
      return { value, copy, grouped }
    },
    template: `
      <div style="width:320px;">
        <Select v-model="value" :label="copy.grouped.label">
          <SelectTrigger :placeholder="copy.grouped.placeholder" />
          <SelectContent searchable>
            <SelectGroup v-for="(items, groupName) in grouped" :key="groupName" :label="groupName">
              <SelectItem v-for="opt in items" :key="opt.value"
                :value="opt.value" :label="opt.label">
                {{ opt.label }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    `,
  }),
}

export const Clearable: Story = {
  get name() {
    return getStoryName('clearable')
  },
  render: () => ({
    components: { Select, SelectTrigger, SelectContent, SelectItem },
    setup() {
      const value = ref('banana')
      const copy = useCopy()
      return { value, copy }
    },
    template: `
      <div style="width:320px;">
        <Select v-model="value" :label="copy.clearable.label" :helper-text="copy.clearable.helper">
          <SelectTrigger clearable />
          <SelectContent>
            <SelectItem v-for="opt in copy.fruitOptions" :key="opt.value"
              :value="opt.value" :label="opt.label">
              {{ opt.label }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  get name() {
    return getStoryName('disabled')
  },
  render: () => ({
    components: { Select, SelectTrigger, SelectContent, SelectItem },
    setup() {
      const value = ref('cherry')
      const copy = useCopy()
      return { value, copy }
    },
    template: `
      <div style="width:320px;">
        <Select v-model="value" :label="copy.disabled.label" disabled>
          <SelectTrigger />
          <SelectContent>
            <SelectItem v-for="opt in copy.fruitOptions" :key="opt.value"
              :value="opt.value" :label="opt.label">
              {{ opt.label }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  get name() {
    return getStoryName('allSizes')
  },
  render: () => ({
    components: { Select, SelectTrigger, SelectContent, SelectItem },
    setup() {
      const sm = ref('')
      const md = ref('')
      const lg = ref('')
      const copy = useCopy()
      return { sm, md, lg, copy }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;width:320px;">
        <Select v-model="sm" size="sm" :label="copy.sizes.small">
          <SelectTrigger :placeholder="copy.sizePlaceholders.small" />
          <SelectContent>
            <SelectItem v-for="opt in copy.fruitOptions" :key="opt.value"
              :value="opt.value" :label="opt.label">{{ opt.label }}</SelectItem>
          </SelectContent>
        </Select>
        <Select v-model="md" size="md" :label="copy.sizes.medium">
          <SelectTrigger :placeholder="copy.sizePlaceholders.medium" />
          <SelectContent>
            <SelectItem v-for="opt in copy.fruitOptions" :key="opt.value"
              :value="opt.value" :label="opt.label">{{ opt.label }}</SelectItem>
          </SelectContent>
        </Select>
        <Select v-model="lg" size="lg" :label="copy.sizes.large">
          <SelectTrigger :placeholder="copy.sizePlaceholders.large" />
          <SelectContent>
            <SelectItem v-for="opt in copy.fruitOptions" :key="opt.value"
              :value="opt.value" :label="opt.label">{{ opt.label }}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    `,
  }),
}

export const WithError: Story = {
  get name() {
    return getStoryName('withError')
  },
  render: () => ({
    components: { Select, SelectTrigger, SelectContent, SelectItem },
    setup() {
      const value = ref('')
      const copy = useCopy()
      return { value, copy }
    },
    template: `
      <div style="width:320px;">
        <Select v-model="value" :label="copy.withError.label"
          :error="copy.withError.error" :helper-text="copy.withError.helper">
          <SelectTrigger />
          <SelectContent>
            <SelectItem v-for="opt in copy.fruitOptions" :key="opt.value"
              :value="opt.value" :label="opt.label">
              {{ opt.label }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    `,
  }),
}

export const CustomItems: Story = {
  get name() {
    return getStoryName('customItems')
  },
  render: () => ({
    components: {
      Select,
      SelectTrigger,
      SelectContent,
      SelectItem,
      SelectSeparator,
      Avatar,
      Badge,
    },
    setup() {
      const value = ref('')
      return { value }
    },
    template: `
      <div style="width:300px;">
        <Select v-model="value" label="Assign to">
          <SelectTrigger placeholder="Choose a person..." />
          <SelectContent>
            <SelectItem value="alice" label="Alice Johnson">
              <Avatar name="Alice Johnson" size="xs" />
              <span style="flex:1">Alice Johnson</span>
              <Badge variant="primary" badge-style="subtle" size="sm">Admin</Badge>
            </SelectItem>
            <SelectItem value="bob" label="Bob Smith">
              <Avatar name="Bob Smith" size="xs" />
              <span style="flex:1">Bob Smith</span>
              <Badge variant="success" badge-style="subtle" size="sm">Active</Badge>
            </SelectItem>
            <SelectItem value="carol" label="Carol White">
              <Avatar name="Carol White" size="xs" />
              <span style="flex:1">Carol White</span>
              <Badge variant="warning" badge-style="subtle" size="sm">Away</Badge>
            </SelectItem>
            <SelectSeparator />
            <SelectItem value="guest" label="Guest User" disabled>
              <Avatar size="xs" />
              <span style="flex:1">Guest User</span>
              <Badge variant="neutral" badge-style="subtle" size="sm">Disabled</Badge>
            </SelectItem>
          </SelectContent>
        </Select>
        <p style="margin-top:8px;font-size:12px;color:var(--color-text-tertiary);">
          Selected: {{ value || 'none' }}
        </p>
      </div>
    `,
  }),
}
