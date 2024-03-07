import { Route, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RequestDataComponent } from './request-data/request-data.component';
import { AboutComponent } from './about/about.component';
import { DbEntities } from './dataObjects/dbDataFormFields';


const dbObjectRoutes: Routes = [];
DbEntities.forEach((dbEntity) => {
    let dbRoute: Route = { path: dbEntity.bLink, component: RequestDataComponent, data: { dtToken: dbEntity.bLink } };
    dbObjectRoutes.push(dbRoute);
});

export const routes: Routes = [

    { path: '', component: HomeComponent },
    // { path: DbEntities[0].bLink , component: RequestDataComponent, data: { dtToken: DbEntities[0].bLink } },
    // { path: DbEntities[1].bLink , component: RequestDataComponent, data: { dtToken: DbEntities[1].bLink  } },
    { path: 'about', component: AboutComponent },
    ...dbObjectRoutes
];
