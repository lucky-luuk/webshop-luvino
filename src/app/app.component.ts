import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth/auth.service";
import {CartService} from "./service/cart.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Luvino';

  constructor(private auth: AuthService, private cart: CartService) {
  }

  ngOnInit() {
    this.auth.autoLogin();
    this.cart.setLocalCart();
  }
}
