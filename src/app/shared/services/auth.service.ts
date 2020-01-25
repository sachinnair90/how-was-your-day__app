import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserCredentials } from '../../login/models/user-credentials.model';
import { getUrl } from '../utilities';
import { environment } from '../../../environments/environment';
import { AuthenticatedUserInfo } from '../../login/models/authenticated-user-info.model';

export interface IAuthService {
  login(userCredentials: UserCredentials): Observable<AuthenticatedUserInfo>;
  isAuthenticated(): Observable<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {

  public static LOGIN_URL_STUB = 'login';
  public static IS_AUTH_URL_STUB = 'isAuthenticated';

  constructor(private http: HttpClient) { }

  public login(userCredentials: UserCredentials): Observable<AuthenticatedUserInfo> {
    return this.http.post<AuthenticatedUserInfo>(getUrl(environment, AuthService.LOGIN_URL_STUB),
      userCredentials);
  }

  public isAuthenticated(): Observable<boolean> {

    return this.http.get(getUrl(environment, AuthService.IS_AUTH_URL_STUB))
      .pipe(map(response => true), catchError(x => of(false)));
  }
}
