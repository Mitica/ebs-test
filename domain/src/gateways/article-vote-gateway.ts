import { Gateway } from "./gateway";
import { ArticleVote, ArticleVoteType } from "../entities/article-vote";

export interface ArticleVoteGateway extends Gateway<string, ArticleVote> {
    countByArticleAndType(articleId: string, type: ArticleVoteType): Promise<number>
}
