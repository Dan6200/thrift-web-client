import { RegisterForm } from '@/components/form/register'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function Register() {
  return (
    <>
      <div className="container mx-auto p-4 my-20">
        <Card className="w-full sm:w-96 mx-auto">
          <CardHeader className="w-full mx-auto text-2xl font-bold text-center">
            Create An Account
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
