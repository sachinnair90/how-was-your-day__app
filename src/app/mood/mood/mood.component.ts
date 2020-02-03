import { Component, OnInit, Inject } from '@angular/core';
import { Mood } from '../models/mood.model';
import { MoodService, IMoodService } from '../services/mood-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MoodFormControls } from '../models/mood-form.model';

@Component({
  selector: 'app-mood',
  templateUrl: './mood.component.html',
  styleUrls: [ './mood.component.scss' ]
})
export class MoodComponent implements OnInit {
  public formControls: MoodFormControls = {
    moodSelector: [ '', [ Validators.required ] ],
    comments: [ '', [ Validators.maxLength(255) ] ]
  };
  public moods: Array<Mood>;
  public moodForm: FormGroup = this.fb.group(this.formControls);

  constructor(
    public fb: FormBuilder,
    @Inject(MoodService) private moodService: IMoodService) { }

  public ngOnInit() {
    this.moodService.getMoods().subscribe(x => this.moods = x);
  }
}
