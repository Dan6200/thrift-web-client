// cspell:disable
// Purpose: Page for displaying all products
import { Products } from '@/components/products'
import getProducts from './get-products'

export default async function ProductsPage() {
  try {
    const products = await getProducts()
    return <Products products={products!} />
  } catch (err) {
    throw err
  }
}
