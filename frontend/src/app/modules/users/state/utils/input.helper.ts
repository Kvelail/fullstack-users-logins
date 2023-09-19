import { AbstractControl } from '@angular/forms';

export const inputOnBlur = (formControl: AbstractControl): void => {
    if (!formControl.value) {
        formControl.markAsUntouched();
        formControl.markAsPristine();
    }
};
