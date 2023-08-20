import { Nav } from '@/components/nav'
import Link from 'next/link'
import getProducts from './products/get-products'
import { isProductData } from '@/components/products/types'
import { ProductsHome } from '@/components/products/home-page'
import { MoveRight } from 'lucide-react'
import { Welcome } from '@/components/welcome'

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
      <div className="container w-full mx-auto p-0">
        <Welcome />
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
