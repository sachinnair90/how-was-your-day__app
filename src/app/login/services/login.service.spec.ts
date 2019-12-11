import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LoginService } from './login.service';
import { getUrl } from '../../shared/utilities';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';

describe('Login Service', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.get(LoginService);
    httpMock = getTestBed().get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('on login', () => {
    it('should login user if API response is 200 OK', () => {

      let actualIsUserLoggedIn;
      service.login({ username: 'fakeUser', password: 'fakePassword' }).subscribe(isUserLoggedIn => {
        actualIsUserLoggedIn = isUserLoggedIn;
      });

      httpMock.expectOne(getUrl(environment, LoginService.LOGIN_URL_STUB), 'Login user request')
        .flush(of(''), { status: 200, statusText: 'OK' });
      httpMock.verify();
      expect(actualIsUserLoggedIn).toBe(true);
    });

    it('should not login user if API response is not 200 OK', () => {
      let actualIsUserLoggedIn;
      service.login({ username: 'fakeUser', password: 'fakePassword' }).subscribe(isUserLoggedIn => {
        actualIsUserLoggedIn = isUserLoggedIn;
      });

      httpMock.expectOne(getUrl(environment, LoginService.LOGIN_URL_STUB), 'Login user request')
        .flush(of(''), { status: 401, statusText: 'Not Authorized' });
      httpMock.verify();
      expect(actualIsUserLoggedIn).toBe(false);
    });
  });
});
