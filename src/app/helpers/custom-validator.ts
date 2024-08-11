import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function nameValidator(nameCheck: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value == nameCheck
      ? null
      : {
          nameValidator: true,
          errorMsg: control.value + ' is not a valid name!',
        };
  };
}
export function passwordMatcher(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    let passwd = form.get('passwd');
    let confirmPasswd = form.get('confirmPasswd');

    if (!confirmPasswd || !passwd) return null;

    return passwd.value == confirmPasswd.value
      ? null
      : { passwordMatcher: true, errorMsg: "Passwords doesn't match" };
  };
}
