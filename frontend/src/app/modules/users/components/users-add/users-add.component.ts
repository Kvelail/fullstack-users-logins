import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject, takeUntil } from 'rxjs';

// validations
import {
    emailValidation,
    passwordValidation,
} from '../../state/validations/input.validations';

// enum
import { ConstantString } from '../../state/enums/constant-string.enum';

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

    constructor(private formBuilder: FormBuilder) {}

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

    public handleAddUserClick(): void {
        const addUserForm = this.addUserForm;

        if (addUserForm.invalid) {
            return;
        }

        // create new user
        const addUserFormValue = addUserForm.value;
        const newUser = {
            username: addUserFormValue.username,
            email: addUserFormValue.email,
            password: addUserFormValue.password,
        };

        // reset form
        addUserForm.reset();
    }

    // handle button type emit
    public handleButtonTypeEmit(type: string): void {
        if (type === ConstantString.ADD) {
            this.handleAddUserClick();
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
