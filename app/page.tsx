import { Button } from '@/components/ui/button'
import { Nav } from '@/components/nav'
import Link from 'next/link'
import getProducts from './products/get-products'
import { isProductData } from '@/components/products/types'
import { ProductsHome } from '@/components/products/home-page'
import { MoveRight } from 'lucide-react'

export default async function Home() {
  // fetch and display products on home page
  const productData: unknown = await getProducts()
  if (!isProductData(productData)) {
    throw new Error('Invalid product data')
  }

  return (
    <div className="mx-auto w-full">
      <Nav />
      <div className="container w-full mx-auto my-10 p-4">
        <h1 className="w-full mx-auto my-16 text-4xl font-bold text-center">
          Welcome to Thrift eCommerce
        </h1>
        <div className="w-48 mb-16 flex justify-between mx-auto">
          <Link href="/auth/login">
            <Button type="button" className="text-md">
              Login
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button type="button" className="text-md">
              Register
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
