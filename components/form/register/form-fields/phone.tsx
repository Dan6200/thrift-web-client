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

export const Phone = ({
  form,
}: {
  form: UseFormReturn<RegisterFormState, any, undefined>
}) => {
  return (
    <FormField
      control={form.control}
      name="phone"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="block">Phone number</FormLabel>
          <FormControl>
            <Input
              {...(field as InputProps)}
              placeholder="08012345678"
              autoComplete="tel"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
