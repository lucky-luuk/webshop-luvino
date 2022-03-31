import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../shared/service/order.service";
import {Order} from "../../shared/models/order.model";

@Component({
  selector: 'app-order-overview',
  templateUrl: './order-overview.component.html',
  styleUrls: ['./order-overview.component.scss', '../product-overview/product-overview.component.scss' ]
})
export class OrderOverviewComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getAllOrders()
      .subscribe( data => {
          this.orders = this.orderService.getOrders()
        }
      );
  }

}
