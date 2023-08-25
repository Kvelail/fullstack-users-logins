import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject, takeUntil } from 'rxjs';

// dates
import { format } from 'date-fns';

// validations
import {
    emailValidation,
    passwordValidation,
} from '../../state/validations/input.validations';

// enum
import { ConstantString } from '../../state/enums/constant-string.enum';

// services
import { UsersService } from '../../state/services/users.service';

// store
import { UsersStore } from '../../state/store/users.store';

@Component({
    selector: 'app-users-add',
    templateUrl: './users-add.component.html',
    styleUrls: ['./users-add.component.scss'],
})
export class UsersAddComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();

    // form
    public addUserForm!: FormGroup;
    public hidePassword: boolean = true;

    constructor(
        private formBuilder: FormBuilder,
        private usersService: UsersService,
        private usersStore: UsersStore
    ) {}

    ngOnInit(): void {
        this.createForm();
    }

    // create form
    private createForm(): void {
        this.addUserForm = this.formBuilder.group({
            username: [null, [Validators.required]],
            email: [null, [Validators.required, ...emailValidation]],
            password: [null, [Validators.required, ...passwordValidation]],
        });
    }

    // switch hide password
    public switchHidePassword(): void {
        this.hidePassword = !this.hidePassword;
    }

    // create user - backend communication
    public handleAddUserClick(): void {
        const addUserForm = this.addUserForm;

        if (addUserForm.invalid) {
            return;
        }

        // create new user
        const addUserFormValue = addUserForm.value;
        const formatedDate = format(new Date(), 'MM/dd/yyyy');
        const newUser = {
            username: addUserFormValue.username,
            email: addUserFormValue.email,
            password: addUserFormValue.password,
            registeredDate: formatedDate,
        };

        // add user
        this.usersService
            .createUser(newUser)
            .pipe(takeUntil(this.destroy$))
            .subscribe();

        // update store
        this.usersStore.update((store) => {
            return {
                ...store,
                usersCount: store['usersCount'] + 1,
            };
        });

        // reset form
        addUserForm.reset();
    }

    // handle button type emit
    public handleButtonTypeEmit(type: string): void {
        if (type === ConstantString.ADD) {
            this.handleAddUserClick();
        }
    }

    // create user on enter key
    public onKeyDown(event: { keyCode: number }): void {
        if (event.keyCode === 13) {
            this.handleAddUserClick();
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
