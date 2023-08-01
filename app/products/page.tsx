// Purpose: Page for displaying all products
import { Nav } from '@/components/nav'
import { Products } from '@/components/products'
import { isProductData } from '@/components/products/types'
import getProducts from './get-products'

export default async function ProductsPage() {
  // fetch 3 pages of products
  const productData: unknown = await getProducts()
  if (!isProductData(productData)) {
    throw new Error('Invalid product data')
  }
  return (
    <>
      <Nav />
      <Products products={productData.products} />
    </>
  )
}
