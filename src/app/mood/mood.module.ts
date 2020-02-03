import { NgModule } from '@angular/core';
import { MoodRoutingModule } from './mood-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MoodComponent } from './mood/mood.component';

@NgModule({
  declarations: [ MoodComponent ],
  imports: [
    MoodRoutingModule,
    SharedModule
  ]
})
export class MoodModule { }
