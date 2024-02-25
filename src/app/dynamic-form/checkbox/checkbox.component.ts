import { Component } from '@angular/core';
import { IFormField } from '../../dataObjects/IFormField';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLabel } from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatLabel,
    MatCheckboxModule,
  ],
  templateUrl: './checkbox.component.html',
  styleUrls: ['../form/form.component.scss',
             './checkbox.component.scss'
             ]
})
export class CheckboxComponent {

  field!: IFormField;
  fGroup: any;
  
}
