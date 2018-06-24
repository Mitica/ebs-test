
import { generate as generateId, isValid as isValidId } from 'shortid';
import { CreatingUser, User, UserRole } from './user';
import { badData } from 'boom';

export class UserHelpers {
    static newId() {
        return generateId();
    }

    static isValidId(id: string) {
        //shortid: By default 7-14 url-friendly characters: A-Z, a-z, 0-9, _-
        return isValidId(id);
    }

    static buildForCreate(input: User | CreatingUser): User {
        const user: User = {
            ...input,
            id: UserHelpers.newId(),
            role: UserRole.USER,
        };

        if (!user.email) {
            throw badData(`Email is required`);
        }
        if (user.email && !user.facebookId && !user.password) {
            throw badData(`Password or facebookId is required`);
        }

        return user;
    }
}
