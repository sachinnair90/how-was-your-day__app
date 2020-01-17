import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LoginService } from './login.service';
import { getUrl } from '../../shared/utilities';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import { AuthenticatedUserInfo } from '../models/authenticated-user-info.model';

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

      let actualUser: AuthenticatedUserInfo;
      service.login({ email: 'fakeUser@abc.com', password: 'fakePassword' })
        .subscribe((user: AuthenticatedUserInfo) => actualUser = user);

      const expectedUser = new AuthenticatedUserInfo();
      expectedUser.firstName = 'dummyFirstName';
      expectedUser.lastName = 'dummyLastName';
      expectedUser.email = 'dummy@email.com';
      expectedUser.token = 'dummy-token';

      httpMock.expectOne(getUrl(environment, LoginService.LOGIN_URL_STUB), 'Login user request')
        .flush(expectedUser, { status: 200, statusText: 'OK' });

      httpMock.verify();
      expect(actualUser).toBe(expectedUser);
    });

    it('should not login user if API response is not 200 OK', () => {
      let actualUser: AuthenticatedUserInfo;
      service.login({ email: 'fakeUser@abc.com', password: 'fakePassword' }).subscribe(user => {
        actualUser = user;
      });

      httpMock.expectOne(getUrl(environment, LoginService.LOGIN_URL_STUB), 'Login user request')
        .flush(null, { status: 401, statusText: 'Not Authorized' });

      httpMock.verify();

      expect(actualUser).toBeUndefined();
    });
  });
});
