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

    public trackByIdentity = (_: number, item: PaginationModel): number =>
        item.number;

    public handlePaginationNumberClick(paginationNumber: number): void {
        this.paginationNumberEmitter.emit(paginationNumber);
    }
}
