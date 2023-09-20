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
import { MatDialog } from '@angular/material/dialog';
import { UsersAddComponent } from '../users-add/users-add.component';

// services
import { SearchFilterService } from '../../state/services/search-filter-service/search-filter.service';
import { UsersService } from '../../state/services/users-service/users.service';

// store
import { UsersQuery } from './../../state/store/users.query';

// constants
import { Constants } from '../../state/utils/constants';

// helper
import { dialogOptions } from '../../state/utils/dialog.helper';
import { changeActivePaginationNumber } from '../../state/utils/pagination.helper';

// models
import { User } from '../../state/models/user.model';
import { Pagination } from '../../state/models/pagination.model';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements AfterViewInit, OnInit, OnDestroy {
    @ViewChild(MatSort) public sort!: MatSort;

    private destroy$ = new Subject<void>();

    // construct table
    private usersList: User[] = [];
    public usersListTableData = new MatTableDataSource<User>([]);
    public displayedColumns: string[] = [];

    // pagination
    public paginationNumbersArray: Pagination[] = [];
    public usersCount: number = 0;
    private doCalculate: boolean = false;
    private isFirstLoad: boolean = true;

    constructor(
        private searchFilterService: SearchFilterService,
        private usersService: UsersService,
        private usersQuery: UsersQuery,
        private addUserDialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.getTableHeaderItems();

        this.getSearchFilterValue();

        this.getUsersCount();

        this.getUsers();
    }

    ngAfterViewInit(): void {
        this.sortUsersListData();
    }

    // get table header items
    private getTableHeaderItems(): void {
        this.displayedColumns = Constants.TABLE_HEADER_ITEMS;
    }

    // sort columns
    private sortUsersListData(): void {
        setTimeout(() => {
            this.usersListTableData.sort = this.sort;
        }, 100);
    }

    // get search filter value and filter users by value
    private getSearchFilterValue(): void {
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

    // get users - from store
    private getUsers(): void {
        this.usersQuery.users$
            .pipe(takeUntil(this.destroy$))
            .subscribe((users: User[]) => {
                if (users) {
                    // calculate numbers in pagination based on users list length
                    if (this.doCalculate) {
                        this.calculatePaginationNumbers();

                        // reset
                        if (this.isFirstLoad) {
                            this.isFirstLoad = false;
                        } else {
                            this.getLastPageUsers();
                        }

                        this.doCalculate = false;
                    } else {
                        // users table
                        this.usersList = users;
                        this.usersListTableData = new MatTableDataSource(users);

                        // apply sort when new user is added
                        this.sortUsersListData();
                    }
                }
            });
    }

    // get last page users list
    private getLastPageUsers(): void {
        this.usersService
            .getPaginatedUsers(this.paginationNumbersArray.length)
            .pipe(takeUntil(this.destroy$))
            .subscribe();
    }

    // get users count
    private getUsersCount(): void {
        this.usersQuery.usersCount$
            .pipe(takeUntil(this.destroy$))
            .subscribe((usersCount: number) => {
                if (usersCount) {
                    this.usersCount = usersCount;

                    this.doCalculate = true;
                }
            });
    }

    // calculate pagination numbers
    private calculatePaginationNumbers(): void {
        this.paginationNumbersArray = Array(Math.ceil(this.usersCount / 10))
            .fill(0)
            .map((_, index) => {
                return {
                    number: index + 1,
                    isActive:
                        this.isFirstLoad && index === 0
                            ? true
                            : !this.isFirstLoad &&
                              index === this.paginationNumbersArray.length - 1
                            ? true
                            : false,
                };
            });
    }

    // handle pagination number emit
    public handlePaginationNumberEmit(paginationNumber: number): void {
        this.paginationNumbersArray = changeActivePaginationNumber(
            paginationNumber,
            this.paginationNumbersArray
        );

        // get paginated users list
        this.usersService
            .getPaginatedUsers(paginationNumber)
            .pipe(takeUntil(this.destroy$))
            .subscribe();
    }

    // handle add user click
    public handleAddUserClick(): void {
        this.addUserDialog.open(UsersAddComponent, dialogOptions);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
