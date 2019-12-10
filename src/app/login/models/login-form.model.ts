import { AbstractControl } from '@angular/forms';

export interface FormGroupControlsInstance {
  [key: string]: AbstractControl;
}

export interface ILoginFormControls {
  username: any;
  password: any;
}

export interface ILoginFormControlsInstance extends ILoginFormControls, FormGroupControlsInstance {
  username: AbstractControl;
  password: AbstractControl;
}
