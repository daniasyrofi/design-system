import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, ref, watch } from 'vue'
import Checkbox from './Checkbox.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type Copy = {
  storyNames: {
    default: string
    checked: string
    indeterminate: string
    withDescription: string
    withError: string
    disabled: string
    allSizes: string
    checkboxGroup: string
    allColors: string
  }
  sizeLabels: Record<'sm' | 'md' | 'lg', string>
  colors: Record<'primary' | 'secondary' | 'neutral' | 'danger', string>
  labels: {
    acceptTerms: string
    checkedState: string
    selectAll: string
    option: string
    marketingEmails: string
    marketingDescription: string
    agreeTerms: string
    termsError: string
    disabledUnchecked: string
    disabledChecked: string
    disabledIndeterminate: string
    smallLabel: string
    mediumLabel: string
    largeLabel: string
    checkbox12: string
    checkbox16: string
    checkbox20: string
    notificationPreferences: string
    email: string
    sms: string
    pushNotifications: string
    receiveUpdatesViaEmail: string
    receiveUpdatesViaText: string
    receiveInAppNotifications: string
    primaryBrandPink: string
    secondary: string
    neutralBlack: string
    dangerRed: string
    descriptionText: string
    errorText: string
  }
}

const copyMap: Record<Locale, Copy> = {
  en: {
    storyNames: {
      default: 'Default',
      checked: 'Checked',
      indeterminate: 'Indeterminate',
      withDescription: 'With Description',
      withError: 'With Error',
      disabled: 'Disabled',
      allSizes: 'All Sizes',
      checkboxGroup: 'Checkbox Group',
      allColors: 'All Colors',
    },
    sizeLabels: {
      sm: 'Small',
      md: 'Medium',
      lg: 'Large',
    },
    colors: {
      primary: 'Primary - Brand Pink',
      secondary: 'Secondary',
      neutral: 'Neutral - Black',
      danger: 'Danger - Red',
    },
    labels: {
      acceptTerms: 'Accept terms and conditions',
      checkedState: 'Checked state',
      selectAll: 'Select all',
      option: 'Option',
      marketingEmails: 'Marketing emails',
      marketingDescription: 'Receive emails about new products, features, and more.',
      agreeTerms: 'I agree to the terms',
      termsError: 'You must accept the terms to continue.',
      disabledUnchecked: 'Disabled unchecked',
      disabledChecked: 'Disabled checked',
      disabledIndeterminate: 'Disabled indeterminate',
      smallLabel: 'Small (sm)',
      mediumLabel: 'Medium (md)',
      largeLabel: 'Large (lg)',
      checkbox12: '12px checkbox',
      checkbox16: '16px checkbox - default',
      checkbox20: '20px checkbox',
      notificationPreferences: 'Notification preferences',
      email: 'Email',
      sms: 'SMS',
      pushNotifications: 'Push notifications',
      receiveUpdatesViaEmail: 'Receive updates via email',
      receiveUpdatesViaText: 'Receive updates via text message',
      receiveInAppNotifications: 'Receive in-app notifications',
      primaryBrandPink: 'Primary - Brand Pink',
      secondary: 'Secondary',
      neutralBlack: 'Neutral - Black',
      dangerRed: 'Danger - Red',
      descriptionText: 'Description',
      errorText: 'Error',
    },
  },
  id: {
    storyNames: {
      default: 'Bawaan',
      checked: 'Dicentang',
      indeterminate: 'Tak Tentu',
      withDescription: 'Dengan Deskripsi',
      withError: 'Dengan Galat',
      disabled: 'Dinonaktifkan',
      allSizes: 'Semua Ukuran',
      checkboxGroup: 'Grup Kotak Centang',
      allColors: 'Semua Warna',
    },
    sizeLabels: {
      sm: 'Kecil',
      md: 'Sedang',
      lg: 'Besar',
    },
    colors: {
      primary: 'Utama - Pink Merek',
      secondary: 'Sekunder',
      neutral: 'Netral - Hitam',
      danger: 'Bahaya - Merah',
    },
    labels: {
      acceptTerms: 'Terima syarat dan ketentuan',
      checkedState: 'Status dicentang',
      selectAll: 'Pilih semua',
      option: 'Opsi',
      marketingEmails: 'Email pemasaran',
      marketingDescription: 'Terima email tentang produk baru, fitur, dan lainnya.',
      agreeTerms: 'Saya menyetujui syarat',
      termsError: 'Anda harus menerima syarat untuk melanjutkan.',
      disabledUnchecked: 'Tidak dicentang dan dinonaktifkan',
      disabledChecked: 'Dicentang dan dinonaktifkan',
      disabledIndeterminate: 'Tak tentu dan dinonaktifkan',
      smallLabel: 'Kecil (sm)',
      mediumLabel: 'Sedang (md)',
      largeLabel: 'Besar (lg)',
      checkbox12: 'Kotak centang 12px',
      checkbox16: 'Kotak centang 16px - bawaan',
      checkbox20: 'Kotak centang 20px',
      notificationPreferences: 'Preferensi notifikasi',
      email: 'Email',
      sms: 'SMS',
      pushNotifications: 'Notifikasi dorong',
      receiveUpdatesViaEmail: 'Terima pembaruan via email',
      receiveUpdatesViaText: 'Terima pembaruan via pesan teks',
      receiveInAppNotifications: 'Terima notifikasi dalam aplikasi',
      primaryBrandPink: 'Utama - Pink Merek',
      secondary: 'Sekunder',
      neutralBlack: 'Netral - Hitam',
      dangerRed: 'Bahaya - Merah',
      descriptionText: 'Deskripsi',
      errorText: 'Galat',
    },
  },
  zh: {
    storyNames: {
      default: '默认',
      checked: '已选中',
      indeterminate: '不确定',
      withDescription: '带描述',
      withError: '带错误',
      disabled: '禁用',
      allSizes: '全部尺寸',
      checkboxGroup: '复选框组',
      allColors: '全部颜色',
    },
    sizeLabels: {
      sm: '小',
      md: '中',
      lg: '大',
    },
    colors: {
      primary: '主要 - 品牌粉',
      secondary: '次要',
      neutral: '中性 - 黑色',
      danger: '危险 - 红色',
    },
    labels: {
      acceptTerms: '接受条款和条件',
      checkedState: '已选中状态',
      selectAll: '全选',
      option: '选项',
      marketingEmails: '营销邮件',
      marketingDescription: '接收有关新产品、功能等的电子邮件。',
      agreeTerms: '我同意条款',
      termsError: '你必须接受条款才能继续。',
      disabledUnchecked: '禁用未选中',
      disabledChecked: '禁用已选中',
      disabledIndeterminate: '禁用不确定',
      smallLabel: '小 (sm)',
      mediumLabel: '中 (md)',
      largeLabel: '大 (lg)',
      checkbox12: '12px 复选框',
      checkbox16: '16px 复选框 - 默认',
      checkbox20: '20px 复选框',
      notificationPreferences: '通知偏好',
      email: '邮箱',
      sms: '短信',
      pushNotifications: '推送通知',
      receiveUpdatesViaEmail: '通过邮箱接收更新',
      receiveUpdatesViaText: '通过短信接收更新',
      receiveInAppNotifications: '接收应用内通知',
      primaryBrandPink: '主要 - 品牌粉',
      secondary: '次要',
      neutralBlack: '中性 - 黑色',
      dangerRed: '危险 - 红色',
      descriptionText: '描述',
      errorText: '错误',
    },
  },
}

