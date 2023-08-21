import { Input, InputProps } from '@/components/ui/input'
import { UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../ui/form'
import { ShippingInfoFormType } from '../types'

export const RecipientLastName = ({
  form,
}: {
  form: UseFormReturn<ShippingInfoFormType, any, undefined>
}) => (
  <FormField
    control={form.control}
    name="recipient_last_name"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Recipient Last Name</FormLabel>
        <FormControl>
          <Input placeholder="Last" {...(field as InputProps)} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)
