// cspell:disable
// Purpose: Page for displaying all products
import { Nav } from '@/components/nav'
import { Products } from '@/components/products'
import getProducts from './get-products'

export default async function ProductsPage() {
  try {
    const products = await getProducts()
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
