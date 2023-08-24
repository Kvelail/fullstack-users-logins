import { Component, EventEmitter, Input, Output } from '@angular/core';

// enum
import { ConstantString } from '../../state/enums/constant-string.enum';

@Component({
    selector: 'app-users-submit-btn',
    templateUrl: './users-submit-btn.component.html',
    styleUrls: ['./users-submit-btn.component.scss'],
})
export class UsersSubmitBtnComponent {
    @Input() buttonType?: string = ConstantString.LOGIN;
    @Input() disabledValue?: boolean;

    @Output() buttonTypeEmitter = new EventEmitter<string>();

    public handleClick(): void {
        this.buttonTypeEmitter.emit(this.buttonType);
    }
}
