
import { generate as generateId, isValid as isValidId } from 'shortid';

export class ArticleHelpers {
    static newId() {
        return generateId();
    }

    static isValidId(id: string) {
        //shortid: By default 7-14 url-friendly characters: A-Z, a-z, 0-9, _-
        return isValidId(id);
    }
}
