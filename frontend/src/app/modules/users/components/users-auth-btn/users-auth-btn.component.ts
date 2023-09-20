import { Component, EventEmitter, Input, Output } from '@angular/core';

// enums
import { ConstantString } from '../../state/enums/constant-string.enum';

@Component({
    selector: 'app-users-auth-btn',
    templateUrl: './users-auth-btn.component.html',
    styleUrls: ['./users-auth-btn.component.scss'],
})
export class UsersAuthBtnComponent {
    @Input() buttonType: string = ConstantString.REGISTER;
    @Output() buttonTypeEmitter = new EventEmitter<string>();

    public handleClick(): void {
        this.buttonTypeEmitter.emit(this.buttonType);
    }
}
