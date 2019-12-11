import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';

import { LoginComponent } from './login.component';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import * as translations from '../../assets/i18n/en.json';
import { of, Observable } from 'rxjs';
import { Injector } from '@angular/core';
import { ILoginFormControlsInstance } from './models/login-form.model';
import { LoginService } from './services/login.service';

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of((translations as any).default);
  }
}

describe('Login Component', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let injector: Injector;
  let translate: TranslateService;
  const loginService = jasmine.createSpyObj<LoginService>('LoginService', [ 'login' ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeLoader }
        }),
      ],
      declarations: [ LoginComponent ],
      providers: [ { provide: LoginService, useValue: loginService } ]
    })
      .compileComponents();

    injector = getTestBed();
    translate = injector.get(TranslateService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    translate.use('en');
    fixture.detectChanges();
  });

  //#region - Structure
  it('renders heading, a form with username, password fields and a login button', () => {
    const loginHeading = (fixture.nativeElement as HTMLElement).querySelector('#login-heading');
    const loginForm = (fixture.nativeElement as HTMLElement).querySelector('#login-form');
    const userNameField = loginForm.querySelector('#app-user-name');
    const passwordField = loginForm.querySelector('#app-password');
    const loginButton = loginForm.querySelector('#app-login');

    expect(loginHeading.tagName.toLowerCase()).toBe('h1');
    expect(loginHeading.textContent).toBe('Login');

    expect(loginForm.tagName.toLowerCase()).toBe('form');

    expect(userNameField.tagName.toLowerCase()).toBe('input');
    expect(userNameField.attributes.getNamedItem('type').value).toContain('email');

    expect(passwordField.tagName.toLowerCase()).toBe('input');
    expect(passwordField.attributes.getNamedItem('type').value).toBe('password');

    expect(loginButton.tagName.toLowerCase()).toBe('button');
    expect(loginButton.attributes.getNamedItem('type').value).toBe('submit');
    expect(loginButton.textContent).toBe('Login');
  });

  it('contains a login form group with username and password form controls', () => {
    expect(component.loginForm).toBeDefined();
    expect((component.loginForm as FormGroup).controls.username).toBeDefined();
    expect((component.loginForm as FormGroup).controls.password).toBeDefined();
  });
  //#endregion - Structure

  //#region - Interactions
  it('invalidates the form on error of required controls', () => {
    const formControls = component.loginForm.controls as ILoginFormControlsInstance;

    formControls.username.setValue(null);
    formControls.password.setValue(null);

    fixture.detectChanges();

    expect(component.loginForm.valid).toBeFalsy();
    expect(component.isEmailRequired).toBeTruthy();
    expect(component.isPasswordRequired).toBeTruthy();
  });

  it('invalidates the form on invalid email control', () => {
    const formControls = component.loginForm.controls as ILoginFormControlsInstance;

    formControls.username.setValue('acb@');

    fixture.detectChanges();

    expect(component.loginForm.valid).toBeFalsy();
    expect(component.isEmailRequired).toBeFalsy();
    expect(component.isEmailInvalid).toBeTruthy();
  });

  it('invalidates the form on password format error', () => {
    const formControls = component.loginForm.controls as ILoginFormControlsInstance;

    formControls.password.setValue('fake');

    fixture.detectChanges();

    expect(component.loginForm.valid).toBeFalsy();
    expect(component.isPasswordRequired).toBeFalsy();
    expect(component.isPasswordFormatInvalid).toBeTruthy();
  });

  it('marks the form valid when form controls have valid values', () => {
    const formControls = component.loginForm.controls as ILoginFormControlsInstance;

    formControls.username.setValue('abc@email.com');
    formControls.password.setValue('new-password');

    expect(component.loginForm.valid).toBeTruthy();
    expect(component.isEmailRequired).toBeFalsy();
    expect(component.isEmailInvalid).toBeFalsy();
    expect(component.isPasswordRequired).toBeFalsy();
    expect(component.isPasswordFormatInvalid).toBeFalsy();
  });

  it('logs the user in with valid user credentials', () => {
    loginService.login.and.returnValue(of(true));

    const formControls = component.loginForm.controls as ILoginFormControlsInstance;

    formControls.username.setValue('abc@email.com');
    formControls.password.setValue('new-password');

    component.login();

    expect(component.isUserLoggedIn).toBeTruthy();
  });

  xit('shows the error message when user login failed', () => {

  });
  //#endregion
});
