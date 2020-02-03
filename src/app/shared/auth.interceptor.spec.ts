import { inject, TestBed, getTestBed } from '@angular/core/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { TokenService, ITokenService } from './services/token.service';
import { AuthInterceptor } from './auth.interceptor';

describe('Auth Interceptor', () => {

  const tokenService = jasmine.createSpyObj<ITokenService>('TokenService', [ 'getToken' ]);

  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: TokenService, useValue: tokenService },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        } ]
    });

    httpMock = getTestBed().get(HttpTestingController);
  });

  it('should attach authorization header with the request',
    inject([ HttpClient ], (http: HttpClient) => {

      const token = 'dummyToken';

      tokenService.getToken.and.returnValue(token);

      http.get('/dummyRequest').subscribe(response => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne(request =>
        request.headers.has(AuthInterceptor.AUTH_HEADER) &&
        !request.headers.has(AuthInterceptor.CONTENT_TYPE_HEADER) &&
        request.headers.get(AuthInterceptor.AUTH_HEADER) === `${AuthInterceptor.AUTH_TYPE} ${token}`);

      req.flush({ dummy: 'value' });

      expect(req.request.method).toBe('GET');
    }));

  it('should attach authorization and content-type headers with the request',
    inject([ HttpClient ], (http: HttpClient) => {

      const token = 'dummyToken';

      tokenService.getToken.and.returnValue(token);

      http.post('/dummyRequest', { dummy: 'param' }).subscribe(response => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne(request =>
        request.headers.has(AuthInterceptor.AUTH_HEADER) &&
        request.headers.has(AuthInterceptor.CONTENT_TYPE_HEADER) &&
        request.headers.get(AuthInterceptor.CONTENT_TYPE_HEADER) === AuthInterceptor.CONTENT_TYPE_HEADER_VALUE &&
        request.headers.get(AuthInterceptor.AUTH_HEADER) === `${AuthInterceptor.AUTH_TYPE} ${token}`);

      req.flush({ dummy: 'value' });

      expect(req.request.method).toBe('POST');
    }));

  it('should not attach authorization header if token is not present',
    inject([ HttpClient ], (http: HttpClient) => {

      tokenService.getToken.and.returnValue(null);

      http.get('/dummyRequest').subscribe(response => expect(response).toBeTruthy());

      const req = httpMock.expectOne(request =>
        !request.headers.has(AuthInterceptor.AUTH_HEADER) &&
        !request.headers.has(AuthInterceptor.CONTENT_TYPE_HEADER));

      req.flush({ dummy: 'value' });

      expect(req.request.method).toBe('GET');
    }));
});
