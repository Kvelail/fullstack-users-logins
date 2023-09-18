import { UserDTO } from './userDTO.model';

export interface UsersWrapperDTO {
    users: UserDTO[];
    usersCount: number;
}
