import { NgModule } from '@angular/core';
import { ItemFormFieldsService } from '../services/item-form-fields.service';
import { FormFieldsService } from '../services/form-fields-service';
import { CategoryFormFieldsService } from '../services/category-form-fields.service';



@NgModule({
  declarations: [],
  imports: [],
  providers: [{provide: FormFieldsService, useClass: CategoryFormFieldsService}],
  exports: [],
})
export class FormFieldsModule { }
