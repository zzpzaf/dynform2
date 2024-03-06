import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FormComponent } from '../dynamic-form/form/form.component';
import { FormFieldsFacroryServiceProvider } from '../services/form-fields-facrory-service-provider';
import { BaseFormFieldService } from '../services/base-form-fields.service';
import { dtTokenType } from '../dataObjects/IFormField';
import { ActivatedRoute } from '@angular/router';
import { DbEntities } from '../dataObjects/dbDataFormFields';

@Component({
  selector: 'request-data',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormComponent,
    MatInputModule,
  ],
  providers: [],
  templateUrl: './request-data.component.html',
  styleUrl: './request-data.component.scss',
})
export class RequestDataComponent {

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    ) {
      this.activatedRoute.data.subscribe(data => {
        this.dtToken = data['dtToken'];
        this.setIdNames(this.dtToken);
        this.baseService = new FormFieldsFacroryServiceProvider(this.dtToken);
      });
  
    }

  private dtToken!: dtTokenType; 
  private baseService!: FormFieldsFacroryServiceProvider;  
  // private ffService!: BaseFormFieldsService;


  requestFormGroup!: FormGroup;
  input1Label: string = 'Id';
  input1Placeholder: string = 'Input Id here';
  input1ControlNane: string = 'id';

  
  ngOnInit() {

    // this.ffService = FormFieldsFacroryServiceProvider.getFormFieldsService();

    this.initializeForm();
    this.requestFormGroup.valueChanges.subscribe(val => {
      const id = this.requestFormGroup.get(this.input1ControlNane)?.value;
      if (id == undefined || id == null || id == '' || id <= 0) return;
      // this.ffService.setId(id!);
      FormFieldsFacroryServiceProvider.getFormFieldsService().setId(id!);
    });
  }

  initializeForm(): void {
    const fbGroup = this.formBuilder.group({});
    fbGroup.addControl(this.input1ControlNane, new FormControl(''));
    this.requestFormGroup = fbGroup;
  }

  setIdNames(token: dtTokenType): void {
    let entityName: string = DbEntities.filter(entity => entity.bLink === token)[0].name;   
    this.input1Label = entityName + ' Id';
    this.input1Placeholder = 'Input ' + entityName +  ' Id here';
  }

  ngOnDestroy() {
    FormFieldsFacroryServiceProvider.destroyService();
  }

}
