import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService, IAuthService } from './auth.service';
import { getUrl } from '../utilities';
import { environment } from '../../../environments/environment';
import { AuthenticatedUserInfo } from '../../login/models/authenticated-user-info.model';

describe('Auth Service', () => {
  let service: IAuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.get(AuthService);
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

      httpMock.expectOne(getUrl(environment, AuthService.LOGIN_URL_STUB), 'Login user request')
        .flush(expectedUser, { status: 200, statusText: 'OK' });

      httpMock.verify();
      expect(actualUser).toBe(expectedUser);
    });

    it('should not login user if API response is not 200 OK', () => {
      let actualUser: AuthenticatedUserInfo;
      service.login({ email: 'fakeUser@abc.com', password: 'fakePassword' }).subscribe(user => {
        actualUser = user;
      }, error => console.log(error.message));

      httpMock.expectOne(getUrl(environment, AuthService.LOGIN_URL_STUB), 'Login user request')
        .flush(null, { status: 401, statusText: 'Not Authorized' });

      httpMock.verify();

      expect(actualUser).toBeUndefined();
    });

    it('should check if the user is authenticated', () => {

      let result;

      service.isAuthenticated().subscribe(x => result = x);

      httpMock.expectOne(getUrl(environment, AuthService.IS_AUTH_URL_STUB), 'Authenticated user verification')
        .flush({}, { status: 200, statusText: 'Success' });

      httpMock.verify();

      expect(result).toBe(true);
    });

    it('should check if the user is not authenticated', () => {

      let result;

      service.isAuthenticated().subscribe(x => result = x);

      httpMock.expectOne(getUrl(environment, AuthService.IS_AUTH_URL_STUB), 'Authenticated user verification')
        .flush({}, { status: 401, statusText: 'Not Authorized' });

      httpMock.verify();

      expect(result).toBe(false);
    });
  });
});
