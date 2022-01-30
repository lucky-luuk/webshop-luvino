import { Injectable } from '@angular/core';
import {Product} from "../models/product.model";
import {CartModel} from "../models/cart.model";
import {Subject, Subscription} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartModel[] = [];
  public itemChanged = new Subject<CartModel[]>();
  private env = environment;


  constructor(private http: HttpClient, private authService: AuthService) { }

  addToCart(productItem: Product): void {
    const productExist = this.items
      .find(({product}) => product.name === productItem.name);
    if(!productExist) {
      const item = new CartModel();
      item.product = productItem;
      item.amount = 1;
      this.items.push(item);
      this.itemChanged.next(this.items.slice());
    } else {
      productExist.amount += 1;
      this.itemChanged.next(this.items.slice());
    }
    this.addLocalCart();
  }

  getItems(): CartModel[]{
    return this.items;
  }

  setItem(cartItem: CartModel[]): void{
    this.items = cartItem;
    this.itemChanged.next(this.items.slice());
  }

  deleteItemFromCart(removeItem: CartModel): void{
    for (let i = this.items.length-1; i >= 0; i--) {
      const cartItem = this.items[i]
      if ( cartItem.product.id === removeItem.product.id) {
        this.items.splice(i, 1);
        this.itemChanged.next(this.items.slice());
        this.addLocalCart();
        return;
      }
    }
  }


  clearCart(): void{
    this.items = [];
    this.itemChanged.next(this.items.slice());
    localStorage.removeItem('cart');
  }

  getTotalPrice(): number {
    let totalprice = 0;
    for (let item of this.items) {
      totalprice += item.amount * item.product.price
    }
    return totalprice
  }

  checkOut(): Subscription {
    let itemObjects: Object[] = [];
    const user = this.authService.getUser();
    for (let i = 0; i < this.getItems().length; i++) {
      const productOrder = this.getItems()[i] as any;
      itemObjects.push({
        TotalPrice: productOrder.totalPrice,
        amount: productOrder.amount,
        productId: productOrder.product.id
      })
    }
    const par = '?email='+ user.email;
    return this.http
      .post(
      this.env.baseUrl + '/order/save'+ par,
      itemObjects)
      .subscribe(response => {
        this.clearCart();
      });
  }

  addLocalCart(): void{
    if (this.items.length < 1) {
      this.clearCart();
    }
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  setLocalCart(): void {
    const localCart: CartModel[] = JSON.parse(localStorage.getItem('cart')!)
    if (localCart) {
      this.items = localCart;
      this.itemChanged.next(this.items.slice());
    }
  }

}
