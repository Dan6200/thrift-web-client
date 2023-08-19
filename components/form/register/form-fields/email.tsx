import { Input, InputProps } from '@/components/ui/input'
import { forwardRef } from 'react'
import { UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../ui/form'
import { RegisterFormState } from '../types'

export const Email = ({
  form,
}: {
  form: UseFormReturn<RegisterFormState, any, undefined>
}) => (
  <FormField
    control={form.control}
    name="email"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Enter your Email</FormLabel>
        <FormControl>
          <Input
            {...(field as InputProps)}
            placeholder="myemail@mail.com"
            autoComplete="email"
          />
        </FormControl>
        <FormDescription>
          You may optionally enter your email, phone number or both
        </FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
)
