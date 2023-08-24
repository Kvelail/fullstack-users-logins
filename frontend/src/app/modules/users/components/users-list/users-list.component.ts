import {
    AfterViewInit,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

// angular material ui
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// models
import { User } from '../../state/models/user.model';

// static
import { TABLE_HEADER_ITEMS } from '../../state/utils/static';

// services
import { SearchFilterService } from '../../state/services/search-filter-service/search-filter.service';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements AfterViewInit, OnInit, OnDestroy {
    @ViewChild(MatSort) public sort!: MatSort;

    private destroy$ = new Subject<void>();

    // construct table
    private usersList: User[] = [
        {
            position: 1,
            username: 'Hydrogen',
            email: 'aaaa@asd.com',
            createdAt: '01/01/23',
        },
        {
            position: 2,
            username: 'Helium',
            email: 'bbb@asd.com',
            createdAt: '02/01/23',
        },
        {
            position: 3,
            username: 'Lithium',
            email: 'ccc@asd.com',
            createdAt: '01/01/23',
        },
        {
            position: 4,
            username: 'Beryllium',
            email: 'ddd@asd.com',
            createdAt: '03/01/23',
        },
        {
            position: 5,
            username: 'Boron',
            email: 'eee@asd.com',
            createdAt: '01/01/23',
        },
        {
            position: 6,
            username: 'Carbon',
            email: 'aaaa@asd.com',
            createdAt: '01/01/23',
        },
        {
            position: 7,
            username: 'Nitrogen',
            email: 'aaaa@asd.com',
            createdAt: '04/01/23',
        },
        {
            position: 8,
            username: 'Oxygen',
            email: 'aaaa@asd.com',
            createdAt: '01/01/23',
        },
        {
            position: 9,
            username: 'Fluorine',
            email: 'aaaa@asd.com',
            createdAt: '06/01/23',
        },
        {
            position: 10,
            username: 'Neon',
            email: 'aaaa@asd.com',
            createdAt: '01/01/23',
        },
    ];
    public usersListTableData = new MatTableDataSource<User>(this.usersList);
    public displayedColumns: string[] = [];

    constructor(private searchFilterService: SearchFilterService) {}

    ngOnInit(): void {
        this.getTableHeaderItems();

        this.getSearchFilterValue();
    }

    ngAfterViewInit(): void {
        this.sortUsersListData();
    }

    // get table header items
    private getTableHeaderItems(): void {
        this.displayedColumns = TABLE_HEADER_ITEMS;
    }

    // sort columns
    public sortUsersListData(): void {
        this.usersListTableData.sort = this.sort;
    }

    // get search filter value and filter users by value
    public getSearchFilterValue(): void {
        this.searchFilterService.getSearchFilterValue$
            .pipe(takeUntil(this.destroy$))
            .subscribe((value) => {
                const valueToLowerCase = value.toLowerCase();

                const filteredUsersListData = this.usersList.filter((user) => {
                    return (
                        user.username
                            .toLowerCase()
                            .includes(valueToLowerCase) ||
                        user.email.toLowerCase().includes(valueToLowerCase)
                    );
                });

                if (filteredUsersListData.length) {
                    this.usersListTableData = new MatTableDataSource(
                        filteredUsersListData
                    );
                }
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
