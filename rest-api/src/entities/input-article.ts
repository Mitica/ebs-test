import { Request } from "express";
import { Article } from 'test-domain';
import { getRequestUser } from "../helpers";

export class InputArticle {
    static fromRequest(req: Request) {
        const user = getRequestUser(req);

        const article: Article = {
            id: req.body.id,
            title: req.body.title,
            body: req.body.body,
            userId: user.id,
        }

        return article;
    }
}
