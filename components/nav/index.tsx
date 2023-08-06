import React from 'react'
import Link from 'next/link'
import { ModeToggle } from '../dark-mode-toggle'
import { Button } from '../ui/button'

export function Nav() {
  return (
    <>
      <div className="flex flex-row items-center justify-between w-full px-4 py-4  border-b dark:border-neutral-600 shadow-md dark:bg-background  dark:shadow-none">
        <Link href="/" className="text-2xl font-bold">
          Thrift eCommerce
        </Link>
        <div className="flex w-64 justify-between">
          <Link href="/auth/login">
            <Button type="button" className="text-md">
              Login
            </Button>
          </Link>
          <ModeToggle />
        </div>
      </div>
      <div className="mx-auto w-[90%] mt-2 bg-red-500 text-center text-white p-2">
        <p>
          Note: This project is still under development and is constantly
          changing
        </p>
      </div>
    </>
  )
}
