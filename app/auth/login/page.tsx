import { LoginForm } from '@/components/form/login'
import { Nav } from '@/components/nav'
import { Card, CardHeader, CardContent } from '@/components/ui/card'

// Login page
export default function Login() {
  return (
    <>
      <Nav />
      <div className="container mx-auto my-20 p-4">
        <Card className="w-full sm:w-96 mx-auto">
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
