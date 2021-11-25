import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouteRoutingModule } from './route-routing.module';
import { GetComponent } from './get/get.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    GetComponent,
    CreateComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    RouteRoutingModule
  ]
})
export class RouteModule { }
