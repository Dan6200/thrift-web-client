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
import { Calendar as CalendarIcon, Check, ChevronsUpDown } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { RegisterFormState } from '../register/types'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import country, { CountryProperty } from 'country-codes-list'
import { useState } from 'react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'

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

export const Phone = ({
  form,
}: {
  form: UseFormReturn<RegisterFormState, any, undefined>
}) => {
  return (
    <FormField
      control={form.control}
      name="phone"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="block">Phone number</FormLabel>
          <FormControl>
            <Input {...(field as InputProps)} placeholder="08012345678" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export const Email = ({
  form,
}: {
  form: UseFormReturn<RegisterFormState, any, undefined>
}) => (
  <FormField
    control={form.control}
    name="email"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Enter your Email</FormLabel>
        <FormControl>
          <Input {...(field as InputProps)} placeholder="myemail@mail.com" />
        </FormControl>
        <FormDescription>
          You may optionally enter your email, phone number or both
        </FormDescription>
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
          <Input type="password" {...(field as InputProps)} />
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
        <FormLabel>Confirm Password</FormLabel>
        <FormControl>
          <Input type="password" {...(field as InputProps)} />
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
                date > new Date() || date < new Date('1900-01-01')
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

/*
export const Country = ({
  form,
}: {
  form: UseFormReturn<RegisterFormState, any, undefined>
}) => {
  const [countries] = useState(
    Object.keys(country.customList('countryNameEn' as CountryProperty))
  )
  return (
    <FormField
      control={form.control}
      name="country"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Country</FormLabel>
          <FormControl>
            <Select {...field}>
              <SelectTrigger className="w-full">
                <SelectValue className="p-2" placeholder="Nigeria" />
              </SelectTrigger>
              <SelectContent className="h-80 overflow-y-scroll disable-scrollbars">
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
	 */

/*
export const Phone = ({
  form,
}: {
  form: UseFormReturn<RegisterFormState, any, undefined>
}) => {
  const [codes] = useState(
    Object.keys(country.customList('countryCallingCode' as CountryProperty))
  )
  return (
    <FormField
      control={form.control}
      name="phone"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="block">Phone number</FormLabel>
          <Popover>
            <PopoverTrigger
              asChild
              className="inline-flex p-1 sm:px-3 sm:py-2 align-baseline mr-2 w-[25%]"
            >
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    'w-[20%] justify-between',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value
                    ? codes.find((cc) => cc === field.value)
                    : 'Select Country Code'}
                </Button>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="h-64 sm:h-80 overflow-y-scroll disable-scrollbars">
              {codes.map((code) => (
                <SelectItem key={code} value={code}>
                  +{code}
                </SelectItem>
              ))}
            </PopoverContent>
          </Popover>
          <Command>
            <CommandInput placeholder="Search Country Code" />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {codes.map((cc) => (
                <CommandItem
                  value={cc}
                  key={cc}
                  onSelect={() => {
                    form.setValue('countryCallingCode', cc)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      cc === field.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {cc}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
          <FormControl>
            <Input
              {...(field as InputProps)}
              className="w-[60%] sm:w-[70%] inline-block"
              placeholder="012345678"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
*/
