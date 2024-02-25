import { Component } from '@angular/core';
import { IFormField } from '../../dataObjects/IFormField';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-datetime',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './datetime.component.html',
  styleUrls: ['../form/form.component.scss',
              './datetime.component.scss'
  ]
})
export class DatetimeComponent {
  
  field!: IFormField;
  fGroup: any;

}