const getLocale = (): Locale => resolveLocale(getI18nLocale())
const useCopy = () => computed(() => copyMap[getLocale()])
const getStoryName = (key: keyof Copy['storyNames']) => copyMap[getLocale()].storyNames[key]

const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: { layout: 'centered', icon: 'check' },
  decorators: [
    (story) => {
      const storyComponent = story()
      return {
        components: { storyComponent },
        template: `
          <div class="[&_.checkbox-label]:items-center [&_.checkbox-label>span:last-child]:mt-0">
            <storyComponent />
          </div>
        `,
      }
    },
  ],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
  },
  args: {
    modelValue: false,
    size: 'md',
    disabled: false,
    label: '',
  },
}
export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  get name() {
    return getStoryName('default')
  },
  render: (args: any) => ({
    components: { Checkbox },
    setup() {
      const copy = useCopy()
      const value = ref(args.modelValue ?? false)
      const resolvedArgs = computed(() => ({
        ...args,
        label: args.label || copy.value.labels.acceptTerms,
      }))
      watch(
        () => args.modelValue,
        (val) => {
          value.value = val
        }
      )
      return { resolvedArgs, value }
    },
    template: '<Checkbox v-bind="resolvedArgs" v-model="value" />',
  }),
}

export const Checked: Story = {
  get name() {
    return getStoryName('checked')
  },
  render: () => ({
    components: { Checkbox },
    setup: () => ({ copy: useCopy(), value: ref(true) }),
    template: '<Checkbox v-model="value" :label="copy.labels.checkedState" />',
  }),
}

