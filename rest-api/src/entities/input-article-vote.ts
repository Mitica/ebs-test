import { Request } from "express";
import { CreatingArticleVote } from 'test-domain';
import { getRequestUser } from "../helpers";

export class InputArticleVote {
    static async fromRequest(req: Request) {
        const user = await getRequestUser(req);

        const input: CreatingArticleVote = {
            articleId: req.params.articleId || req.params.id,
            userId: user.id,
            type: req.body.type,
        };

        return input;
    }
}
