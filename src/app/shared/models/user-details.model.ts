import {Adress} from "./adress.model";
import {Role} from "./role.model";

export class UserDetails {

  email: string;
  firstname: string;
  lastname: string;
  roles!: Role[];
  tokens: {access_token: string, refresh_token: string}
  address!: Adress;

  constructor(
  ) {
    this.email = '';
    this.firstname  = '';
    this.lastname = '';
    this.tokens = { access_token : '' , refresh_token : '' };
  }

}
