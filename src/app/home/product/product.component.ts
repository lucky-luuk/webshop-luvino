import {Component, OnInit} from '@angular/core';
import {Product} from "../../shared/models/product.model";
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../../shared/service/product.service";
import {FormControl} from "@angular/forms";
import {environment} from "../../../environments/environment";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity:1
      })),
      state('closed', style({
        opacity:0
      })),
      transition('closed => open', [
        animate('0.5s')
        ]
      )
    ])
  ]
})
export class ProductComponent implements OnInit {
  public products: Product[] = [];
  private filterProdcut: Product[] = [];
  public catogory = new FormControl('');
  public imageUrl = environment.imageUrl;
  public addMessage = false;
  private interval = 0;

  constructor(private http: HttpClient, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.featsData()
      .subscribe(data => {
        this.products = this.productService.getProdcuts();
      });
  }

  public isChecked(catogory: any): void {
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


  public addItemToCart(product: Product): void {
    this.productService.productToCart(product);
    this.addMessage = true;
    this.interval = setTimeout(() => {
      this.removeMessage();
    }, 10000)
  }

  private removeMessage(): void {
    this.addMessage = false;
  }


}
