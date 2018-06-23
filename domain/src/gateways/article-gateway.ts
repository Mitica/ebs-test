import { Gateway } from "./gateway";
import { Article, ArticleCounts } from "../entities/article";

export interface ArticleGateway extends Gateway<string, Article> {
    getArticleCounts(articleId: string): Promise<ArticleCounts>
}
