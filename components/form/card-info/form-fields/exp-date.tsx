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

export const ExpDate = ({
  form,
}: {
  form: UseFormReturn<CardInfoFormType, any, undefined>
}) => {
  return (
    <FormField
      control={form.control}
      name="exp_date"
      render={({ field }) => (
        <FormItem className="md:w-[45%]">
          <FormLabel className="block">Expiry Date</FormLabel>
          <FormControl>
            <Input {...(field as InputProps)} placeholder="mm/yy" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
