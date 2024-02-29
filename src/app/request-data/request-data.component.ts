import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FormComponent } from '../dynamic-form/form/form.component';
import { FormFieldsFacroryServiceProvider } from '../services/form-fields-facrory-service-provider';
import { BaseFormFieldsService } from '../services/base-form-fields.service';
import { dataSetName } from '../dataObjects/IFormField';

@Component({
  selector: 'request-data',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormComponent,
    MatInputModule,
  ],
  // providers: [
  //   { provide: 'dataSetName', useValue: 'items' },
  //   FormFieldsFacroryService
  // ],
  templateUrl: './request-data.component.html',
  styleUrl: './request-data.component.scss',
})
export class RequestDataComponent {

  constructor(private formBuilder: FormBuilder,) {}

  // private baseService = inject(FormFieldsFacroryService); 
  private dtToken: dataSetName = 'items';
  private baseService = new FormFieldsFacroryServiceProvider(this.dtToken); 
  private ffService!: BaseFormFieldsService;


  requestFormGroup!: FormGroup;
  input1Label: string = 'Item Id';
  input1Placeholder: string = 'Input Id here';
  input1ControlNane: string = 'itemId';
  submitButtomText: string = 'Get it';
  
  ngOnInit() {
    this.ffService = FormFieldsFacroryServiceProvider.getFormFieldsService();
    this.initializeForm();
    this.requestFormGroup.valueChanges.subscribe(val => {
      const id = this.requestFormGroup.get(this.input1ControlNane)?.value;
      if (id == undefined || id == null || id == '' || id <= 0) return;
      // console.log('>===>> RequestDataComponent - id', id);
      this.ffService.setId(id!);
    });
  }

  initializeForm(): void {
    const fbGroup = this.formBuilder.group({});
    fbGroup.addControl(this.input1ControlNane, new FormControl(''));
    this.requestFormGroup = fbGroup;
  }

}
