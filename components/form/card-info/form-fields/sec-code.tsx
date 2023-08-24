import { Input, InputProps } from '@/components/ui/input'
import { UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../ui/form'
import { CardInfoFormType } from '../types'

export const SecurityCode = ({
  form,
}: {
  form: UseFormReturn<CardInfoFormType, any, undefined>
}) => {
  return (
    <FormField
      control={form.control}
      name="security_code"
      render={({ field }) => (
        <FormItem className="md:w-[45%]">
          <FormLabel className="block">Security Code (CVV)</FormLabel>
          <FormControl>
            <Input {...(field as InputProps)} placeholder="XXX" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
