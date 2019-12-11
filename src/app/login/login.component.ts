import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ILoginFormControls, ILoginFormControlsInstance } from './models/login-form.model';
import { LoginService } from './services/login.service';
import { UserCredentials } from './models/user-credentials.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {
  public formControls: ILoginFormControls = {
    username: [ '', [ Validators.required, Validators.email ] ],
    password: [ '', [ Validators.required, Validators.minLength(6) ] ]
  };
  public get isPasswordRequired() {
    return (this.loginForm.controls as ILoginFormControlsInstance).password.hasError('required');
  }
  public get isPasswordFormatInvalid() {
    return (this.loginForm.controls as ILoginFormControlsInstance).password.hasError('minlength') &&
      !this.isPasswordRequired;
  }
  public get isEmailRequired() {
    return (this.loginForm.controls as ILoginFormControlsInstance).username.hasError('required');
  }
  public get isEmailInvalid() {
    return (this.loginForm.controls as ILoginFormControlsInstance).username.hasError('email') &&
      !this.isEmailRequired;
  }

  public isUserLoggedIn: boolean;

  public loginForm: FormGroup = this.fb.group(this.formControls);

  constructor(private fb: FormBuilder, public loginService: LoginService) { }

  ngOnInit() { }

  public login() {

    if (this.loginForm.invalid) {
      return;
    }

    const userCredentials = new UserCredentials();
    userCredentials.username = (this.loginForm.controls as ILoginFormControlsInstance).username.value;
    userCredentials.password = (this.loginForm.controls as ILoginFormControlsInstance).password.value;

    return this.loginService.login(userCredentials)
      .subscribe(isUserLoggedIn => this.isUserLoggedIn = isUserLoggedIn, error => this.isUserLoggedIn = error);
  }

}
