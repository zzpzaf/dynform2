import { Component, effect, inject, } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { IFormField } from '../../dataObjects/IFormField';
import { ApplyFormControlDirective } from '../apply-form-control.directive';
import { ItemFormFieldsService } from '../../services/item-form-fields.service';
import { IItem } from '../../dataObjects/iitem';

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
    effect(()=> {
      // this.item = this.itemService.$item()!;
      // console.log('>===>> 2. FormComponent - item', this.item);
      this.formFields = this.itemService.$formFields();
      // console.log('>===>> FormComponent - Constructor - formFields', this.formFields);
      this.setFormControlValues();
    });
  }
 
  // public formFields: IFormField[] = ItemsFormFields;
  public formFields!: IFormField[];
  public fornCardTitle: string = 'Dynamic Form with Dynamic Components';
  public dynFormGroup!: FormGroup;
  private itemService = inject(ItemFormFieldsService); 
  private item!: IItem;
  public isFormSubmitted: boolean = false;
 
 
  
  ngOnInit(): void {
    this.formFields = this.itemService.$formFields();
    this.initializeForm();
  }

  initializeForm(): void {
    // if (this.formFields === undefined || this.formFields.length <= 0) return;
    // console.log('>===>> FormComponent - initializeForm - formFields', this.formFields);
    const fbGroup = this.formBuilder.group({});
    this.formFields.forEach((field) => {
      // if (this.item && this.item.itemId > 0) field.initialValue = this.item[field.dataField as keyof IItem];
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

  setFormControlValues(): void {
    // console.log('>===>> FormComponent - formFields', this.formFields);
  
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



  

  onFormSubmit(event: Event): void {
    this.isFormSubmitted = true;
    console.log('onFormSubmit() - dynFormGroup', this.dynFormGroup);
  }

}

