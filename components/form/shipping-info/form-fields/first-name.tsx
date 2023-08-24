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

export const RecipientFirstName = ({
  form,
}: {
  form: UseFormReturn<ShippingInfoFormType, any, undefined>
}) => (
  <FormField
    control={form.control}
    name="recipient_first_name"
    render={({ field }) => (
      <FormItem className="md:w-[45%]">
        <FormLabel>Recipient First Name</FormLabel>
        <FormControl>
          <Input placeholder="First" {...(field as InputProps)} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)
