import { NavbarLink } from '../models/navbar-link.model';

export class Constants {
    static NAVBAR_MENU_ITEMS: NavbarLink[] = [
        {
            title: 'Users',
            route: '/dashboard/users',
        },
        {
            title: 'Logins',
            route: '/dashboard/logins',
        },
        {
            title: 'Logout',
            route: '/',
        },
    ];

    static TABLE_HEADER_ITEMS: string[] = [
        'username',
        'email',
        'registeredDate',
    ];

    static LOGINS_TABLE_HEADER_ITEMS: string[] = [
        'username',
        'login passed',
        'attempt date',
    ];
}
