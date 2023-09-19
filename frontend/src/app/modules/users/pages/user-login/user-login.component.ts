import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject, takeUntil } from 'rxjs';

// validations
import {
    emailValidation,
    passwordValidation,
} from '../../state/validations/input.validations';

// enums
import { ConstantString } from '../../state/enums/constant-string.enum';
import { ValidationMessage } from '../../state/enums/validation-message.enum';

// services
import { UsersService } from '../../state/services/users-service/users.service';

// helper
import { inputOnBlur } from '../../state/utils/input.helper';

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();

    // form
    public loginForm!: FormGroup;
    public hidePassword: boolean = true;

    // errors
    public emailError!: string;
    public passwordError!: string;

    constructor(
        private formBuilder: FormBuilder,
        private userService: UsersService
    ) {}

    ngOnInit(): void {
        this.createForm();

        this.checkIfFormHasInvalidInputs();
    }

    // create form
    private createForm(): void {
        this.loginForm = this.formBuilder.group({
            email: [null, [Validators.required, ...emailValidation]],
            password: [null, [Validators.required, ...passwordValidation]],
        });
    }

    // invalid inputs
    public checkIfFormHasInvalidInputs(): void {
        // form controls
        const emailFormControl = this.loginForm.get(ConstantString.EMAIL);
        const passwordFormControl = this.loginForm.get(ConstantString.PASSWORD);

        this.loginForm.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                // email validation
                if (emailFormControl?.hasError(ConstantString.REQUIRED)) {
                    this.emailError = ValidationMessage.EMAIL_REQUIRED;
                }

                if (emailFormControl?.hasError(ConstantString.PATTERN)) {
                    this.emailError = ValidationMessage.INVALID_EMAIL;
                }

                // password validation
                if (passwordFormControl?.hasError(ConstantString.PATTERN)) {
                    this.passwordError = ValidationMessage.STRONGER_PASSWORD;
                }
            });
    }

    // login click
    public handleLoginClick(): void {
        const loginForm = this.loginForm;

        if (loginForm.invalid) {
            return;
        }

        // login data
        const loginFormValue = loginForm.value;
        const loginData = {
            ...loginFormValue,
        };

        // login user
        this.userService
            .loginUser(loginData)
            .pipe(takeUntil(this.destroy$))
            .subscribe();
    }

    // switch hide password
    public switchHidePassword(): void {
        this.hidePassword = !this.hidePassword;
    }

    // handle button type emit
    public handleButtonTypeEmit(type: string): void {
        if (type === ConstantString.LOGIN) {
            this.handleLoginClick();
        }
    }

    // login click on enter key
    public onKeyDown(event: { keyCode: number }): void {
        if (event.keyCode === 13) {
            this.handleLoginClick();
        }
    }

    // handle input on blur
    public handleInputOnBlur(inputType: string): void {
        inputOnBlur(this.loginForm.controls[inputType]);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
