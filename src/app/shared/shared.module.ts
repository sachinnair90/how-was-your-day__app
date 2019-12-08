import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatButtonModule } from '@angular/material';
import { CommonModule } from '@angular/common';

const exportableModules = [
  CommonModule,
  ReactiveFormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule
];

@NgModule({
  declarations: [],
  imports: [
    ...exportableModules
  ],
  exports: [
    ...exportableModules
  ]
})
export class SharedModule { }
