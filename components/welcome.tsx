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
      <p className="w-full px-8 sm:px-4 md:px-2 mx-auto mt-10 text-lg text-center">
        Buy and sell products of any category. Find the lowest prices on
        Thrift!!!
      </p>
      <Slideshow />
      <div className="w-80 sm:w-96 my-16 flex justify-between mx-auto">
        <Link href="/products">
          <button
            type="button"
            className="h-9 px-4 py-2 items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 flex w-36 bg-gradient-to-r hover:bg-gradient-to-l from-primary to-secondary capitalize text-md text-lg text-primary-foreground font-semibold hover:shadow-wide shadow-primary hover:shadow-primary/70"
          >
            Browse
          </button>
        </Link>
        <div className="rounded-md bg-gradient-to-r shadow-around hover:bg-gradient-to-l hover:shadow-wide hover:shadow-secondary/30 shadow-secondary/70 h-9 from-primary to-secondary w-36 p-[1pt]">
          <Link
            href="/create-store"
            className="bg-background block h-full rounded-md"
          >
            <Button
              type="button"
              className="bg-gradient-to-r hover:bg-gradient-to-l from-primary to-secondary bg-clip-text h-full text-transparent w-full capitalize font-semibold text-lg"
            >
              Start selling
            </Button>
          </Link>
        </div>
      </div>
      <div className="dark:bg-foreground/20 w-full mx-auto h-[.7pt]"></div>
    </>
  ) : null
}
