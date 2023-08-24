import { Validators } from '@angular/forms';

// email validation
export const emailValidation = [
    // email pattern
    Validators.maxLength(50),
    Validators.pattern(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/),
];

// password validation
export const passwordValidation = [
    // minimus 6 chars, 1 capital letter, 1 number
    Validators.pattern(
        '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-zd$@$!%*?&].{5,}'
    ),
];
