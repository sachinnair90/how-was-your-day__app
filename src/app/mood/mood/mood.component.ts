import { Component, OnInit, Inject } from '@angular/core';
import { Mood } from '../models/mood.model';
import { MoodService, IMoodService } from '../services/mood-service.service';

@Component({
  selector: 'app-mood',
  templateUrl: './mood.component.html',
  styleUrls: [ './mood.component.scss' ]
})
export class MoodComponent implements OnInit {
  public moods: Array<Mood>;

  constructor(
    @Inject(MoodService) private moodService: IMoodService) { }

  ngOnInit() {
    this.moodService.getMoods().subscribe(x => this.moods = x);
  }

}
