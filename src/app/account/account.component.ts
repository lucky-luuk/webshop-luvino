import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {Role} from "../models/role.model";
import {UserDetails} from "../models/user-details.model";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  private userSub: Subscription;
  userDetails!: UserDetails;
  user: boolean = false;

  constructor(private auth: AuthService) {
    this.userSub = new Subscription();
  }

  ngOnInit(): void {
    this.userSub = this.auth.userToken
      .subscribe(user => {
        if (user) {
          this.userDetails = user;
          this.user = true;
        } else {
          this.user = false;
        }
      })
  }

}
