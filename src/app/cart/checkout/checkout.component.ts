import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {CartModel} from "../../models/cart.model";
import {CartService} from "../../service/cart.service";
import {Subscription} from "rxjs";
import {UserDetails} from "../../models/user-details.model";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss', '../cart.component.scss', '../cart-item/cart-item.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  items: CartModel[] = [];
  subscription: Subscription;
  user: UserDetails = new UserDetails();
  totalPrice: number = 0;
  shipping = 4.99;
  total!: number;
  showPopup: boolean = false;


  constructor(private cartService: CartService, private authService: AuthService, private router: Router) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.init();
    this.subscription = this.cartService.itemChanged
      .subscribe(
        item => {
          this.items = item;
          this.init();
        }
      );

  }

  init() {
    this.user = this.authService.getUser();
    this.items = this.cartService.getItems();
    this.totalPrice = this.cartService.getTotalPrice();
    this.total = (this.totalPrice + this.shipping)
  }

  update(item: any) {
    if (this.items) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i] === item) {
          this.items[i] = item;
        }
      }
      this.cartService.setItem(this.items);
    }

  }

  placeOrder() {
    this.cartService.checkOut()
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
    this.router.navigate(['/home']);
  }

  changeSettings() {
    this.router.navigate(['/account/instellingen']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
