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
    constructor(private usersService: UsersService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const accessToken = this.usersService.getAccessToken();

        request = request.clone({
            setHeaders: {
                'Content-Type': 'application/json; charset=utf-8',
                Accept: 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return next.handle(request);
    }
}
