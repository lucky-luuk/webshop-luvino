import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MainNavComponent} from "./main-nav.component";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [MainNavComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    NoopAnimationsModule,
    BrowserModule,
    RouterModule
  ],
  exports: [
    MainNavComponent
  ]
})
export class NavModule { }
