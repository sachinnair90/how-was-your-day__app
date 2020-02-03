import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { MoodComponent } from './mood.component';
import { of, Observable } from 'rxjs';
import { IMoodService, MoodService } from '../services/mood-service.service';
import { Mood } from '../models/mood.model';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
import * as translations from '../../../assets/i18n/en.json';
import { FormGroup } from '@angular/forms';
import { Injector } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of((translations as any).default);
  }
}

fdescribe('Mood Component', () => {
  let component: MoodComponent;
  let fixture: ComponentFixture<MoodComponent>;
  let injector: Injector;
  let translate: TranslateService;

  const expectedMoods: Array<Mood> = [
    {
      id: 1,
      name: 'happy',
      description: 'mood description'
    },
    {
      id: 2,
      name: 'smiling',
      description: 'mood description'
    },
    {
      id: 3,
      name: 'neutral',
      description: 'mood description'
    },
    {
      id: 4,
      name: 'sad',
      description: 'mood description'
    },
    {
      id: 5,
      name: 'frustrated',
      description: 'mood description'
    }
  ];

  const moodService = jasmine.createSpyObj<IMoodService>('MoodService', [ 'getMoods' ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        BrowserAnimationsModule,
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

    injector = getTestBed();
    translate = injector.get(TranslateService);
  }));

  beforeEach(() => {
    moodService.getMoods.and.returnValue(of(expectedMoods));

    fixture = TestBed.createComponent(MoodComponent);
    translate.use('en');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //#region - Structure
  it('renders a title, a form with radion buttons and a submit button', () => {
    const heading = (fixture.nativeElement as HTMLElement).querySelector('#mood-heading');
    const form = (fixture.nativeElement as HTMLElement).querySelector('#mood-form');

    const happyRadioButton = form.querySelector('#mood-happyRadioButton');
    const smilingRadioButton = form.querySelector('#mood-smilingRadioButton');
    const neutralRadioButton = form.querySelector('#mood-neutralRadioButton');
    const sadRadioButton = form.querySelector('#mood-sadRadioButton');
    const frustratedRadioButton = form.querySelector('#mood-frustratedRadioButton');
    const comments = form.querySelector('#mood-comments');
    const saveButton = form.querySelector('#mood-submit');

    expect(heading.tagName.toLowerCase()).toBe('h1');
    expect(form.tagName.toLowerCase()).toBe('form');

    expect(happyRadioButton.tagName.toLowerCase()).toBe('input');
    expect(happyRadioButton.getAttribute('type')).toBe('radio');

    expect(smilingRadioButton.tagName.toLowerCase()).toBe('input');
    expect(smilingRadioButton.getAttribute('type')).toBe('radio');

    expect(neutralRadioButton.tagName.toLowerCase()).toBe('input');
    expect(neutralRadioButton.getAttribute('type')).toBe('radio');

    expect(sadRadioButton.tagName.toLowerCase()).toBe('input');
    expect(sadRadioButton.getAttribute('type')).toBe('radio');

    expect(frustratedRadioButton.tagName.toLowerCase()).toBe('input');
    expect(frustratedRadioButton.getAttribute('type')).toBe('radio');

    expect(comments.tagName.toLowerCase()).toBe('textarea');

    expect(saveButton.tagName.toLowerCase()).toBe('button');
    expect(saveButton.getAttribute('type')).toBe('submit');
    expect(saveButton.textContent).toBe('Save');
  });

  it('contains a mood form with radio button group form controls', () => {
    expect(component.moodForm).toBeDefined();
    expect((component.moodForm as FormGroup).controls.moodSelector).toBeDefined();
    expect((component.moodForm as FormGroup).controls.comments).toBeDefined();
  });
  //#endregion

  //#region - Interactions
  it('should get all moods on initialize', () => {

    expect(component.moods).toEqual(expectedMoods);
  });
  //#endregion - Interactions
});
