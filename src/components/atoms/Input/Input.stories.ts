import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, ref, watch } from 'vue'
import { userEvent, within, expect } from 'storybook/test'
import {
  RiSearchLine,
  RiMailLine,
  RiLockLine,
  RiUser3Line,
  RiPhoneLine,
  RiCalendarLine,
} from '@remixicon/vue'
import Input from './Input.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type Copy = {
  storyNames: {
    default: string
    states: string
    allSizes: string
    withIcons: string
    prefixSuffix: string
    features: string
    required: string
    formExample: string
  }
  sizeLabels: Record<'sm' | 'md' | 'lg', string>
  labels: {
    label: string
    placeholder: string
    normal: string
    filled: string
    error: string
    disabled: string
    readOnly: string
    filledValue: string
    disabledValue: string
    clearableValue: string
    errorValue: string
    readonlyValue: string
    typeSomething: string
    pleaseEnterValidEmail: string
    fieldCannotBeEdited: string
    smallLabel: string
    mediumLabel: string
    largeLabel: string
    smallInput: string
    mediumInput: string
    largeInput: string
    search: string
    searchPlaceholder: string
    email: string
    emailPlaceholder: string
    date: string
    pickDate: string
    website: string
    domain: string
    price: string
    clearable: string
    password: string
    atLeast8Characters: string
    displayName: string
    yourName: string
    fullName: string
    johnDoe: string
    briefIssue: string
    description: string
    whatHappened: string
    stepsToReproduce: string
    optionalHelpful: string
    placeholderText: string
    username: string
    prefixHttps: string
    suffixCom: string
    usd: string
    min8Characters: string
    phone: string
    phonePlaceholder: string
  }
}

