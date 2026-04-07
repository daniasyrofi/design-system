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

// ── Atoms ─────────────────────────────────────────────────────────────────────
import Button from '@/components/atoms/Button/Button.vue'
import Input from '@/components/atoms/Input/Input.vue'
import Checkbox from '@/components/atoms/Checkbox/Checkbox.vue'
import Radio from '@/components/atoms/Radio/Radio.vue'
import Toggle from '@/components/atoms/Toggle/Toggle.vue'
import Textarea from '@/components/atoms/Textarea/Textarea.vue'
import Badge from '@/components/atoms/Badge/Badge.vue'
import Avatar from '@/components/atoms/Avatar/Avatar.vue'
import Spinner from '@/components/atoms/Spinner/Spinner.vue'
import Skeleton from '@/components/atoms/Skeleton/Skeleton.vue'
import KBD from '@/components/atoms/KBD/KBD.vue'
import VisuallyHidden from '@/components/atoms/VisuallyHidden/VisuallyHidden.vue'
import Icon from '@/components/atoms/Icon/Icon.vue'

// ── Molecules ─────────────────────────────────────────────────────────────────
import Alert from '@/components/molecules/Alert/Alert.vue'
import Modal from '@/components/molecules/Modal/Modal.vue'
import Drawer from '@/components/molecules/Drawer/Drawer.vue'
import Pagination from '@/components/molecules/Pagination/Pagination.vue'
import Stepper from '@/components/molecules/Stepper/Stepper.vue'
import Breadcrumb from '@/components/molecules/Breadcrumb/Breadcrumb.vue'
import LanguageToggle from '@/components/molecules/LanguageToggle/LanguageToggle.vue'
import Combobox from '@/components/molecules/Combobox/Combobox.vue'
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/molecules/Select'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/molecules/Tabs'
import { Accordion, AccordionItem } from '@/components/molecules/Accordion'
import Collapsible from '@/components/molecules/Collapsible/Collapsible.vue'
import AlertDialog from '@/components/molecules/AlertDialog/AlertDialog.vue'
import ProgressBar from '@/components/molecules/ProgressBar/ProgressBar.vue'
import Rating from '@/components/molecules/Rating/Rating.vue'
import Slider from '@/components/molecules/Slider/Slider.vue'
import Tooltip from '@/components/molecules/Tooltip/Tooltip.vue'
import HoverCard from '@/components/molecules/HoverCard/HoverCard.vue'
import Popover from '@/components/molecules/Popover/Popover.vue'
import DropdownMenu from '@/components/molecules/DropdownMenu/DropdownMenu.vue'
import Tag from '@/components/molecules/Tag/Tag.vue'
import EmptyState from '@/components/molecules/EmptyState/EmptyState.vue'
import Stat from '@/components/molecules/Stat/Stat.vue'
import SearchInput from '@/components/molecules/SearchInput/SearchInput.vue'
import NumberInput from '@/components/molecules/NumberInput/NumberInput.vue'
import DatePicker from '@/components/molecules/DatePicker/DatePicker.vue'
import PinInput from '@/components/molecules/PinInput/PinInput.vue'

// ── Organisms ─────────────────────────────────────────────────────────────────
import Table from '@/components/organisms/Table/Table.vue'
import Form from '@/components/organisms/Form/Form.vue'

const i18n = createI18n({ legacy: false, locale: 'en', messages: { en: {}, id: {}, zh: {} } })

