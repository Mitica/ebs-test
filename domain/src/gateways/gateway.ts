import { BaseEntity } from "../entities/base-entity";

export interface ReadGateway<ID extends string | number, T extends BaseEntity<ID>> {
    getById(id: ID): Promise<T | null>
    getByIds(ids: ID[]): Promise<T[]>
    exists(id: ID): Promise<boolean>
}

export interface WriteGateway<ID, T extends BaseEntity<ID>> {
    deleteById(id: ID): Promise<T>
    create(data: T): Promise<T>
    update(data: T): Promise<T>
}

export interface Gateway<ID extends string | number, T extends BaseEntity<ID>> extends ReadGateway<ID, T>, WriteGateway<ID, T> {

}
