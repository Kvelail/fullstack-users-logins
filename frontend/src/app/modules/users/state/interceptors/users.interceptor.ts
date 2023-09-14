import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

// services
import { UsersService } from '../services/users-service/users.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private token: string = '';

    constructor(private usersService: UsersService) {
        this.token = this.usersService.getToken();
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
