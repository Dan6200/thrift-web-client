import { LoginForm } from '@/components/form/login'
import { Nav } from '@/components/nav'

// Purpose: Login page
export default function Login() {
  return (
    <>
      <Nav />
      <div className="container mx-auto my-20 p-8">
        <div className="w-fit border dark:border-neutral-600 rounded-lg mx-auto">
          <h2 className="w-full mx-auto my-8 text-2xl font-bold text-center">
            Welcome Back
          </h2>
          <LoginForm />
        </div>
      </div>
    </>
  )
}
