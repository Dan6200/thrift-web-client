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
        <h1 className="w-full mx-auto mt-8 mb-8 text-4xl sm:text-5xl md:text-6xl font-semibold text-center">
          Welcome to{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary font-bold text-5xl sm:text-6xl md:text-7xl to-secondary">
            Thrift
          </span>
        </h1>
        <p className="w-full mx-auto my-4 text-lg text-center">
          Buy and sell products of any category. Find the lowest prices on
          Thrift!!!
        </p>
        <Slideshow />
        <div className="w-72 mb-16 flex justify-between mx-auto">
          <Link href="/products">
            <Button
              type="button"
              className="w-32 bg-gradient-to-r hover:bg-gradient-to-l from-primary to-secondary hover:font-semibold capitalize text-md"
            >
              Browse
            </Button>
          </Link>
          <Link
            href="/create-store"
            className="rounded-md bg-gradient-to-r hover:bg-gradient-to-l from-primary to-secondary w-32 p-[1pt]"
          >
            <Button
              type="button"
              className="bg-background text-foreground shadow-md dark:bg-background w-full capitalize hover:font-semibold hover:bg-gray-50 text-md"
            >
              Start selling
            </Button>
          </Link>
        </div>
        <div className="bg-neutral-500 w-full mx-auto h-[.3pt]"></div>
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
