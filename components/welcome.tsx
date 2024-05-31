'use client'
import { Montagu_Slab } from 'next/font/google'
import { userAtom } from '@/atoms'
import { useAtomValue } from 'jotai'
import Link from 'next/link'
import { Slideshow } from './slideshow'
import { Button } from './ui/button'

const montaguSlab = Montagu_Slab({ weight: '500', subsets: ['latin'] })

export function Welcome() {
  const user = useAtomValue(userAtom)
  return user ? null : (
    <div className="w-[90vw] sm:w-[90vw] md:text-center flex flex-col gap-5 sm:gap-10 md:gap-10 mx-auto mt-16">
      <h1
        className={`${montaguSlab.className} text-4xl w-full sm:text-5xl sm:font-semibold`}
      >
        Welcome to{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary font-bold text-5xl sm:text-6xl md:text-7xl to-secondary">
          Thrift
        </span>
      </h1>
      <div className="text-lg sm:text-xl font-thin">
        <h2>Buy and sell products of any category.</h2>
        <h2> Find the lowest prices on Thrift!!!</h2>
      </div>
      <Slideshow />
      <div className="text-base sm:text-lg flex flex-col sm:flex-row gap-3 md:gap-6 md:w-[50vw] lg:w-[30vw] md:mx-auto">
        <Link href="/products" className="h-9 sm:h-11 w-full flex-1">
          <button
            type="button"
            className="h-full px-4 py-2 items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 flex w-full bg-gradient-to-r hover:bg-gradient-to-l from-secondary to-primary capitalize text-background font-semibold hover:shadow-wide shadow-primary hover:shadow-primary/30"
          >
            Browse
          </button>
        </Link>
        <div className="rounded-md bg-gradient-to-r shadow-around hover:bg-gradient-to-l hover:shadow-wide hover:shadow-secondary/30 shadow-secondary/70 h-9 sm:h-11 from-primary to-secondary w-full sm:w-fit p-[1pt] flex-1">
          <Link
            href="/create-store"
            className="text-center bg-background block h-full rounded-md w-full"
          >
            <Button
              type="button"
              className="text-base sm:text-lg bg-gradient-to-r hover:bg-gradient-to-l from-primary to-secondary w-full bg-clip-text h-full text-transparent capitalize font-semibold"
            >
              Start selling
            </Button>
          </Link>
        </div>
      </div>
      <div className="dark:bg-foreground/20 w-full mx-auto h-[.7pt]"></div>
    </div>
  )
}
