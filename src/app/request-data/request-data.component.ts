import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FormComponent } from '../dynamic-form/form/form.component';
import { FormFieldsFacroryServiceProvider } from '../services/form-fields-facrory-service-provider';
import { BaseFormFieldsService } from '../services/base-form-fields.service';
import { dataSetName } from '../dataObjects/IFormField';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'request-data',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormComponent,
    MatInputModule,
    // RouterLinkActive,
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
        // console.log('RequestDataComponent - this.dtToken', this.dtToken);
        this.setIdNames(this.dtToken);
        this.baseService = new FormFieldsFacroryServiceProvider(this.dtToken);
      });
  
    }

  // private baseService = inject(FormFieldsFacroryService); 
  private dtToken!: dataSetName; //= 'categories';
  private baseService: any;  //= new FormFieldsFacroryServiceProvider(this.dtToken); 
  private ffService!: BaseFormFieldsService;


  requestFormGroup!: FormGroup;
  input1Label: string = 'Item Id';
  input1Placeholder: string = 'Input Id here';
  input1ControlNane: string = 'id';
  // submitButtomText: string = 'Get it';
  
  ngOnInit() {

    // this.activatedRoute.data.subscribe(data => {
    //   this.dtToken = data['dtToken'];
    //   console.log('RequestDataComponent - this.dtToken', this.dtToken);
    //   this.baseService = new FormFieldsFacroryServiceProvider(this.dtToken);
    // });


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

  setIdNames(token: dataSetName): void {
    let entityName: string = '';
    switch ( token ) {
      case 'categories':
          entityName = 'Category';
          break;
      case 'items':
          entityName = 'Item';
          break;
      default: 
          // 
          break;
   }
   this.input1Label = entityName + ' Id';
   this.input1Placeholder = 'Input ' + entityName +  ' Id here';

  }



}
