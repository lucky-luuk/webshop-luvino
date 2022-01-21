import {Role} from "./role.model";

export class UserInf{
  id: string;
  firstname: string;
  lastname: string;
  createdAt: number;
  username: string;
  email: string;
  roles: Role[];

  constructor() {
    this.id = '';
    this.firstname = '';
    this.lastname = '';
    this.createdAt = Date.now();
    this.username = '';
    this.email = '';
    this.roles = [];
  }
}
