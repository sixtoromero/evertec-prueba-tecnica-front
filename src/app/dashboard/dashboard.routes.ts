import { Routes } from "@angular/router";
import { InfoPersonalComponent } from "../info-personal/info-personal.component";
import { DetalleComponent } from '../info-personal/detalle/detalle.component';

export const dashboardRoutes: Routes = [    
    { path: 'info-persona', component: InfoPersonalComponent },
    { path: 'detalle', component: DetalleComponent },
];