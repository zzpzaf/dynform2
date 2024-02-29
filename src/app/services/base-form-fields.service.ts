import { Signal, WritableSignal, signal } from "@angular/core";
import { IFormField } from "../dataObjects/IFormField";

export abstract class BaseFormFieldsService {
    

    constructor () {};

    protected formFields!: IFormField[];
    public abstract $formFields: Signal<IFormField[]>  ; //= signal< IFormField[]>(this.formFields); 
    public abstract setId(id: number): void;
    

}