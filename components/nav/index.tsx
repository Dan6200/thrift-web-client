//cSpell:ignore jotai
'use client'
import React, { useEffect } from 'react'
import { atom, useAtom } from 'jotai'
import Link from 'next/link'
import { IconButton } from '../icon-button'
import { ModeToggle } from '../dark-mode-toggle'

// let darkModeAtom = atom(false)
// if (typeof window != 'undefined') {
//   darkModeAtom = atom(window.matchMedia('(prefers-color-scheme: dark)').matches)
// }

export function Nav() {
  // const [darkMode, setDarkMode] = useAtom(darkModeAtom)
  // useEffect(() => {
  //   if (darkMode) {
  //     document.body.classList.add('dark')
  //   } else {
  //     document.body.classList.remove('dark')
  //   }
  // }, [darkMode])
  return (
    <div className="flex flex-row items-center justify-between w-full px-4 py-4  border-b shadow-md dark:bg-background dark:border-foreground dark:shadow-none">
      <Link href="/" className="text-2xl font-bold">
        Thrift eCommerce
      </Link>
      <ModeToggle />
    </div>
  )
}
