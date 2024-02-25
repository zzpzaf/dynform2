import { Component } from '@angular/core';
import { IFormField } from '../../dataObjects/IFormField';
import { ReactiveFormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatLabel,
    MatRadioModule,
    MatButtonModule,
  ],
  templateUrl: './radio.component.html',
  styleUrls: ['../form/form.component.scss',
               './radio.component.scss'
             ]
})
export class RadioComponent {

  field!: IFormField;
  fGroup: any;

}
