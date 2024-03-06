import { Inject, Injectable, inject } from '@angular/core';

import { BaseFormFieldService } from './base-form-fields.service';
import { ItemFormFieldsService } from './item-form-fields.service';
import { CategoryFormFieldsService } from './category-form-fields.service';

export class FormFieldsFacroryServiceProvider {

  static ffService: BaseFormFieldService | null = null;
  
  constructor(dtTokenType: string ) {  

    switch ( dtTokenType ) {
      case 'items':
        FormFieldsFacroryServiceProvider.ffService = inject(ItemFormFieldsService);
        break;
      case 'categories':
        FormFieldsFacroryServiceProvider.ffService = inject(CategoryFormFieldsService);
        break;
      default:
        FormFieldsFacroryServiceProvider.destroyService();
        console.log('FormFieldsFacroryService - constructor - dtTokenType is not valid');
        break;
    }

  }

  public setId(itemId: number) {
    if (FormFieldsFacroryServiceProvider.ffService === undefined) {
      console.log('FormFieldsFacroryService - setId - ffService is undefined');
      return;
    }
    FormFieldsFacroryServiceProvider.ffService!.setId(itemId);
  }

  public static getFormFieldsService() : BaseFormFieldService {
    return this.ffService!;
  }
 
  public static destroyService() {
    this.ffService = null;
  }


}
