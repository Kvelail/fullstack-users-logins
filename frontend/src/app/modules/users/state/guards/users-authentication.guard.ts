import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// store
import { UsersQuery } from '../store/users.query';

@Injectable({ providedIn: 'root' })
export class UsersAuthenticationGuard {
    constructor(private router: Router, private usersQuery: UsersQuery) {}

    canActivate() {
        let token: string = '';

        this.usersQuery.usersToken$.subscribe((userToken) => {
            token = userToken;
        });

        if (token) {
            return true;
        }

        this.router.navigate(['/']);

        return false;
    }
}
