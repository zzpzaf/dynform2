import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { HomeComponent } from "./home/home.component";
import { FormComponent } from "./dynamic-form/form/form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    // HomeComponent,
    FormComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dynform2';
}
