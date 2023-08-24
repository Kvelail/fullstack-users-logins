// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouterModule } from '@angular/router';

// material ui modules
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

// components
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { UsersComponent } from './pages/users/users.component';
import { UsersLoginsComponent } from './pages/users-logins/users-logins.component';
import { UsersNavbarComponent } from './components/users-navbar/users-navbar.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersFilterComponent } from './components/users-filter/users-filter.component';

@NgModule({
    declarations: [
        UserLoginComponent,
        UsersComponent,
        UsersLoginsComponent,
        UsersNavbarComponent,
        UsersListComponent,
        UsersFilterComponent,
    ],
    imports: [
        /* modules */
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AngularSvgIconModule.forRoot(),
        RouterModule,

        /* material ui modules */
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatTableModule,
        MatSortModule,
    ],
    exports: [UsersNavbarComponent],
})
export class UsersModule {}
