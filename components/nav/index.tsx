//cSpell:ignore jotai
'use client'
import React from 'react'
import Link from 'next/link'
import { ModeToggle } from '../dark-mode-toggle'

export function Nav() {
  return (
    <div className="flex flex-row items-center justify-between w-full px-4 py-4  border-b dark:border-neutral-600 shadow-md dark:bg-background  dark:shadow-none">
      <Link href="/" className="text-2xl font-bold">
        Thrift eCommerce
      </Link>
      <ModeToggle />
    </div>
  )
}
