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
export class LoginComponent implements OnInit {
  error: boolean = false;

  constructor(private router: Router,
              private auth: AuthService,
              private login: LoginService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void { }

  onSubmit(form: NgForm) {
    console.log(form.value.email);
    this.auth.login(form.value.email, form.value.password)
      .subscribe(data => {
        this.location.back()
      }, error => {
        this.error = true;
      })
  }

  register() {
    this.router.navigate(['/registreer']);
  }

}
