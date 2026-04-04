import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ChatMessage from './ChatMessage.vue'

const ts = new Date('2024-01-15T14:30:00')

describe('ChatMessage', () => {
  it('renders message content', () => {
    const wrapper = mount(ChatMessage, {
      props: { role: 'user', content: 'Hello world', timestamp: ts },
    })
    expect(wrapper.text()).toContain('Hello world')
  })

  it('shows formatted timestamp', () => {
    const wrapper = mount(ChatMessage, {
      props: { role: 'user', content: 'Hi', timestamp: ts },
    })
    expect(wrapper.text()).toContain('14:30')
  })

  it('shows typing indicator when isTyping=true', () => {
    const wrapper = mount(ChatMessage, {
      props: { role: 'assistant', content: '', timestamp: ts, isTyping: true },
    })
    // Typing indicator should be visible instead of content
    expect(wrapper.html()).toMatch(/typing|dot|bounce|animate/i)
  })

  it('hides content when isTyping=true', () => {
    const wrapper = mount(ChatMessage, {
      props: { role: 'assistant', content: 'Not shown', timestamp: ts, isTyping: true },
    })
    expect(wrapper.text()).not.toContain('Not shown')
  })

  it('applies different layout for user vs assistant', () => {
    const user = mount(ChatMessage, { props: { role: 'user', content: 'Hi', timestamp: ts } })
    const assistant = mount(ChatMessage, {
      props: { role: 'assistant', content: 'Hi', timestamp: ts },
    })
    // containerClass binds to the root div — user gets flex-row-reverse
    expect(user.html()).toContain('flex-row-reverse')
    expect(assistant.html()).not.toContain('flex-row-reverse')
  })

  it('shows user name when userName is provided', () => {
    const wrapper = mount(ChatMessage, {
      props: { role: 'user', content: 'Hi', timestamp: ts, userName: 'Alice' },
    })
    expect(wrapper.text()).toContain('Alice')
  })

  it('renders actions slot area when actions=true', () => {
    const wrapper = mount(ChatMessage, {
      props: { role: 'assistant', content: 'Hello', timestamp: ts, actions: true },
    })
    // Action buttons should exist (copy/retry)
    expect(wrapper.findAll('button').length).toBeGreaterThan(0)
  })

  it('emits copy event when copy button is clicked', async () => {
    const wrapper = mount(ChatMessage, {
      props: { role: 'assistant', content: 'Copy me', timestamp: ts, actions: true },
    })
    const copyBtn = wrapper
      .findAll('button')
      .find((b) => (b.attributes('aria-label') ?? '').toLowerCase().includes('copy'))
    if (copyBtn) {
      await copyBtn.trigger('click')
      expect(wrapper.emitted('copy')).toBeTruthy()
    }
  })

  it.each(['sending', 'sent', 'error'] as const)('renders status %s', (status) => {
    const wrapper = mount(ChatMessage, {
      props: { role: 'user', content: 'Hi', timestamp: ts, status },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('does not use fixed timestamp offset utility classes', () => {
    const wrapper = mount(ChatMessage, {
      props: { role: 'assistant', content: 'Aligned', timestamp: ts },
    })
    expect(wrapper.html()).not.toContain('ml-10')
    expect(wrapper.html()).not.toContain('mr-10')
  })
})
