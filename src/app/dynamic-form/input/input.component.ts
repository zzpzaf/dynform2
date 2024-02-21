import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IFormField } from '../../dataObjects/IFormField';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './input.component.html',
  styleUrls: ['../form/form.component.scss',
              './input.component.scss'
             ]
})
export class InputComponent {

  field!: IFormField;
  fGroup: any;

}
