//cspell: ignore jotai
import { Button } from '@/components/ui/button'
import { Nav } from '@/components/nav'
import Link from 'next/link'
import getProducts from './products/get-products'
import { isProductData } from '@/components/products/types'
import { ProductsHome } from '@/components/products/home-page'

export default async function Home() {
  // fetch and display products on home page
  const productData: unknown = await getProducts()
  if (!isProductData(productData)) {
    throw new Error('Invalid product data')
  }

  const style =
    'text-md active:text-foreground hover:text-foreground active:bg-blue-500 hover:bg-blue-500'
  return (
    <div className="mx-auto w-full">
      <Nav />
      <div className="container w-full mx-auto my-10 p-2">
        <h1 className="w-full mx-auto m-32 text-4xl font-bold text-center">
          Welcome to Thrift eCommerce
        </h1>
        <div className="w-48 mb-16 flex justify-between mx-auto">
          <Link href="/auth/login">
            <Button type="button" className={style}>
              Login
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button type="button" className={style}>
              Register
            </Button>
          </Link>
        </div>
        <ProductsHome products={productData.products} />
      </div>
    </div>
  )
}
