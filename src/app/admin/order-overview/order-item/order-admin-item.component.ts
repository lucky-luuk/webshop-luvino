import {Component, Input, OnInit} from '@angular/core';
import {Order} from "../../../models/order.model";

@Component({
  selector: 'app-order-admin-item',
  templateUrl: './order-admin-item.component.html',
  styleUrls: ['./order-admin-item.component.scss', '../../product-overview/product-item/product-item.component.scss']
})
export class OrderAdminItemComponent implements OnInit {
  @Input() item: Order | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
