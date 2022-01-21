import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {ProductComponent} from "./product/product.component";
import {LoginComponent} from "./login/login/login.component";
import {RegisterComponent} from "./login/register/register.component";
import {CartComponent} from "./cart/cart.component";
import {AuthGuard} from "./auth/auth.guard";
import {Role} from "./models/role.model";
import {AccountComponent} from "./account/account.component";
import {SettingsComponent} from "./account/settings/settings.component";
import {OrdersComponent} from "./account/orders/orders.component";
import {CheckoutComponent} from "./cart/checkout/checkout.component";
import {AdminComponent} from "./admin/admin.component";
import {ProductOverviewComponent} from "./admin/product-overview/product-overview.component";
import {OrderOverviewComponent} from "./admin/order-overview/order-overview.component";
import {OrderDetailComponent} from "./admin/order-detail/order-detail.component";
import {ProductEditComponent} from "./admin/product-edit/product-edit.component";
import {AccountOrderDetailComponent} from "./account/account-order-detail/account-order-detail.component";
import {AdminGuard} from "./auth/admin.guard";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'producten', component: ProductComponent},
  { path: 'login', component: LoginComponent},
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard],
    children: [
      {path: 'instellingen', component: SettingsComponent},
      {path: 'orders', component: OrdersComponent},
      {path: ':id/detail', component: AccountOrderDetailComponent}
    ]
  },
  {path: 'admin', component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      {path: 'producten', component: ProductOverviewComponent},
      {path: 'orders', component: OrderOverviewComponent},
      {path: ':id/detais', component: OrderDetailComponent},
      {path: ':id/edit', component: ProductEditComponent},
      {path: 'nieuw', component: ProductEditComponent}
    ]},
  { path: 'registreer', component: RegisterComponent },
  { path: 'winkelwagen', component: CartComponent },
  { path: 'bestellen', component: CheckoutComponent, canActivate: [AuthGuard] }

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { "useHash" : true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
