import { UserDTO } from './dto/userDTO.model';
import { Login } from './login.model';

export interface IUsersStore {
    users: UserDTO[];
    logins: Login[];
    usersCount: number;
}
