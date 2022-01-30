import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CartComponent} from "./cart.component";
import {CartItemComponent} from "./cart-item/cart-item.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {CartRoutingModule} from "./cart-routing.module";
import {PopupModule} from "../popup/popup.module";



@NgModule({
  declarations: [
    CartComponent,
    CartItemComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    PopupModule
  ]
})
export class CartModule { }
