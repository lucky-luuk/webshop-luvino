import {CartModel} from "./cart.model";

export interface Order {
  id: string;
  status: string;
  userId: string;
  dateCreated: string;
  items: CartModel[];
}
