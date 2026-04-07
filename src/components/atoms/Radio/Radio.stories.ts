import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, ref, watch } from 'vue'
import Radio from './Radio.vue'
import { getI18nLocale, resolveLocale, type SupportedLocale } from '@/i18n'

type Locale = SupportedLocale

type Copy = {
  storyNames: {
    default: string
    withDescription: string
    withError: string
    disabled: string
    allSizes: string
    radioGroup: string
    paymentMethod: string
    allColors: string
  }
  sizeLabels: Record<'sm' | 'md' | 'lg', string>
  labels: {
    option1: string
    standardShipping: string
    freeDelivery: string
    acceptTerms: string
    selectAll: string
    disabledUnselected: string
    disabledSelected: string
    small: string
    medium: string
    large: string
    smallRadio: string
    mediumRadioDefault: string
    shippingMethod: string
    standardShippingOption: string
    expressShipping: string
    overnightShipping: string
    freeDelivery5To7: string
    price9_99: string
    price19_99: string
    nextBusinessDay: string
    paymentMethod: string
    creditDebitCard: string
    bankTransfer: string
    digitalWallet: string
    visaMastercardAmex: string
    manualTransfer: string
    walletOptions: string
    primaryBrandPink: string
    secondary: string
    neutralBlack: string
    dangerRed: string
    errorText: string
  }
}

const copyMap: Record<Locale, Copy> = {
  en: {
    storyNames: {
      default: 'Default',
      withDescription: 'With Description',
      withError: 'With Error',
      disabled: 'Disabled',
      allSizes: 'All Sizes',
      radioGroup: 'Radio Group',
      paymentMethod: 'Payment Method',
      allColors: 'All Colors',
    },
    sizeLabels: {
      sm: 'Small',
      md: 'Medium',
      lg: 'Large',
    },
    labels: {
      option1: 'Option 1',
      standardShipping: 'Standard shipping',
      freeDelivery: 'Free - Delivery in 5-7 business days',
      acceptTerms: 'Accept terms',
      selectAll: 'Select all',
      disabledUnselected: 'Disabled unselected',
      disabledSelected: 'Disabled selected',
      small: 'Small',
      medium: 'Medium',
      large: 'Large',
      smallRadio: 'Small radio',
      mediumRadioDefault: 'Medium radio - default',
      shippingMethod: 'Shipping method',
      standardShippingOption: 'Standard shipping',
      expressShipping: 'Express shipping',
      overnightShipping: 'Overnight shipping',
      freeDelivery5To7: 'Free - Delivery in 5-7 business days',
      price9_99: '$9.99 - Delivery in 2-3 business days',
      price19_99: '$19.99 - Next business day',
      nextBusinessDay: 'Next business day',
      paymentMethod: 'Payment method',
      creditDebitCard: 'Credit / Debit Card',
      bankTransfer: 'Bank Transfer',
      digitalWallet: 'Digital Wallet',
      visaMastercardAmex: 'Visa, Mastercard, Amex',
      manualTransfer: 'Manual transfer - 1-2 business days',
      walletOptions: 'GoPay, OVO, ShopeePay',
      primaryBrandPink: 'Primary - Brand Pink',
      secondary: 'Secondary',
      neutralBlack: 'Neutral - Black',
      dangerRed: 'Danger - Red',
      errorText: 'Please select an option to continue.',
    },
  },
  id: {
    storyNames: {
      default: 'Bawaan',
      withDescription: 'Dengan Deskripsi',
      withError: 'Dengan Galat',
      disabled: 'Dinonaktifkan',
      allSizes: 'Semua Ukuran',
      radioGroup: 'Grup Radio',
      paymentMethod: 'Metode Pembayaran',
      allColors: 'Semua Warna',
    },
    sizeLabels: {
      sm: 'Kecil',
      md: 'Sedang',
      lg: 'Besar',
    },
    labels: {
      option1: 'Opsi 1',
      standardShipping: 'Pengiriman standar',
      freeDelivery: 'Gratis - Tiba dalam 5-7 hari kerja',
      acceptTerms: 'Terima syarat',
      selectAll: 'Pilih semua',
      disabledUnselected: 'Tidak terpilih dan dinonaktifkan',
      disabledSelected: 'Terpilih dan dinonaktifkan',
      small: 'Kecil',
      medium: 'Sedang',
      large: 'Besar',
      smallRadio: 'Radio kecil',
      mediumRadioDefault: 'Radio sedang - bawaan',
      shippingMethod: 'Metode pengiriman',
      standardShippingOption: 'Pengiriman standar',
      expressShipping: 'Pengiriman ekspres',
      overnightShipping: 'Pengiriman semalam',
      freeDelivery5To7: 'Gratis - Tiba dalam 5-7 hari kerja',
      price9_99: '$9.99 - Tiba dalam 2-3 hari kerja',
      price19_99: '$19.99 - Hari kerja berikutnya',
      nextBusinessDay: 'Hari kerja berikutnya',
      paymentMethod: 'Metode pembayaran',
      creditDebitCard: 'Kartu Kredit / Debit',
      bankTransfer: 'Transfer Bank',
      digitalWallet: 'Dompet Digital',
      visaMastercardAmex: 'Visa, Mastercard, Amex',
      manualTransfer: 'Transfer manual - 1-2 hari kerja',
      walletOptions: 'GoPay, OVO, ShopeePay',
      primaryBrandPink: 'Utama - Pink Merek',
      secondary: 'Sekunder',
      neutralBlack: 'Netral - Hitam',
      dangerRed: 'Bahaya - Merah',
      errorText: 'Pilih opsi untuk melanjutkan.',
    },
  },
  zh: {
    storyNames: {
      default: '默认',
      withDescription: '带描述',
      withError: '带错误',
      disabled: '禁用',
      allSizes: '全部尺寸',
      radioGroup: '单选组',
      paymentMethod: '付款方式',
      allColors: '全部颜色',
    },
    sizeLabels: {
      sm: '小',
      md: '中',
      lg: '大',
    },
    labels: {
      option1: '选项 1',
      standardShipping: '标准配送',
      freeDelivery: '免费 - 5-7 个工作日送达',
      acceptTerms: '接受条款',
      selectAll: '全选',
      disabledUnselected: '禁用未选中',
      disabledSelected: '禁用已选中',
      small: '小',
      medium: '中',
      large: '大',
      smallRadio: '小号单选',
      mediumRadioDefault: '中号单选 - 默认',
      shippingMethod: '配送方式',
      standardShippingOption: '标准配送',
      expressShipping: '快速配送',
      overnightShipping: '隔夜配送',
      freeDelivery5To7: '免费 - 5-7 个工作日送达',
      price9_99: '$9.99 - 2-3 个工作日送达',
      price19_99: '$19.99 - 下一个工作日送达',
      nextBusinessDay: '下一个工作日',
      paymentMethod: '付款方式',
      creditDebitCard: '信用卡 / 借记卡',
      bankTransfer: '银行转账',
      digitalWallet: '数字钱包',
      visaMastercardAmex: 'Visa, Mastercard, Amex',
      manualTransfer: '手动转账 - 1-2 个工作日',
      walletOptions: 'GoPay, OVO, ShopeePay',
      primaryBrandPink: '主要 - 品牌粉',
      secondary: '次要',
      neutralBlack: '中性 - 黑色',
      dangerRed: '危险 - 红色',
      errorText: '请选择一个选项以继续。',
    },
  },
}

