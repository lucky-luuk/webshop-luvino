import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {exhaustMap, Observable, take} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.userToken.pipe(
      take(1),
      exhaustMap(token => {
        if(!token) {
          return next.handle(req);
        }
        const modif = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token.tokens.access_token)})
        return next.handle(modif)
      })
    )
  }

  private addToken(req: HttpRequest<any>, token: string) {

  }

}
