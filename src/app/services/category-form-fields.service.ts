import { Injectable, inject, signal } from "@angular/core";
import { BaseFormFieldService } from "./base-form-fields.service";
import { IFormField } from "../dataObjects/IFormField";
import { CategoryFormFields } from "../dataObjects/dbDataFormFields";
import { DataService } from "./data.service";
import { ICategory } from "../dataObjects/icatecory";

@Injectable({
    providedIn: 'any' 
  })
  
export class CategoryFormFieldsService extends BaseFormFieldService{

constructor () {
    super();
  }

  private categoriesDataServise = inject(DataService); 
  override formFields: IFormField[] = CategoryFormFields;
  public $formFields = signal< IFormField[]>(this.formFields); 
  
  public setId(categoryId: number) {
    this.categoriesDataServise.getCategories().subscribe((categories: ICategory[]) => {
        const category: ICategory = categories.find((category: ICategory) => category['categoryId'] === categoryId)!;
        if (category) this.updateFormFieldsInitialValues(category);
      });
  }


  private updateFormFieldsInitialValues(category: ICategory): void {
    this.formFields.forEach((field) => {
      const dataField = field.dataField;
      if (dataField === undefined || !category.hasOwnProperty(dataField)) return;
      if (!field.options) field.initialValue = category[dataField!]; 
    });
    this.$formFields.set([...this.formFields]);    // Set Signal new value using spread operator
  }










}