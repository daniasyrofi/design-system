import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Table from './Table.vue'

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role', sortable: true },
]

const data = [
  { name: 'Alice', email: 'alice@example.com', role: 'Admin' },
  { name: 'Bob', email: 'bob@example.com', role: 'User' },
  { name: 'Carol', email: 'carol@example.com', role: 'User' },
]

describe('Table', () => {
  it('renders a table element', () => {
    const wrapper = mount(Table, { props: { columns, data } })
    expect(wrapper.find('table').exists()).toBe(true)
  })

  it('renders column headers', () => {
    const wrapper = mount(Table, { props: { columns, data } })
    expect(wrapper.text()).toContain('Name')
    expect(wrapper.text()).toContain('Email')
    expect(wrapper.text()).toContain('Role')
  })

  it('renders data rows', () => {
    const wrapper = mount(Table, { props: { columns, data } })
    expect(wrapper.text()).toContain('Alice')
    expect(wrapper.text()).toContain('Bob')
    expect(wrapper.text()).toContain('Carol')
  })

  it('renders correct number of rows', () => {
    const wrapper = mount(Table, { props: { columns, data } })
    const rows = wrapper.find('tbody').findAll('tr')
    expect(rows.length).toBe(3)
  })

  it('shows empty state when data is empty', () => {
    const wrapper = mount(Table, { props: { columns, data: [], emptyText: 'No records' } })
    expect(wrapper.text()).toContain('No records')
  })

  it('shows loading overlay when loading=true', () => {
    const wrapper = mount(Table, { props: { columns, data, loading: true } })
    // Loading state should show spinner
    expect(wrapper.html()).toMatch(/spinner|loading/i)
  })

  it('emits sort event when sortable column header is clicked', async () => {
    const wrapper = mount(Table, { props: { columns, data } })
    const sortableHeader = wrapper.findAll('th').find((th) => th.text().includes('Name'))
    if (sortableHeader) {
      await sortableHeader.trigger('click')
      expect(wrapper.emitted('sort')).toBeTruthy()
      const [payload] = wrapper.emitted('sort')![0] as [{ key: string; direction: string }]
      expect(payload.key).toBe('name')
      expect(payload.direction).toMatch(/asc|desc/)
    }
  })

  it('toggles sort direction on second click', async () => {
    const wrapper = mount(Table, { props: { columns, data } })
    const nameHeader = wrapper.findAll('th').find((th) => th.text().includes('Name'))
    if (nameHeader) {
      await nameHeader.trigger('click')
      await nameHeader.trigger('click')
      const emissions = wrapper.emitted('sort')!
      expect(emissions.length).toBe(2)
      const first = (emissions[0][0] as any).direction
      const second = (emissions[1][0] as any).direction
      expect(first).not.toBe(second)
    }
  })

  it('does not emit sort for non-sortable column', async () => {
    const wrapper = mount(Table, { props: { columns, data } })
    const emailHeader = wrapper.findAll('th').find((th) => th.text().includes('Email'))
    if (emailHeader) {
      await emailHeader.trigger('click')
      expect(wrapper.emitted('sort')).toBeFalsy()
    }
  })

  it('renders selection checkboxes when selectable=true', () => {
    const wrapper = mount(Table, { props: { columns, data, selectable: true } })
    const checkboxes = wrapper.findAll('input[type="checkbox"]')
    // 1 header + 3 row checkboxes
    expect(checkboxes.length).toBe(4)
  })

  it('emits select event when a row is checked', async () => {
    const wrapper = mount(Table, { props: { columns, data, selectable: true } })
    const rowCheckboxes = wrapper.find('tbody').findAll('input[type="checkbox"]')
    await rowCheckboxes[0].trigger('change')
    expect(wrapper.emitted('select')).toBeTruthy()
  })

  it('select-all checkbox selects all rows', async () => {
    const wrapper = mount(Table, { props: { columns, data, selectable: true } })
    const selectAll = wrapper.find('thead input[type="checkbox"]')
    await selectAll.trigger('change')
    const emitted = wrapper.emitted('select')!
    expect(emitted).toBeTruthy()
    const selected = emitted[emitted.length - 1][0] as any[]
    expect(selected.length).toBe(3)
  })

  it('applies striped classes when striped=true', () => {
    const striped = mount(Table, { props: { columns, data, striped: true } })
    const plain = mount(Table, { props: { columns, data, striped: false } })
    expect(striped.html()).not.toBe(plain.html())
  })

  it('renders custom cell slot', () => {
    const wrapper = mount(Table, {
      props: { columns, data },
      slots: { 'cell-name': '<strong>Custom</strong>' },
    })
    expect(wrapper.text()).toContain('Custom')
  })

  describe('filtering', () => {
    it('shows only rows matching filterBy', () => {
      const wrapper = mount(Table, { props: { columns, data, filterBy: 'alice' } })
      expect(wrapper.text()).toContain('Alice')
      expect(wrapper.text()).not.toContain('Bob')
      expect(wrapper.text()).not.toContain('Carol')
    })

    it('filter is case-insensitive', () => {
      const wrapper = mount(Table, { props: { columns, data, filterBy: 'ALICE' } })
      expect(wrapper.text()).toContain('Alice')
    })

    it('shows empty state when filter matches nothing', () => {
      const wrapper = mount(Table, {
        props: { columns, data, filterBy: 'xyz123', emptyText: 'Nothing found' },
      })
      expect(wrapper.text()).toContain('Nothing found')
    })

    it('shows all rows when filterBy is empty string', () => {
      const wrapper = mount(Table, { props: { columns, data, filterBy: '' } })
      expect(wrapper.text()).toContain('Alice')
      expect(wrapper.text()).toContain('Bob')
      expect(wrapper.text()).toContain('Carol')
    })

    it('respects filterable=false column', () => {
      const cols = [
        { key: 'name', label: 'Name', filterable: false },
        { key: 'role', label: 'Role' },
      ]
      const wrapper = mount(Table, { props: { columns: cols, data, filterBy: 'alice' } })
      // 'alice' only appears in the name column (filterable=false), so no rows should show
      expect(wrapper.text()).not.toContain('Alice')
    })
  })

  describe('client-side sorting', () => {
    it('sorts rows ascending by name after one click', async () => {
      const wrapper = mount(Table, { props: { columns, data } })
      const nameHeader = wrapper.findAll('th').find((th) => th.text().includes('Name'))!
      await nameHeader.trigger('click')
      const rows = wrapper.find('tbody').findAll('tr')
      expect(rows[0].text()).toContain('Alice')
      expect(rows[1].text()).toContain('Bob')
      expect(rows[2].text()).toContain('Carol')
    })

    it('sorts rows descending by name after two clicks', async () => {
      const wrapper = mount(Table, { props: { columns, data } })
      const nameHeader = wrapper.findAll('th').find((th) => th.text().includes('Name'))!
      await nameHeader.trigger('click')
      await nameHeader.trigger('click')
      const rows = wrapper.find('tbody').findAll('tr')
      expect(rows[0].text()).toContain('Carol')
      expect(rows[2].text()).toContain('Alice')
    })
  })

  describe('stickyHeader', () => {
    it('applies sticky class to thead tr when stickyHeader=true', () => {
      const wrapper = mount(Table, { props: { columns, data, stickyHeader: true } })
      const headerRow = wrapper.find('thead tr')
      expect(headerRow.classes()).toContain('sticky')
      expect(headerRow.classes()).toContain('z-10')
    })

    it('does not apply sticky class when stickyHeader=false', () => {
      const wrapper = mount(Table, { props: { columns, data, stickyHeader: false } })
      const headerRow = wrapper.find('thead tr')
      expect(headerRow.classes()).not.toContain('sticky')
    })
  })

  describe('skeletonLoading', () => {
    it('renders 5 skeleton rows when skeletonLoading=true', () => {
      const wrapper = mount(Table, { props: { columns, data: [], skeletonLoading: true } })
      const rows = wrapper.find('tbody').findAll('tr')
      expect(rows.length).toBe(5)
    })

    it('renders skeleton elements in each cell', () => {
      const wrapper = mount(Table, { props: { columns, data: [], skeletonLoading: true } })
      // Each row should have skeletons matching the number of columns
      const skeletons = wrapper.findAll('[role="status"][aria-busy="true"]')
      // 5 rows × 3 columns = 15 skeletons
      expect(skeletons.length).toBe(15)
    })

    it('does not show empty state when skeletonLoading=true', () => {
      const wrapper = mount(Table, {
        props: { columns, data: [], skeletonLoading: true, emptyText: 'No records' },
      })
      expect(wrapper.text()).not.toContain('No records')
    })
  })

  describe('expandable rows', () => {
    it('toggles expanded row on click when expandable=true', async () => {
      const wrapper = mount(Table, {
        props: { columns, data, expandable: true },
        slots: { 'expanded-row': '<div class="expanded-content">Details</div>' },
      })

      // Initially no expanded rows
      expect(wrapper.findAll('.expanded-content').length).toBe(0)

      // Click the first data row
      const dataRows = wrapper.find('tbody').findAll('tr')
      await dataRows[0].trigger('click')

      // Expanded content should appear
      expect(wrapper.find('.expanded-content').exists()).toBe(true)
      expect(wrapper.text()).toContain('Details')
    })

    it('collapses expanded row on second click', async () => {
      const wrapper = mount(Table, {
        props: { columns, data, expandable: true },
        slots: { 'expanded-row': '<div class="expanded-content">Details</div>' },
      })

      const dataRows = wrapper.find('tbody').findAll('tr')
      await dataRows[0].trigger('click')
      expect(wrapper.find('.expanded-content').exists()).toBe(true)

      // Click again to collapse
      // After expansion, the first <tr> is still at index 0, expansion row is index 1
      const updatedRows = wrapper.find('tbody').findAll('tr')
      await updatedRows[0].trigger('click')
      expect(wrapper.find('.expanded-content').exists()).toBe(false)
    })

    it('applies cursor-pointer class when expandable=true', () => {
      const wrapper = mount(Table, { props: { columns, data, expandable: true } })
      const firstRow = wrapper.find('tbody tr')
      expect(firstRow.classes()).toContain('cursor-pointer')
    })
  })

  describe('hiddenColumns', () => {
    it('hides columns listed in hiddenColumns', () => {
      const wrapper = mount(Table, {
        props: { columns, data, hiddenColumns: ['email'] },
      })
      // Header should not contain Email
      const headers = wrapper.findAll('th')
      const headerTexts = headers.map((h) => h.text())
      expect(headerTexts).not.toContain(expect.stringContaining('Email'))

      // Data should not contain email values
      expect(wrapper.text()).not.toContain('alice@example.com')
    })

    it('shows all columns when hiddenColumns is empty', () => {
      const wrapper = mount(Table, {
        props: { columns, data, hiddenColumns: [] },
      })
      expect(wrapper.text()).toContain('Email')
      expect(wrapper.text()).toContain('alice@example.com')
    })

    it('renders correct number of th elements', () => {
      const wrapper = mount(Table, {
        props: { columns, data, hiddenColumns: ['email', 'role'] },
      })
      const headers = wrapper.findAll('th')
      expect(headers.length).toBe(1) // only 'name'
    })
  })

  describe('virtual scrolling', () => {
    it('renders visible rows in virtual mode', () => {
      const bigData = Array.from({ length: 200 }, (_, i) => ({
        name: `User ${i}`,
        email: `user${i}@example.com`,
        role: 'User',
      }))
      const wrapper = mount(Table, {
        props: { columns, data: bigData, virtual: true, rowHeight: 48, containerHeight: 400 },
      })
      // Should not render all 200 rows — only the visible slice + overscan
      const rows = wrapper.find('tbody').findAll('tr[class]')
      expect(rows.length).toBeLessThan(200)
      expect(rows.length).toBeGreaterThan(0)
    })
  })
})
