import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Accordion from './Accordion.vue'
import AccordionItem from './AccordionItem.vue'

const canvas = () => ({
  template: `
    <div style="
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 48px 32px;
      background-color: #eceae4;
      background-image: radial-gradient(circle, rgba(0,0,0,0.11) 1px, transparent 1px);
      background-size: 22px 22px;
    ">
      <story />
    </div>
  `,
})

const meta: Meta<typeof Accordion> = {
  title: 'Molecules/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  decorators: [canvas],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    type: { control: 'select', options: ['single', 'multiple'] },
  },
}

export default meta
type Story = StoryObj<typeof Accordion>

export const Single: Story = {
  render: () => ({
    components: { Accordion, AccordionItem },
    template: `
      <div style="width:100%;max-width:480px;">
        <Accordion type="single" :default-open="['item-1']">
          <AccordionItem value="item-1" title="What is this design system?">
            This is a comprehensive Vue 3 component library built with a premium, clean-look aesthetic
            inspired by Apple, Notion, and Airbnb. Every molecule is composed from atoms.
          </AccordionItem>
          <AccordionItem value="item-2" title="How do I install it?">
            Clone the repository and run npm install. The Storybook documentation will be available
            at your local development server.
          </AccordionItem>
          <AccordionItem value="item-3" title="Can I customize the theme?">
            Yes! All visual properties use CSS custom properties (design tokens). Override them in
            your root stylesheet to match your brand.
          </AccordionItem>
          <AccordionItem value="item-4" title="Is it accessible?" subtitle="WCAG 2.1 compliance">
            All components follow WAI-ARIA best practices with proper roles, keyboard navigation,
            and screen reader support.
          </AccordionItem>
        </Accordion>
      </div>
    `,
  }),
}

export const Multiple: Story = {
  render: () => ({
    components: { Accordion, AccordionItem },
    template: `
      <div style="width:100%;max-width:480px;">
        <Accordion type="multiple" :default-open="['item-1', 'item-3']">
          <AccordionItem value="item-1" title="Account Settings">
            Manage your profile, email preferences, and security settings.
          </AccordionItem>
          <AccordionItem value="item-2" title="Billing & Plans">
            View your current plan, update payment methods, and download invoices.
          </AccordionItem>
          <AccordionItem value="item-3" title="Notifications">
            Customize which notifications you receive via email, push, or SMS.
          </AccordionItem>
          <AccordionItem value="item-4" title="Integrations" disabled>
            Connect third-party services (coming soon).
          </AccordionItem>
        </Accordion>
      </div>
    `,
  }),
}
