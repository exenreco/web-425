import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    const sessionUser = this.cookieService.get('session_user');
    return sessionUser ? true : this.router.parseUrl('/signin');
  }
}
