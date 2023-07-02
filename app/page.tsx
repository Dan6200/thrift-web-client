import { Button } from '@/components/form/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto my-20 w-80">
      <h1 className="w-full mx-auto mt-64 mb-16 text-4xl font-bold text-center">
        Welcome to Thrift eCommerce
      </h1>
      <Button>
        <Link href="/auth/register">Register</Link>
      </Button>
      <Button>
        <Link href="/auth/login">Login</Link>
      </Button>
    </div>
  )
}
