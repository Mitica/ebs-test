
import { Response, Request } from 'express';
import { InputArticle } from '../entities/input-article';
import { ArticleHelpers } from 'test-domain';
import { articleModel, voteArticleUseCase } from '../data';
import catchError from '../catch';
import { sendResponse } from '../helpers';
import { InputArticleVote } from '../entities/input-article-vote';

export async function voteArticleController(req: Request, res: Response) {
    const inputData = await InputArticleVote.fromRequest(req);

    try {
        const result = await voteArticleUseCase.execute(inputData);
        sendResponse(res, 200, result);
    } catch (e) {
        catchError(req, res, e, 400);
    }
}

export async function createArticleController(req: Request, res: Response) {
    let articleData = await InputArticle.fromRequest(req);

    try {
        articleData = ArticleHelpers.buildForCreate(articleData);
        const article = await articleModel.create(articleData);
        sendResponse(res, 201, article);
    } catch (e) {
        catchError(req, res, e, 400);
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
