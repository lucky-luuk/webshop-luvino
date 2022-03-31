import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Product} from "../models/product.model";
import {Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
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

  public featsData(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.apiUrl + '/product/')
      .pipe(
          tap(products => {
          this.setProducts(products);
          })
        );
  }

  public getProdcuts(): Product[] {
    return this.products;
  }

  public getProductByCatogory(catogory: String) {
    return this.http
      .get<Product[]>(this.apiUrl + '/product/'+catogory)
      .pipe(
        tap(products => {
          this.setProducts(products);
        })
      );
  }

  private setProducts(data: Product[]): void {
    this.products = data
  }

  public getProductById(id: string) {
    let product;
    for (let productArray of this.products) {
      if (productArray.id == id) {
        product = productArray;
      }
    }
    return product;
  }

  public updateProduct(id: string, product: any, image: File | undefined) {
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

  public createProduct(product: any, image: File | undefined) {
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

  public deleteProduct(id: String) {
    return this.http.delete(this.apiUrl + '/product/delete/' + id)
      .subscribe(data => {
        console.log(data)
      })
  }

}
