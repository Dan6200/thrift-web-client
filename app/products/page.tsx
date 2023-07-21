// cspell:disable
// Purpose: Page for displaying all products
import { Nav } from '@/components/nav'
import { Products } from '@/components/products'
import { isProducts } from '@/components/products/types'
import getProducts from './get-products'

export default async function ProductsPage() {
  try {
    const products: unknown = await getProducts()
    if (!isProducts(products)) {
      throw new Error('Invalid products')
    }
    return (
      <>
        <Nav />
        <Products products={products} />
      </>
    )
  } catch (err) {
    throw err
  }
}
