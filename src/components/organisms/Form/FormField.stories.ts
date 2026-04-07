import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import FormField from './FormField.vue'
import FormLabel from './FormLabel.vue'
import FormControl from './FormControl.vue'
import FormDescription from './FormDescription.vue'
import FormMessage from './FormMessage.vue'
import Input from '@/components/atoms/Input/Input.vue'

const meta: Meta = {
  title: 'Organisms/FormField',
  component: FormField,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { FormField, FormLabel, FormControl, FormDescription, FormMessage, Input },
    setup() {
      const email = ref('')
      return { email }
    },
    template: `
      <FormField name="email">
        <FormLabel>Email address</FormLabel>
        <FormControl v-slot="{ id, 'aria-describedby': desc, 'aria-invalid': invalid }">
          <Input :id="id" :aria-describedby="desc" :aria-invalid="invalid" v-model="email" type="email" placeholder="you@example.com" />
        </FormControl>
        <FormDescription>We'll never share your email.</FormDescription>
      </FormField>
    `,
  }),
}

export const WithError: Story = {
  render: () => ({
    components: { FormField, FormLabel, FormControl, FormMessage, Input },
    setup() {
      const email = ref('')
      return { email }
    },
    template: `
      <FormField name="email" error="Please enter a valid email address." :required="true">
        <FormLabel>Email address</FormLabel>
        <FormControl v-slot="{ id, 'aria-describedby': desc, 'aria-invalid': invalid }">
          <Input :id="id" :aria-describedby="desc" :aria-invalid="invalid" v-model="email" type="email" placeholder="you@example.com" />
        </FormControl>
        <FormMessage />
      </FormField>
    `,
  }),
}
