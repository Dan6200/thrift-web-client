//cspell: ignore jotai
'use client'
import { Button } from '@/components/form/button'
import { Nav } from '@/components/nav'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto w-full">
      <Nav />
      <div className="w-full mx-auto my-20 p-8">
        <h1 className="w-full mx-auto mt-64 mb-16 text-4xl font-bold text-center">
          Welcome to Thrift eCommerce
        </h1>
        <Link href="/products">
          <Button>View Products</Button>
        </Link>
        <Link href="/auth/register">
          <Button>Register</Button>
        </Link>
        <Link href="/auth/login">
          <Button>Login</Button>
        </Link>
      </div>
    </div>
  )
}
