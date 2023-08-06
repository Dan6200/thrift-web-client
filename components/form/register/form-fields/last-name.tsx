import { Input, InputProps } from '@/components/ui/input'
import { UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../ui/form'
import { RegisterFormState } from '../types'

export const LastName = ({
  form,
}: {
  form: UseFormReturn<RegisterFormState, any, undefined>
}) => (
  <FormField
    control={form.control}
    name="last_name"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Last Name</FormLabel>
        <FormControl>
          <Input placeholder="Last" {...(field as InputProps)} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)
