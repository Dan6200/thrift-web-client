import { LoginForm } from '@/components/form/login'
import { Nav } from '@/components/nav'

// Purpose: Login page
export default function Login() {
  return (
    <>
      <Nav />
      <div className="container mx-auto my-20 p-4">
        <div className="w-full mx-auto">
          <h2 className="w-full mx-auto my-16 text-2xl font-bold text-center">
            Login
          </h2>
          <LoginForm />
        </div>
      </div>
    </>
  )
}
