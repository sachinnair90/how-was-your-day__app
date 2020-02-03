import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inject } from '@angular/core';
import { ITokenService, TokenService } from './services/token.service';

export class AuthInterceptor implements HttpInterceptor {
  public static AUTH_HEADER = 'Authorization';
  public static AUTH_TYPE = 'Bearer';
  public static CONTENT_TYPE_HEADER = 'Content-Type';
  public static CONTENT_TYPE_HEADER_VALUE = 'application/json';

  private nonBodyHttpMethods = [ 'OPTIONS', 'GET' ];

  constructor(@Inject(TokenService) private tokenService: ITokenService) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = {};

    const token = this.tokenService.getToken();

    if (token) {
      headers[ AuthInterceptor.AUTH_HEADER ] = AuthInterceptor.AUTH_TYPE + ' ' + token;
    }

    if (this.nonBodyHttpMethods.indexOf(req.method.toUpperCase()) === -1) {
      headers[ AuthInterceptor.CONTENT_TYPE_HEADER ] = AuthInterceptor.CONTENT_TYPE_HEADER_VALUE;
    }

    const authReq = req.clone({ setHeaders: headers });

    return next.handle(authReq);
  }
}
