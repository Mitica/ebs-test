import { CreatingArticleVote, ArticleVote } from "./article-vote";
import { md5 } from "../utils";
import { badData } from "boom";

export class ArticleVoteHelpers {
    static createId(data: CreatingArticleVote) {
        return md5([data.userId.toString(), data.articleId.toString()].join('#'));
    }

    static buildForCreate(input: CreatingArticleVote) {
        const vote: ArticleVote = {
            id: ArticleVoteHelpers.createId(input),
            userId: input.userId,
            articleId: input.articleId,
            type: input.type,
            createdAt: input.createdAt || new Date(),
        }

        if (!vote.articleId) {
            throw badData();
        }

        if (!vote.userId) {
            throw badData();
        }

        if (!vote.type || ['UP', 'DOWN'].indexOf(vote.type) < 0) {
            throw badData();
        }

        return vote;
    }
}
