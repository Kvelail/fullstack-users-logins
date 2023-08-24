import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NAVBAR_MENU_ITEMS } from '../../state/utils/static';

// models
import { NavbarLink } from '../../state/models/navbar-link.model';

// enums
import { RouteString } from '../../state/enums/route-string.enum';

@Component({
    selector: 'app-users-navbar',
    templateUrl: './users-navbar.component.html',
    styleUrls: ['./users-navbar.component.scss'],
})
export class UsersNavbarComponent implements OnInit {
    public navbarMenuItems: NavbarLink[] = [];

    constructor(public router: Router) {}

    ngOnInit(): void {
        this.getNavbarMenuItems();
    }

    // track by identity
    public trackByIdentity = (index: number, _: any): number => index;

    // get navbar items
    private getNavbarMenuItems(): void {
        this.navbarMenuItems = NAVBAR_MENU_ITEMS;
    }

    // handle logout
    public handleLogoutClick(): void {
        this.router.navigate([RouteString.LOGIN]);
    }
}
