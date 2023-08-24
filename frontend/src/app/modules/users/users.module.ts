// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';

// material ui modules
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

// components
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { UsersComponent } from './pages/users/users.component';
import { UsersLoginsComponent } from './pages/users-logins/users-logins.component';
import { UsersNavbarComponent } from './components/users-navbar/users-navbar.component';

@NgModule({
    declarations: [
        UserLoginComponent,
        UsersComponent,
        UsersLoginsComponent,
        UsersNavbarComponent,
    ],
    imports: [
        /* modules */
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AngularSvgIconModule.forRoot(),

        /* material ui modules */
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
    ],
    exports: [UsersNavbarComponent],
})
export class UsersModule {}
