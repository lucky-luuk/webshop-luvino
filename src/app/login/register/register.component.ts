import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserInf} from "../../models/userInf.model";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../login-style.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  newUser: UserInf

  constructor(private router: Router,
              private http: HttpClient,
              private auth: AuthService) {
    this.newUser = new UserInf();
    this.registerForm = new FormGroup({
        'email': new FormControl(null),
        'password': new FormControl(null, [Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'), Validators.minLength(6)]),
        'firstname': new FormControl(null),
        'lastname': new FormControl(null),
        'streetNumber': new FormControl(null),
        'street': new FormControl(null),
        'postalCode': new FormControl(null),
        'country': new FormControl(null),
        'city': new FormControl(null),
      }
    )
  }

  onSubmit() {
    const email = this.registerForm.value.email;
    const firstname = this.registerForm.value.firstname;
    const lastname = this.registerForm.value.lastname;
    const password = this.registerForm.value.password;

    const address = {
      'street': this.registerForm.value.street,
      'streetNumber': this.registerForm.value.streetNumber,
      'postalCode': this.registerForm.value.postalCode,
      'country': this.registerForm.value.country,
      'city': this.registerForm.value.city
    };

    this.auth.register(firstname, lastname, email, password, address)
      .subscribe(
        data => {
          this.router.navigate(['login'])
        }
      );

  }

  ngOnInit(): void {
  }

  registreer() {
    // this.router.navigate(['/home'])
  }

}
