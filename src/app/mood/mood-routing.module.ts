import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MoodComponent } from './mood/mood.component';

const routes: Routes = [ { path: '', component: MoodComponent } ];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class MoodRoutingModule { }
