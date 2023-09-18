import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
} from '@angular/core';

// models
import { PaginationModel } from '../../state/models/pagination.model';

@Component({
    selector: 'app-users-pagination',
    templateUrl: './users-pagination.component.html',
    styleUrls: ['./users-pagination.component.scss'],
})
export class UsersPaginationComponent implements OnChanges {
    @Input() numberOfPaginationArray: PaginationModel[] = [];
    @Output() paginationNumberEmitter = new EventEmitter<number>();

    private activeNumber = 1;

    ngOnChanges(changes: SimpleChanges): void {
        const number = changes['numberOfPaginationArray'].currentValue.find(
            (paginationNumber: PaginationModel) => paginationNumber.isActive
        ).number;

        this.activeNumber = number;
    }

    public trackByIdentity = (_: number, item: PaginationModel): number =>
        item.number;

    public handlePaginationNumberClick(paginationNumber: number): void {
        const isClickiOnActiveNumber = this.activeNumber === paginationNumber;

        if (isClickiOnActiveNumber) {
            return;
        }

        this.paginationNumberEmitter.emit(paginationNumber);
    }
}
