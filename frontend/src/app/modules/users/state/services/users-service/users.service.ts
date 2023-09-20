import { Inject, Injectable } from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from '@angular/common/http';
import { Router } from '@angular/router';

import { EMPTY, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

// dates
import { format } from 'date-fns';

// store
import { PersistState } from '@datorama/akita';
import { UsersStore } from './../../store/users.store';
import { UsersQuery } from '../../store/users.query';

// services
import { NotificationService } from '../notification-service/notification.service';

// enums
import { RouteString } from '../../enums/route-string.enum';

// models
import { CreateUserDTO } from '../../models/dto/create-userDTO.model';
import { LoginData } from '../../models/login-data.model';
import { AuthToken } from '../../models/token.model';
import { UsersWrapperDTO } from '../../models/dto/users-wrapperDTO';
import { LoginsWrapperDTO } from '../../models/dto/logins-wrapperDTO';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    // http options
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    constructor(
        @Inject('persistStorage') private persistStorage: PersistState,
        private http: HttpClient,
        private usersStore: UsersStore,
        private usersQuery: UsersQuery,
        private router: Router,
        private notificationService: NotificationService
    ) {}

    // get paginated users
    public getPaginatedUsers(
        paginationNumber: number = 1
    ): Observable<UsersWrapperDTO> {
        // users per page
        const countNumber = 10;

        const response = this.http
            .get<UsersWrapperDTO>(
                `/api/users/paginated?paginationNumber=${paginationNumber}&countNumber=${countNumber}`
            )
            .pipe(
                tap((users) => {
                    // filter users array
                    const filteredUsers = users.users.map((user) => {
                        const formatedDate = format(
                            new Date(user.registeredDate),
                            'dd/MM/yyyy'
                        );

                        return {
                            username: user.username,
                            email: user.email,
                            registeredDate: formatedDate,
                        };
                    });

                    // update store
                    this.usersStore.update((store) => {
                        return {
                            ...store,
                            users: filteredUsers,
                            usersCount: users.usersCount,
                        };
                    });
                })
            );

        return response;
    }

    // get paginated logins
    public getPaginatedLogins(
        paginationNumber: number = 1
    ): Observable<LoginsWrapperDTO> {
        // users per page
        const countNumber = 10;

        const response = this.http
            .get<LoginsWrapperDTO>(
                `/api/users/logins/paginated?paginationNumber=${paginationNumber}&countNumber=${countNumber}`
            )
            .pipe(
                tap((logins) => {
                    // filter logins array
                    const filteredLogins = logins.logins.map((login) => {
                        const formatedDate = format(
                            new Date(login.issuedDate),
                            'dd/MM/yyyy HH:mm'
                        );

                        return {
                            username: login.user.username,
                            loginPassed: login.loginAttemptType.code,
                            attemptDate: formatedDate,
                        };
                    });

                    // update store
                    this.usersStore.update((store) => {
                        return {
                            ...store,
                            logins: filteredLogins,
                            loginsCount: logins.loginsCount,
                        };
                    });
                })
            );

        return response;
    }

    // create new user
    public createUser(user: CreateUserDTO): Observable<CreateUserDTO> {
        // filter user
        const filteredUser = {
            username: user.username,
            email: user.email,
            password: user.password,
        };

        const response = this.http
            .post<CreateUserDTO>('/api/user', filteredUser, this.httpOptions)
            .pipe(
                tap(() => {
                    // update store
                    this.usersStore.update((store) => {
                        return {
                            ...store,
                            users: [...store['users'], user],
                            usersCount: store['usersCount'] + 1,
                        };
                    });
                })
            );

        return response;
    }

    // login user
    public loginUser(loginData: LoginData): Observable<AuthToken> {
        const response = this.http
            .post<AuthToken>('/api/user/validate', loginData, this.httpOptions)
            .pipe(
                tap((token) => {
                    // update store
                    this.usersStore.update((store) => {
                        return {
                            ...store,
                            token: token.accessToken,
                        };
                    });

                    // navigate to dashboard
                    this.router.navigate([RouteString.DASHBOARD_USERS]);
                }),
                catchError((error: HttpErrorResponse) => {
                    this.notificationService.displayNotification();
                    // /*    console.log(error); */
                    // if (error.error instanceof Error) {
                    //     // A client-side or network error occurred. Handle it accordingly.
                    //     console.error(
                    //         'An error occurred:',
                    //         error.error.message
                    //     );
                    // } else {
                    //     // The backend returned an unsuccessful response code.
                    //     // The response body may contain clues as to what went wrong,
                    //     console.error(
                    //         `Backend returned code ${error.status}, body was: ${error.error}`
                    //     );
                    // }

                    return EMPTY;
                })
            );

        return response;
    }

    // logout user
    public logoutUser(): void {
        this.persistStorage.clearStore();

        this.router.navigate([RouteString.LOGIN]);
    }

    // get access token
    public getAccessToken(): string {
        let accessToken = '';

        this.usersQuery.usersToken$.subscribe((userToken: string) => {
            accessToken = userToken;
        });

        return accessToken;
    }
}
