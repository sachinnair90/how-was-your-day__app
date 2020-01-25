import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodComponent } from './mood.component';
import { of, Observable } from 'rxjs';
import { IMoodService, MoodService } from '../services/mood-service.service';
import { Mood } from '../models/mood.model';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
import * as translations from '../../../assets/i18n/en.json';

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of((translations as any).default);
  }
}

describe('Mood Component', () => {
  let component: MoodComponent;
  let fixture: ComponentFixture<MoodComponent>;

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

  const moodService = jasmine.createSpyObj<IMoodService>('MoodService', [ 'getMoods' ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeLoader }
        })
      ],
      declarations: [ MoodComponent ],
      providers: [
        { provide: MoodService, useValue: moodService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    moodService.getMoods.and.returnValue(of(expectedMoods));

    fixture = TestBed.createComponent(MoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should get all moods on initialize', () => {

    expect(component.moods).toEqual(expectedMoods);
  });
});
