import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminComponent} from "./admin.component";
import {OrderAdminItemComponent} from "./order-overview/order-item/order-admin-item.component";
import {OrderDetailComponent} from "./order-detail/order-detail.component";
import {ProductEditComponent} from "./product-edit/product-edit.component";
import {ProductOverviewComponent} from "./product-overview/product-overview.component";
import {ProductItemComponent} from "./product-overview/product-item/product-item.component";
import {OrderOverviewComponent} from "./order-overview/order-overview.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {AdminRoutingModule} from "./admin-routing.module";
import {PopupModule} from "../popup/popup.module";



@NgModule({
  declarations: [
    AdminComponent,
    OrderAdminItemComponent,
    OrderDetailComponent,
    ProductEditComponent,
    ProductOverviewComponent,
    ProductItemComponent,
    OrderOverviewComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    PopupModule
  ],
  exports: [
    AdminComponent
  ]
})
export class AdminModule { }
