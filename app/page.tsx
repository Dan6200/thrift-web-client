import { Button } from '@/components/ui/button'
import { Nav } from '@/components/nav'
import Link from 'next/link'
import getProducts from './products/get-products'
import { isProductData } from '@/components/products/types'
import { ProductsHome } from '@/components/products/home-page'
import { MoveRight } from 'lucide-react'
import { Slideshow } from '@/components/slideshow'

export default async function Home() {
  // fetch and display products on home page
  const productData: unknown = await getProducts()
  if (!isProductData(productData)) {
    throw new Error('Invalid product data')
  }
  // Move these to child components to use clients
  return (
    <div className="mx-auto w-full">
      <Nav />
      <div className="container w-full mx-auto my-10 p-4">
        <h1 className="w-full mx-auto my-16 text-4xl font-bold text-center">
          Welcome to Thrift eCommerce
        </h1>
        <Slideshow />
        <div className="w-72 mb-16 flex justify-between mx-auto">
          <Link href="/products">
            <Button type="button" className="w-32 capitalize font-bold text-md">
              Buy now
            </Button>
          </Link>
          <Link href="/create-store">
            <Button
              type="button"
              className="bg-background text-foreground shadow-md dark:bg-neutral-800 dark:border-neutral-600 dark:hover:bg-neutral-700 w-32 capitalize font-semibold hover:font-bold hover:bg-gray-50 border text-md"
            >
              Sell now
            </Button>
          </Link>
        </div>
        <ProductsHome products={productData.products} />
        <Link
          href="/products"
          className="dark:text-blue-200 text-blue-700 block w-fit my-8 ml-[60%] sm:ml-[80%]"
        >
          See more
          <MoveRight className="inline ml-2" />
        </Link>
      </div>
    </div>
  )
}
