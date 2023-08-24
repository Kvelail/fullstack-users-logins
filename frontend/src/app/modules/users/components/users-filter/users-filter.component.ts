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

@Component({
    selector: 'app-users-filter',
    templateUrl: './users-filter.component.html',
    styleUrls: ['./users-filter.component.scss'],
})
export class UsersFilterComponent implements AfterViewInit {
    @Input() searchFilterType: string = ConstantString.USERS;

    @ViewChild('searchInput') searchInput!: ElementRef;

    constructor(private searchFilterService: SearchFilterService) {}

    ngAfterViewInit(): void {
        this.setAutofocusOnSearchInput();
    }

    // set autofocus on load
    private setAutofocusOnSearchInput(): void {
        this.searchInput.nativeElement.focus();
    }

    // handle search filter
    public handleSearchChange(e: Event): void {
        const searchValue = (e.target as HTMLInputElement).value;

        this.searchFilterService.setSearchFilterValue(searchValue);
    }
}
