import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Order} from "../../models/order.model";
import {OrderService} from "../../service/order.service";
import {CartModel} from "../../models/cart.model";
import {FormControl, FormGroup} from "@angular/forms";
import {Location} from "@angular/common";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  id: string = '';
  items: CartModel[] | undefined;
  order: Order | undefined;
  status: FormControl = new FormControl();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderService: OrderService,
              private location: Location) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.order = this.orderService.getOrderById(this.id);
          this.items = this.order?.items;
        }
      );
    this.status = new FormControl(this.order?.status)
  }

  deleteOrder() {
    this.orderService.deleteOrder(+this.id);
    this.location.back();
  }

  updateStatus(event: any) {
    this.orderService.updateStatus(+this.id, event.target.value);
  }

}
