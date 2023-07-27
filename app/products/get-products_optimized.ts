import {
  isProductData,
  isProducts,
  ProductData,
} from '@/components/products/types'

export default async function getProducts(
  page: number,
  chunk: number,
  numOfPages: number = 1
) {
  const offset = page * chunk
  const limit = numOfPages * chunk
  const response: unknown = await fetch(
    'https://thrift-dev.onrender.com/v1/products?' +
      new URLSearchParams({
        public: 'true',
        offset: offset?.toString(),
        limit: limit?.toString(),
        sort: 'created_at',
        order: 'desc',
      }),
    { next: { revalidate: 30 * 60 } }
  ).then((res) => res.json())

  if (!isProductData(response)) {
    throw new Error('Failed to fetch data')
  }

  const { products, total_products } = response

  if (!isProducts(products)) {
    throw new Error('Failed to fetch products')
  }
  return { products, total_products } as ProductData
}
