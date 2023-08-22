import { Input, InputProps } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../ui/form'
import { ShippingInfoFormType } from '../types'

export const DeliveryInstructions = ({
  form,
}: {
  form: UseFormReturn<ShippingInfoFormType, any, undefined>
}) => {
  return (
    <FormField
      control={form.control}
      name="delivery_instructions"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="block">Delivery Instructions</FormLabel>
          <FormControl>
            <Textarea
              {...field}
              placeholder="Instructions to leave for the delivery agent"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
