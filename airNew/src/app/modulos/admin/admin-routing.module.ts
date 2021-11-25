import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './users/create/create.component';
import { EditComponent } from './users/edit/edit.component';
import { GetComponent } from './users/get/get.component';

const routes: Routes = [
  {
    path: "create",
    component: CreateComponent
  },
  {
    path: "edit",
    component: EditComponent
  },
  {
    path: "get",
    component: GetComponent
  },
  {
    path:"",
    redirectTo:"get"
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
