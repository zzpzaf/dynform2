
import { Validators } from "@angular/forms";
import { ButtonComponent } from "../dynamic-form/button/button.component";
import { InputComponent } from "../dynamic-form/input/input.component";
import { IFormField, dynControlType} from "./IFormField";
import { Type } from "@angular/core";
import { CheckboxComponent } from "../dynamic-form/checkbox/checkbox.component";
import { DatetimeComponent } from "../dynamic-form/datetime/datetime.component";
import { RadioComponent } from "../dynamic-form/radio/radio.component";
import { SelectComponent } from "../dynamic-form/select/select.component";


// export const dynComponents: { [key: string]: Type<any> } = {
export const dynComponents: { [type in dynControlType]?: any } = {
  button: ButtonComponent,
  input: InputComponent,
  select: SelectComponent,
  radio: RadioComponent,
  datetime: DatetimeComponent,
  checkbox: CheckboxComponent,  
};

export const ItemsFormFields: IFormField[] = [

  {
    dataField: 'itemId',
    controlType: 'input',
    controlName: 'itemId',
    fieldLabel: 'Item Id:',
    inputType: 'number',
    readOnly: true,

  },
  {
    dataField: 'itemName',
    controlType: 'input',
    controlName: 'itemName',
    fieldLabel: 'Item Name:',
    inputType: 'text',
    validators: [
      {validatorName: 'required', validator: Validators.required, validatorErrorMessage: 'The Item Name field is required.'},
      {validatorName: 'minlength', validator: Validators.minLength(2), validatorErrorMessage: 'The Item Name field  must be at least 2 characters long.'},
    ],
  },
  {
    dataField: 'itemDescription',
    controlType: 'input',
    controlName: 'itemDescription',
    fieldLabel: 'Item Description:',
    inputType: 'text',
    // initialValue: '',
  },
  {
    dataField: 'itemModelYear',
    controlType: 'input',
    controlName: 'itemModelYear',
    fieldLabel: 'Model Year:',
    inputType: 'number',
    minValue: 2005,
    maxValue: 2030,
    validators: [
      {validatorName: 'required', validator: Validators.required, validatorErrorMessage: 'The Model Year field is required.'},
      {validatorName: 'min', validator: Validators.min(2005), validatorErrorMessage: 'The Model Year field must be at least 2005.'},
      {validatorName: 'max', validator: Validators.max(2030), validatorErrorMessage: 'The Model Year field must be no more than 2030.'},
    ],
  },
  {
    dataField: 'itemCrTimestamp',
    controlType: 'datetime',
    controlName: 'itemCreatedTimestamp',
    fieldLabel: 'Date/Time: ',
    inputType: 'datetime-local',
  },
  {
    dataField: 'categoryNames',
    controlType: 'select',
    controlName: 'itemCategories',
    fieldLabel: 'Categories:',
    inputType: 'number',
    options: [],
    multipleOptions: true,
    optionsSize: 6,
    promptText: 'Select at least one',
  },
  {
    dataField: 'itemStatusId',
    controlType: 'radio',
    controlName: 'itemStatus',
    fieldLabel: 'Item Status:',
    inputType: 'radio',
    options: [
      {optionKey: 1, optionValue: 'Active'},
      {optionKey: 2, optionValue: 'Canceled'},
      {optionKey: 3, optionValue: 'Pending', isOptionSelected: true},
    ],
  },
  {
    dataField: 'isItemEnabled',
    controlType: 'checkbox',
    controlName: 'isItemEnabled',
    fieldLabel: 'Enabled:',
    inputType: 'checkbox',
    initialValue: true,
  },
  {
    controlType: 'button',
    controlName: 'submitButton',
    fieldLabel: 'Submit:',
    inputType: 'submit',
  },


      
      
]

