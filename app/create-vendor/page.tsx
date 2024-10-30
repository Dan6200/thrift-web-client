import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function CreateVendorPage() {
  return (
    <>
      <div className="container mx-auto p-4 my-20">
        <Card className="w-full sm:w-96 mx-auto">
          <CardHeader className="w-full mx-auto text-2xl font-bold text-center">
            Create An Account
          </CardHeader>
          {/* Use Dialog instead */}
          <CardContent>{/* <CreateVendor /> */}</CardContent>
        </Card>
      </div>
    </>
  )
}
