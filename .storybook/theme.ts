import { create } from 'storybook/theming/create'

export const lightTheme = create({
  base: 'light',
  brandTitle: 'Abadikan Design System',
  brandUrl: '/',

  /* Brand: Primary = Secondary (Pink Base) */
  colorPrimary:   '#E53A71',
  colorSecondary: '#E53A71',

  /* Neutral Backgrounds */
  appBg:          '#FCFAF9',
  appContentBg:   '#FFFFFF',
  appPreviewBg:   '#FFFFFF',
  appBorderColor: '#EBE8E0',
  appBorderRadius: 8,

  fontBase:  '"Abadikan Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontCode:  '"JetBrains Mono", "SF Mono", monospace',

  textColor:       '#2E3029',
  textInverseColor:'#FFFFFF',
  textMutedColor:  '#808578',

  barTextColor:    '#808578',
  barSelectedColor:'#E53A71',
  barHoverColor:   '#E53A71',
  barBg:           '#FFFFFF',

  inputBg:         '#FFFFFF',
  inputBorder:     '#EBE8E0',
  inputTextColor:  '#2E3029',
  inputBorderRadius: 6,

  booleanBg:          '#EBE8E0',
  booleanSelectedBg:  '#E53A71',

  buttonBg:           '#FCFAF9',
  buttonBorder:       '#EBE8E0',
})

export const darkTheme = create({
  base: 'dark',
  brandTitle: 'Abadikan Design System',
  brandUrl: '/',

  /* Brand: Primary = Secondary (Pink Lightish) */
  colorPrimary:   '#FF7396',
  colorSecondary: '#FF7396',

  /* Neutral Backgrounds */
  appBg:            '#22231F',
  appContentBg:     '#1C1C1A',
  appPreviewBg:     '#1C1C1A',
  appBorderColor:   '#3A3C34',
  appBorderRadius:  8,

  fontBase:  '"Abadikan Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontCode:  '"JetBrains Mono", "SF Mono", monospace',

  textColor:        '#F2F2F2',
  textInverseColor: '#22231F',
  textMutedColor:   '#FFFFFF',

  barTextColor:     '#FFFFFF',
  barSelectedColor: '#FF7396',
  barHoverColor:    '#FF7396',
  barBg:            '#1C1C1A',

  inputBg:            '#22231F',
  inputBorder:        '#3A3C34',
  inputTextColor:     '#F2F2F2',
  inputBorderRadius:  6,

  booleanBg:          '#3A3C34',
  booleanSelectedBg:  '#FF7396',

  buttonBg:           '#22231F',
  buttonBorder:       '#3A3C34',
})
