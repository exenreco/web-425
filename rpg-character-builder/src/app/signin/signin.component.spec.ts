import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SigninComponent }       from './signin.component';
import { AuthService }           from '../auth.service';
import { CookieService }         from 'ngx-cookie-service';
import { ReactiveFormsModule }   from '@angular/forms';
import { By }                    from '@angular/platform-browser';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture:   ComponentFixture<SigninComponent>;
  let authService: AuthService;
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;

  beforeEach(async () => {
    // Only spy the CookieService
    const cookieSpy = jasmine.createSpyObj('CookieService', ['set']);

    await TestBed.configureTestingModule({
      imports: [
        SigninComponent,          // standalone component
        ReactiveFormsModule
      ],
      providers: [
        { provide: CookieService, useValue: cookieSpy }
        // NOTE: no override for AuthService—use the real one
      ]
    }).compileComponents();

    fixture       = TestBed.createComponent(SigninComponent);
    component     = fixture.componentInstance;
    authService   = TestBed.inject(AuthService);
    cookieServiceSpy = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;

    fixture.detectChanges();
  });

  it('should create the signin component', () => {
    expect(component).toBeTruthy();
  });

  it('should set cookie on successful sign in', () => {
    // Spy on the real signin and allow it to run
    spyOn(authService, 'signin').and.callThrough();

    component.signInForm.setValue({
      email:    'user@example.com',
      password: 'Password123'
    });
    component.onSubmit();

    expect(authService.signin).toHaveBeenCalledWith('user@example.com', 'Password123');
    expect(cookieServiceSpy.set).toHaveBeenCalledWith('session_user', 'user@example.com');
  });

  it('should not set cookie on unsuccessful sign in', () => {
    spyOn(authService, 'signin').and.returnValue(false);

    component.signInForm.setValue({
      email:    'nope@wrong.com',
      password: 'Badpass2323'
    });
    component.onSubmit();

    expect(authService.signin).toHaveBeenCalledWith('nope@wrong.com', 'Badpass2323');
    expect(cookieServiceSpy.set).not.toHaveBeenCalled();
  });

  it('should call onSubmit when form is submitted', () => {
    spyOn(component, 'onSubmit').and.callThrough();
    spyOn(authService, 'signin').and.returnValue(false);

    component.signInForm.setValue({
      email:    'form@test.com',
      password: 'TestPass123!'
    });
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(component.onSubmit).toHaveBeenCalled();
    expect(authService.signin).toHaveBeenCalledWith('form@test.com', 'TestPass123!');
  });
});
