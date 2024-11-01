'use client'
import { useRouter } from 'next/navigation'
import { useLayoutEffect } from 'react'
import Image from 'next/image'

export default function NotFound() {
  const router = useRouter()
  useLayoutEffect(() => {
    let t: any
    t = setTimeout(() => {
      router.back()
    }, 3000)
    return () => t
  }, [])
  return (
    <main className="flex items-center gap-5 md:gap-10 flex-col container sm:w-4/5 py-48 px-8 md:px-32">
      <h1 className="text-5xl font-semibold mb-8 mx-auto text-center">
        404: Uh oh page not found
      </h1>
      <section className="">
        <Image
          src="/404-art.png"
          alt="404 page illustration"
          width={500}
          height={500}
        />
      </section>
    </main>
  )
}
