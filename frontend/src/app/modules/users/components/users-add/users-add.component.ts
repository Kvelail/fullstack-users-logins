import {
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject, takeUntil } from 'rxjs';

// angular material ui
import { MatDialogRef } from '@angular/material/dialog';

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
import { UsersService } from '../../state/services/users-service/users.service';

// helper
import { InputHelper } from '../../state/utils/input.helper';

@Component({
    selector: 'app-users-add',
    templateUrl: './users-add.component.html',
    styleUrls: ['./users-add.component.scss'],
})
export class UsersAddComponent implements OnInit, OnDestroy {
    @ViewChild('passwordInput') public passwordInput!: ElementRef;

    private destroy$ = new Subject<void>();

    // form
    public addUserForm!: FormGroup;
    public hidePassword: boolean = true;

    constructor(
        private formBuilder: FormBuilder,
        private usersService: UsersService,
        private addUserDialogRef: MatDialogRef<UsersAddComponent>
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

    // create user - backend communication
    private handleAddUserClick(): void {
        const addUserForm = this.addUserForm;

        if (addUserForm.invalid) {
            return;
        }

        // create new user
        const addUserFormValue = addUserForm.value;
        const formatedDate = format(new Date(), ConstantString.DATE_FORMAT);
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

        // reset form
        this.passwordInput.nativeElement.blur();

        addUserForm.reset();
        addUserForm.markAsPristine();
        addUserForm.markAsUntouched();
    }

    // switch hide password
    public switchHidePassword(): void {
        this.hidePassword = !this.hidePassword;
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

    // handle input on blur
    public handleInputOnBlur(inputType: string): void {
        InputHelper.inputOnBlur(this.addUserForm.controls[inputType]);
    }

    // handle close modal click
    public handleCloseModalClick(): void {
        this.addUserDialogRef.close();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
