import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './assets/index/index.component';

const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/index'
  },
  {
    path: 'security',
    loadChildren: () => import('./modulos/seguridad/seguridad.module').then(m => m.SeguridadModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./modulos/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'route',
    loadChildren: () => import('./modulos/route/route.module').then(m => m.RouteModule)
  },
  {
    path: 'flight',
    loadChildren: () => import('./modulos/flight/flight.module').then(m => m.FlightModule)
  },
  {
    path: 'airport',
    loadChildren: () => import('./modulos/airport/airport.module').then(m => m.AirportModule)
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
