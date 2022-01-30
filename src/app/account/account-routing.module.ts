import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccountComponent} from "./account.component";
import {AuthGuard} from "../auth/auth.guard";
import {SettingsComponent} from "./settings/settings.component";
import {OrdersComponent} from "./orders/orders.component";
import {AccountOrderDetailComponent} from "./account-order-detail/account-order-detail.component";

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
