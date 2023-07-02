import { Button } from '@/components/form/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto my-20">
      <h1 className="w-full mx-auto mb-16 text-4xl font-bold text-center">
        Welcome to Thrift eCommerce
      </h1>
      <Button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
        <Link href="/auth/register">Register</Link>
      </Button>
      <Button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
        <Link href="/auth/login">Login</Link>
      </Button>
    </div>
  )
}
