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

export const City = ({
  form,
}: {
  form: UseFormReturn<ShippingInfoFormType, any, undefined>
}) => (
  <FormField
    control={form.control}
    name="city"
    render={({ field }) => (
      <FormItem className="md:w-[45%]">
        <FormLabel>City/Town</FormLabel>
        <FormControl>
          <Input placeholder="Name of City" {...(field as InputProps)} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)
