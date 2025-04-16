import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'RPG Character Builder';
  isAuth = false;
  email = '';

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.getAuthState().subscribe(auth => {
      this.isAuth = auth;
      this.email = auth
        ? this.cookieService.get('session_user')
        : '';
    });
  }

  signOut() {
    this.authService.signout();
    this.router.navigate(['/signin']);
  }
}
