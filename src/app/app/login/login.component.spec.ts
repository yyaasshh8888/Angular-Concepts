import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Username should be required', () => {
    const usernameControl = component.loginForm.get('username');
    usernameControl?.setValue('');

    expect(usernameControl?.valid).toBeFalsy();
  });
  it('Password should be required', () => {
    const passwdControl = component.loginForm.get('passwd');
    passwdControl?.setValue('');

    expect(passwdControl?.valid).toBeFalsy();
  });
  it('Should not submit the form if form is invalid', () => {
    spyOn(console, 'log');
    component.loginForm.setValue({
      username: '',
      passwd: '',
    });
    component.onSubmit();
    expect(console.log).not.toHaveBeenCalled();
  });
  it('If form is valid then on submit it should navigate to dashboard', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.loginForm.setValue({
      username: 'yash',
      passwd: 'yash',
    });
    component.onSubmit();
    expect(navigateSpy).toHaveBeenCalledWith(['/dashboard']);
  });
});
