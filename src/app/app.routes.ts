import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RequestDataComponent } from './request-data/request-data.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    // { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: '', component: HomeComponent },
    { path: 'items', component: RequestDataComponent, data: { dtToken: 'items' } },
    { path: 'categories', component: RequestDataComponent, data: { dtToken: 'categories' } },
    { path: 'about', component: AboutComponent },
];
