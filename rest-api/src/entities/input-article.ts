import { Request } from "express";
import { Article } from 'test-domain';

export class InputArticle {
    static fromRequest(req: Request) {
        const article: Article = {
            id: req.body.id,
            title: req.body.title,
            body: req.body.body,
        }

        return article;
    }
}
