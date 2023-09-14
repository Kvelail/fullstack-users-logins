import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// dates
import { format } from 'date-fns';

// store
import { PersistState } from '@datorama/akita';
import { UsersStore } from './../../store/users.store';
import { UsersQuery } from '../../store/users.query';

// enums
import { RouteString } from '../../enums/route-string.enum';

// models
import { UserDTO } from '../../models/dto/userDTO.model';
import { CreateUserDTO } from '../../models/dto/create-userDTO.model';
import { LoginsDTO } from '../../models/dto/loginsDTO.model';
import { LoginData } from '../../models/login-data.model';
import { AuthToken } from '../../models/token.model';

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
        private router: Router
    ) {}

    // get all users
    public getAllUsers(): Observable<UserDTO[]> {
        const response = this.http.get<UserDTO[]>('/api/users').pipe(
            tap((users) => {
                // update store
                this.usersStore.update((store) => {
                    return {
                        ...store,
                        usersCount: users.length - 1,
                    };
                });
            })
        );

        return response;
    }

    // get paginated users
    public getPaginatedUsers(
        paginationNumber: number = 1
    ): Observable<UserDTO[]> {
        // users per page
        const countNumber = 10;

        const response = this.http
            .get<UserDTO[]>(
                `/api/users/paginated?paginationNumber=${paginationNumber}&countNumber=${countNumber}`
            )
            .pipe(
                tap((users) => {
                    // filter users array
                    const filteredUsers = users.map((user) => {
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
                        };
                    });
                })
            );

        return response;
    }

    // get all logins
    public getAllLogins(): Observable<LoginsDTO[]> {
        const response = this.http.get<LoginsDTO[]>('/api/users/logins').pipe(
            tap((logins) => {
                // filter logins array
                const filteredLogins = logins
                    .map((login) => {
                        const formatedDate = format(
                            new Date(login.issuedDate),
                            'dd/MM/yyyy HH:mm'
                        );

                        return {
                            username: login.user.username,
                            loginPassed: login.loginAttemptType.code,
                            attemptDate: formatedDate,
                        };
                    })
                    .reverse();

                // update store
                this.usersStore.update((store) => {
                    return {
                        ...store,
                        logins: filteredLogins,
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
                })
            );

        return response;
    }

    // logout user
    public logoutUser(): void {
        this.persistStorage.clearStore();

        this.router.navigate([RouteString.LOGIN]);
    }

    // get token
    public getToken(): string {
        let token = '';

        this.usersQuery.usersToken$.subscribe((userToken: string) => {
            token = userToken;
        });

        return token;
    }
}
