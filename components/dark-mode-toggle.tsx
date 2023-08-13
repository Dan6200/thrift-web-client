'use client'

import * as React from 'react'
import { Moon, Smartphone, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAtomValue } from 'jotai'
import { isSmallScreenAtom } from '@/atoms'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export function ModeToggle() {
  const isSmallScreen = useAtomValue(isSmallScreenAtom)
  const { setTheme } = useTheme()
  return isSmallScreen ? (
    <AccordionComp setTheme={setTheme} />
  ) : (
    <DropDown setTheme={setTheme} />
  )
}

export const AccordionComp = ({
  setTheme,
}: {
  setTheme: (theme: string) => void
}) => (
  <Accordion type="single" collapsible className="w-full">
    <AccordionItem value="item-1">
      <AccordionTrigger className="active:no-underline">
        Toggle theme
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-col space-y-3 p-4 items-center">
          <a
            onClick={() => setTheme('light')}
            className="block active:bg-neutral-300 dark:active:bg-neutral-700 h-9 w-full  p-2 "
          >
            Light
            <Sun className="h-[1.2rem] inline ml-4 w-[1.2rem]" />
          </a>
          <a
            onClick={() => setTheme('dark')}
            className="block active:bg-neutral-300 dark:active:bg-neutral-700 h-9 w-full  p-2 "
          >
            Dark
            <Moon className="h-[1.2rem] inline ml-4 w-[1.2rem]" />
          </a>
          <a
            onClick={() => setTheme('system')}
            className="block active:bg-neutral-300 dark:active:bg-neutral-700 h-9 w-full  p-2 "
          >
            System <Smartphone className="h-[1.2rem] inline ml-4 w-[1.2rem]" />
          </a>
        </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
)

const DropDown = ({ setTheme }: { setTheme: (theme: string) => void }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size="icon">
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem onClick={() => setTheme('light')}>
        Light
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme('system')}>
        System
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)
