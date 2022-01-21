import {Product} from "./product.model";

export class CartModel {
  id?: string;
  totalPrice: number;
  amount: number;
  orderId?: number;
  productId?: string;
  product!: Product;

  constructor() {
    this.totalPrice = 0;
    this.amount = 0;
  }
}
