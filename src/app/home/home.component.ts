import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
// import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    // RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  appHeaderTitle: string = "Standalone Demo Form"
	myInfo:string = " (C) 2024 Panos Zafeiropoulos "
}
