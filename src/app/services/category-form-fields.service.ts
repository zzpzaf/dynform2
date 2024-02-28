import { Injectable, inject, signal } from "@angular/core";
import { FormFieldsService } from "./form-fields-service";
import { IFormField } from "../dataObjects/IFormField";
import { CategoriesFormFields } from "../dataObjects/dbDataFormFields";
import { DataService } from "./data.service";
import { ICategory } from "../dataObjects/icatecory";




@Injectable({
    providedIn: 'any' 
  })
  
export class CategoryFormFieldsService extends FormFieldsService{

constructor () {
    super();
    // this.itemsDataServise
    // .getCategories()
    // .subscribe((categories: ICategory[]) => {
    //   let optionsObject: { key: number, value: any }[] = [];
    //   categories.forEach((category: ICategory) => {
    //     optionsObject.push({ key: category.categoryId, value: category.categoryName });
    //   });
    //   this.setFormFieldSelectOptions('itemCategories', optionsObject);
    // });
  }

  private categoriesDataServise = inject(DataService); 
  override formFields: IFormField[] = CategoriesFormFields;
  public $formFields = signal< IFormField[]>(this.formFields); 
  
  public setId(categoryId: number) {
    this.categoriesDataServise.getCategories().subscribe((categories: ICategory[]) => {
        const category: ICategory = categories.find((category: ICategory) => category['categoryId'] === categoryId)!;
        // this.$item.update(()=>item);
        if (category) this.updateFormFieldsInitialValues(category);
      });
  }


  private updateFormFieldsInitialValues(category: ICategory): void {
    this.formFields.forEach((field) => {
      const dataField = field.dataField;
      if (dataField === undefined || !category.hasOwnProperty(dataField)) return;
    //   if (
    //     field.options &&
    //     field.controlType === 'select' &&
    //     field.controlName === 'itemCategories'
    //   )
    //     field.initialValue = this.updateSelectOptions(
    //       field,
    //       item.categoryNames
    //     );
    //   if (field.options && field.inputType === 'radio')
    //     field.options = this.updateRadioOptions(field, item.itemStatusId);
      if (!field.options) field.initialValue = category[dataField!];
    //   if (field.controlType === 'datetime') field.initialValue = this.dateTimeString(item[dataField]); 
    });
    this.$formFields.set([...this.formFields]);    // Set Signal new value using spread operator
  }










}