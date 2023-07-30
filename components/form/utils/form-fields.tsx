'use client'
import { Input, InputProps } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form'
import { Calendar as CalendarIcon } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { RegisterFormState } from '../register'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'

export const FirstName = ({
  form,
}: {
  form: UseFormReturn<RegisterFormState, any, undefined>
}) => (
  <FormField
    control={form.control}
    name="first_name"
    render={({ field }) => (
      <FormItem>
        <FormLabel>First Name</FormLabel>
        <FormControl>
          <Input placeholder="First" {...(field as InputProps)} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)

export const LastName = ({
  form,
}: {
  form: UseFormReturn<RegisterFormState, any, undefined>
}) => (
  <FormField
    control={form.control}
    name="last_name"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Last Name</FormLabel>
        <FormControl>
          <Input placeholder="Last" {...(field as InputProps)} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)

export const Password = ({
  form,
}: {
  form: UseFormReturn<RegisterFormState, any, undefined>
}) => (
  <FormField
    control={form.control}
    name="password"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Choose a Secure Password</FormLabel>
        <FormControl>
          <Input {...(field as InputProps)} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)

export const ConfirmPassword = ({
  form,
}: {
  form: UseFormReturn<RegisterFormState, any, undefined>
}) => (
  <FormField
    control={form.control}
    name="confirm_password"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Choose a Secure Password</FormLabel>
        <FormControl>
          <Input {...(field as InputProps)} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)

export const DOB = ({
  form,
}: {
  form: UseFormReturn<RegisterFormState, any, undefined>
}) => (
  <FormField
    control={form.control}
    name="dob"
    render={({ field }) => (
      <FormItem className="flex flex-col">
        <FormLabel>Date of birth</FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant={'outline'}
                className={cn(
                  'w-[240px] pl-3 text-left font-normal',
                  !field.value && 'text-muted-foreground'
                )}
              >
                {field.value ? (
                  format(field.value, 'PPP')
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              disabled={(date) =>
                date > new Date({ form }) || date < new Date('1900-01-01')
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <FormDescription>
          Your date of birth is used to calculate your age.
        </FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
)

export const Country = ({
  form,
}: {
  form: UseFormReturn<RegisterFormState, any, undefined>
}) => (
  <FormField
    control={form.control}
    name="country"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Country</FormLabel>
        <FormControl>
          <Input {...(field as InputProps)} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)
