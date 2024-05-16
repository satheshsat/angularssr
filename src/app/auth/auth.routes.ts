import { Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { authGuard } from '../guard/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        canActivateChild: [authGuard],
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'login'
            },
            {
                path: 'login',
                loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
            },
            {
                path: 'register',
                loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent),
            },
            {
                path: 'resetpass',
                loadComponent: () => import('./resetpass/resetpass.component').then(m => m.ResetpassComponent),
            }
        ]
    }
];