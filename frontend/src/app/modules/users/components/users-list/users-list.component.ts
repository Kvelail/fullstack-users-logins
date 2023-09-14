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

// static
import { TABLE_HEADER_ITEMS } from '../../state/utils/static';

// services
import { SearchFilterService } from '../../state/services/search-filter-service/search-filter.service';
import { UsersService } from '../../state/services/users-service/users.service';

// store
import { UsersQuery } from './../../state/store/users.query';

// models
import { User } from '../../state/models/user.model';
import { PaginationModel } from '../../state/models/pagination.model';

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
    public numberOfPaginationArray: PaginationModel[] = [];
    public usersCount: number = 0;

    constructor(
        private searchFilterService: SearchFilterService,
        private usersService: UsersService,
        private usersQuery: UsersQuery
    ) {}

    ngOnInit(): void {
        this.getTableHeaderItems();

        this.getSearchFilterValue();

        this.getUsersCount();

        this.getAllUsers();
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
        setTimeout(() => {
            this.usersListTableData.sort = this.sort;
        }, 100);
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

    // get all users - from store
    public getAllUsers(): void {
        this.usersQuery.users$
            .pipe(takeUntil(this.destroy$))
            .subscribe((users: User[]) => {
                if (users) {
                    /*  calculate numbers in pagination based on users list - 10 users per page */
                    this.numberOfPaginationArray = Array(
                        Math.ceil(this.usersCount / 10)
                    )
                        .fill(0)
                        .map((_, i) => {
                            return {
                                number: i + 1,
                                isActive: i === 0 ? true : false,
                            };
                        });

                    // users table
                    this.usersList = users;
                    this.usersListTableData = new MatTableDataSource(users);

                    // apply sort when new user is added
                    this.sortUsersListData();
                }
            });
    }

    // get users count
    public getUsersCount(): void {
        this.usersQuery.usersCount$
            .pipe(takeUntil(this.destroy$))
            .subscribe((usersCount: number) => {
                if (usersCount) {
                    this.usersCount = usersCount;
                }
            });
    }

    // handle pagination number emit
    public handlePaginationNumberEmit(paginationNumber: number): void {
        /* change active pagination number */
        this.numberOfPaginationArray = this.numberOfPaginationArray.map(
            (item: PaginationModel, index: number) => {
                if (item.isActive) {
                    return {
                        ...item,
                        isActive: false,
                    };
                }

                if (index === paginationNumber - 1) {
                    return {
                        ...item,
                        isActive: true,
                    };
                }

                return item;
            }
        );

        // get paginated users list
        this.usersService
            .getPaginatedUsers(paginationNumber)
            .pipe(takeUntil(this.destroy$))
            .subscribe();

        // apply sort for new pagination page
        this.sortUsersListData();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
