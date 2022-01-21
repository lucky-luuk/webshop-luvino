import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Product} from "../../models/product.model";
import {ProductService} from "../../service/product.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  id: string = '';
  product: Product = new Product();
  productForm!: FormGroup;
  editMode: boolean = false;
  imageName: string | undefined;
  file: File | undefined;
  delete: boolean = false
  add: boolean = false
  imageUrl = environment.imageUrl;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
    if (this.editMode) {
      this.imageName = this.product.filename;
    }
  }

  onSubmit() {
    if (this.editMode) {
      this.productService.updateProduct(this.product.id, this.productForm?.value, this.file)
        .subscribe(data => { })
    } else {
      this.productService.createProduct(this.productForm?.value, this.file)
        .subscribe((data) => {
          this.add = true;
        })
    }
  }

  onFileChange(event: any) {
    this.file = event.target.files[0]
  }

  private initForm() {
    let productName = '';
    let productCatogory = 'Kies een catogorie';
    let productDescription = '';
    let productPrice = 0;
    let productGrape = '';
    let productCountry = '';
    let productYear = '';
    let productHouse = '';

    if (this.editMode) {
      this.product = this.productService.getProductById(this.id)!;
      productName = this.product.name
      productCatogory = this.product.catogory
      productPrice = this.product.price
      productGrape = this.product.grape
      productCountry = this.product.country
      productYear = this.product.year
      productHouse = this.product.house
      productDescription = this.product.description
    }

    this.productForm = new FormGroup({
      name: new FormControl(productName, Validators.required),
      price: new FormControl(productPrice, Validators.required),
      catogory: new FormControl(productCatogory, Validators.required),
      description: new FormControl(productDescription, Validators.required),
      grape: new FormControl(productGrape, Validators.required),
      country: new FormControl(productCountry, Validators.required),
      year: new FormControl(productYear, Validators.required),
      house: new FormControl(productHouse, Validators.required)
    });
  }

  deleteProduct() {
    this.productService.deleteProduct(this.product.id);
    this.delete = true;
  }

  cancel() {
    this.router.navigate(['admin/producten']);
  }

}
