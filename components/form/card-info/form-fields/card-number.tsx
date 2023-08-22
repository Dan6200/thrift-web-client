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

export const CardNumber = ({
  form,
}: {
  form: UseFormReturn<CardInfoFormType, any, undefined>
}) => {
  return (
    <FormField
      control={form.control}
      name="card_number"
      render={({ field }) => (
        <FormItem className="md:w-[45%]">
          <FormLabel className="block">Card Number</FormLabel>
          <FormControl>
            <Input
              {...(field as InputProps)}
              placeholder="XXXX XXXX XXXX XXXX"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
