import { RegisterForm } from '@/components/form/register'
import { Nav } from '@/components/nav'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

// Purpose: Provide a page for users to register for an account
export default function Register() {
  return (
    <>
      <Nav />
      <div className="container mx-auto p-4 my-20">
        <Card className="w-full mx-auto">
          <CardHeader className="w-full mx-auto text-2xl font-bold text-center">
            Register
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
