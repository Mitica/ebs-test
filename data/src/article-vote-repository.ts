
import { MongoRepository } from './mongo/mongo-repository';
import { ArticleVoteGateway, ArticleVote, ArticleVoteType } from 'test-domain';

export class ArticleVoteRepository extends MongoRepository<string, ArticleVote> implements ArticleVoteGateway {
    countByArticleAndType(articleId: string, type: ArticleVoteType): Promise<number> {
        return this.model.count({
            articleId,
            type
        });
    }
}