beforeAll(() => {
  if (!window.matchMedia) {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((q: string) => ({
        matches: false,
        media: q,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
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
    const { element } = mount(Input, {
      props: { label: 'Email', modelValue: '', error: 'Required' },
    })
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
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Widget' },
    ]
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

// ── New Atoms ─────────────────────────────────────────────────────────────────

describe('a11y: Badge', () => {
  it('default badge has no violations', async () => {
    const { element } = mount(Badge, { slots: { default: 'Active' } })
    await axeCheck(element)
  })

  it('removable badge has no violations', async () => {
    const { element } = mount(Badge, {
      props: { variant: 'success', removable: true },
      slots: { default: 'Tag' },
    })
    await axeCheck(element)
  })
})

describe('a11y: Avatar', () => {
  it('image avatar has no violations', async () => {
    const { element } = mount(Avatar, {
      props: { src: 'https://example.com/avatar.jpg', alt: 'Jane Doe' },
    })
    await axeCheck(element)
  })

  it('initials avatar has no violations', async () => {
    const { element } = mount(Avatar, { props: { name: 'Jane Doe' } })
    await axeCheck(element)
  })
})

describe('a11y: Spinner', () => {
  it('spinner with default label has no violations', async () => {
    const { element } = mount(Spinner)
    await axeCheck(element)
  })

  it('spinner with custom label has no violations', async () => {
    const { element } = mount(Spinner, { props: { label: 'Saving changes' } })
    await axeCheck(element)
  })
})

describe('a11y: Skeleton', () => {
  it('single skeleton has no violations', async () => {
    const { element } = mount(Skeleton)
    await axeCheck(element)
  })

  it('multi-line skeleton has no violations', async () => {
    const { element } = mount(Skeleton, { props: { lines: 3 } })
    await axeCheck(element)
  })
})

describe('a11y: KBD', () => {
  it('keyboard key has no violations', async () => {
    const { element } = mount(KBD, { slots: { default: '⌘K' } })
    await axeCheck(element)
  })
})

describe('a11y: VisuallyHidden', () => {
  it('visually hidden text has no violations', async () => {
    const { element } = mount(VisuallyHidden, { slots: { default: 'Screen reader only text' } })
    await axeCheck(element)
  })
})

describe('a11y: Icon', () => {
  it('decorative icon (aria-hidden) has no violations', async () => {
    const { element } = mount(Icon, { props: { name: 'RiHomeLine' } })
    await axeCheck(element)
  })

  it('informative icon with aria-label has no violations', async () => {
    const { element } = mount(Icon, { props: { name: 'RiHomeLine', label: 'Home' } })
    await axeCheck(element)
  })
})

// ── New Molecules ─────────────────────────────────────────────────────────────

describe('a11y: Combobox', () => {
  it('labelled combobox has no violations', async () => {
    const options = [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
    ]
    const { element } = mount(Combobox, {
      props: { modelValue: '', options, label: 'Fruit' },
      global: { plugins: [i18n] },
    })
    await axeCheck(element)
  })
})

describe('a11y: Select', () => {
  it('select compound component has no violations', async () => {
    const { element } = mount(
      {
        components: { Select, SelectTrigger, SelectContent, SelectItem },
        template: `
          <Select model-value="">
            <SelectTrigger placeholder="Pick one" />
            <SelectContent>
              <SelectItem value="a">Option A</SelectItem>
              <SelectItem value="b">Option B</SelectItem>
            </SelectContent>
          </Select>
        `,
      },
      { global: { stubs: { Teleport: true } } }
    )
    await axeCheck(element)
  })
})

describe('a11y: Tabs', () => {
  it('tabs compound component has no violations', async () => {
    const { element } = mount(
      {
        components: { Tabs, TabsList, TabsTrigger, TabsContent },
        template: `
          <Tabs model-value="a">
            <TabsList>
              <TabsTrigger value="a">Tab A</TabsTrigger>
              <TabsTrigger value="b">Tab B</TabsTrigger>
            </TabsList>
            <TabsContent value="a">Content A</TabsContent>
            <TabsContent value="b">Content B</TabsContent>
          </Tabs>
        `,
      }
    )
    await axeCheck(element)
  })
})

describe('a11y: Accordion', () => {
  it('accordion with items has no violations', async () => {
    const { element } = mount(
      {
        components: { Accordion, AccordionItem },
        template: `
          <Accordion>
            <AccordionItem value="item1" title="Section One">
              Content for section one
            </AccordionItem>
            <AccordionItem value="item2" title="Section Two">
              Content for section two
            </AccordionItem>
          </Accordion>
        `,
      }
    )
    await axeCheck(element)
  })
})

describe('a11y: Collapsible', () => {
  it('collapsible with trigger slot has no violations', async () => {
    const { element } = mount(Collapsible, {
      slots: {
        trigger: `<template #trigger="{ open, toggle, contentId }">
          <button type="button" :aria-expanded="open" :aria-controls="contentId" @click="toggle">
            Toggle
          </button>
        </template>`,
        default: 'Collapsible content here',
      },
    })
    await axeCheck(element)
  })
})

describe('a11y: AlertDialog', () => {
  it('open alert dialog has no violations', async () => {
    const { element } = mount(AlertDialog, {
      props: {
        modelValue: true,
        title: 'Confirm deletion',
        description: 'This action cannot be undone.',
      },
      global: { stubs: { Teleport: true } },
    })
    await axeCheck(element)
  })
})

describe('a11y: ProgressBar', () => {
  it('progress bar has no violations', async () => {
    const { element } = mount(ProgressBar, {
      props: { value: 60, label: 'Upload progress' },
    })
    await axeCheck(element)
  })

  it('indeterminate progress bar has no violations', async () => {
    const { element } = mount(ProgressBar, {
      props: { indeterminate: true, label: 'Loading' },
    })
    await axeCheck(element)
  })
})

describe('a11y: Rating', () => {
  it('rating with value has no violations', async () => {
    const { element } = mount(Rating, {
      props: { modelValue: 3, label: 'Product rating' },
    })
    await axeCheck(element)
  })

  it('readonly rating has no violations', async () => {
    const { element } = mount(Rating, {
      props: { modelValue: 4, readonly: true, label: 'Average rating' },
    })
    await axeCheck(element)
  })
})

describe('a11y: Slider', () => {
  it('slider has no violations', async () => {
    const { element } = mount(Slider, {
      props: { modelValue: 50, label: 'Volume' },
    })
    await axeCheck(element)
  })
})

describe('a11y: Tooltip', () => {
  it('tooltip with content has no violations', async () => {
    const { element } = mount(Tooltip, {
      props: { content: 'Helpful tip' },
      slots: { default: '<button type="button">Hover me</button>' },
    })
    await axeCheck(element)
  })
})

describe('a11y: HoverCard', () => {
  it('hover card has no violations', async () => {
    const { element } = mount(HoverCard, {
      slots: {
        trigger: '<button type="button">Hover trigger</button>',
        default: '<p>Card content</p>',
      },
    })
    await axeCheck(element)
  })
})

describe('a11y: Popover', () => {
  it('closed popover has no violations', async () => {
    const { element } = mount(Popover, {
      slots: {
        trigger: '<button type="button">Open popover</button>',
        default: '<p>Popover body</p>',
      },
      global: { stubs: { Teleport: true } },
    })
    await axeCheck(element)
  })
})

describe('a11y: DropdownMenu', () => {
  it('dropdown menu (closed) has no violations', async () => {
    const items = [
      { label: 'Edit', action: () => {} },
      { label: 'Delete', tone: 'danger' as const, action: () => {} },
    ]
    const { element } = mount(DropdownMenu, {
      props: { items },
      slots: { trigger: '<button type="button">Actions</button>' },
    })
    await axeCheck(element)
  })
})

describe('a11y: Tag', () => {
  it('default tag has no violations', async () => {
    const { element } = mount(Tag, { slots: { default: 'Vue.js' } })
    await axeCheck(element)
  })

  it('removable tag has no violations', async () => {
    const { element } = mount(Tag, {
      props: { removable: true },
      slots: { default: 'Remove me' },
    })
    await axeCheck(element)
  })
})

describe('a11y: EmptyState', () => {
  it('empty state with title has no violations', async () => {
    const { element } = mount(EmptyState, {
      props: { title: 'No results found', description: 'Try adjusting your search.' },
    })
    await axeCheck(element)
  })
})

describe('a11y: Stat', () => {
  it('stat with value has no violations', async () => {
    const { element } = mount(Stat, {
      props: { label: 'Total Revenue', value: '$48,000', delta: '+12%', trend: 'up' },
    })
    await axeCheck(element)
  })
})

describe('a11y: SearchInput', () => {
  it('search input has no violations', async () => {
    const { element } = mount(SearchInput, {
      props: { modelValue: '', placeholder: 'Search users...' },
    })
    await axeCheck(element)
  })
})

describe('a11y: NumberInput', () => {
  it('labelled number input has no violations', async () => {
    const { element } = mount(NumberInput, {
      props: { modelValue: 5, label: 'Quantity' },
    })
    await axeCheck(element)
  })
})

describe('a11y: DatePicker', () => {
  it('labelled date picker has no violations', async () => {
    const { element } = mount(DatePicker, {
      props: { label: 'Start date' },
    })
    await axeCheck(element)
  })
})

describe('a11y: PinInput', () => {
  it('pin input has no violations', async () => {
    const { element } = mount(PinInput, {
      props: { length: 4 },
    })
    await axeCheck(element)
  })
})

// ── Organisms ─────────────────────────────────────────────────────────────────

describe('a11y: Table', () => {
  it('table with data has no violations', async () => {
    const columns = [
      { key: 'name', label: 'Name' },
      { key: 'role', label: 'Role' },
    ]
    const data = [
      { name: 'Alice', role: 'Admin' },
      { name: 'Bob', role: 'Editor' },
    ]
    const { element } = mount(Table, { props: { columns, data } })
    await axeCheck(element)
  })

  it('empty table has no violations', async () => {
    const columns = [{ key: 'name', label: 'Name' }]
    const { element } = mount(Table, { props: { columns, data: [] } })
    await axeCheck(element)
  })
})

describe('a11y: Form', () => {
  it('form with stack layout has no violations', async () => {
    const { element } = mount(Form, {
      props: { layout: 'stack' },
      slots: { default: '<p>Form content</p>' },
    })
    await axeCheck(element)
  })
})
