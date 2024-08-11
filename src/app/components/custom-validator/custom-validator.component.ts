import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { nameValidator, passwordMatcher } from '../../helpers/custom-validator';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-custom-validator',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, NgIf, AsyncPipe],
  templateUrl: './custom-validator.component.html',
  styleUrl: './custom-validator.component.scss',
})
export class CustomValidatorComponent {
  reactiveForm!: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.reactiveForm = this.fb.group(
      {
        uname: ['', [Validators.required, nameValidator('Yash')]],
        passwd: ['', [Validators.required]],
        confirmPasswd: ['', [Validators.required]],
      },
      { validators: passwordMatcher() }
    );
  }
  onSubmit() {
    if (this.reactiveForm.valid) {
      console.log(this.reactiveForm.value);
    }
  }
}
