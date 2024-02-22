import { Component, inject, } from '@angular/core';
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
import { ItemFormFieldsService } from '../../services/item-form-fields.service';
import { IItem } from '../../dataObjects/iitem';
import { Subscription } from 'rxjs';



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

  constructor( private formBuilder: FormBuilder ) { }
 
  public formFields: IFormField[] = ItemsFormFields;
  public fornCardTitle: string = 'Dynamic Form with Dynamic Components';
  public dynFormGroup!: FormGroup;
  private itemService = inject(ItemFormFieldsService); 
  private item$!: Subscription;
  private item!: IItem;

 
  
  ngOnInit(): void {
      this.initializeForm();

      this.item$ = this.itemService.getItem().subscribe({
        next: (item: IItem) => {
         this.item = item;
          // console.log('<===>> Item:', this.item);
          this.setFormControlValues();
        },
        error: (error ) => {
          console.log('Error:', error);
        },
      });
  }

  initializeForm(): void {
    const fbGroup = this.formBuilder.group({});
    
    this.formFields.forEach((field) => {
      if (this.item && this.item.itemId > 0) field.initialValue = this.item[field.dataField as keyof IItem];
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
    if (this.dynFormGroup === undefined) {
      this.initializeForm();
    }
    for (let control in this.dynFormGroup.controls) {
      this.formFields.forEach((field) => {
        if (this.item && this.item.itemId > 0) field.initialValue = this.item[field.dataField as keyof IItem];
        if (field.controlName === control) {
          this.dynFormGroup.controls[control].patchValue(field.initialValue);
        }
      });
    }
  }

  onFormSubmit(event: Event): void {
    console.log('Form Submitted', this.dynFormGroup.value);
  }


  ngOnDestroy() {
    this.unSubscribe();
  }

  unSubscribe() {
    if (!!this.item$)
      this.item$.unsubscribe();
  }

}
