import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mood } from '../models/mood.model';
import { getUrl } from '../../shared/utilities';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

export interface IMoodService {
  getMoods(): Observable<Array<Mood>>;
}

@Injectable({
  providedIn: 'root'
})
export class MoodService implements IMoodService {
  static MOOD_URL_STUB = 'moods';

  constructor(private http: HttpClient) { }

  getMoods(): Observable<Array<Mood>> {
    return this.http.get<Array<Mood>>(getUrl(environment, MoodService.MOOD_URL_STUB));
  }
}
