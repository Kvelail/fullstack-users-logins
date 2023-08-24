import { AfterViewInit, Component, ViewChild } from '@angular/core';

// angular material ui
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// models
import { User } from '../../state/models/username.model';

// static
import { TABLE_HEADER_ITEMS } from '../../state/utils/static';

const ELEMENT_DATA: User[] = [
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

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements AfterViewInit {
    @ViewChild(MatSort) public sort!: MatSort;

    // construct table
    public displayedColumns: string[] = [];
    public usersListData = new MatTableDataSource(ELEMENT_DATA);

    constructor() {
        this.displayedColumns = TABLE_HEADER_ITEMS;
    }

    ngAfterViewInit(): void {
        this.sortUsersListData();
    }

    // sort columns
    public sortUsersListData(): void {
        this.usersListData.sort = this.sort;
    }
}