const copyMap: Record<Locale, Copy> = {
  en: {
    storyNames: {
      default: 'Default',
      states: 'States',
      allSizes: 'All Sizes',
      withIcons: 'With Icons',
      prefixSuffix: 'Prefix & Suffix',
      features: 'Features',
      required: 'Required',
      formExample: 'Form Example',
    },
    sizeLabels: {
      sm: 'Small',
      md: 'Medium',
      lg: 'Large',
    },
    labels: {
      label: 'Label',
      placeholder: 'Placeholder text...',
      normal: 'Normal',
      filled: 'Filled',
      error: 'Error',
      disabled: 'Disabled',
      readOnly: 'Read-only',
      filledValue: 'Jane Doe',
      disabledValue: 'Disabled value',
      clearableValue: 'Clear me!',
      errorValue: 'invalid@',
      readonlyValue: 'Read-only value',
      typeSomething: 'Type something...',
      pleaseEnterValidEmail: 'Please enter a valid email.',
      fieldCannotBeEdited: 'This field cannot be edited.',
      smallLabel: 'Small (sm)',
      mediumLabel: 'Medium (md)',
      largeLabel: 'Large (lg)',
      smallInput: 'Small input',
      mediumInput: 'Medium input',
      largeInput: 'Large input',
      search: 'Search',
      searchPlaceholder: 'Search...',
      email: 'Email',
      emailPlaceholder: 'you@example.com',
      date: 'Date',
      pickDate: 'Pick a date',
      website: 'Website',
      domain: 'Domain',
      price: 'Price',
      clearable: 'Clearable',
      password: 'Password',
      atLeast8Characters: 'At least 8 characters.',
      displayName: 'Display name',
      yourName: 'Your name',
      fullName: 'Full name',
      johnDoe: 'John Doe',
      briefIssue: 'Briefly describe the issue',
      description: 'Description',
      whatHappened: 'What happened?',
      stepsToReproduce: 'Steps to reproduce',
      optionalHelpful: 'Optional but very helpful.',
      placeholderText: 'Placeholder text...',
      username: 'Username',
      prefixHttps: 'https://',
      suffixCom: '.com',
      usd: 'USD',
      min8Characters: 'Min. 8 characters',
      phone: 'Phone',
      phonePlaceholder: '+62 812 345 6789',
    },
  },
  id: {
    storyNames: {
      default: 'Bawaan',
      states: 'Status',
      allSizes: 'Semua Ukuran',
      withIcons: 'Dengan Ikon',
      prefixSuffix: 'Awalan & Akhiran',
      features: 'Fitur',
      required: 'Wajib',
      formExample: 'Contoh Formulir',
    },
    sizeLabels: {
      sm: 'Kecil',
      md: 'Sedang',
      lg: 'Besar',
    },
    labels: {
      label: 'Label',
      placeholder: 'Teks placeholder...',
      normal: 'Normal',
      filled: 'Terisi',
      error: 'Galat',
      disabled: 'Dinonaktifkan',
      readOnly: 'Hanya baca',
      filledValue: 'Budi Santoso',
      disabledValue: 'Nilai dinonaktifkan',
      clearableValue: 'Bersihkan saya!',
      errorValue: 'tidak-valid@',
      readonlyValue: 'Nilai hanya baca',
      typeSomething: 'Ketik sesuatu...',
      pleaseEnterValidEmail: 'Masukkan email yang valid.',
      fieldCannotBeEdited: 'Bidang ini tidak dapat diedit.',
      smallLabel: 'Kecil (sm)',
      mediumLabel: 'Sedang (md)',
      largeLabel: 'Besar (lg)',
      smallInput: 'Input kecil',
      mediumInput: 'Input sedang',
      largeInput: 'Input besar',
      search: 'Cari',
      searchPlaceholder: 'Cari...',
      email: 'Email',
      emailPlaceholder: 'anda@contoh.com',
      date: 'Tanggal',
      pickDate: 'Pilih tanggal',
      website: 'Situs web',
      domain: 'Domain',
      price: 'Harga',
      clearable: 'Dapat dibersihkan',
      password: 'Kata sandi',
      atLeast8Characters: 'Minimal 8 karakter.',
      displayName: 'Nama tampil',
      yourName: 'Nama Anda',
      fullName: 'Nama lengkap',
      johnDoe: 'Budi Santoso',
      briefIssue: 'Jelaskan masalah secara singkat',
      description: 'Deskripsi',
      whatHappened: 'Apa yang terjadi?',
      stepsToReproduce: 'Langkah untuk mereproduksi',
      optionalHelpful: 'Opsional tetapi sangat membantu.',
      placeholderText: 'Teks placeholder...',
      username: 'Nama pengguna',
      prefixHttps: 'https://',
      suffixCom: '.com',
      usd: 'USD',
      min8Characters: 'Min. 8 karakter',
      phone: 'Telepon',
      phonePlaceholder: '+62 812 345 6789',
    },
  },
  zh: {
    storyNames: {
      default: '默认',
      states: '状态',
      allSizes: '全部尺寸',
      withIcons: '带图标',
      prefixSuffix: '前缀与后缀',
      features: '功能',
      required: '必填',
      formExample: '表单示例',
    },
    sizeLabels: {
      sm: '小',
      md: '中',
      lg: '大',
    },
    labels: {
      label: '标签',
      placeholder: '占位符...',
      normal: '正常',
      filled: '已填充',
      error: '错误',
      disabled: '禁用',
      readOnly: '只读',
      filledValue: '张伟',
      disabledValue: '禁用值',
      clearableValue: '清除我！',
      errorValue: '无效@',
      readonlyValue: '只读值',
      typeSomething: '输入一些内容...',
      pleaseEnterValidEmail: '请输入有效的邮箱。',
      fieldCannotBeEdited: '此字段无法编辑。',
      smallLabel: '小 (sm)',
      mediumLabel: '中 (md)',
      largeLabel: '大 (lg)',
      smallInput: '小输入框',
      mediumInput: '中输入框',
      largeInput: '大输入框',
      search: '搜索',
      searchPlaceholder: '搜索...',
      email: '邮箱',
      emailPlaceholder: 'you@example.com',
      date: '日期',
      pickDate: '选择日期',
      website: '网站',
      domain: '域名',
      price: '价格',
      clearable: '可清除',
      password: '密码',
      atLeast8Characters: '至少 8 个字符。',
      displayName: '显示名称',
      yourName: '你的名字',
      fullName: '全名',
      johnDoe: '张伟',
      briefIssue: '简要描述问题',
      description: '描述',
      whatHappened: '发生了什么？',
      stepsToReproduce: '复现步骤',
      optionalHelpful: '可选，但非常有帮助。',
      placeholderText: '占位符...',
      username: '用户名',
      prefixHttps: 'https://',
      suffixCom: '.com',
      usd: 'USD',
      min8Characters: '最少 8 个字符',
      phone: '电话',
      phonePlaceholder: '+62 812 345 6789',
    },
  },
}

