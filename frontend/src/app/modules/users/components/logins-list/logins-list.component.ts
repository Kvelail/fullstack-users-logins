import {
    AfterViewInit,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

// angular material ui
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

// services
import { SearchFilterService } from '../../state/services/search-filter-service/search-filter.service';
import { UsersService } from '../../state/services/users-service/users.service';

// store
import { UsersQuery } from '../../state/store/users.query';

// constants
import { Constants } from '../../state/utils/constants';

// helper
import { changeActivePaginationNumber } from '../../state/utils/pagination.helper';

// models
import { Login } from '../../state/models/login.model';
import { Pagination } from '../../state/models/pagination.model';

@Component({
    selector: 'app-logins-list',
    templateUrl: './logins-list.component.html',
    styleUrls: ['./logins-list.component.scss'],
})
export class LoginsListComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild(MatSort) public sort!: MatSort;

    private destroy$ = new Subject<void>();

    // construct table
    private loginsList: Login[] = [];
    public loginsListTableData = new MatTableDataSource<Login>([]);
    public displayedColumns: string[] = [];

    // pagination
    public paginationNumbersArray: Pagination[] = [];
    public loginsCount: number = 0;
    private isFirstLoad: boolean = true;

    constructor(
        private searchFilterService: SearchFilterService,
        private usersService: UsersService,
        private usersQuery: UsersQuery
    ) {}

    ngOnInit(): void {
        this.getTableHeaderItems();

        this.getSearchFilterValue();

        this.getLoginsCount();

        this.getLogins();
    }

    ngAfterViewInit(): void {
        this.sortLoginsListData();
    }

    // get table header items
    private getTableHeaderItems(): void {
        this.displayedColumns = Constants.LOGINS_TABLE_HEADER_ITEMS;
    }

    // sort columns
    private sortLoginsListData(): void {
        setTimeout(() => {
            this.loginsListTableData.sort = this.sort;
        }, 100);
    }

    // get search filter value and filter users by value
    private getSearchFilterValue(): void {
        this.searchFilterService.getSearchFilterValue$
            .pipe(takeUntil(this.destroy$))
            .subscribe((value: string) => {
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
    private getLogins(): void {
        this.usersQuery.logins$
            .pipe(takeUntil(this.destroy$))
            .subscribe((logins: Login[]) => {
                if (logins) {
                    // logins table
                    this.loginsList = logins;
                    this.loginsListTableData = new MatTableDataSource(logins);

                    // calculate numbers in pagination only on first load - 10 logins per page
                    if (this.isFirstLoad) {
                        this.calculatePaginationNumbers();

                        // reset
                        this.isFirstLoad = false;
                    }
                }
            });
    }

    // calculate pagination numbers
    private calculatePaginationNumbers(): void {
        this.paginationNumbersArray = Array(Math.ceil(this.loginsCount / 10))
            .fill(0)
            .map((_, index) => {
                return {
                    number: index + 1,
                    isActive: index === 0 ? true : false,
                };
            });
    }

    // get logins count
    private getLoginsCount(): void {
        this.usersQuery.loginsCount$
            .pipe(takeUntil(this.destroy$))
            .subscribe((loginsCount: number) => {
                if (loginsCount) {
                    this.loginsCount = loginsCount;
                }
            });
    }

    // handle pagination number emit
    public handlePaginationNumberEmit(paginationNumber: number): void {
        this.paginationNumbersArray = changeActivePaginationNumber(
            paginationNumber,
            this.paginationNumbersArray
        );

        // get paginated logins list
        this.usersService
            .getPaginatedLogins(paginationNumber)
            .pipe(takeUntil(this.destroy$))
            .subscribe();

        // apply sort when page changed
        this.sortLoginsListData();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
