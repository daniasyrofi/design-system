import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import LanguageToggle from './LanguageToggle.vue'

function makeI18n(locale = 'en') {
  return createI18n({ legacy: false, locale, messages: { en: {}, id: {}, zh: {} } })
}

describe('LanguageToggle', () => {
  it('renders radiogroup with aria-label', () => {
    const wrapper = mount(LanguageToggle, { global: { plugins: [makeI18n()] } })
    const group = wrapper.find('[role="radiogroup"]')
    expect(group.exists()).toBe(true)
    expect(group.attributes('aria-label')).toBeTruthy()
  })

  it('renders three language buttons (id, en, zh)', () => {
    const wrapper = mount(LanguageToggle, { global: { plugins: [makeI18n()] } })
    const buttons = wrapper.findAll('[role="radio"]')
    expect(buttons.length).toBe(3)
  })

  it('marks active locale as aria-checked=true', () => {
    const wrapper = mount(LanguageToggle, { global: { plugins: [makeI18n('en')] } })
    const buttons = wrapper.findAll('[role="radio"]')
    const active = buttons.find(b => b.attributes('aria-checked') === 'true')
    expect(active?.text().toLowerCase()).toBe('en')
  })

  it('marks inactive locales as aria-checked=false', () => {
    const wrapper = mount(LanguageToggle, { global: { plugins: [makeI18n('en')] } })
    const inactive = wrapper.findAll('[role="radio"]').filter(b => b.attributes('aria-checked') === 'false')
    expect(inactive.length).toBe(2)
  })

  it('updates aria-checked when locale button is clicked', async () => {
    const wrapper = mount(LanguageToggle, { global: { plugins: [makeI18n('en')] } })
    const buttons = wrapper.findAll('[role="radio"]')
    const idBtn = buttons.find(b => b.text().toLowerCase() === 'id')
    await idBtn?.trigger('click')
    expect(idBtn?.attributes('aria-checked')).toBe('true')
  })

  it.each(['sm', 'md', 'lg'] as const)('renders size %s', (size) => {
    const wrapper = mount(LanguageToggle, {
      props: { size },
      global: { plugins: [makeI18n()] },
    })
    expect(wrapper.findAll('[role="radio"]').length).toBe(3)
  })
})
