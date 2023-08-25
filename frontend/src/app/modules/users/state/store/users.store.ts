import { Injectable } from '@angular/core';

import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

import { IUsersStore } from '../models/users-store.model';

export interface UsersState extends EntityState<IUsersStore> {}

export const initialState = (): UsersState => {
    return {
        users: null,
        logins: null,
        usersCount: null,
        token: null,
    };
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'users' })
export class UsersStore extends EntityStore<UsersState> {
    constructor() {
        super(initialState());
    }
}
