import { BaseEntity } from "./base-entity";

export interface Article extends BaseEntity<string> {
    title?: string
    body?: string
    countUpVotes?: number
    countDownVotes?: number
    userId?: string

    createdAt?: Date
    updatedAt?: Date
}

export type ArticleCounts = {
    countUpVotes: number
    countDownVotes: number
}

export interface CreatingArticle {
    title: string
    userId: string

    body?: string

    createdAt?: Date
}
