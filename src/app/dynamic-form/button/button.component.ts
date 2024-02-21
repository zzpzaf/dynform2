import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { IFormField } from '../../dataObjects/IFormField';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,   
    MatButton
  ],
  templateUrl: './button.component.html',
  styleUrls: ['../form/form.component.scss',
              './button.component.scss'
             ]
})
export class ButtonComponent {
  
  field!: IFormField
  fGroup: any

}
