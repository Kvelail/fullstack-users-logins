import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

// services
import { SearchFilterService } from '../../state/services/search-filter-service/search-filter.service';

@Component({
    selector: 'app-users-filter',
    templateUrl: './users-filter.component.html',
    styleUrls: ['./users-filter.component.scss'],
})
export class UsersFilterComponent implements AfterViewInit {
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
