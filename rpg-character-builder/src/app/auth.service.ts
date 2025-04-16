import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

interface User {
  empId: number;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [
    { empId: 1, email: 'user@example.com', password: 'Password123' },
    { empId: 2, email: 'exenreco19@yahoo.com', password: 'Tester23' },
  ];

  private authState = new BehaviorSubject<boolean>(false);

  constructor(private cookieService: CookieService) {}

  getAuthState(): Observable<boolean> {
    return this.authState.asObservable();
  }

  signin(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.cookieService.set('session_user', email);
      this.authState.next(true);
      return true;
    } else {
      this.authState.next(false);
      return false;
    }
  }

  signout(): void {
    this.cookieService.deleteAll();
    this.authState.next(false);
  }
}
