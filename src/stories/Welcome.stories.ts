import type { Meta, StoryObj } from '@storybook/vue3'
import WelcomePage from './Welcome.vue'

const meta: Meta<typeof WelcomePage> = {
  title: 'Welcome',
  component: WelcomePage,
  tags: ['!autodocs'], // Disable autodocs for this component to prevent folder
  parameters: {
    layout: 'fullscreen',
    options: {
      showPanel: false,
    },
  },
}

export default meta

type Story = StoryObj<typeof WelcomePage>

export const Welcome: Story = {
  name: 'Welcome', // Same as title to trigger hoisting better
  render: () => ({
    components: { WelcomePage },
    template: '<WelcomePage />',
  }),
}
