import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { UserCredentials } from '../models/user-credentials.model';
import { getUrl } from '../../shared/utilities';
import { environment } from '../../../environments/environment';
import { AuthenticatedUserInfo } from '../models/authenticated-user-info.model';

export interface ILoginService {
  login(userCredentials: UserCredentials): Observable<AuthenticatedUserInfo>;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService implements ILoginService {

  static LOGIN_URL_STUB = 'login';

  constructor(private http: HttpClient) { }

  public login(userCredentials: UserCredentials): Observable<AuthenticatedUserInfo> {
    return this.http.post<AuthenticatedUserInfo>(getUrl(environment, LoginService.LOGIN_URL_STUB),
      userCredentials);
  }
}
