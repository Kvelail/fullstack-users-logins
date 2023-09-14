import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

// services
import { UsersService } from '../../state/services/users-service/users.service';

@Component({
    selector: 'app-users-logins',
    templateUrl: './users-logins.component.html',
    styleUrls: ['./users-logins.component.scss'],
})
export class UsersLoginsComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();

    constructor(private usersService: UsersService) {}

    ngOnInit(): void {
        this.getAllLogins();
    }

    // get all logins - backend communication
    public getAllLogins() {
        this.usersService
            .getAllLogins()
            .pipe(takeUntil(this.destroy$))
            .subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
