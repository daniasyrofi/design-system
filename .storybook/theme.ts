import { create } from 'storybook/theming/create'

export const lightTheme = create({
  base: 'light',
  brandTitle: 'Abadikan Design System',
  brandUrl: '/',

  colorPrimary:   '#111111',
  colorSecondary: '#111111',

  appBg:          '#FAFAF8',
  appContentBg:   '#FFFFFF',
  appPreviewBg:   '#FFFFFF',
  appBorderColor: '#EBE8E0',
  appBorderRadius: 8,

  fontBase:  '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontCode:  '"JetBrains Mono", "SF Mono", monospace',

  textColor:       '#111111',
  textInverseColor:'#FFFFFF',
  textMutedColor:  '#666666',

  barTextColor:    '#666666',
  barSelectedColor:'#111111',
  barHoverColor:   '#111111',
  barBg:           '#FFFFFF',

  inputBg:         '#FFFFFF',
  inputBorder:     '#E5E3DB',
  inputTextColor:  '#111111',
  inputBorderRadius: 6,

  booleanBg:          '#EDECEA',
  booleanSelectedBg:  '#3A3936',

  buttonBg:           '#F5F5F3',
  buttonBorder:       '#E8E8E4',
})

export const darkTheme = create({
  base: 'dark',
  brandTitle: 'Abadikan Design System',
  brandUrl: '/',

  colorPrimary:   '#E8957A',
  colorSecondary: '#E8957A',

  appBg:            '#151513',
  appContentBg:     '#1C1C1A',
  appPreviewBg:     '#1C1C1A',
  appBorderColor:   '#2E2E2A',
  appBorderRadius:  8,

  fontBase:  '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontCode:  '"JetBrains Mono", "SF Mono", monospace',

  textColor:        '#E5E3DB',
  textInverseColor: '#151513',
  textMutedColor:   '#8A887F',

  barTextColor:     '#8A887F',
  barSelectedColor: '#E5E3DB',
  barHoverColor:    '#E5E3DB',
  barBg:            '#1C1C1A',

  inputBg:            '#232320',
  inputBorder:        '#2E2E2A',
  inputTextColor:     '#E5E3DB',
  inputBorderRadius:  6,

  booleanBg:          '#2E2E2A',
  booleanSelectedBg:  '#E8957A',

  buttonBg:           '#232320',
  buttonBorder:       '#2E2E2A',
})
