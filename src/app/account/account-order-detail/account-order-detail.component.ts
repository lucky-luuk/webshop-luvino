import {Component, Input, OnInit} from '@angular/core';
import {CartModel} from "../../shared/models/cart.model";
import {Order} from "../../shared/models/order.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {OrderService} from "../../shared/service/order.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-account-order-detail',
  templateUrl: './account-order-detail.component.html',
  styleUrls: ['./account-order-detail.component.scss']
})
export class AccountOrderDetailComponent implements OnInit {
  order!: Order;
  id: string = '';
  items!: CartModel[];
  imageUrl = environment.imageUrl;



  constructor(private route: ActivatedRoute,
              private router: Router,
              private orderService: OrderService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.orderService.getUserOrderById(+this.id)
            .subscribe( data => {
              this.order = data as Order;
              this.items = this.order.items;
            });
        }
      );
  }

}
