import { Component, OnInit } from '@angular/core';
import {Form, FormControl, FormGroup, NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {LoginService} from "../login.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../login-style.scss']
})
export class LoginComponent {
  error: boolean = false;

  constructor(private router: Router,
              private auth: AuthService,
              private login: LoginService,
              private route: ActivatedRoute,
              private location: Location) { }


  onSubmit(form: NgForm): void {
    this.auth.login(form.value.email, form.value.password)
      .subscribe( resData => {
        if (resData) {
          this.location.back()
        } else {
          this.error = true;
        }
      })
  }

  register() {
    this.router.navigate(['/registreer']);
  }

}
