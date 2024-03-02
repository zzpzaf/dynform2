import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DbEntities } from '../dataObjects/dbDataFormFields';
import {MatButtonToggleModule} from '@angular/material/button-toggle'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink, 
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  appHeaderTitle: string = "Standalone Dynamic Form Demo"
	myInfo:string = " (C) 2024 Panos Zafeiropoulos "

  dboButtons = DbEntities;


}
