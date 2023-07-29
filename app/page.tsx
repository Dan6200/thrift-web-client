//cspell: ignore jotai
'use client'
import { Button } from '@/components/ui/button'
import { Nav } from '@/components/nav'
import Link from 'next/link'

export default function Home() {
  const style =
    'px-4 py-2 my-8 sm:mx-8 w-full sm:w-32 text-xl sm:text-sm active:text-foreground hover:text-foreground active:bg-blue-500 hover:bg-blue-500'
  return (
    <div className="mx-auto w-full">
      <Nav />
      <div className="container w-full mx-auto my-10 p-2">
        <h1 className="w-full mx-auto mt-32 mb-16 text-4xl font-bold text-center">
          Welcome to Thrift eCommerce
        </h1>
        <div className="w-fit mx-auto">
          <Link href="/products">
            <Button type="button" className={style}>
              View Products
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button type="button" className={style}>
              Register
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button type="button" className={style}>
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
