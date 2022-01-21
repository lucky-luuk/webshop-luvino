import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from "../service/cart.service";
import {CartModel} from "../models/cart.model";
import {Subscription} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  items: CartModel[] = [];
  subscription: Subscription;
  totalPrice: number = 0;
  isLoggedin = false;


  constructor(
    private cart: CartService,
    private router: Router,
    private authService: AuthService
  ) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription = this.cart.itemChanged
      .subscribe(
        item => {
          this.items = item;
          this.totalPrice = this.cart.getTotalPrice();
        }
      );
    this.isLoggedIn()
    this.items = this.cart.getItems();
    this.totalPrice = this.cart.getTotalPrice();
  }

  updated(item: CartModel) {
    if (this.items) {
      if (item.amount < 1) { return this.cart.deleteItemFromCart(item) }
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i] === item) {
          this.items[i] = item;
        }
      }
      this.cart.setItem(this.items);
    }
  }

  toCheckout() {
   if (this.authService.isAuthorised()) {
     this.router.navigate(['/bestellen']);
   }
    this.router.navigate(['bestellen']);
  }

  isLoggedIn() {
    this.isLoggedin = this.authService.isAuthorised();
  }

  clearCart() {
    this.cart.clearCart();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
