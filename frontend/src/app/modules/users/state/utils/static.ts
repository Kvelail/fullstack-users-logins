import { NavbarLink } from '../models/navbar-link.model';

export const NAVBAR_MENU_ITEMS: NavbarLink[] = [
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
