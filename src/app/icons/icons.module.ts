import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import {Camera, Heart, ShoppingCart} from "angular-feather/icons";

const icons = {
  Camera,
  Heart,
  ShoppingCart
};

@NgModule({
  declarations: [],
  imports: [
    FeatherModule.pick(icons),
    CommonModule
  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule { }
