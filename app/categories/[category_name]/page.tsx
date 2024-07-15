// Purpose: Page for displaying all products
import { Products } from '@/components/products'
import { isProducts } from '@/components/products/types'
import filterByCategoryName from './filter-by-category-name'

export default async function ProductsPage({
  params: { category_name },
}: {
  params: { category_name: string }
}) {
  const products: unknown = await filterByCategoryName(category_name)
  if (!isProducts(products)) {
    throw new Error('Invalid product data')
  }
  return (
    <>
      <Products products={products} />
    </>
  )
}
