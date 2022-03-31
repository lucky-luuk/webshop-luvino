import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './home/product/product.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptorService} from "./auth/token-interceptor.service";
import {LoginModule} from "./login/login.module";
import {CartModule} from "./cart/cart.module";
import {AdminModule} from "./admin/admin.module";
import {AccountModule} from "./account/account.module";
import {NavModule} from "./main-nav/nav.module";
import {PopupModule} from "./popup/popup.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NavModule,
    LoginModule,
    CartModule,
    AdminModule,
    AccountModule,
    PopupModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
