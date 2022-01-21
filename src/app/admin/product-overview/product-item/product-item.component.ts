import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../models/product.model";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() item: Product = new Product();

  constructor() { }

  ngOnInit(): void {
  }

}
