import { Product } from '@/components/products/types'

type Item = {
  product: Product
  count: number
}

export class ShoppingCart {
  cartItems: Item[] = new Array()
  constructor(product: Product | null, shoppingCart: ShoppingCart | null) {
    if (product) {
      const item = {
        product,
        count: 1,
      }
      this.cartItems.push(item)
    } else if (shoppingCart) {
      this.cartItems = new Array(...shoppingCart.cartItems)
    }
  }
  addItem(product: Product) {
    const item = {
      product,
      count: 1,
    }
    this.cartItems.push(item)
    return true
  }
  removeItem(product: Product) {
    const oldLength = this.cartItems.length
    this.cartItems = this.cartItems.filter(
      (item) => item.product.product_id !== product.product_id
    )
    return oldLength >= this.cartItems.length
  }
  increaseCount(index: number) {
    return this.cartItems[index].count++
  }
  decreaseCount(index: number) {
    return this.cartItems[index].count > 1
      ? this.cartItems[index].count--
      : false
  }
  getItems() {
    return new Array(...this.cartItems)
  }
  getTotal() {
    return this.cartItems.length
  }
}
