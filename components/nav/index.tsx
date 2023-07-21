//cSpell:ignore jotai
'use client'
import React, { useEffect } from 'react'
import { atom, useAtom } from 'jotai'
import Link from 'next/link'

let darkModeAtom = atom(false)
if (typeof window !== 'undefined') {
  darkModeAtom = atom(window.matchMedia('(prefers-color-scheme: dark)').matches)
}

export function Nav() {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom)
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [darkMode])
  return (
    <div className="flex flex-row items-center justify-between w-full px-4 py-4  border-b shadow-md dark:bg-stone-900 dark:border-stone-500 dark:shadow-none">
      <Link href="/" className="text-2xl font-bold">
        Thrift eCommerce
      </Link>
      <button
        className="dark:border-gray-200 border-gray-900 border-[.5pt] rounded-md px-4 py-2"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? 'Light' : 'Dark'}
      </button>
    </div>
  )
}
