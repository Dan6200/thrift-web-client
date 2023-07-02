import { RegisterForm } from '@/components/register-form'

// Purpose: Provide a page for users to register for an account
export default function Register() {
  return (
    <div className="container mx-auto my-20">
      <h2 className="w-full mx-auto my-16 text-2xl font-bold text-center">
        Register
      </h2>
      <RegisterForm />
    </div>
  )
}
