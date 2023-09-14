import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// static
import { NAVBAR_MENU_ITEMS } from '../../state/utils/static';

// models
import { NavbarLink } from '../../state/models/navbar-link.model';

// services
import { UsersService } from '../../state/services/users-service/users.service';

@Component({
    selector: 'app-users-navbar',
    templateUrl: './users-navbar.component.html',
    styleUrls: ['./users-navbar.component.scss'],
})
export class UsersNavbarComponent implements OnInit {
    public navbarMenuItems: NavbarLink[] = [];

    constructor(public router: Router, private usersService: UsersService) {}

    ngOnInit(): void {
        this.getNavbarMenuItems();
    }

    // track by identity
    public trackByIdentity = (_: number, item: NavbarLink): string =>
        item.title;

    // get navbar items
    private getNavbarMenuItems(): void {
        this.navbarMenuItems = NAVBAR_MENU_ITEMS;
    }

    // handle logout
    public handleLogoutClick(): void {
        this.usersService.logoutUser();
    }
}
