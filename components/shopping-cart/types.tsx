import { Product } from '@/components/products/types'

export type Item = {
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
    const newItem = {
      product,
      count: 1,
    }
    const alreadyExists = this.cartItems.find(
      (item) => item.product.product_id === newItem.product.product_id
    )
    return alreadyExists ? !alreadyExists : !!this.cartItems.push(newItem)
  }
  removeItem(product: Product) {
    const oldLength = this.cartItems.length
    this.cartItems = this.cartItems.filter(
      (item) => item.product.product_id !== product.product_id
    )
    return oldLength >= this.cartItems.length
  }
  increaseCount(index: number) {
    return index >= 0 || index < this.cartItems.length
      ? this.cartItems[index].count++
      : false
  }
  decreaseCount(index: number) {
    return index >= 0 &&
      index < this.cartItems.length &&
      this.cartItems[index].count > 1
      ? this.cartItems[index].count--
      : false
  }
}
