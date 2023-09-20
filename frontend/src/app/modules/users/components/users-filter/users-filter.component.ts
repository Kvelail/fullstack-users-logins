import {
    Component,
    ElementRef,
    ViewChild,
    AfterViewInit,
    Input,
} from '@angular/core';

// services
import { SearchFilterService } from '../../state/services/search-filter-service/search-filter.service';

// enums
import { ConstantString } from '../../state/enums/constant-string.enum';

// helper
import { InputHelper } from '../../state/utils/input.helper';

@Component({
    selector: 'app-users-filter',
    templateUrl: './users-filter.component.html',
    styleUrls: ['./users-filter.component.scss'],
})
export class UsersFilterComponent implements AfterViewInit {
    @ViewChild('searchInput') public searchInput!: ElementRef;

    @Input() searchFilterType: string = ConstantString.USERS;

    constructor(private searchFilterService: SearchFilterService) {}

    ngAfterViewInit(): void {
        InputHelper.setAutofocusOnInput(this.searchInput);
    }

    // handle search filter
    public handleSearchChange(e: Event): void {
        const searchValue = (e.target as HTMLInputElement).value;

        this.searchFilterService.setSearchFilterValue(searchValue);
    }
}
