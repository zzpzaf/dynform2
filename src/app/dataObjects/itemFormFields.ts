
import { ButtonComponent } from "../dynamic-form/button/button.component";
import { InputComponent } from "../dynamic-form/input/input.component";
import { IFormField} from "./IFormField";
import { Type } from "@angular/core";


export const dynComponents: { [key: string]: Type<any> } = {
  button: ButtonComponent,
  input: InputComponent,
};

export const ItemsFormFields: IFormField[] = [

  {
    dataField: 'itemId',
    controlType: 'input',
    controlName: 'itemId',
    fieldLabel: 'Item Id',
    inputType: 'number',
    readOnly: true,
  },
  {
    dataField: 'itemName',
    controlType: 'input',
    controlName: 'itemName',
    fieldLabel: 'Item Name',
    inputType: 'text',
  },
  {
    controlType: 'button',
    controlName: 'submitButton',
    fieldLabel: 'Submit',
    inputType: 'submit',
  },
      
      
]

