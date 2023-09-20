import { ElementRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

export class InputHelper {
    static inputOnBlur = (formControl: AbstractControl): void => {
        if (!formControl.value) {
            formControl.markAsUntouched();
            formControl.markAsPristine();
        }
    };

    static setAutofocusOnInput = (inputRef: ElementRef): void => {
        inputRef.nativeElement.focus();
    };
}
