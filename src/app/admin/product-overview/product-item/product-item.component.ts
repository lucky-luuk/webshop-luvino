import {Component, Input} from '@angular/core';
import {Product} from "../../../models/product.model";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() item: Product = new Product();

  constructor() { }

}
