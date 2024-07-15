//cspell:ignore ponyfill
import { axiosInstance } from '@/components/axios-instance'
import { AxiosError } from 'axios'

export default async function filterByCategoryName(category_name: string) {
  // filter product by category
  try {
    const response = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_SEARCH}/indexes/products/search`,
      {
        filter: `category_name=${category_name}`,
      }
    )
    return response.data.hits
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.request) {
        console.error(error.request)
        throw new Error('Error Receiving Response From Server: ')
      }
      if (error.message)
        throw new Error('Unable to Fetch Products: ' + error.message)
    } else throw new Error(error?.toString())
  }
}
