import {Component, OnInit} from '@angular/core';
import {Product} from "../models/product.model";
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../service/product.service";
import {FormControl} from "@angular/forms";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  filterProdcut: Product[] = [];
  catogory = new FormControl('');
  imageUrl = environment.imageUrl;
  addMessage = false;
  interval = 0;
  constructor(private http: HttpClient, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.featsData()
      .subscribe(data => {
        this.products = this.productService.getProdcuts();
      });
  }

  isChecked(catogory: any) {
    const catValue = catogory.target.value.toString();
    if (catogory.target.checked) {
      for (let product of this.products) {
        if (product.catogory == catValue) {
          this.filterProdcut.push(product);
        }
      }
      this.products = this.filterProdcut;
    } else {
      this.products = [];
      this.filterProdcut = [];
      this.products = this.productService.getProdcuts()
    }
  }

  addItemToCart(product: Product) {
    this.productService.productToCart(product);
    this.addMessage = true;
    this.interval = setTimeout(() => {
      this.removeMessage();
    }, 10000)
  }

  removeMessage() {
    this.addMessage = false;
  }


}
