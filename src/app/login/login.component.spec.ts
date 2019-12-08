import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';

import { LoginComponent } from './login.component';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, BrowserAnimationsModule],
      declarations: [LoginComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //#region - Structure
  it('should render heading and a form with username, password fields and a login button', () => {
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

  it('should contain a login form group with username and password form controls', () => {
    expect(component.loginForm).toBeDefined();
    expect((component.loginForm as FormGroup).controls.username).toBeDefined();
    expect((component.loginForm as FormGroup).controls.password).toBeDefined();
  });
  //#endregion - Structure

  //#region - Interactions
  xit('should update the model values on change', () => {

  });
  //#endregion
});
