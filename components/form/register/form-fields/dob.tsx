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
  const [years] = useState<number[]>(
    Array.from({ length: 120 }, (_, yr) => {
      return new Date().getFullYear() - yr
    })
  )
  const [date, setDate] = useState<Date>()
  const [open, setOpen] = useState<boolean>(false)
  const [secondaryOpen, setSecondaryOpen] = useState<boolean>(false)

  return (
    <FormField
      control={form.control}
      name="dob"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Date of birth</FormLabel>
          <Popover open={secondaryOpen} onOpenChange={setSecondaryOpen}>
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
            <PopoverContent className="w-auto p-0 hello" align="start">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    role="combobox"
                    className={cn(
                      'px-3 w-full justify-between mb-2',
                      !date && 'text-muted-foreground'
                    )}
                  >
                    {date ? date.getFullYear() : 'Select year...'}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 " />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-fit">
                  <Command className="w-40">
                    <CommandInput
                      placeholder="Pick year..."
                      className="h-9 w-fit"
                    />
                    <CommandEmpty>
                      Enter a year between {years[0]} and {years.at(-1)}.
                    </CommandEmpty>
                    <CommandGroup className="h-64 w-full overflow-y-scroll disable-scrollbars">
                      {years.map((yr) => (
                        <CommandItem
                          value={yr.toString()}
                          key={yr}
                          className="w-full"
                          onSelect={(val) => {
                            setDate(new Date(+val, date?.getMonth() ?? 0))
                            setOpen(false)
                          }}
                        >
                          {yr}
                          <CheckIcon
                            className={cn(
                              'ml-auto h-4 w-4',
                              date?.getFullYear() === yr
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <Select
                onValueChange={(value) =>
                  setDate(
                    new Date(
                      (date ?? new Date()).getFullYear(),
                      parseInt(value)
                    )
                  )
                }
              >
                <SelectTrigger className={cn(!date && 'text-muted-foreground')}>
                  <SelectValue
                    placeholder={
                      date ? months[date.getMonth()] : 'Select month...'
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month, index) => (
                    <SelectItem value={index.toString()}>{month}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Calendar
                mode="single"
                month={date}
                onMonthChange={setDate}
                selected={field.value}
                onSelect={(...e) => {
                  setSecondaryOpen(false)
                  field.onChange(...e)
                }}
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
