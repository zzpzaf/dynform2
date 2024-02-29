import { Injectable, inject, signal } from '@angular/core';
import { DataService } from './data.service';
import { IItem } from '../dataObjects/iitem';
import { ICategory } from '../dataObjects/icatecory';
import { IFormField, IFormOptions } from '../dataObjects/IFormField';
import { ItemsFormFields } from '../dataObjects/dbDataFormFields';
//  import { formatDate } from '@angular/common';
import { BaseFormFieldsService } from './base-form-fields.service';

// export function equalPrimitives<T>(a: T, b: T): boolean {
//   return (a === null || typeof a !== 'object') && Object.is(a, b);
// }

@Injectable({
  providedIn: 'any' 
})

export class ItemFormFieldsService extends BaseFormFieldsService{

  constructor() {
    super();
    this.itemsDataServise
    .getCategories()
    .subscribe((categories: ICategory[]) => {
      let optionsObject: { key: number, value: any }[] = [];
      categories.forEach((category: ICategory) => {
        optionsObject.push({ key: category.categoryId, value: category.categoryName });
      });
      this.setFormFieldSelectOptions('itemCategories', optionsObject);
    });
  }

  private itemsDataServise = inject(DataService); 
  override formFields: IFormField[] = ItemsFormFields;

  // public $formFields = signal< IFormField[]>(this.formFields, {equal: equalPrimitives});          // The Signal using custom equality function - equalPrimitives
  public $formFields = signal< IFormField[]>(this.formFields);                                  // The Signal with the default equality function - object.js

  public setId(itemId: number) {
    this.itemsDataServise.getItems().subscribe((items: IItem[]) => {
      const item: IItem = items.find((item: IItem) => item['itemId'] === itemId)!;
      // this.$item.update(()=>item);
      if (item) this.updateFormFieldsInitialValues(item);
    });
  }



  private updateFormFieldsInitialValues(item: IItem): void {
    this.formFields.forEach((field) => {
      const dataField = field.dataField;
      if (dataField === undefined || !item.hasOwnProperty(dataField)) return;
      if (
        field.options &&
        field.controlType === 'select' &&
        field.controlName === 'itemCategories'
      )
        field.initialValue = this.updateSelectOptions(
          field,
          item.categoryNames
        );
      if (field.options && field.inputType === 'radio')
        field.options = this.updateRadioOptions(field, item.itemStatusId);
      if (!field.options) field.initialValue = item[dataField!];
      if (field.controlType === 'datetime') field.initialValue = this.dateTimeString(item[dataField]); 
    });
    this.$formFields.set([...this.formFields]);    // Set Signal new value using spread operator
  }







}
