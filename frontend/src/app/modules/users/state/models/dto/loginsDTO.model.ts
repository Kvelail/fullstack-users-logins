import { UserDTO } from './userDTO.model';

export interface LoginsDTO {
    issuedDate: string;
    loginAttemptType: {
        id: number;
        code: string;
        description: string;
    };
    user: UserDTO;
}
