import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import {TokenInterceptorService} from "./auth/token-interceptor.service";
import { AccountComponent } from './account/account.component';
import { SettingsComponent } from './account/settings/settings.component';
import { OrdersComponent } from './account/orders/orders.component';
import {FeatherModule} from "angular-feather";
import {IconsModule} from "./icons/icons.module";
import { AdminComponent } from './admin/admin.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';
import {OrderItemComponent} from "./account/orders/order-item/order-item.component";
import { ProductOverviewComponent } from './admin/product-overview/product-overview.component';
import { ProductEditComponent } from './admin/product-edit/product-edit.component';
import { ProductItemComponent } from './admin/product-overview/product-item/product-item.component';
import { OrderOverviewComponent } from './admin/order-overview/order-overview.component';
import {OrderAdminItemComponent} from "./admin/order-overview/order-item/order-admin-item.component";
import { OrderDetailComponent } from './admin/order-detail/order-detail.component';
import { PopupComponent } from './popup/popup.component';
import {MatSelectModule} from "@angular/material/select";
import {MatBadgeModule} from "@angular/material/badge";
import { AccountOrderDetailComponent } from './account/account-order-detail/account-order-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    MainNavComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    CartItemComponent,
    AccountComponent,
    SettingsComponent,
    OrdersComponent,
    AdminComponent,
    CheckoutComponent,
    OrderItemComponent,
    ProductOverviewComponent,
    ProductEditComponent,
    ProductItemComponent,
    OrderOverviewComponent,
    OrderAdminItemComponent,
    OrderDetailComponent,
    PopupComponent,
    AccountOrderDetailComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NoopAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FeatherModule,
    IconsModule,
    MatSelectModule,
    MatBadgeModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
