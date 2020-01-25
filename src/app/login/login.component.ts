import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ILoginFormControls, ILoginFormControlsInstance } from './models/login-form.model';
import { ILoginService, LoginService } from './services/login.service';
import { UserCredentials } from './models/user-credentials.model';
import { AuthenticatedUserInfo } from './models/authenticated-user-info.model';
import { IUserService, UserService } from '../shared/services/user.service';
import { ITokenService, TokenService } from '../shared/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {
  public formControls: ILoginFormControls = {
    email: [ '', [ Validators.required, Validators.email ] ],
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
    return (this.loginForm.controls as ILoginFormControlsInstance).email.hasError('required');
  }
  public get isEmailInvalid() {
    return (this.loginForm.controls as ILoginFormControlsInstance).email.hasError('email') &&
      !this.isEmailRequired;
  }

  public isUserLoggedIn: boolean;
  public user: AuthenticatedUserInfo;

  public loginForm: FormGroup = this.fb.group(this.formControls);

  constructor(
    private fb: FormBuilder,
    @Inject(LoginService) private loginService: ILoginService,
    @Inject(UserService) private userService: IUserService,
    @Inject(TokenService) private tokenService: ITokenService,
    private router: Router
  ) { }

  ngOnInit() { }

  public login() {

    if (this.loginForm.invalid) {
      return;
    }

    const userCredentials = new UserCredentials();
    userCredentials.email = (this.loginForm.controls as ILoginFormControlsInstance).email.value;
    userCredentials.password = (this.loginForm.controls as ILoginFormControlsInstance).password.value;

    return this.loginService.login(userCredentials)
      .subscribe((user: AuthenticatedUserInfo) => {
        this.user = user;
        this.isUserLoggedIn = true;
        this.userService.setUser(user);
        this.tokenService.setToken(user.token);

        this.router.navigate([ '/mood' ]);
      }, _ => this.isUserLoggedIn = false);
  }
}
