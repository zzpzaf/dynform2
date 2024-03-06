import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
// import { BaseFormFieldsService } from '../services/base-form-fields.service';
// import { FormFieldsFacroryServiceProvider } from '../services/form-fields-facrory-service-provider';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    MatCardModule,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  // constructor() {  
  //   this.ffService = FormFieldsFacroryServiceProvider.getFormFieldsService();
  // }

  // ngOnInit(): void {
  //   console.log('>===>> AboutComponent - ffService', typeof(this.ffService), ' - ',this.ffService);
  //   if (this.ffService !== undefined) {
  //     console.log('>===>> AboutComponent - ffService.$formFields()', this.ffService.$formFields());
  //   }
    
  // }

  // private ffService!: BaseFormFieldsService;
  


}
