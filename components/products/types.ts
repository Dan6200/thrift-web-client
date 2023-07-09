export interface Product {
  product_id: number
  title: string
  category: string
  description: string[]
  list_price: number
  net_price: number
  quantity_available: number
  media: {
    filename: string
    filepath: string
    description: string
    is_display_image: boolean
  }[]
}
