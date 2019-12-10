import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatButtonModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

const materialModules = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule
];

@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    ...materialModules,
  ]
})
export class SharedModule { }
