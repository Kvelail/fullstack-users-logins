import { LoginsDTO } from './loginsDTO.model';

export interface LoginsWrapperDTO {
    logins: LoginsDTO[];
    loginsCount: number;
}
