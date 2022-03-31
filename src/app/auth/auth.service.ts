import { Injectable } from '@angular/core';
import {tap} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";
import {UserDetails} from "../shared/models/user-details.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Role} from "../shared/models/role.model";
import {Md5} from "ts-md5";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userToken:  BehaviorSubject<UserDetails | null>;
  public user!: UserDetails;
  private env = environment;
  private isLoggedIn: boolean = false;
  public isAdmin: boolean = false;
  private tokenExpirationTime: number = 0;

  constructor(private http: HttpClient, private router: Router) {
    this.userToken = new BehaviorSubject<UserDetails | null>(null);
  }

  public login(email: any, password: any): Observable<UserDetails> {
    const save: string = Md5.hashStr(password);
    let body = new URLSearchParams();
    body.set('email', email);
    body.set('password', save);
    return this.http.post<UserDetails>(this.env.baseUrl + '/login', body,
      {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      })
      .pipe(tap((resData: UserDetails) => {
        this.handelLogin(resData);
      }));
  }

  public logout(): void {
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.userToken.next(null);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTime) {
      clearTimeout(this.tokenExpirationTime);
    }
    this.router.navigate(['/home']);
  }

  public isAuthorised(): boolean {
    return this.isLoggedIn;
  }

  public getUser(): UserDetails {
    return this.user;
  }

  public register(firstname: any, lastname: any, email: any, password: any, address: any) {
    let save: string = Md5.hashStr(password);
    return this.http.post<UserDetails>(this.env.baseUrl + '/user/save',
      {
        'email': email,
        'firstname': firstname,
        'lastname': lastname,
        'password': save,
        'address': address
      }
    )
  }

  public autoLogin() {
    const userData: UserDetails = JSON.parse(localStorage.getItem('userData')!);
    if (!userData) {
      return;
    }
    this.handelLogin(userData);
  }

  private autoLogout(): void {
    const expirationData = +new Date().getMilliseconds() + 10 * 60 * 1000;
    this.tokenExpirationTime = setTimeout(() => {
      this.logout();
    }, expirationData)
  }


  private handelLogin(data: any): void {
    this.user = data as UserDetails;
    this.userToken.next(this.user);
    this.checkAdmin(data.roles)
    this.isLoggedIn = true;
    this.autoLogout();
    localStorage.setItem('userData', JSON.stringify(this.user))
  }

  private checkAdmin(roles: Role[]): void {
    for (let role of roles) {
      this.isAdmin = role.name === 'ADMIN';
    }
  }

}
