import React from 'react'
import Link from 'next/link'
import { ModeToggle } from '../dark-mode-toggle'

export function Nav() {
  return (
    <>
      <div className="flex flex-row items-center justify-between w-full px-4 py-4  border-b dark:border-neutral-600 shadow-md dark:bg-background  dark:shadow-none">
        <Link href="/" className="text-2xl font-bold">
          Thrift eCommerce
        </Link>
        <ModeToggle />
      </div>
      <div className="mx-auto w-[90%] mt-2 bg-red-500 text-white p-2">
        <p>
          Note: This project is still under development and features are added
          and removed daily!
        </p>
      </div>
    </>
  )
}
