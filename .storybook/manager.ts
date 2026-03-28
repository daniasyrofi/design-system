import { addons } from 'storybook/manager-api'

addons.setConfig({
  sidebar: {
    showRoots: true,
  },
  panelPosition: 'right',
  toolbar: {
    zoom: { hidden: true },
    grid: { hidden: true },
  },
})
