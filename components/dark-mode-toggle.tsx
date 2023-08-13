'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
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
import { Select, SelectItem } from './ui/select'
import { SelectTrigger } from '@radix-ui/react-select'

export function ModeToggle() {
  const isSmallScreen = useAtomValue(isSmallScreenAtom)
  const { setTheme } = useTheme()
  console.log(isSmallScreen)

  return (
    <>
      {isSmallScreen ? (
        <SelectComp setTheme={setTheme} />
      ) : (
        <DropDown setTheme={setTheme} />
      )}
    </>
  )
}

const SelectComp = ({ setTheme }: { setTheme: (theme: string) => void }) => (
  <Select>
    <SelectItem value="item-3" className="w-full">
      <SelectTrigger>
        <p>Toggle theme</p>
      </SelectTrigger>
      <SelectContent>
        <ul>
          <li>
            <a className="hover:underline" onClick={() => setTheme('light')}>
              Light
            </a>
          </li>
          <li>
            <a onClick={() => setTheme('dark')}>Dark</a>
          </li>
          <li>
            <a onClick={() => setTheme('system')}>System</a>
          </li>
        </ul>
      </AccordionContent>
    </SelectItem>
  </Select>
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
