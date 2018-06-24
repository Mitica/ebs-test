
if (!process.env.DB_CONNECTION_URI) {
    throw `process.env.DB_CONNECTION_URI is required`
}

import {
    VoteArticleUseCase
} from 'test-domain';

import {
    createConnection,
    ArticleModel,
    ArticleVoteModel,
    ArticleRepository,
    ArticleVoteRepository,
    UserModel,
} from 'test-data';

const connection = createConnection(process.env.DB_CONNECTION_URI);

export const articleModel = new ArticleModel(connection);
export const articleVoteModel = new ArticleVoteModel(connection);
export const userModel = new UserModel(connection);

export const articleRepository = new ArticleRepository(articleModel);
export const articleVoteRepository = new ArticleVoteRepository(articleVoteModel);

export const voteArticleUseCase = new VoteArticleUseCase(articleRepository, articleVoteRepository);

export async function initData() {

}
