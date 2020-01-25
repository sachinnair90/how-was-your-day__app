import { TestBed, getTestBed } from '@angular/core/testing';

import { MoodService } from './mood-service.service';
import { Mood } from '../models/mood.model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getUrl } from '../../shared/utilities';
import { environment } from '../../../environments/environment';

describe('Mood Service', () => {
  let service: MoodService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });

    service = TestBed.get(MoodService);
    httpMock = getTestBed().get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all available moods', () => {
    const expectedMoods: Array<Mood> = [
      {
        Id: 1,
        Name: 'mood1',
        Description: 'mood description 1'
      },
      {
        Id: 2,
        Name: 'mood2',
        Description: 'mood description 2'
      }
    ];

    let actualMoods: Array<Mood>;

    service.getMoods().subscribe(moods => actualMoods = moods);

    httpMock.expectOne(getUrl(environment, MoodService.MOOD_URL_STUB), 'Get moods request')
      .flush(expectedMoods, { status: 200, statusText: 'OK' });

    httpMock.verify();
    expect(actualMoods).toBe(expectedMoods);
  });
});