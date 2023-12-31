// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouterModule } from '@angular/router';

import { DateFnsModule } from 'ngx-date-fns';

// interceptors
import { AuthInterceptor } from './state/interceptors/users.interceptor';

// directives
import { UsersTrimInputDirective } from './state/directives/users-trim-input.directive';

// material ui modules
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

// sweet alert
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// components
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { UsersComponent } from './pages/users/users.component';
import { UsersLoginsComponent } from './pages/users-logins/users-logins.component';
import { UsersNavbarComponent } from './components/users-navbar/users-navbar.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersFilterComponent } from './components/users-filter/users-filter.component';
import { UsersPaginationComponent } from './components/users-pagination/users-pagination.component';
import { UsersAddComponent } from './components/users-add/users-add.component';
import { UsersSubmitBtnComponent } from './components/users-submit-btn/users-submit-btn.component';
import { LoginsListComponent } from './components/logins-list/logins-list.component';
import { UsersAuthBtnComponent } from './components/users-auth-btn/users-auth-btn.component';
import { UsersLoadingSpinnerComponent } from './components/users-loading-spinner/users-loading-spinner.component';

@NgModule({
    declarations: [
        // components
        UserLoginComponent,
        UsersComponent,
        UsersLoginsComponent,
        UsersNavbarComponent,
        UsersListComponent,
        UsersFilterComponent,
        UsersPaginationComponent,
        UsersAddComponent,
        UsersSubmitBtnComponent,
        LoginsListComponent,
        UsersAuthBtnComponent,
        UsersLoadingSpinnerComponent,

        // directives
        UsersTrimInputDirective,
    ],
    imports: [
        /* modules */
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AngularSvgIconModule.forRoot(),
        RouterModule,

        DateFnsModule.forRoot(),

        /* material ui modules */
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatDialogModule,
        MatTooltipModule,

        // sweet alert
        SweetAlert2Module.forRoot(),
    ],
    exports: [UsersNavbarComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
})
export class UsersModule {}
