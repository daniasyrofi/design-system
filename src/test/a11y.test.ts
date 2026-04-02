/**
 * WCAG 2.1 AA accessibility tests using axe-core.
 * These run as part of the unit test suite (happy-dom environment).
 * Note: color-contrast and layout-dependent rules are disabled (require real browser).
 * Full visual a11y coverage lives in Storybook via @storybook/addon-a11y.
 */
import { describe, it, beforeAll, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { axeCheck } from './a11y'

// ── Components ────────────────────────────────────────────────────────────────
import Button from '@/components/atoms/Button/Button.vue'
import Input from '@/components/atoms/Input/Input.vue'
import Checkbox from '@/components/atoms/Checkbox/Checkbox.vue'
import Radio from '@/components/atoms/Radio/Radio.vue'
import Toggle from '@/components/atoms/Toggle/Toggle.vue'
import Textarea from '@/components/atoms/Textarea/Textarea.vue'
import Alert from '@/components/molecules/Alert/Alert.vue'
import Modal from '@/components/molecules/Modal/Modal.vue'
import Drawer from '@/components/molecules/Drawer/Drawer.vue'
import Pagination from '@/components/molecules/Pagination/Pagination.vue'
import Stepper from '@/components/molecules/Stepper/Stepper.vue'
import Breadcrumb from '@/components/molecules/Breadcrumb/Breadcrumb.vue'
import LanguageToggle from '@/components/molecules/LanguageToggle/LanguageToggle.vue'

const i18n = createI18n({ legacy: false, locale: 'en', messages: { en: {}, id: {}, zh: {} } })

beforeAll(() => {
  if (!window.matchMedia) {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((q: string) => ({
        matches: false, media: q, onchange: null,
        addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn(),
      })),
    })
  }
})

// ── Atoms ─────────────────────────────────────────────────────────────────────

describe('a11y: Button', () => {
  it('default button has no violations', async () => {
    const { element } = mount(Button, { slots: { default: 'Click me' } })
    await axeCheck(element)
  })

  it('disabled button has no violations', async () => {
    const { element } = mount(Button, { props: { disabled: true }, slots: { default: 'Disabled' } })
    await axeCheck(element)
  })

  it('icon-only button with aria-label has no violations', async () => {
    const { element } = mount(Button, { props: { 'aria-label': 'Delete item', iconOnly: true } })
    await axeCheck(element)
  })
})

describe('a11y: Input', () => {
  it('labelled input has no violations', async () => {
    const { element } = mount(Input, { props: { label: 'Email', modelValue: '' } })
    await axeCheck(element)
  })

  it('input with error has no violations', async () => {
    const { element } = mount(Input, { props: { label: 'Email', modelValue: '', error: 'Required' } })
    await axeCheck(element)
  })
})

describe('a11y: Checkbox', () => {
  it('labelled checkbox has no violations', async () => {
    const { element } = mount(Checkbox, { props: { label: 'Accept terms', modelValue: false } })
    await axeCheck(element)
  })
})

describe('a11y: Radio', () => {
  it('labelled radio has no violations', async () => {
    const { element } = mount(Radio, { props: { label: 'Option A', modelValue: '', value: 'a' } })
    await axeCheck(element)
  })
})

describe('a11y: Toggle', () => {
  it('labelled toggle has no violations', async () => {
    // The visual <button role="switch"> now carries aria-labelledby pointing to
    // the <label> element, satisfying the button-name rule.
    const { element } = mount(Toggle, { props: { label: 'Notifications', modelValue: false } })
    await axeCheck(element)
  })

  it('toggle without label prop uses aria-label fallback', async () => {
    const { element } = mount(Toggle, { props: { modelValue: true } })
    await axeCheck(element)
  })
})

describe('a11y: Textarea', () => {
  it('labelled textarea has no violations', async () => {
    const { element } = mount(Textarea, { props: { label: 'Message', modelValue: '' } })
    await axeCheck(element)
  })
})

// ── Molecules ─────────────────────────────────────────────────────────────────

describe('a11y: Alert', () => {
  it('info alert has no violations', async () => {
    const { element } = mount(Alert, { props: { title: 'Info', variant: 'info' } })
    await axeCheck(element)
  })

  it('danger alert has no violations', async () => {
    const { element } = mount(Alert, { props: { title: 'Error occurred', variant: 'danger' } })
    await axeCheck(element)
  })
})

describe('a11y: Modal', () => {
  it('open modal has no violations', async () => {
    const { element } = mount(Modal, {
      props: { modelValue: true },
      slots: { title: 'Dialog Title', default: 'Dialog body text' },
      global: { stubs: { Teleport: true } },
    })
    await axeCheck(element)
  })
})

describe('a11y: Drawer', () => {
  it('open drawer has no violations', async () => {
    const { element } = mount(Drawer, {
      props: { modelValue: true },
      slots: { title: 'Drawer Title', default: 'Drawer body' },
      global: { stubs: { Teleport: true } },
    })
    await axeCheck(element)
  })
})

describe('a11y: Pagination', () => {
  it('pagination has no violations', async () => {
    const { element } = mount(Pagination, { props: { modelValue: 3, total: 100, perPage: 10 } })
    await axeCheck(element)
  })
})

describe('a11y: Stepper', () => {
  it('stepper has no violations', async () => {
    const steps = [{ title: 'Step 1' }, { title: 'Step 2' }, { title: 'Step 3' }]
    const { element } = mount(Stepper, { props: { steps, activeStep: 1 } })
    await axeCheck(element)
  })
})

describe('a11y: Breadcrumb', () => {
  it('breadcrumb has no violations', async () => {
    const items = [{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: 'Widget' }]
    const { element } = mount(Breadcrumb, { props: { items } })
    await axeCheck(element)
  })
})

describe('a11y: LanguageToggle', () => {
  it('language toggle radiogroup has no violations', async () => {
    const { element } = mount(LanguageToggle, { global: { plugins: [i18n] } })
    await axeCheck(element)
  })
})
