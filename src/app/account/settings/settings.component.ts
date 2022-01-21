import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserDetails} from "../../models/user-details.model";
import {AuthService} from "../../auth/auth.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  id: string = '';
  userForm!: FormGroup;
  delete: boolean = false
  user!: UserDetails;
  baseUrl = environment.baseUrl;

  formDetails = {
    firstname: '',
    middelname: '',
    lastname: '',
    country: '',
    streetname: '',
    streetnumber: '',
    postalcode: '',
    city: ''

  }

  constructor(private auth: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.user = this.auth.getUser();
    console.log(this.user)
    this.initForm();
  }

  private initForm() {
    // this.formDetails.firstname = this.user.firstname;
    // this.formDetails.middelname = this.user
    // this.formDetails.lastname = this.user
    // this.formDetails.country = this.user
    // this.formDetails.streetname = this.user
    // this.formDetails.streetnumber =
    // this.formDetails.postalcode =
    // this.formDetails.city =
    let middel = '';

    this.userForm = new FormGroup({
      firstname: new FormControl(this.user.firstname, Validators.required),
      middelname: new FormControl(middel),
      lastname: new FormControl(this.user.lastname, Validators.required),
      country: new FormControl(this.user.address.country, Validators.required),
      street: new FormControl(this.user.address.street, Validators.required),
      streetNumber: new FormControl(this.user.address.streetNumber, Validators.required),
      postalCode: new FormControl(this.user.address.postalCode, Validators.required),
      city: new FormControl(this.user.address.city, Validators.required),
      email: new FormControl(this.user.email, Validators.required),
      emailCheck: new FormControl(this.user.email, Validators.required)
    })
  }

  submitUser() {
    const email = this.userForm.value.email;
    const firstname = this.userForm.value.firstname;
    const lastname = this.userForm.value.lastname;

    const address = {
      'street': this.userForm.value.street,
      'streetNumber': this.userForm.value.streetNumber,
      'postalCode': this.userForm.value.postalCode,
      'country': this.userForm.value.country,
      'city': this.userForm.value.city
    };

    this.http.put(this.baseUrl+'/update/'+this.user.email, {
      'email': email,
      'firstname': firstname,
      'lastname': lastname,
      'address': address
    }).subscribe(
      data => {
        this.user = data as UserDetails;
      }
    )
  }
}
