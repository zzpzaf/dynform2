import { Signal, WritableSignal, signal } from "@angular/core";
import { IFormField, IFormOptions } from "../dataObjects/IFormField";

export abstract class BaseFormFieldsService {
    

    constructor () {};

    protected formFields!: IFormField[];
    public abstract $formFields: WritableSignal<IFormField[]>  ; //= signal< IFormField[]>(this.formFields); 
    public abstract setId(id: number): void;
    

    protected setFormFieldSelectOptions(cotrolName: string, selOptions: { key: number, value: any }[]) {

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



      protected updateSelectOptions(
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

      protected updateRadioOptions(field: IFormField, key: any): any[] | undefined {
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
      
      protected dateTimeString(dt: Date): string {  
        // const dtStr = formatDate(dt, 'yyyy-MM-ddTHH:mm:ss.SSS', 'en-US');   // For the default native DateTime Picker
        // const dtStr = formatDate(dt, 'yyyy-MM-ddTHH:mm:ss.SSS', 'en-US')+"Z";
        const dtStr = new Date(dt).toISOString();
        return dtStr;
      }

}