import { Injectable } from '@angular/core';
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {UserDetails} from "../models/user-details.model";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Role} from "../models/role.model";
import {Md5} from "ts-md5";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userToken:  BehaviorSubject<UserDetails | null>;
  user!: UserDetails;
  private env = environment;
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  private tokenExpirationTime: number = 0;

  constructor(private http: HttpClient, private router: Router) {
    this.userToken = new BehaviorSubject<UserDetails | null>(null);
  }

  login(email: any, password: any) {
    const save: string = Md5.hashStr(password);
    let body = new URLSearchParams();
    body.set('email', email);
    body.set('password', save);
    return this.http.post<UserDetails>(this.env.baseUrl + '/login', body,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      })
      .pipe(catchError(this.handleError),
        tap((resData: UserDetails) => {
        this.handelLogin(resData);
      }))
  }

  logout() {
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.userToken.next(null);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTime) {
      clearTimeout(this.tokenExpirationTime);
    }
    this.router.navigate(['/home']);
  }

  isAuthorised() {
    return this.isLoggedIn;
  }

  getUser() {
    return this.user;
  }

  register(firstname: any, lastname: any, email: any, password: any, address: any) {
    let save: string = Md5.hashStr(password);
    return this.http.post<UserDetails>(this.env.baseUrl + '/user/save',
      {
        'email': email,
        'firstname': firstname,
        'lastname': lastname,
        'password': save,
        'address': address
      }
    ).pipe(catchError(this.handleError),tap(resData => {
      console.log(resData)
    }))
  }

  public autoLogin() {
    const userData: UserDetails = JSON.parse(localStorage.getItem('userData')!);
    if (!userData) {
      return;
    }
    this.handelLogin(userData);
  }

  autoLogout() {
    const expirationData = +new Date().getMilliseconds() + 10 * 60 * 1000;
    this.tokenExpirationTime = setTimeout(() => {
      this.logout();
    }, expirationData)
  }


  handelLogin(data: any) {
    this.user = data as UserDetails;
    this.userToken.next(this.user);
    this.checkAdmin(data.roles)
    this.isLoggedIn = true;
    this.autoLogout();
    localStorage.setItem('userData', JSON.stringify(this.user))
  }

  checkAdmin(roles: Role[]) {
    for (let role of roles) {
      this.isAdmin = role.name === 'ADMIN';
    }
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email doesnt exist.';
        break;
    }
    return throwError(errorMessage);
  }

}
