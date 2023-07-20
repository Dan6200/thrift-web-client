import { Button } from '@/components/form/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto my-20 w-80">
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
	)
}
