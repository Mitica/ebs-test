import { BaseEntity } from "./base-entity";

export interface User extends BaseEntity<string> {
    firstName?: string
    lastName?: string
    displayName?: number
    email?: string
    password?: string
    facebookId?: string

    token?: string

    role?: UserRole

    createdAt?: Date
    updatedAt?: Date
}

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
}

export type CreatingUser = {
    firstName?: string
    lastName?: string
    displayName?: number
    email: string
    password?: string
    facebookId?: string

    role?: UserRole

    createdAt?: Date
}