const getLocale = (): Locale => resolveLocale(getI18nLocale())
const useCopy = () => computed(() => copyMap[getLocale()])
const getStoryName = (key: keyof Copy['storyNames']) => copyMap[getLocale()].storyNames[key]

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: { layout: 'centered', icon: 'form' },
  argTypes: {
    modelValue: { control: 'text' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
    },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    required: { control: 'boolean' },
    clearable: { control: 'boolean' },
  },
  args: {
    modelValue: '',
    type: 'text',
    size: 'md',
  },
  decorators: [() => ({ template: '<div style="width:320px;--radius-2xl:20px;"><story /></div>' })],
}
export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  get name() {
    return getStoryName('default')
  },
  render: (args: any) => ({
    components: { Input },
    setup() {
      const copy = useCopy()
      const val = ref(args.modelValue ?? '')
      return { args, copy, val }
    },
    template:
      '<Input v-bind="args" v-model="val" :label="copy.labels.label" :placeholder="copy.labels.placeholder" />',
  }),
}

export const States: Story = {
  get name() {
    return getStoryName('states')
  },
  render: () => ({
    components: { Input },
    setup: () => {
      const copy = useCopy()
      const normal = ref('')
      const filled = ref('')
      const error = ref('')
      const disabled = ref('')
      const readonly = ref('')

      watch(
        copy,
        (current) => {
          filled.value = current.labels.filledValue
          error.value = current.labels.errorValue
          disabled.value = current.labels.disabledValue
          readonly.value = current.labels.readonlyValue
        },
        { immediate: true }
      )

      return {
        copy,
        normal,
        filled,
        error,
        disabled,
        readonly,
      }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <Input v-model="normal"   :label="copy.labels.normal"   :placeholder="copy.labels.typeSomething" />
        <Input v-model="filled"   :label="copy.labels.filled" />
        <Input v-model="error"    :label="copy.labels.error"    :error="copy.labels.pleaseEnterValidEmail" />
        <Input v-model="disabled" :label="copy.labels.disabled" disabled />
        <Input v-model="readonly" :label="copy.labels.readOnly" readonly :helper-text="copy.labels.fieldCannotBeEdited" />
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  get name() {
    return getStoryName('allSizes')
  },
  render: () => ({
    components: { Input },
    setup: () => ({
      copy: useCopy(),
      sm: ref(''),
      md: ref(''),
      lg: ref(''),
    }),
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <Input v-model="sm" size="sm" :label="copy.labels.smallLabel"   :placeholder="copy.labels.smallInput" />
        <Input v-model="md" size="md" :label="copy.labels.mediumLabel"  :placeholder="copy.labels.mediumInput" />
        <Input v-model="lg" size="lg" :label="copy.labels.largeLabel"   :placeholder="copy.labels.largeInput" />
      </div>
    `,
  }),
}

export const WithIcons: Story = {
  get name() {
    return getStoryName('withIcons')
  },
  render: () => ({
    components: { Input, RiSearchLine, RiMailLine, RiCalendarLine },
    setup: () => ({
      copy: useCopy(),
      search: ref(''),
      email: ref(''),
      date: ref(''),
    }),
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <Input v-model="search" :label="copy.labels.search" :placeholder="copy.labels.searchPlaceholder">
          <template #leading><RiSearchLine style="width:16px;height:16px;" /></template>
        </Input>
        <Input v-model="email" :label="copy.labels.email" :placeholder="copy.labels.emailPlaceholder" type="email">
          <template #leading><RiMailLine style="width:16px;height:16px;" /></template>
        </Input>
        <Input v-model="date" :label="copy.labels.date" :placeholder="copy.labels.pickDate">
          <template #trailing><RiCalendarLine style="width:16px;height:16px;" /></template>
        </Input>
      </div>
    `,
  }),
}

export const PrefixSuffix: Story = {
  get name() {
    return getStoryName('prefixSuffix')
  },
  render: () => ({
    components: { Input },
    setup: () => ({
      copy: useCopy(),
      website: ref(''),
      domain: ref(''),
      price: ref(''),
    }),
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <Input v-model="website" :label="copy.labels.website" :placeholder="copy.labels.placeholderText">
          <template #prefix>{{ copy.labels.prefixHttps }}</template>
        </Input>
        <Input v-model="domain" :label="copy.labels.domain" :placeholder="copy.labels.placeholderText">
          <template #suffix>{{ copy.labels.suffixCom }}</template>
        </Input>
        <Input v-model="price" :label="copy.labels.price" :placeholder="copy.labels.placeholderText" type="number">
          <template #prefix>$</template>
          <template #suffix>{{ copy.labels.usd }}</template>
        </Input>
      </div>
    `,
  }),
}

export const Features: Story = {
  get name() {
    return getStoryName('features')
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)

    // The first textbox in this story is the clearable input
    const inputs = canvas.getAllByRole('textbox')
    const clearableInput = inputs[0]

    // Type text into the clearable input
    await userEvent.clear(clearableInput)
    await userEvent.type(clearableInput, 'hello world')
    await expect(clearableInput).toHaveValue('hello world')

    // Click the clear button (aria-label="Clear")
    const clearBtn = canvas.getByRole('button', { name: /clear/i })
    await userEvent.click(clearBtn)
    await expect(clearableInput).toHaveValue('')
  },
  render: () => ({
    components: { Input },
    setup: () => {
      const copy = useCopy()
      const clearable = ref('')
      const password = ref('supersecret')
      const counter = ref('')

      watch(
        copy,
        (current) => {
          clearable.value = current.labels.clearableValue
        },
        { immediate: true }
      )

      return { copy, clearable, password, counter }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <Input v-model="clearable" :label="copy.labels.clearable" clearable :placeholder="copy.labels.clearableValue" />
        <Input v-model="password"  :label="copy.labels.password"  type="password" :helper-text="copy.labels.atLeast8Characters" />
        <Input v-model="counter"   :label="copy.labels.displayName" :maxlength="30" counter :placeholder="copy.labels.yourName" />
      </div>
    `,
  }),
}

export const Required: Story = {
  get name() {
    return getStoryName('required')
  },
  render: () => ({
    components: { Input },
    setup: () => ({
      copy: useCopy(),
      name: ref(''),
      email: ref(''),
    }),
    template: `
      <div style="display:flex;flex-direction:column;gap:16px;">
        <Input v-model="name"  :label="copy.labels.fullName"  required :placeholder="copy.labels.johnDoe" />
        <Input v-model="email" :label="copy.labels.email"       required type="email" :placeholder="copy.labels.emailPlaceholder" />
      </div>
    `,
  }),
}

export const FormExample: Story = {
  get name() {
    return getStoryName('formExample')
  },
  decorators: [
    () => ({ template: '<div style="width:360px;--radius-2xl:20px;"><story /></div>' }),
  ],
  render: () => ({
    components: { Input, RiUser3Line, RiMailLine, RiLockLine, RiPhoneLine },
    setup: () => ({
      copy: useCopy(),
      name: ref(''),
      email: ref(''),
      password: ref(''),
      phone: ref(''),
      website: ref(''),
    }),
    template: `
      <div style="display:flex;flex-direction:column;gap:14px;">
        <Input v-model="name"     :label="copy.labels.fullName"   required :placeholder="copy.labels.johnDoe">
          <template #leading><RiUser3Line style="width:16px;height:16px;" /></template>
        </Input>
        <Input v-model="email"    :label="copy.labels.email"       required type="email" :placeholder="copy.labels.emailPlaceholder">
          <template #leading><RiMailLine style="width:16px;height:16px;" /></template>
        </Input>
        <Input v-model="password" :label="copy.labels.password"    required type="password" :placeholder="copy.labels.min8Characters">
          <template #leading><RiLockLine style="width:16px;height:16px;" /></template>
        </Input>
        <Input v-model="phone"    :label="copy.labels.phone"       type="tel" :placeholder="copy.labels.phonePlaceholder">
          <template #leading><RiPhoneLine style="width:16px;height:16px;" /></template>
        </Input>
        <Input v-model="website"  :label="copy.labels.website"     :placeholder="copy.labels.placeholderText">
          <template #prefix>{{ copy.labels.prefixHttps }}</template>
          <template #suffix>{{ copy.labels.suffixCom }}</template>
        </Input>
      </div>
    `,
  }),
}
