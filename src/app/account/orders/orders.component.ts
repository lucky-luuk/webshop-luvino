import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../shared/service/order.service";
import {AuthService} from "../../auth/auth.service";
import {Order} from "../../shared/models/order.model";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  constructor(private orderService: OrderService, private auth: AuthService) { }

  ngOnInit(): void {
    this.orderService.getOrderFromUser(
      this.auth.getUser().email
    ).subscribe( data => {
      this.orders = data as Order[]
    });
    // this.orders = this.orderService.getOrders();
  }

}
