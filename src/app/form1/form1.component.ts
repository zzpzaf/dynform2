import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-form1',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './form1.component.html',
  styleUrl: './form1.component.scss'
})
export class Form1Component {

  fornCardTitle: string = 'My Demo Form';
  demoFormGroup!: FormGroup;

  input1Label: string = 'Input some text';
  input1Placeholder: string = 'Type some text here';
  input1ControlNane: string = 'input1';

  submitButtomText: string = 'Submit';

  constructor( private formBuilder: FormBuilder ) { }

  
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    const fbGroup = this.formBuilder.group({});

    fbGroup.addControl(this.input1ControlNane, new FormControl(""));
    // Add more controls here

    this.demoFormGroup = fbGroup;
  }

  onFormSubmit(event: Event): void {
    console.log('Form Submitted', this.demoFormGroup.value);
  }


}
