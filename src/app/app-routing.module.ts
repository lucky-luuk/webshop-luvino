import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {ProductComponent} from "./product/product.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'producten', component: ProductComponent},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { "useHash" : true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
