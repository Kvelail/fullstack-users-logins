import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

// store
import { UsersQuery } from '../store/users.query';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private token: string = '';

    constructor(private usersQuery: UsersQuery) {
        this.usersQuery.usersToken$.subscribe((userToken) => {
            this.token = userToken;
        });
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                'Content-Type': 'application/json; charset=utf-8',
                Accept: 'application/json',
                Authorization: `Bearer ${this.token}`,
            },
        });

        return next.handle(req);
    }
}
