import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { UserLoginComponent } from './modules/users/pages/user-login/user-login.component';
import { UsersComponent } from './modules/users/pages/users/users.component';
import { UsersLoginsComponent } from './modules/users/pages/users-logins/users-logins.component';

// guards
import { UsersAuthenticationGuard } from './modules/users/state/guards/users-authentication.guard';

const routes: Routes = [
    {
        path: '',
        component: UserLoginComponent,
    },
    {
        path: 'dashboard/users',
        component: UsersComponent,
        canActivate: [UsersAuthenticationGuard],
    },
    {
        path: 'dashboard/logins',
        component: UsersLoginsComponent,
        canActivate: [UsersAuthenticationGuard],
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
