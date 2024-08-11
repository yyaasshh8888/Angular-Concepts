import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoadingComponent } from '../loading/loading.component';
import { InfoBannerComponent } from '../info-banner/info-banner.component';
import { NumbersOnlyDirective } from '../../directives/number-only.directive';

@Component({
  selector: 'app-form-array',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    NgFor,
    NgIf,
    LoadingComponent,
    InfoBannerComponent,
    NumbersOnlyDirective,
  ],
  templateUrl: './form-array.component.html',
  styleUrl: './form-array.component.scss',
})
export class FormArrayComponent {
  reactiveForm!: FormGroup;
  isResultsGenerated: boolean = false;
  results: {
    srNo: number;
    expanded: boolean;
    list: [
      {
        srNo: number;
        operator: string;
        expanded: boolean;
        result: string;
        value1: string;
        value2: string;
      }
    ];
  }[] = [];

  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.initForm();
    this.addFilter({ value1: '10', operator: '+', value2: '123' });
    this.addFilter({ value1: '50', operator: '/', value2: '6' });
    this.addFilter({ value1: '27', operator: '*', value2: '13' });
    this.addFilter({ value1: '23456', operator: '-', value2: '8478' });
  }
  initForm() {
    this.reactiveForm = this.fb.group({
      filters: this.fb.array([]),
    });
    this.filters?.valueChanges.subscribe(() => {
      if (this.isResultsGenerated) this.isResultsGenerated = false;
    });
  }
  get filters() {
    return this.reactiveForm.get('filters') as FormArray;
  }
  removeFilter(i: number) {
    this.filters.removeAt(i);
  }
  addFilter(expression?: { value1: string; operator: string; value2: string }) {
    this.filters.push(this.createFilterForm(expression));
  }
  createFilterForm(expression?: {
    value1: string;
    operator: string;
    value2: string;
  }) {
    return this.fb.group({
      value1: [expression?.value1, [Validators.required]],
      operator: [expression?.operator || '+'],
      value2: [expression?.value2, [Validators.required]],
    });
  }
  onSubmit() {
    console.log(this.reactiveForm.value);
  }
  generateResults() {
    const operatorList = ['+', '-', '/', '*'];
    if (this.filters.length) {
      this.results = [];
      this.filters.value?.forEach((itr: any, i: number) => {
        this.results.push([] as any);
        this.results[i] = { srNo: i, expanded: false, list: [] as any };
        for (let operator of operatorList)
          switch (operator) {
            case '+':
              this.results[i].list.push({
                srNo: i + 1,
                result: Number(itr.value1) + Number(itr.value2),
                expanded: false,
                operation: 'Addition',
                ...itr,
                operator: '+',
              });
              break;

            case '-':
              this.results[i].list.push({
                srNo: i + 1,
                result: Number(itr.value1) - Number(itr.value2),
                expanded: false,
                operation: 'Substraction',
                ...itr,
                operator: '-',
              });
              break;

            case '*':
              this.results[i].list.push({
                srNo: i + 1,
                result: Number(itr.value1) * Number(itr.value2),
                expanded: false,
                operation: 'Multiplication',
                ...itr,
                operator: '*',
              });
              break;

            case '/':
              this.results[i].list.push({
                srNo: i + 1,
                result: Number(itr.value1) / Number(itr.value2),
                expanded: false,
                operation: 'Division',
                ...itr,
                operator: '/',
              });

              break;

            default:
              break;
          }
      });

      this.isResultsGenerated = true;
    }
  }
}
