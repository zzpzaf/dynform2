import { Component, effect, inject, } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { IFormField, IFormFieldValidator } from '../../dataObjects/IFormField';
import { ApplyFormControlDirective } from '../apply-form-control.directive';
import { BaseFormFieldService } from '../../services/base-form-fields.service';
import { FormFieldsFacroryServiceProvider } from '../../services/form-fields-facrory-service-provider';

@Component({
  selector: 'dyn-form',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ApplyFormControlDirective,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',

})
export class FormComponent {

  constructor( private formBuilder: FormBuilder ) { 
    this.ffService = FormFieldsFacroryServiceProvider.getFormFieldsService();
    console.log('>===>> FormComponent - ffService', typeof(this.ffService), ' - ',this.ffService);
    effect(()=> {
      if (this.ffService !== undefined) {
        this.formFields = this.ffService.$formFields();
      }
      this.setFormControlValues();
    });
  }
 
  private ffService!: BaseFormFieldService; //=inject(FormFieldsService); 
  public formFields!: IFormField[];
  public fornCardTitle: string = 'Dynamic Form with Dynamic Components';
  public dynFormGroup!: FormGroup;
  public isFormSubmitted: boolean = false;
  
  ngOnInit(): void {
    if (this.ffService !== undefined) {
      this.formFields = this.ffService.$formFields();
    } else {
      console.log('>===>> FormComponent - ffService is undefined!!!');
      this.formFields = [ 
       {
          controlType: 'button',
          controlName: 'submitButton',
          fieldLabel: 'Error !!!',
          inputType: 'submit',
        },
      ]
    }
    
    this.initializeForm();
  }

  initializeForm(): void {
    const fbGroup = this.formBuilder.group({});
    this.formFields.forEach((field) => {
       fbGroup.addControl(
        field.controlName,
        new FormControl<typeof field.initialValue>(
          field.initialValue !== undefined && field.initialValue !== null
            ? field.initialValue
            : ''
            ,
            this.bindValidators(field.validators!)
        )
      );
    });
    this.dynFormGroup = fbGroup;
  }

  setFormControlValues(): void {
    if (this.dynFormGroup === undefined) {
      this.initializeForm();
    }
    for (let control in this.dynFormGroup.controls) {
      this.formFields.forEach((field) => {
        if (field.controlName === control) {
          this.dynFormGroup.controls[control].patchValue(field.initialValue);
        }
      });
    }
  }

  bindValidators(validators: IFormFieldValidator[]) {
    if (!validators || validators.length <= 0) return [];
    const validatorsList: any[] = [];
    validators.forEach((myValidator) => {
      validatorsList.push(myValidator.validator);
    });
    return Validators.compose(validatorsList);
  }

  onFormSubmit(event: Event): void {
    this.isFormSubmitted = true;
    if (this.dynFormGroup.invalid) {
      console.log('onFormSubmit() - dynFormGroup is invalid!');
      console.log('onFormSubmit() - dynFormGroup', this.dynFormGroup);
      return;
    }
    console.log('onFormSubmit() - dynFormGroup', this.dynFormGroup);
  }

  ngOnDestroy() {
    FormFieldsFacroryServiceProvider.destroyService();
  }

}

