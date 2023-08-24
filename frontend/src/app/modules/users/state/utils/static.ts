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

export const TABLE_HEADER_ITEMS: string[] = [
    'position',
    'username',
    'email',
    'createdAt',
];

export const LOGINS_TABLE_HEADER_ITEMS: string[] = [
    'username',
    'login passed',
    'attempt date',
];
