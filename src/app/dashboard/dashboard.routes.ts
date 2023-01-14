import { Routes } from "@angular/router";
import { EstadisticaComponent } from '../info-personal/estadistica/estadistica.component';
import { InfoPersonalComponent } from "../info-personal/info-personal.component";
import { DetalleComponent } from '../info-personal/detalle/detalle.component';

export const dashboardRoutes: Routes = [
    { path: '', component: EstadisticaComponent },
    { path: 'info-persona', component: InfoPersonalComponent },
    { path: 'detalle', component: DetalleComponent },
];