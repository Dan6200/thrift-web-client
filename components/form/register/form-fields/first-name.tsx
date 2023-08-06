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

export const FirstName = ({
  form,
}: {
  form: UseFormReturn<RegisterFormState, any, undefined>
}) => (
  <FormField
    control={form.control}
    name="first_name"
    render={({ field }) => (
      <FormItem>
        <FormLabel>First Name</FormLabel>
        <FormControl>
          <Input placeholder="First" {...(field as InputProps)} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)
