


export type dynControlType =
  | 'button'
  | 'input'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'datetime';

export type standardInputType =
  | 'color'
  | 'checkbox'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'search'
  | 'tel'
  | 'text'
  | 'submit'
  | 'time'
  | 'url'
  | 'week';

export interface IFormFieldValidator {
  [key: string]: any;
  validatorName: string; // e.g.: 'required', 'minLength', 'maxLength', 'pattern', 'email', 'min', 'max'
  validator: any; // e.g.: Validators.required, Validators.minLength(2), Validators.maxLength(10), Validators.pattern('^[a-zA-Z]+$'), Validators.email, Validators.min(1), Validators.max(100)
  validatorErrorMessage: string; // e.g.: 'This field is required', 'This field must be at least 2 characters long', 'This field must be no more than 10 characters long', 'This field must contain only letters', 'This field must be a valid email address', 'This field must be at least 1', 'This field must be no more than 100'
}

export interface IFormOptions {
  [key: string]: any;
  optionKey: number | string;
  optionValue: any;
  order?: number;
  isOptionSelected?: boolean;
}

export interface IFormField {
  [key: string]: any;
  dataField?: string;
  controlName: string;
  controlType: dynControlType;
  fieldLabel: string;
  inputType?: standardInputType;
  readOnly?: boolean;
  disabled?: boolean,
  initialValue?: any | any[];
  options?: IFormOptions[];
  multipleOptions?: boolean;
  promptText?: string;
  optionsSize?: number;
  minValue?: number;
  maxValue?: number;
  stepValue?: number;
  validators?: IFormFieldValidator[];
}
