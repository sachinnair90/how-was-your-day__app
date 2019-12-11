import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserCredentials } from '../models/user-credentials.model';
import { getUrl } from '../../shared/utilities';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  static LOGIN_URL_STUB = 'login';

  constructor(private http: HttpClient) { }

  public login = (userCredentials: UserCredentials): Observable<boolean> => {
    return this.http.post(getUrl(environment, LoginService.LOGIN_URL_STUB), userCredentials, { observe: 'response' })
      .pipe(map(response => response.ok), catchError(response => of(false)));
  }
}
