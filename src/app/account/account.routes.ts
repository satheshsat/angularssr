import { Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { accountGuard } from '../guard/account.guard';

export const routes: Routes = [
    {
        path: '',
        component: AccountComponent,
        canActivateChild: [accountGuard],
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'profile'
            },
            {
                path: 'profile',
                loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent),
            },
        ]
    }
];