import { UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../ui/form'
import { RegisterFormState } from '../types'
import { Calendar as CalendarIcon, CheckIcon } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from '@/components/ui/select'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { CaretSortIcon } from '@radix-ui/react-icons'

export const DOB = ({
  form,
}: {
  form: UseFormReturn<RegisterFormState, any, undefined>
}) => {
  const [months] = useState<string[]>(
    Array.from({ length: 12 }, (_, i) => {
      return new Date(0, i).toLocaleString('en-US', { month: 'long' })
    })
  )
  const [date, setDate] = useState<Date>()

  console.log(date)
  return (
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
              <Select
                onValueChange={(value) =>
                  setDate(new Date(new Date().getFullYear(), parseInt(value)))
                }
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pick month..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {months.map((month, index) => (
                    <SelectItem value={index.toString()}>{month}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Calendar
                mode="single"
                selected={field.value}
                month={date}
                onSelect={field.onChange}
                disabled={(date) =>
                  date > new Date() || date < new Date('1900-01-01')
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
{
  /*
              <div>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    'w-[200px] justify-between',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value
                    ? months.find((month) => new Date(month) === field.value)
                    : 'Select month'}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </div>
              <Command>
                <CommandInput placeholder="Pick month..." className="h-9" />
                <CommandEmpty>Enter a valid month.</CommandEmpty>
                <CommandGroup>
                  {months.map((month) => (
                    <CommandItem value={month} key={month} onSelect={() => {}}>
                      {month}
                      <CheckIcon
                        className={cn(
                          'ml-auto h-4 w-4',
                          new Date(month) === field.value
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
								*/
}
