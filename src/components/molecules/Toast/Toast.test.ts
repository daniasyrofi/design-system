import { describe, it, expect, beforeEach } from 'vitest'
import { useToast } from './useToast'

// useToast uses a singleton — reset between tests
beforeEach(() => {
  useToast().dismissAll()
})

describe('useToast', () => {
  it('adds a toast and returns an id', () => {
    const { toasts, toast } = useToast()
    const id = toast({ title: 'Hello' })
    expect(typeof id).toBe('string')
    expect(toasts.value.some(t => t.id === id)).toBe(true)
  })

  it('stores the title', () => {
    const { toasts, toast } = useToast()
    toast({ title: 'Test title' })
    expect(toasts.value[0].title).toBe('Test title')
  })

  it('stores optional description', () => {
    const { toasts, toast } = useToast()
    toast({ title: 'T', description: 'Details' })
    expect(toasts.value[0].description).toBe('Details')
  })

  it('defaults to info variant', () => {
    const { toasts, toast } = useToast()
    toast({ title: 'Hi' })
    expect(toasts.value[0].variant).toBe('info')
  })

  it('stores specified variant', () => {
    const { toasts, toast } = useToast()
    toast({ title: 'Error!', variant: 'danger' })
    expect(toasts.value[0].variant).toBe('danger')
  })

  it('dismisses a toast by id', () => {
    const { toasts, toast, dismiss } = useToast()
    const id = toast({ title: 'Bye' })
    dismiss(id)
    expect(toasts.value.some(t => t.id === id)).toBe(false)
  })

  it('dismissAll removes all toasts', () => {
    const { toasts, toast, dismissAll } = useToast()
    toast({ title: 'A' })
    toast({ title: 'B' })
    dismissAll()
    expect(toasts.value).toHaveLength(0)
  })

  it('convenience: success() sets variant=success', () => {
    const { toasts, success } = useToast()
    success('All good')
    expect(toasts.value[0].variant).toBe('success')
  })

  it('convenience: error() sets variant=danger', () => {
    const { toasts, error } = useToast()
    error('Failed')
    expect(toasts.value[0].variant).toBe('danger')
  })

  it('convenience: warning() sets variant=warning', () => {
    const { toasts, warning } = useToast()
    warning('Careful')
    expect(toasts.value[0].variant).toBe('warning')
  })

  it('convenience: info() sets variant=info', () => {
    const { toasts, info } = useToast()
    info('Note')
    expect(toasts.value[0].variant).toBe('info')
  })
})