export const Indeterminate: Story = {
  get name() {
    return getStoryName('indeterminate')
  },
  render: () => ({
    components: { Checkbox },
    setup() {
      const copy = useCopy()
      const parent = ref<boolean | 'indeterminate'>('indeterminate')
      const children = ref([true, false, true])

      function toggleParent() {
        if (parent.value === true) {
          children.value = children.value.map(() => false)
          parent.value = false
        } else {
          children.value = children.value.map(() => true)
          parent.value = true
        }
      }

      function updateChild(i: number, val: boolean) {
        children.value[i] = val
        const all = children.value.every(Boolean)
        const none = children.value.every((v) => !v)
        parent.value = all ? true : none ? false : 'indeterminate'
      }

      return { copy, parent, children, toggleParent, updateChild }
    },
    template: `
      <div style="display:flex;flex-direction:column;gap:8px;">
        <Checkbox :model-value="parent" :label="copy.labels.selectAll" @update:model-value="toggleParent" />
        <div style="margin-left:28px;display:flex;flex-direction:column;gap:6px;">
          <Checkbox
            v-for="(val, i) in children"
            :key="i"
            :model-value="val"
            :label="copy.labels.option + ' ' + (i + 1)"
            @update:model-value="(v) => updateChild(i, v)"
          />
        </div>
      </div>
    `,
  }),
}

export const WithDescription: Story = {
  get name() {
    return getStoryName('withDescription')
  },
  render: () => ({
    components: { Checkbox },
    setup: () => ({ copy: useCopy(), value: ref(false) }),
    template: `
      <Checkbox
        v-model="value"
        :label="copy.labels.marketingEmails"
        :description="copy.labels.marketingDescription"
      />
    `,
  }),
}

export const WithError: Story = {
  get name() {
    return getStoryName('withError')
  },
  render: () => ({
    components: { Checkbox },
    setup: () => ({ copy: useCopy(), value: ref(false) }),
    template: `
      <Checkbox
        v-model="value"
        :label="copy.labels.agreeTerms"
        :error="copy.labels.termsError"
      />
    `,
  }),
}

export const Disabled: Story = {
  get name() {
    return getStoryName('disabled')
  },
  render: () => ({
    components: { Checkbox },
    setup: () => ({ copy: useCopy() }),
    template: `
      <div style="display:flex;flex-direction:column;gap:10px;">
        <Checkbox :model-value="false" disabled :label="copy.labels.disabledUnchecked" />
        <Checkbox :model-value="true"  disabled :label="copy.labels.disabledChecked" />
        <Checkbox :model-value="'indeterminate'" disabled :label="copy.labels.disabledIndeterminate" />
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  get name() {
    return getStoryName('allSizes')
  },
  render: () => ({
    components: { Checkbox },
    setup: () => ({
      copy: useCopy(),
      sm: ref(true),
      md: ref(true),
      lg: ref(true),
    }),
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <Checkbox v-model="sm" size="sm" :label="copy.labels.smallLabel" :description="copy.labels.checkbox12" />
        <Checkbox v-model="md" size="md" :label="copy.labels.mediumLabel" :description="copy.labels.checkbox16" />
        <Checkbox v-model="lg" size="lg" :label="copy.labels.largeLabel" :description="copy.labels.checkbox20" />
      </div>
    `,
  }),
}

export const CheckboxGroup: Story = {
  get name() {
    return getStoryName('checkboxGroup')
  },
  render: () => ({
    components: { Checkbox },
    setup() {
      const copy = useCopy()
      const selected = ref<string[]>(['email'])
      const options = computed(() => [
        {
          value: 'email',
          label: copy.value.labels.email,
          description: copy.value.labels.receiveUpdatesViaEmail,
        },
        {
          value: 'sms',
          label: copy.value.labels.sms,
          description: copy.value.labels.receiveUpdatesViaText,
        },
        {
          value: 'push',
          label: copy.value.labels.pushNotifications,
          description: copy.value.labels.receiveInAppNotifications,
        },
      ])
      function toggle(val: string) {
        const idx = selected.value.indexOf(val)
        if (idx >= 0) selected.value.splice(idx, 1)
        else selected.value.push(val)
      }
      return { copy, selected, options, toggle }
    },
    template: `
      <fieldset style="display:flex;flex-direction:column;gap:10px;padding:16px;border:1px solid var(--color-border);border-radius:var(--radius-lg);max-width:320px;">
        <legend style="font-size:14px;font-weight:600;color:var(--color-text-heading);padding:0 4px;">{{ copy.labels.notificationPreferences }}</legend>
        <Checkbox
          v-for="opt in options"
          :key="opt.value"
          :model-value="selected.includes(opt.value)"
          :label="opt.label"
          :description="opt.description"
          :value="opt.value"
          @update:model-value="toggle(opt.value)"
        />
      </fieldset>
    `,
  }),
}

export const AllColors: Story = {
  get name() {
    return getStoryName('allColors')
  },
  render: () => ({
    components: { Checkbox },
    setup: () => ({
      copy: useCopy(),
      val: ref(true),
    }),
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <Checkbox v-model="val" color="primary" :label="copy.labels.primaryBrandPink" />
        <Checkbox v-model="val" color="secondary" :label="copy.labels.secondary" />
        <Checkbox v-model="val" color="neutral" :label="copy.labels.neutralBlack" />
        <Checkbox v-model="val" color="danger" :label="copy.labels.dangerRed" />
      </div>
    `,
  }),
}
