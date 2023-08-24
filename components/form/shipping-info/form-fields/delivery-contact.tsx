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

export const DeliveryContact = ({
  form,
}: {
  form: UseFormReturn<ShippingInfoFormType, any, undefined>
}) => {
  return (
    <FormField
      control={form.control}
      name="delivery_contact"
      render={({ field }) => (
        <FormItem className="md:w-[45%]">
          <FormLabel className="block">Delivery Contact</FormLabel>
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
