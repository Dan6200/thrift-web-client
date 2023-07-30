import { LoginForm } from '@/components/form/login'
import { Nav } from '@/components/nav'
import { Card, CardHeader, CardContent } from '@/components/ui/card'

// Purpose: Login page
// TODO: Use a card instead of your own border
export default function Login() {
  return (
    <>
      <Nav />
      <div className="container mx-auto my-20 p-4">
        <Card className="w-full border dark:border-neutral-600 rounded-lg mx-auto">
          <CardHeader className="w-full mx-auto my-8 text-2xl font-bold text-center">
            Welcome Back
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
