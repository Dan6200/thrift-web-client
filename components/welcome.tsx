'use client'
import { userAtom } from '@/atoms'
import { useAtomValue } from 'jotai'
import Link from 'next/link'
import { Slideshow } from './slideshow'
import { Button } from './ui/button'

export function Welcome() {
  const user = useAtomValue(userAtom)
  return !user ? (
    <>
      <h1 className="w-full mx-auto mt-16 text-3xl sm:text-4xl md:text-5xl font-semibold text-center">
        Welcome to{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary font-bold text-4xl sm:text-5xl md:text-6xl to-secondary">
          Thrift
        </span>
      </h1>
      <p className="w-full mx-auto my-10 text-lg text-center">
        Buy and sell products of any category. Find the lowest prices on
        Thrift!!!
      </p>
      <Slideshow />
      <div className="w-72 mb-16 flex justify-between mx-auto">
        <Link href="/products">
          <Button
            type="button"
            className="w-32 bg-gradient-to-r hover:bg-gradient-to-l from-primary to-secondary hover:font-semibold capitalize text-md"
          >
            Browse
          </Button>
        </Link>
        <Link
          href="/create-store"
          className="rounded-md bg-gradient-to-r hover:bg-gradient-to-l from-primary to-secondary w-32 p-[1pt]"
        >
          <Button
            type="button"
            className="bg-background text-foreground shadow-md dark:bg-background w-full capitalize hover:font-semibold hover:bg-gray-50 text-md"
          >
            Start selling
          </Button>
        </Link>
      </div>
      <div className="dark:bg-neutral-600 w-full mx-auto h-[.7pt]"></div>
    </>
  ) : null
}
