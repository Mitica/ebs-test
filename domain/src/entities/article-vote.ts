import { BaseEntity } from "./base-entity";

export interface ArticleVote extends BaseEntity<string> {
    userId?: string
    articleId?: string
    type?: ArticleVoteType

    createdAt?: Date
    updatedAt?: Date
}

export enum ArticleVoteType {
    UP = 'UP',
    DOWN = 'DOWN'
}

export interface CreatingArticleVote {
    userId: string
    articleId: string
    type: ArticleVoteType

    createdAt?: Date
}
