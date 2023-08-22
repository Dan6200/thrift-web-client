import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { UseFormReturn } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../ui/form'
import { ShippingInfoFormType } from '../types'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import NaijaStates from 'naija-state-local-government'

export const State = ({
  form,
}: {
  form: UseFormReturn<ShippingInfoFormType, any, undefined>
}) => {
  const states: string[] = NaijaStates.states()
  const [open, setOpen] = useState(false)
  return (
    <FormField
      control={form.control}
      name="state"
      render={({ field }) => (
        <FormItem className="md:w-[45%]">
          <FormLabel>State</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  type="button"
                  variant="outline"
                  role="combobox"
                  className={cn(
                    'px-3 w-full justify-between mb-2',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value
                    ? states.find((state: string) => state === field.value)
                    : 'Select state'}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 " />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-fit">
              <Command className="w-40">
                <CommandInput
                  placeholder="Pick state..."
                  className="h-9 w-fit"
                />
                <CommandEmpty>State does not exist!</CommandEmpty>
                <CommandGroup className="h-64 w-full overflow-y-scroll disable-scrollbars">
                  {states.map((state: string) => (
                    <CommandItem
                      value={state}
                      key={state}
                      className="w-full"
                      onSelect={() => {
                        form.setValue('state', state)
                        setOpen(false)
                      }}
                    >
                      {state}
                      <CheckIcon
                        className={cn(
                          'ml-auto h-4 w-4',
                          field.value === state ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
