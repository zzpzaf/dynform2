

export interface IFormField {
  [key: string]: any;
  dataField?: string;
  controlName: string;
  controlType: string;
  fieldLabel: string;
  inputType?: string;
  initialValue?: any | any[];
  readOnly?: boolean;
}
