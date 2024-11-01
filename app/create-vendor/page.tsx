import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Image from 'next/image'

export default function CreateVendorPage() {
  return (
    <>
      <div className="container mx-auto p-4 my-20">
        <Card className="w-full rounded-lg space-y-4 sm:w-4/5 p-8 mx-auto border-primary">
          <CardHeader className="w-full mx-auto text-2xl font-bold text-center">
            Start Selling On Thrift!
          </CardHeader>
          <CardContent className="space-x-8 flex items-start">
            <Image
              className="rounded-md"
              src="/pexels-shop.jpg"
              alt="shop image"
              width={500}
              height={500}
            />
            <p>
              With a vendor account you can list products you wish to sell. Get
              a dashboard showing information about your sales. Create a vendor
              account to start selling
            </p>
          </CardContent>
          <CardFooter className="flex justify-end w-full">
            <Button className="">Create A Vendor Account</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
