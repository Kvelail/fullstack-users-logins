import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { UserLoginComponent } from './modules/users/pages/user-login/user-login.component';
import { UsersComponent } from './modules/users/pages/users/users.component';
import { UsersLoginsComponent } from './modules/users/pages/users-logins/users-logins.component';

const routes: Routes = [
    {
        path: '',
        component: UserLoginComponent,
    },
    {
        path: 'dashboard/users',
        component: UsersComponent,
    },
    {
        path: 'dashboard/logins',
        component: UsersLoginsComponent,
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
