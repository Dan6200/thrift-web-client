'use client'
import { MoveLeft } from 'lucide-react'
import { Button } from '../../ui/button'
import { Card, CardContent } from '../../ui/card'
import { Price } from './utils/price'

export function ProductSkeleton() {
  return (
    <div className="container mx-auto p-5 my-20">
      <a className="cursor-pointer text-sm text-blue-700 dark:text-blue-200 mb-8 block">
        <MoveLeft className="inline mr-4" />
        Go back
      </a>
      <div className="animate-pulse mb-16">
        <div className="rounded h-4 sm:text-2xl font-bold text-justify mb-4 break-words bg-foreground/20"></div>
        <div className="rounded h-4 sm:text-2xl font-bold text-justify mb-4 break-words bg-foreground/20"></div>
        <div className="rounded h-4 sm:text-2xl font-bold text-justify mb-4 break-words bg-foreground/20"></div>
      </div>
      <Card
        className="flex px-4 py-6 sm:px-8 sm:py-10 flex-col gap-5 lg:gap-7 lg:flex-row items-center rounded-xl w-full lg:mx-auto"
        id="product-card-skeleton"
      >
        <CardContent
          id="product-content-skeleton"
          className="flex flex-col p-0 w-full lg:w-[45%] lg:h-full items-center justify-between"
        >
          <div
            className="animate-pulse bg-white  w-[95%] mx-auto h-full py-4 rounded-md"
            id="img-skeleton"
          ></div>
          <div className="flex flex-col my-4 p-2 sm:p-4 w-full sm:w-96 justify-between sm:h-48">
            <Price netPrice={0} listPrice={0} />
            <div className="flex mb-4">
              <p>
                items left:{'\u00A0'.repeat(4)}
                {0}
              </p>
            </div>
            <div className="flex w-full mb-4 justify-between">
              <Button className="w-28">Add To Cart</Button>
              <Button className="w-28">Buy Now </Button>
            </div>
          </div>
        </CardContent>
        <div className="border-b-2 sm:border-l-2 sm:border-b-0 block w-[80%] sm:w-[.5pt] sm:h-80"></div>
        <CardContent
          className="p-0 px-2 w-full lg:w-[50%]"
          id="product-description-skeleton"
        >
          <h3 className="w-full mx-auto my-8 text-xl sm:text-lg font-bold text-center">
            About This Product
          </h3>
          <div className="animate-pulse pt-6">
            {Array(30)
              .fill(0)
              .map((_, index) => (
                <div
                  className="rounded h-4 sm:text-2xl font-bold text-justify mb-4 break-words bg-foreground/20"
                  key={index}
                ></div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
