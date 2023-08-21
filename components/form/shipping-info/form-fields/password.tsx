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

export const Password = ({
  form,
}: {
  form: UseFormReturn<RegisterFormState, any, undefined>
}) => (
  <FormField
    control={form.control}
    name="password"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Choose a Secure Password</FormLabel>
        <FormControl>
          <Input
            type="password"
            {...(field as InputProps)}
            autoComplete="new-password"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)
