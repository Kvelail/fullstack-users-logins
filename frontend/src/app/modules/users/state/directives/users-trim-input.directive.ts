import { Directive } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Directive({
    selector: '[trimInputValue]',
})
export class UsersTrimInputDirective {
    private controlValueAccessor: ControlValueAccessor = this.ngControl
        .valueAccessor as ControlValueAccessor;

    constructor(private ngControl: NgControl) {
        this.trimInputValueAccessor(this.controlValueAccessor);
    }

    private trimInputValueAccessor(valueAccessor: ControlValueAccessor): void {
        const original = valueAccessor.registerOnChange;

        valueAccessor.registerOnChange = (fn: (_: unknown) => void) => {
            return original?.call(valueAccessor, (value: unknown) => {
                return fn(typeof value === 'string' ? value.trim() : value);
            });
        };
    }
}
