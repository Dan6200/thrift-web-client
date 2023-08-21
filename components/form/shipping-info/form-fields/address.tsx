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
import { ShippingInfoFormType } from '../types'

export const Address = ({
  form,
}: {
  form: UseFormReturn<ShippingInfoFormType, any, undefined>
}) => (
  <FormField
    control={form.control}
    name="address"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Enter Address</FormLabel>
        <FormControl>
          <Input
            {...(field as InputProps)}
            placeholder="My Full Address"
            autoComplete="address"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)