const getLocale = (): Locale => resolveLocale(getI18nLocale())
const useCopy = () => computed(() => copyMap[getLocale()])
const getStoryName = (key: keyof Copy['storyNames']) => copyMap[getLocale()].storyNames[key]

const meta: Meta<typeof Radio> = {
  title: 'Atoms/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: { layout: 'centered', icon: 'circleHollow' },
  decorators: [
    (story) => {
      const storyComponent = story()
      return {
        components: { storyComponent },
        template: `
          <div class="[&_label]:items-center [&_label>span:last-child]:mt-0">
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
    modelValue: 'option1',
    value: 'option1',
    size: 'md',
    disabled: false,
    label: '',
  },
}
export default meta
type Story = StoryObj<typeof Radio>

export const Default: Story = {
  get name() {
    return getStoryName('default')
  },
  render: (args: any) => ({
    components: { Radio },
    setup() {
      const copy = useCopy()
      const value = ref(args.modelValue ?? '')
      const resolvedArgs = computed(() => ({
        ...args,
        label: args.label || copy.value.labels.option1,
      }))
      watch(
        () => args.modelValue,
        (val) => {
          value.value = val
        }
      )
      return { resolvedArgs, value }
    },
    template: '<Radio v-bind="resolvedArgs" v-model="value" />',
  }),
}

export const WithDescription: Story = {
  get name() {
    return getStoryName('withDescription')
  },
  render: () => ({
    components: { Radio },
    setup: () => ({ copy: useCopy(), value: ref('standard') }),
    template: `
      <div class="[&_label]:!items-start [&_label>span:last-child]:!mt-[3px]">
        <Radio
          v-model="value"
          :label="copy.labels.standardShipping"
          :description="copy.labels.freeDelivery"
          value="standard"
        />
      </div>
    `,
  }),
}

export const WithError: Story = {
  get name() {
    return getStoryName('withError')
  },
  render: () => ({
    components: { Radio },
    setup: () => ({ copy: useCopy(), value: ref('') }),
    template: `
      <Radio
        v-model="value"
        :label="copy.labels.acceptTerms"
        :error="copy.labels.errorText"
        value="accept"
      />
    `,
  }),
}

export const Disabled: Story = {
  get name() {
    return getStoryName('disabled')
  },
  render: () => ({
    components: { Radio },
    setup: () => ({ copy: useCopy() }),
    template: `
      <div style="display:flex;flex-direction:column;gap:10px;">
        <Radio :model-value="''" value="a" disabled :label="copy.labels.disabledUnselected" />
        <Radio :model-value="'b'" value="b" disabled :label="copy.labels.disabledSelected" />
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  get name() {
    return getStoryName('allSizes')
  },
  render: () => ({
    components: { Radio },
    setup: () => ({
      copy: useCopy(),
      sm: ref('a'),
      md: ref('a'),
      lg: ref('a'),
    }),
    template: `
      <div style="display:flex;flex-direction:column;gap:20px;">
        <div>
          <p style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:8px;">{{ copy.sizeLabels.sm }}</p>
          <div style="display:flex;flex-direction:column;gap:6px;">
            <Radio v-model="sm" size="sm" value="a" :label="copy.labels.option1" :description="copy.labels.smallRadio" />
            <Radio v-model="sm" size="sm" value="b" :label="copy.labels.standardShipping" :description="copy.labels.smallRadio" />
          </div>
        </div>
        <div>
          <p style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:8px;">{{ copy.sizeLabels.md }}</p>
          <div style="display:flex;flex-direction:column;gap:6px;">
            <Radio v-model="md" size="md" value="a" :label="copy.labels.option1" :description="copy.labels.mediumRadioDefault" />
            <Radio v-model="md" size="md" value="b" :label="copy.labels.standardShipping" :description="copy.labels.mediumRadioDefault" />
          </div>
        </div>
        <div>
          <p style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:var(--color-text-tertiary);margin-bottom:8px;">{{ copy.sizeLabels.lg }}</p>
          <div style="display:flex;flex-direction:column;gap:6px;">
            <Radio v-model="lg" size="lg" value="a" :label="copy.labels.option1" :description="copy.labels.large" />
            <Radio v-model="lg" size="lg" value="b" :label="copy.labels.standardShipping" :description="copy.labels.large" />
          </div>
        </div>
      </div>
    `,
  }),
}

export const RadioGroup: Story = {
  get name() {
    return getStoryName('radioGroup')
  },
  render: () => ({
    components: { Radio },
    setup() {
      const copy = useCopy()
      const selected = ref('standard')
      const options = computed(() => [
        {
          value: 'standard',
          label: copy.value.labels.standardShippingOption,
          description: copy.value.labels.freeDelivery5To7,
        },
        {
          value: 'express',
          label: copy.value.labels.expressShipping,
          description: copy.value.labels.price9_99,
        },
        {
          value: 'overnight',
          label: copy.value.labels.overnightShipping,
          description: copy.value.labels.price19_99,
        },
      ])
      return { copy, selected, options }
    },
    template: `
      <div class="[&_label]:!items-start [&_label>span:last-child]:!mt-[3px]">
        <fieldset style="display:flex;flex-direction:column;gap:10px;padding:16px;border:1px solid var(--color-border);border-radius:var(--radius-lg);max-width:320px;">
          <legend style="font-size:14px;font-weight:600;color:var(--color-text-heading);padding:0 4px;">{{ copy.labels.shippingMethod }}</legend>
          <Radio
            v-for="opt in options"
            :key="opt.value"
            v-model="selected"
            :value="opt.value"
            :label="opt.label"
            :description="opt.description"
            name="shipping"
          />
        </fieldset>
      </div>
    `,
  }),
}

export const PaymentMethod: Story = {
  get name() {
    return getStoryName('paymentMethod')
  },
  render: () => ({
    components: { Radio },
    setup() {
      const copy = useCopy()
      const method = ref('card')
      const opts = computed(() => [
        {
          value: 'card',
          label: copy.value.labels.creditDebitCard,
          description: copy.value.labels.visaMastercardAmex,
        },
        {
          value: 'bank',
          label: copy.value.labels.bankTransfer,
          description: copy.value.labels.manualTransfer,
        },
        {
          value: 'wallet',
          label: copy.value.labels.digitalWallet,
          description: copy.value.labels.walletOptions,
        },
      ])
      return { copy, method, opts }
    },
    template: `
      <div class="[&_label]:!items-start [&_label>span:last-child]:!mt-[3px]">
        <fieldset style="display:flex;flex-direction:column;gap:10px;padding:16px;border:1px solid var(--color-border);border-radius:var(--radius-lg);max-width:300px;">
          <legend style="font-size:14px;font-weight:600;color:var(--color-text-heading);padding:0 4px;">{{ copy.labels.paymentMethod }}</legend>
          <Radio
            v-for="opt in opts"
            :key="opt.value"
            v-model="method"
            :value="opt.value"
            :label="opt.label"
            :description="opt.description"
            name="payment"
          />
        </fieldset>
      </div>
    `,
  }),
}

export const AllColors: Story = {
  get name() {
    return getStoryName('allColors')
  },
  render: () => ({
    components: { Radio },
    setup: () => ({
      copy: useCopy(),
      val: ref('a'),
    }),
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <Radio v-model="val" value="a" color="primary" :label="copy.labels.primaryBrandPink" />
        <Radio v-model="val" value="b" color="secondary" :label="copy.labels.secondary" />
        <Radio v-model="val" value="c" color="neutral" :label="copy.labels.neutralBlack" />
        <Radio v-model="val" value="d" color="danger" :label="copy.labels.dangerRed" />
      </div>
    `,
  }),
}
