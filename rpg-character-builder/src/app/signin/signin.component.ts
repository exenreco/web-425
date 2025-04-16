import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';  // Ensure correct path
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <section class="page">
    <form class="form" [formGroup]="signInForm" (ngSubmit)="onSubmit()">
      <h2 class="title">User signin</h2>
      <div>
        <label for="email">Email:</label>
        <input id="email" type="email" formControlName="email" />
        <div *ngIf="signInForm.controls['email'].invalid && signInForm.controls['email'].touched" class="error">
          <small *ngIf="signInForm.controls['email'].errors?.['required']">Email is required.</small>
          <small *ngIf="signInForm.controls['email'].errors?.['email']">Please enter a valid email.</small>
        </div>
      </div>
      <div>
        <label for="password">Password:</label>
        <input id="password" type="password" formControlName="password" />
        <div *ngIf="signInForm.controls['password'].invalid && signInForm.controls['password'].touched" class="error">
          <small *ngIf="signInForm.controls['password'].errors?.['required']">Password is required.</small>
          <small *ngIf="signInForm.controls['password'].errors?.['pattern']">
            Password must be at least 8 characters (include one uppercase letters & a numbers).
          </small>
        </div>
      </div>
      <button type="submit" [disabled]="signInForm.invalid">Sign In</button>
    </form>
  </section>
`,
styles: `.page {
  text-align: center;
  padding-top: 2em;
  margin-top: 7em;
  display: block;
  flex: 1 1 auto;
  height: 100vh;
}
.title {
  width: 98%;
  margin: auto;
  color: #333;
  font-weight: bold;
  font-size: 2rem;
  text-align: left;
  border-bottom: .15em solid #333;
}
.form {
  max-width: 400px;
  margin: 2em auto;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #f5f5f5;
}
form div {
  text-align: left;
  margin: 1em;
}
input {
  width: 100%;
  padding: 0.5em;
  box-sizing: border-box;
}
button {
  width: 100%;
  padding: 0.75em;
  background: red;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:disabled {
  background: #aaa;
}
.error {
  color: red;
  font-size: 0.9em;
}
`})

export class SigninComponent implements OnInit {
  signInForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      // Example pattern: at least 6 characters, including letters and numbers
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9]).{8,}$/)]]
    });
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;
      const authenticated = this.authService.signin(email, password);
      if (authenticated) {
        // Optionally, redirect to a protected page:
        this.router.navigate(['/create-character']);
      } else {
        alert('Sign in failed. Please check your email and password.');
      }
    }
  }
}
