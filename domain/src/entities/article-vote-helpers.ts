import { CreatingArticleVote, ArticleVote } from "./article-vote";
import { md5 } from "../utils";

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

        return vote;
    }
}
