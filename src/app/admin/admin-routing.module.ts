import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from "./admin.component";
import {AdminGuard} from "../auth/admin.guard";
import {ProductOverviewComponent} from "./product-overview/product-overview.component";
import {OrderOverviewComponent} from "./order-overview/order-overview.component";
import {OrderDetailComponent} from "./order-detail/order-detail.component";
import {ProductEditComponent} from "./product-edit/product-edit.component";

const routes: Routes = [
  {path: 'admin', component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      {path: 'producten', component: ProductOverviewComponent},
      {path: 'orders', component: OrderOverviewComponent},
      {path: ':id/detais', component: OrderDetailComponent},
      {path: ':id/edit', component: ProductEditComponent},
      {path: 'nieuw', component: ProductEditComponent}
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
