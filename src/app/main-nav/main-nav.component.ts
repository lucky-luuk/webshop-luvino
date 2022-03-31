import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {Observable, Subscription} from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

  constructor(private breakpointObserver: BreakpointObserver,
              private auth: AuthService) {

  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  userIsAdmin(): boolean {
    return this.auth.isAdmin;
  }

  isLoggedIn(): boolean {
    return this.auth.isAuthorised();
  }

  logout(): void {
    this.auth.logout();
  }
}
