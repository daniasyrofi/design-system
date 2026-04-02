/**
 * axe-core accessibility testing helper for Vitest + happy-dom.
 *
 * Usage:
 *   import { axeCheck } from '@/test/a11y'
 *   import { mount } from '@vue/test-utils'
 *
 *   it('has no accessibility violations', async () => {
 *     const wrapper = mount(MyComponent, { props: { ... } })
 *     await axeCheck(wrapper.element)
 *   })
 */
import axe from 'axe-core'

function configureAxeForHappyDom() {
  // axe-core requires window.document — happy-dom provides it
  // Disable rules that require full browser layout engine
  axe.configure({
    rules: [
      // color-contrast needs computed styles — not available in happy-dom
      { id: 'color-contrast', enabled: false },
      // scrollable-region-focusable needs layout
      { id: 'scrollable-region-focusable', enabled: false },
    ],
  })
}

let configured = false

/**
 * Runs axe-core against an HTMLElement and throws if any WCAG 2.1 AA
 * violations are found.
 *
 * The element is temporarily attached to document.body so axe can traverse
 * it (required in happy-dom, which does not attach mounted components by
 * default).
 *
 * @param element - The root element to scan (e.g. wrapper.element)
 * @param options  - Optional axe.RunOptions overrides
 */
export async function axeCheck(
  element: Element,
  options: axe.RunOptions = {},
): Promise<void> {
  if (!configured) {
    configureAxeForHappyDom()
    configured = true
  }

  // Attach to body so axe can find the element in the page context
  const isAttached = document.body.contains(element)
  if (!isAttached) document.body.appendChild(element)

  try {
    const results = await axe.run(element, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
      },
      ...options,
    })

    if (results.violations.length > 0) {
      const messages = results.violations.map((v) => {
        const nodes = v.nodes
          .map((n) => `  - ${n.html}\n    Fix: ${n.failureSummary}`)
          .join('\n')
        return `[${v.id}] ${v.description} (impact: ${v.impact})\n${nodes}`
      })
      throw new Error(
        `axe found ${results.violations.length} accessibility violation(s):\n\n${messages.join('\n\n')}`,
      )
    }
  } finally {
    if (!isAttached) element.remove()
  }
}
