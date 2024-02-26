import { Injectable, inject, signal } from '@angular/core';
import { DataService } from './data.service';
import { IItem } from '../dataObjects/iitem';
import { ICategory } from '../dataObjects/icatecory';
import { IFormField, IFormOptions } from '../dataObjects/IFormField';
import { ItemsFormFields } from '../dataObjects/itemFormFields';
import { formatDate } from '@angular/common';


// export function equalPrimitives<T>(a: T, b: T): boolean {
//   return (a === null || typeof a !== 'object') && Object.is(a, b);
// }

@Injectable({
  providedIn: 'root'
})
export class ItemFormFieldsService {

  constructor() {
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
  private formFields: IFormField[] = ItemsFormFields;

  // public $formFields = signal< IFormField[]>(this.formFields, {equal: equalPrimitives});          // The Signal using custom equality function - equalPrimitives
  public $formFields = signal< IFormField[]>(this.formFields);                                  // The Signal with the default equality function - object.js

  public setItemId(itemId: number) {
    this.itemsDataServise.getItems().subscribe((items: IItem[]) => {
      const item: IItem = items.find((item: IItem) => item['itemId'] === itemId)!;
      // this.$item.update(()=>item);
      if (item) this.updateFormFieldsInitialValues(item);
    });
  }

  private setFormFieldSelectOptions(cotrolName: string, selOptions: { key: number, value: any }[]) {

    if (selOptions.length <= 0) return;
    const ff: IFormField =  this.formFields.find(
      (field) =>
        field.controlName === cotrolName && field.controlType === 'select'
    )!;
    if (ff === undefined || ff === null ) return;

    let ffoptions: IFormOptions[] = [];
    selOptions.forEach((selOption: { key: number, value: any }) => {
      ffoptions.push({
        optionKey: selOption.key,
        optionValue: selOption.value,
      });
    });
    ff.options = ffoptions;
    this.$formFields.set([...this.formFields]);     // Set Signal new value
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


  private updateSelectOptions(
    field: IFormField,
    selectedValues: string[]
  ): any[] {
    let initValKeys: any[] = [];
    selectedValues.forEach((val: string) => {
      field.options!.forEach((option: IFormOptions) => {
        if (option.optionValue === val) {
          option.isOptionSelected = true;
          initValKeys.push(option.optionKey);
        }
      });
    });
    return initValKeys;
  }

  private updateRadioOptions(field: IFormField, key: any): any[] | undefined {
    field.options!.forEach((option: IFormOptions) => {
      if (option.optionKey === key) {
        option.isOptionSelected = true; 
        field.initialValue = option.optionKey;
      } else { 
        option.isOptionSelected = false;
      }
    });
    return field.options;
  }

  private dateTimeString(dt: Date): string {  
    // const dtStr = formatDate(dt, 'yyyy-MM-ddTHH:mm:ss.SSS', 'en-US');   // For the default native DateTime Picker
    // const dtStr = formatDate(dt, 'yyyy-MM-ddTHH:mm:ss.SSS', 'en-US')+"Z";
    const dtStr = new Date(dt).toISOString();
    return dtStr;
  }
}
