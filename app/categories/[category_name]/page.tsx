// Purpose: Page for displaying all products
import { Products } from '@/components/products'
import { isProducts } from '@/components/products/types'
import { notFound } from 'next/navigation'
import filterByField from './filter'

export default async function ProductsPage({
  params: { category_name },
}: {
  params: { category_name: string }
}) {
  const products: unknown = await filterByField(
    'category_name',
    '=',
    category_name
  )
  const moreProducts: unknown = await filterByField(
    'subcategory_name',
    '=',
    category_name
  )
  if (!isProducts(products) || !isProducts(moreProducts)) {
    throw new Error('Invalid product data')
  }
  const newProducts = [...products, ...moreProducts]
  if (products.length === 0 && moreProducts.length === 0) throw notFound()
  return (
    <>
      <Products products={newProducts} />
    </>
  )
}
