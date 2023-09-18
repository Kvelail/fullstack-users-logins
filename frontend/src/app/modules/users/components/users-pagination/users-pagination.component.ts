import { Component, EventEmitter, Input, Output } from '@angular/core';

// models
import { PaginationModel } from '../../state/models/pagination.model';

@Component({
    selector: 'app-users-pagination',
    templateUrl: './users-pagination.component.html',
    styleUrls: ['./users-pagination.component.scss'],
})
export class UsersPaginationComponent {
    @Input() numberOfPaginationArray: PaginationModel[] = [];
    @Output() paginationNumberEmitter = new EventEmitter<number>();

    private activeNumber = 1;

    public trackByIdentity = (_: number, item: PaginationModel): number =>
        item.number;

    public handlePaginationNumberClick(paginationNumber: number): void {
        const isClickiOnActiveNumber = this.activeNumber === paginationNumber;

        if (isClickiOnActiveNumber) {
            return;
        }

        this.activeNumber = paginationNumber;

        this.paginationNumberEmitter.emit(paginationNumber);
    }
}
