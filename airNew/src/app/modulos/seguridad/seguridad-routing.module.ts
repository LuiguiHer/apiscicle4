import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {
    path: "change-password",
    component: ChangePasswordComponent
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: "logout",
    component: LogoutComponent,
  },{
    path: '',
    redirectTo: 'login'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
