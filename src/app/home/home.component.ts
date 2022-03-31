import { Component, OnInit } from '@angular/core';
import {Product} from "../shared/models/product.model";
import {ProductService} from "../shared/service/product.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  imageUrl = environment.imageUrl;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.featsData()
      .subscribe(data => {
        const products = this.productService.getProdcuts()
        for (let product of products) {
          if (this.products.length < 4) {
            this.products.push(product)
          }
        }
      });
  }

}
