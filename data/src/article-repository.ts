
import { MongoRepository } from './mongo/mongo-repository';
import { ArticleGateway, Article, ArticleCounts } from 'test-domain';
import { notFound } from 'boom';

export class ArticleRepository extends MongoRepository<string, Article> implements ArticleGateway {
    async getArticleCounts(articleId: string): Promise<ArticleCounts> {
        const article = await this.getById(articleId);
        if (!article) {
            throw notFound();
        }

        const counts: ArticleCounts = {
            countUpVotes: article.countUpVotes || 0,
            countDownVotes: article.countDownVotes || 0,
        };

        return counts;
    }
}
