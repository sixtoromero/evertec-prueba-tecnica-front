import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboardRoutes } from './dashboard/dashboard.routes';

const routes: Routes = [  
  { 
    path: '', 
    component: DashboardComponent,
    children: dashboardRoutes
  },
  { path:'*', redirectTo: '/info-persona' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }