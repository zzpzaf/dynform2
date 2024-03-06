import { ComponentRef, Directive, ViewContainerRef, effect, input } from '@angular/core';
import { DynComponents } from '../dataObjects/dbDataFormFields';
import { IFormField } from '../dataObjects/IFormField';

@Directive({
  selector: '[applyFormControl]',
  standalone: true,
})
export class ApplyFormControlDirective {

  formField = input.required<IFormField>();
  formGroup = input.required<any>();

  private componentRef!: ComponentRef<any>;

  constructor(private viewContainerRef: ViewContainerRef) {
    effect(() => {
      const controlType = this.formField().controlType;
      if (controlType) {
        const component = DynComponents[controlType];
        this.componentRef = this.viewContainerRef.createComponent(component);
        this.componentRef.instance.field = this.formField();
        this.componentRef.instance.fGroup = this.formGroup();    
      }
    });
  }

}
