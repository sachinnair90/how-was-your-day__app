import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ILoginFormControls, ILoginFormControlsInstance } from './models/login-form.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public formControls: ILoginFormControls = {
    username: ['', [ Validators.required, Validators.email]],
    password: ['', [ Validators.required, Validators.minLength(6) ]]
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

  public loginForm: FormGroup = this.fb.group(this.formControls);

  constructor(private fb: FormBuilder) { }

  ngOnInit() { }

}
