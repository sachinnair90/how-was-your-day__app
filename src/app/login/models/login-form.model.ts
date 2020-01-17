import { AbstractControl } from '@angular/forms';

export interface FormGroupControlsInstance {
  [ key: string ]: AbstractControl;
}

export interface ILoginFormControls {
  email: any;
  password: any;
}

export interface ILoginFormControlsInstance extends ILoginFormControls, FormGroupControlsInstance {
  email: AbstractControl;
  password: AbstractControl;
}
