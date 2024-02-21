import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { IFormField } from '../../dataObjects/IFormField';
import { ItemsFormFields } from '../../dataObjects/itemFormFields';
import { ApplyFormControlDirective } from '../apply-form-control.directive';



@Component({
  selector: 'app-form',
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
  styleUrl: './form.component.scss'
})
export class FormComponent {

  fornCardTitle: string = 'Dynamic Form with Dynamic Components';
  dynFormGroup!: FormGroup;

  constructor( private formBuilder: FormBuilder ) { }

  public formFields: IFormField[] = ItemsFormFields;
  
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    const fbGroup = this.formBuilder.group({});

    this.formFields.forEach((field) => {
      fbGroup.addControl(
        field.controlName,
        new FormControl(
          field.initialValue !== undefined && field.initialValue !== null
            ? field.initialValue
            : ''
        )
      );
    });

    this.dynFormGroup = fbGroup;
  }

  onFormSubmit(event: Event): void {
    console.log('Form Submitted', this.dynFormGroup.value);
  }


}
