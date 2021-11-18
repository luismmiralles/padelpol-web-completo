import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authRoutes } from './auth-routes';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';

const routes: Routes = [
  { path: authRoutes.registerPage, component: RegisterPageComponent },
  { path: authRoutes.loginPage, component: LoginPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
