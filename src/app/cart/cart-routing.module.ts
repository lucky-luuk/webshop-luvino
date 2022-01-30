import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "../login/login/login.component";
import {RegisterComponent} from "../login/register/register.component";
import {CartComponent} from "./cart.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {AuthGuard} from "../auth/auth.guard";

const routes: Routes = [
  { path: 'winkelwagen', component: CartComponent },
  { path: 'bestellen', component: CheckoutComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
