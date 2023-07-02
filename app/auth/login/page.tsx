import { LoginForm } from '@/components/login-form'

// Purpose: Login page
export default function Login() {
  return (
    <div className="container mx-auto my-20 w-80">
      <h2 className="w-full mx-auto my-16 text-2xl font-bold text-center">
        Login
      </h2>
      <LoginForm />
    </div>
  )
}
