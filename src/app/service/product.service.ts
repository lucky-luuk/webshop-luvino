import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Product} from "../models/product.model";
import {Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {CartService} from "./cart.service";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  env = environment;
  apiUrl = environment.baseUrl;
  private products: Product[] = [];
  imageForm: FormData = new FormData();

  constructor(private http: HttpClient, private cartService: CartService) {
    this.featsData();
  }

  productToCart(prodcut: Product) {
    this.cartService.addToCart(prodcut);
  }

  featsData() {
    return this.http
      .get<Product[]>(this.apiUrl + '/product/')
      .pipe(
          tap(products => {
          this.setProducts(products);
          })
        );
  }

  getProdcuts() {
    return this.products;
  }

  setProducts(data: Product[]) {
    this.products = data
  }

  getProductById(id: string) {
    let product;
    for (let productArray of this.products) {
      if (productArray.id == id) {
        product = productArray;
      }
    }
    return product;
  }

  //TODO alle console log verwijderen bij producten
  updateProduct(id: string, product: any, image: File | undefined) {
    return this.http.put(this.apiUrl + '/product/update/'+id, product)
      .pipe(
        tap((response: any) => {
            if (image) {
              this.imageForm = new FormData();
              this.imageForm.append('image', image, image.name);
              this.http.post<Product>(
                this.apiUrl + '/uploadFile/' + response.id,
                this.imageForm
              ).subscribe()
            }
        })
      )
  }

  createProduct(product: any, image: File | undefined) {
    return this.http.post(this.apiUrl + '/product/save/', product)
      .pipe(
        tap((response: any) => {
          if (image) {
            this.imageForm = new FormData();
            this.imageForm.append('image', image, image.name);
            this.http.post(
              this.apiUrl + '/uploadFile/' + response.id,
              this.imageForm
            )
              .subscribe((data) => {console.log(data)})
        }
        })
      )
      }

  deleteProduct(id: String) {
    return this.http.delete(this.apiUrl + '/product/delete/' + id)
      .subscribe(data => {
        console.log(data)
      })
  }

}
