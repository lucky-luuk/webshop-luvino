import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/product.model";
import {ProductService} from "../../service/product.service";

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.scss']
})
export class ProductOverviewComponent implements OnInit {
  products: Product[] = []

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.featsData()
      .subscribe(data => {
        this.products = this.productService.getProdcuts();
      });
  }

}
