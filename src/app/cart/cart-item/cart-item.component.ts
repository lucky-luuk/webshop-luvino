import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {CartModel} from "../../shared/models/cart.model";
import {Product} from "../../shared/models/product.model";
import {CartService} from "../../shared/service/cart.service";
import {Observer, Subject} from "rxjs";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() item!: CartModel;
  @Output() updated: EventEmitter<CartModel> = new EventEmitter<CartModel>();
  imageUrl = environment.imageUrl;

  constructor(private cartService: CartService) {
  }


  ngOnInit(): void {
  }

  deleteItem() {
    this.cartService.deleteItemFromCart(this.item);
  }

  updateAmount(amount: number) {
    this.item.amount = amount;
    this.updated.emit(this.item);
  }

}
