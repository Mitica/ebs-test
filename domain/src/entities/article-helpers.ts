
import { generate as generateId, isValid as isValidId } from 'shortid';
import { CreatingArticle, Article } from './article';
import { badData } from 'boom';

export class ArticleHelpers {
    static newId() {
        return generateId();
    }

    static isValidId(id: string) {
        //shortid: By default 7-14 url-friendly characters: A-Z, a-z, 0-9, _-
        return isValidId(id);
    }

    static buildForCreate(input: CreatingArticle | Article) {
        const article: Article = {
            id: ArticleHelpers.newId(),
            title: input.title,
            userId: input.userId,
            createdAt: input.createdAt || new Date(),
        }

        if (input.body) {
            article.body = input.body;
        }

        if (!article.title) {
            throw badData();
        }

        if (!article.userId) {
            throw badData();
        }

        return article;
    }
}
