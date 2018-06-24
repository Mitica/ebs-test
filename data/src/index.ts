
import { createConnection as mongoCreateConnection, Connection } from 'mongoose';

export { ArticleModel } from './mongo/article-model';
export { ArticleVoteModel } from './mongo/article-vote-model';
export { UserModel } from './mongo/user-model';

export { ArticleRepository } from './article-repository';
export { ArticleVoteRepository } from './article-vote-repository';

export function createConnection(uri: string): Connection {
    return mongoCreateConnection(uri);
}

export { MongoModel } from './mongo/mongo-model';
