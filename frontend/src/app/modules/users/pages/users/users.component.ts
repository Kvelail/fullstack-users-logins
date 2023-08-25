import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

// services
import { UsersService } from '../../state/services/users.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();

    constructor(private usersService: UsersService) {}

    ngOnInit(): void {
        this.getAllUsers();
    }

    // get all users - backend communication
    public getAllUsers(): void {
        this.usersService
            .getAllUsers()
            .pipe(takeUntil(this.destroy$))
            .subscribe();

        this.usersService
            .getPaginatedUsers()
            .pipe(takeUntil(this.destroy$))
            .subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
