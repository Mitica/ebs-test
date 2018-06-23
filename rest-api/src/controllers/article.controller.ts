
import { Response, Request } from 'express';
import { InputArticle } from '../entities/input-article';
import { ArticleHelpers } from 'test-domain';
import { articleRepository, articleModel } from '../data';
import catchError from '../catch';
import { sendResponse } from '../helpers';


export async function createArticleController(req: Request, res: Response) {
    const articleData = InputArticle.fromRequest(req);

    articleData.id = ArticleHelpers.newId();

    try {
        const article = await articleRepository.create(articleData);
        sendResponse(res, 201, article);
    } catch (e) {
        catchError(req, res, e, 422);
    }
}

export async function getArticlesController(req: Request, res: Response) {
    try {
        const articles = await articleModel.list({ limit: 10, sort: '-createdAt' });
        sendResponse(res, 200, articles || []);
    } catch (e) {
        catchError(req, res, e);
    }
}
