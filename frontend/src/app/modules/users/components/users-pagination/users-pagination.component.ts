import { Component, Input, ViewChild } from '@angular/core';

@Component({
    selector: 'app-users-pagination',
    templateUrl: './users-pagination.component.html',
    styleUrls: ['./users-pagination.component.scss'],
})
export class UsersPaginationComponent {
    @Input() customPagination?: boolean = true;
}
