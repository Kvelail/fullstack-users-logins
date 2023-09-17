import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// services
import { UsersService } from '../services/users-service/users.service';

@Injectable({ providedIn: 'root' })
export class UsersAuthenticationGuard {
    constructor(private router: Router, private usersService: UsersService) {}

    canActivate() {
        const token = this.usersService.getAccessToken();

        if (token) {
            return true;
        }

        this.router.navigate(['/']);

        return false;
    }
}
