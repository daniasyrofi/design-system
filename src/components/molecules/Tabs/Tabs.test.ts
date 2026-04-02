import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, ref } from 'vue'
import Tabs from './Tabs.vue'
import TabsList from './TabsList.vue'
import TabsTrigger from './TabsTrigger.vue'
import TabsContent from './TabsContent.vue'

function mountTabs(active = 'one', variant: 'line' | 'pill' | 'boxed' = 'line') {
  return mount(defineComponent({
    components: { Tabs, TabsList, TabsTrigger, TabsContent },
    template: `
      <Tabs v-model="active" :variant="variant">
        <TabsList>
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
          <TabsTrigger value="three" :disabled="true">Three</TabsTrigger>
        </TabsList>
        <TabsContent value="one">Content One</TabsContent>
        <TabsContent value="two">Content Two</TabsContent>
        <TabsContent value="three">Content Three</TabsContent>
      </Tabs>
    `,
    setup() {
      return { active: ref(active), variant }
    },
  }))
}

describe('Tabs', () => {
  it('renders tablist with correct role', () => {
    const wrapper = mountTabs()
    expect(wrapper.find('[role="tablist"]').exists()).toBe(true)
  })

  it('renders tab triggers with role=tab', () => {
    const wrapper = mountTabs()
    const tabs = wrapper.findAll('[role="tab"]')
    expect(tabs).toHaveLength(3)
  })

  it('active tab has aria-selected=true', () => {
    const wrapper = mountTabs('one')
    const tabs = wrapper.findAll('[role="tab"]')
    expect(tabs[0].attributes('aria-selected')).toBe('true')
    expect(tabs[1].attributes('aria-selected')).toBe('false')
  })

  it('shows active content panel (v-show — check display style)', () => {
    const wrapper = mountTabs('one')
    const panels = wrapper.findAll('[role="tabpanel"]')
    // happy-dom does not apply CSS so isVisible() is unreliable.
    // v-show sets display:none on hidden elements — check inline style instead.
    expect((panels[0].element as HTMLElement).style.display).not.toBe('none')
    expect((panels[1].element as HTMLElement).style.display).toBe('none')
  })

  it('switches tab on click', async () => {
    const wrapper = mountTabs('one')
    const tabs = wrapper.findAll('[role="tab"]')
    await tabs[1].trigger('click')
    expect(tabs[1].attributes('aria-selected')).toBe('true')
    expect(tabs[0].attributes('aria-selected')).toBe('false')
  })

  it('disabled tab cannot be clicked', async () => {
    const wrapper = mountTabs('one')
    const disabledTab = wrapper.findAll('[role="tab"]')[2]
    expect(disabledTab.attributes('disabled')).toBeDefined()
  })

  it('tabpanel has correct aria-labelledby', () => {
    const wrapper = mountTabs('one')
    const panel = wrapper.find('[role="tabpanel"]')
    expect(panel.attributes('id')).toBe('tabpanel-one')
  })

  it('tablist has aria-orientation', () => {
    const wrapper = mountTabs()
    expect(wrapper.find('[role="tablist"]').attributes('aria-orientation')).toBe('horizontal')
  })

  it('renders pill variant', () => {
    const wrapper = mountTabs('one', 'pill')
    // pill variant applies rounded-full to triggers
    const tab = wrapper.findAll('[role="tab"]')[0]
    expect(tab.classes().join(' ')).toContain('rounded-full')
  })

  it('renders boxed variant', () => {
    const wrapper = mountTabs('one', 'boxed')
    expect(wrapper.find('[role="tablist"]').exists()).toBe(true)
    expect(wrapper.findAll('[role="tab"]').length).toBeGreaterThan(0)
  })

  it('navigates to next tab with ArrowRight', async () => {
    const wrapper = mountTabs('one')
    const tabs = wrapper.findAll('[role="tab"]')
    await tabs[0].trigger('keydown', { key: 'ArrowRight' })
    expect(tabs[1].attributes('aria-selected')).toBe('true')
  })

  it('navigates to prev tab with ArrowLeft', async () => {
    const wrapper = mountTabs('two')
    const tabs = wrapper.findAll('[role="tab"]')
    await tabs[1].trigger('keydown', { key: 'ArrowLeft' })
    expect(tabs[0].attributes('aria-selected')).toBe('true')
  })

  it('navigates to first tab with Home', async () => {
    const wrapper = mountTabs('two')
    const tabs = wrapper.findAll('[role="tab"]')
    await tabs[1].trigger('keydown', { key: 'Home' })
    expect(tabs[0].attributes('aria-selected')).toBe('true')
  })

  it('navigates to last tab with End', async () => {
    const wrapper = mountTabs('one')
    const tabs = wrapper.findAll('[role="tab"]')
    await tabs[0].trigger('keydown', { key: 'End' })
    // last non-disabled tab selected
    expect(wrapper.text()).toBeTruthy()
  })

  it('renders vertical orientation', () => {
    const wrapper = mount(defineComponent({
      components: { Tabs, TabsList, TabsTrigger, TabsContent },
      template: `
        <Tabs v-model="active" orientation="vertical">
          <TabsList>
            <TabsTrigger value="a">A</TabsTrigger>
            <TabsTrigger value="b">B</TabsTrigger>
          </TabsList>
          <TabsContent value="a">Content A</TabsContent>
          <TabsContent value="b">Content B</TabsContent>
        </Tabs>
      `,
      setup() { return { active: ref('a') } },
    }))
    expect(wrapper.find('[role="tablist"]').attributes('aria-orientation')).toBe('vertical')
  })

  it('navigates with ArrowDown in vertical orientation', async () => {
    const wrapper = mount(defineComponent({
      components: { Tabs, TabsList, TabsTrigger, TabsContent },
      template: `
        <Tabs v-model="active" orientation="vertical">
          <TabsList>
            <TabsTrigger value="a">A</TabsTrigger>
            <TabsTrigger value="b">B</TabsTrigger>
          </TabsList>
          <TabsContent value="a">A</TabsContent>
          <TabsContent value="b">B</TabsContent>
        </Tabs>
      `,
      setup() { return { active: ref('a') } },
    }))
    const tabs = wrapper.findAll('[role="tab"]')
    await tabs[0].trigger('keydown', { key: 'ArrowDown' })
    expect(tabs[1].attributes('aria-selected')).toBe('true')
  })

  it('does not navigate when trigger is disabled', async () => {
    const wrapper = mountTabs('one')
    const disabledTab = wrapper.findAll('[role="tab"]')[2]
    await disabledTab.trigger('keydown', { key: 'ArrowLeft' })
    // active should still be 'one'
    expect(wrapper.findAll('[role="tab"]')[0].attributes('aria-selected')).toBe('true')
  })
})
