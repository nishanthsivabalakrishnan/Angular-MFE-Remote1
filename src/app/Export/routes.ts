import { Routes } from '@angular/router';
import { LoginComponent } from '../Views/login/login.component';
import { NotFoundComponent } from '../Views/not-found/not-found.component';
import { RegisterComponent } from '../Views/register/register.component';
import { ResetPasswordComponent } from '../Views/reset-password/reset-password.component';

export const Export_Routes: Routes = [
    {
      path: 'login',
      component : LoginComponent
    },
    {
      path: 'register',
      component : RegisterComponent
    },
    {
      path: 'welcome',
      component : ResetPasswordComponent
    },
    {
      path: '**',
      component: NotFoundComponent
    }
];