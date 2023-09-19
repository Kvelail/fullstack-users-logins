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

// enums
import { ConstantString } from '../../state/enums/constant-string.enum';

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
        const paginationNumber: number = changes[
            ConstantString.NUMBER_OF_PAGINATION_ARRAY
        ].currentValue.find(
            (paginationNumber: PaginationModel) => paginationNumber.isActive
        ).number;

        this.activeNumber = paginationNumber;
    }

    public trackByIdentity = (_: number, item: PaginationModel): number =>
        item.number;

    public handlePaginationNumberClick(paginationNumber: number): void {
        const isClickOnActiveNumber = this.activeNumber === paginationNumber;

        if (isClickOnActiveNumber) {
            return;
        }

        this.paginationNumberEmitter.emit(paginationNumber);
    }
}
