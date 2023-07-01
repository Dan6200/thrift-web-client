import { RegisterForm } from '@/components/register-form'

export default function Home() {
  return (
    <div className="container mx-auto mt-40">
      <h1 className="w-full mx-auto mb-16 text-4xl font-bold text-center">
        Thrift eCommerce
      </h1>
      <RegisterForm />
    </div>
  )
}
