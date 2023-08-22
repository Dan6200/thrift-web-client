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

export const Name = ({
  form,
}: {
  form: UseFormReturn<CardInfoFormType, any, undefined>
}) => (
  <FormField
    control={form.control}
    name="name"
    render={({ field }) => (
      <FormItem className="md:w-[45%]">
        <FormLabel>Name On Card</FormLabel>
        <FormControl>
          <Input placeholder="Name" {...(field as InputProps)} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)
