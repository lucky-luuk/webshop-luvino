import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {AuthService} from "../auth/auth.service";
import {NgForm} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private env = environment

  constructor(private http: HttpClient, private auth: AuthService) { }


  login(form: NgForm) {
    this.auth.login(form.value.email, form.value.password)
      .subscribe(data => {
        console.log(data)
        // this.auth.setUser();
      })
  }
}
