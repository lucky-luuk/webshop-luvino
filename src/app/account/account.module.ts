import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccountComponent} from "./account.component";
import {OrdersComponent} from "./orders/orders.component";
import {AccountOrderDetailComponent} from "./account-order-detail/account-order-detail.component";
import {OrderItemComponent} from "./orders/order-item/order-item.component";
import {SettingsComponent} from "./settings/settings.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {AccountRoutingModule} from "./account-routing.module";
import {PopupModule} from "../popup/popup.module";

@NgModule({
  declarations: [
    AccountComponent,
    OrdersComponent,
    AccountOrderDetailComponent,
    OrderItemComponent,
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AccountRoutingModule,
    PopupModule
  ]
})
export class AccountModule { }
