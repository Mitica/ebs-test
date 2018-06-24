
import { generate as generateId, isValid as isValidId } from 'shortid';
import { CreatingUser, User, UserRole } from './user';

export class UserHelpers {
    static newId() {
        return generateId();
    }

    static isValidId(id: string) {
        //shortid: By default 7-14 url-friendly characters: A-Z, a-z, 0-9, _-
        return isValidId(id);
    }

    static buildForCreate(input: CreatingUser): User {
        const user: User = {
            ...input,
            id: UserHelpers.newId(),
            role: UserRole.USER,
        };

        return user;
    }
}
