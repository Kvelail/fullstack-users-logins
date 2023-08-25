import { Injectable } from '@angular/core';

import { QueryEntity } from '@datorama/akita';

import { UsersStore, UsersState } from './users.store';

@Injectable({ providedIn: 'root' })
export class UsersQuery extends QueryEntity<UsersState> {
    public users$ = this.select('users');
    public logins$ = this.select('logins');
    public usersCount$ = this.select('usersCount');

    constructor(protected usersStore: UsersStore) {
        super(usersStore);
    }
}
