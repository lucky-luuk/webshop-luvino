import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Order} from "../models/order.model";
import {environment} from "../../../environments/environment";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private env = environment;
  orders: Order[] = []

  constructor(private http: HttpClient) { }

  getOrderFromUser(email: String) {
    const parm = '?email='+email;
    return this.http.get<Order[]>(
      this.env.baseUrl+'/order/user'+parm
    );
  }

  getUserOrderById(id: number) {
    const parm = '?id='+id;
    return this.http.get<Order>(
      this.env.baseUrl+'/order/item'+parm
    );
  }

  getAllOrders() {
    return this.http.get<Order[]>(
      this.env.baseUrl+'/order'
    )
      .pipe(tap(data => {
          this.setOrder(data)
        })
      );
  }

  //TODO weghalen console log met resultaat
  deleteOrder(orderId: number) {
    return this.http.delete(this.env.baseUrl +'/order/delete/' + orderId)
      .subscribe(
        data => {
          console.log(data)
        }
      )
  }

  //TODO weghalen console log met resultaat
  updateStatus(id: number, status: string) {
    console.log(status)
    const header = new HttpParams().set('status', status)
    return this.http.put(this.env.baseUrl+'/order/status/'+ id,
        header
      )
      .pipe(tap(response => {
        console.log(response)
      }))
      .subscribe(data => {
        console.log(data)
      })

  }

  setOrder(orders: Order[]) {
    this.orders = orders;
  }

  getOrders() {
    return this.orders.slice();
  }

  getOrderById(index: String) {
    let order;
    for (let item of this.orders) {
      if (item.id == index) {
        order = item;
      }
    }
    return order;
  }

}
