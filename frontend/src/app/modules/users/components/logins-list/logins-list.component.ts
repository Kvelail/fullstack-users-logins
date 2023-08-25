import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

// angular material ui
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

// static
import { LOGINS_TABLE_HEADER_ITEMS } from '../../state/utils/static';

// models
import { Login } from '../../state/models/login.model';

// services
import { SearchFilterService } from '../../state/services/search-filter-service/search-filter.service';

// store
import { UsersQuery } from '../../state/store/users.query';

@Component({
    selector: 'app-logins-list',
    templateUrl: './logins-list.component.html',
    styleUrls: ['./logins-list.component.scss'],
})
export class LoginsListComponent implements OnInit, OnDestroy {
    @ViewChild(MatSort) public sort!: MatSort;

    private destroy$ = new Subject<void>();

    // construct table
    private loginsList: Login[] = [];
    public loginsListTableData = new MatTableDataSource<Login>([]);
    public displayedColumns: string[] = [];

    constructor(
        private searchFilterService: SearchFilterService,
        private usersQuery: UsersQuery
    ) {}

    ngOnInit(): void {
        this.getTableHeaderItems();

        this.getSearchFilterValue();

        this.getLogins();
    }

    // get table header items
    private getTableHeaderItems(): void {
        this.displayedColumns = LOGINS_TABLE_HEADER_ITEMS;
    }

    // get search filter value and filter users by value
    public getSearchFilterValue(): void {
        this.searchFilterService.getSearchFilterValue$
            .pipe(takeUntil(this.destroy$))
            .subscribe((value) => {
                const valueToLowerCase = value.toLowerCase();

                const filteredUsersListData = this.loginsList.filter((user) => {
                    return user.username
                        .toLowerCase()
                        .includes(valueToLowerCase);
                });

                if (filteredUsersListData.length) {
                    this.loginsListTableData = new MatTableDataSource(
                        filteredUsersListData
                    );
                }
            });
    }

    // get logins - from store
    public getLogins(): void {
        this.usersQuery.logins$
            .pipe(takeUntil(this.destroy$))
            .subscribe((logins: Login[]) => {
                if (logins) {
                    this.loginsList = logins;
                    this.loginsListTableData = new MatTableDataSource(logins);
                }
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
