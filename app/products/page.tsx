// cspell:disable
// Purpose: Page for displaying all products
import { Nav } from '@/components/nav'
import { Products } from '@/components/products'
import { isProductData } from '@/components/products/types'
import getProducts from './get-products'

export const apiPageNum = 0
export const ITEMS_PER_PAGE = 50

export default async function ProductsPage() {
  try {
    // fetch 3 pages of products
    const productData: unknown = await getProducts(
      apiPageNum,
      ITEMS_PER_PAGE,
      3
    )
    if (!isProductData(productData)) {
      throw new Error('Invalid product data')
    }
    return (
      <>
        <Nav />
        <Products
          products={productData.products}
          totalProducts={+productData.total_products}
          apiPageNum={apiPageNum + 1 * 3}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </>
    )
  } catch (err) {
    throw err
  }
}
