import { Component } from '@angular/core';
import { IFormField } from '../../dataObjects/IFormField';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,

  ],
  templateUrl: './select.component.html',
  styleUrls: ['../form/form.component.scss',
              './select.component.scss'
             ]
})
export class SelectComponent {

  field!: IFormField;
  fGroup: any;

}
