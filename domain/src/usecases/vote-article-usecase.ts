import { BaseUseCase } from "./usecase";
import { ArticleCounts } from "../entities/article";
import { ArticleVote, CreatingArticleVote, ArticleVoteType } from "../entities/article-vote";
import { ArticleGateway } from "../gateways/article-gateway";
import { ArticleVoteGateway } from "../gateways/article-vote-gateway";
import { ArticleHelpers } from "../entities/article-helpers";
import { notFound, badData, } from "boom";
import { ArticleVoteHelpers } from "../entities/article-vote-helpers";

export type VoteArticleResult = {
    counts: ArticleCounts
    vote: ArticleVote
}

export class VoteArticleUseCase extends BaseUseCase<CreatingArticleVote, VoteArticleResult> {

    constructor(private articleGateway: ArticleGateway, private voteGateway: ArticleVoteGateway) {
        super();
    }

    protected async innerExecute(data: CreatingArticleVote): Promise<VoteArticleResult> {
        const articleExists = await this.articleGateway.exists(data.articleId);

        if (!articleExists) {
            throw notFound(`Not found article with id=${data.articleId}`);
        }

        let counts = await this.articleGateway.getArticleCounts(data.articleId);
        const voteId = ArticleVoteHelpers.createId(data);

        let vote = await this.voteGateway.getById(voteId);

        if (vote) {
            if (vote.type === data.type) {
                return { vote, counts };
            }
            vote = await this.voteGateway.update({ id: vote.id, type: data.type });
        } else {
            vote = ArticleVoteHelpers.buildForCreate(data);
            vote = await this.voteGateway.create(vote);
        }

        counts = await this.syncArticleCounts(data.articleId);

        return { vote, counts };
    }

    private async syncArticleCounts(articleId: string): Promise<ArticleCounts> {
        const tasks = [
            this.voteGateway.countByArticleAndType(articleId, ArticleVoteType.UP),
            this.voteGateway.countByArticleAndType(articleId, ArticleVoteType.DOWN),
        ];

        const [countUpVotes, countDownVotes] = await Promise.all(tasks);

        await this.articleGateway.update({ id: articleId, countDownVotes, countUpVotes });

        return { countUpVotes, countDownVotes };
    }

    protected async validateData(data: CreatingArticleVote): Promise<CreatingArticleVote> {
        if (!data) {
            throw badData(`Invalid ArticleVote`, data);
        }
        if (!ArticleHelpers.isValidId(data.articleId)) {
            throw badData(`Invalid ArticleVote: articleId is required`, data);
        }
        if (!data.userId) {
            throw badData(`Invalid ArticleVote: userId is required`, data);
        }
        if (!data.type) {
            throw badData(`Invalid ArticleVote: type is required`, data);
        }
        return data;
    }
}
