import { Inject, Injectable, inject } from '@angular/core';

import { BaseFormFieldsService } from './base-form-fields.service';
import { ItemFormFieldsService } from './item-form-fields.service';
import { CategoryFormFieldsService } from './category-form-fields.service';



@Injectable({
  providedIn: 'any'
})
export class FormFieldsFacroryService {

  static ffService: BaseFormFieldsService;
  
  constructor(@Inject('dataSetName') private dataSetName: string ) {
  // constructor(dataSetName: string ) {  
    if (dataSetName === 'items') {
      FormFieldsFacroryService.ffService = inject(ItemFormFieldsService);
    } else if (dataSetName === 'categories') {
      FormFieldsFacroryService.ffService = inject(CategoryFormFieldsService);
    }
  }

  public setId(itemId: number) {
    if (FormFieldsFacroryService.ffService === undefined) {
      console.log('FormFieldsFacroryService - setId - ffService is undefined');
      return;
    }
    FormFieldsFacroryService.ffService.setId(itemId);
  }

  public static getFormFieldsService() : BaseFormFieldsService {
    return this.ffService;
  }
 


}
