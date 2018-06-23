
import { Gateway, BaseEntity } from 'test-domain';
import { MongoModel } from './mongo-model';
import { notFound } from 'boom';

export class MongoRepository<ID extends string | number, T extends BaseEntity<ID>> implements Gateway<ID, T> {
    constructor(protected model: MongoModel<T>) { }

    getById(id: ID): Promise<T | null> {
        return this.model.one({ where: { _id: id } });
    }
    getByIds(ids: ID[]): Promise<T[]> {
        return this.model.list({ where: { _id: { $in: ids } }, limit: ids.length });
    }
    exists(id: ID): Promise<boolean> {
        return this.model.one({ where: { _id: id }, select: '_id' }).then(item => !!item);
    }
    async deleteById(id: ID): Promise<T> {
        const item = await this.getById(id);
        if (!item) {
            throw notFound();
        }
        await this.model.remove({ _id: id });
        return item;
    }
    create(data: T): Promise<T> {
        return this.model.create(data);
    }
    update(data: T): Promise<T> {
        const id = data.id;
        const set: { [index: string]: any } = {};
        const unset: { [index: string]: string } = {};

        const props = Object.keys(data).filter(prop => ['id', 'createdAt', '_id'].indexOf(prop) > -1);

        props.forEach(prop => {
            if (~[null, undefined].indexOf((<any>data)[prop])) {
                unset[prop] = "";
            } else {
                set[prop] = (<any>data)[prop];
            }
        });

        return this.model.update({
            id: id,
            set: set as Partial<T>,
            unset
        });
    }

    createOrUpdate(item: T): Promise<T> {
        return this.create(item)
            .catch(error => {
                if (error.code && error.code === 11000) {
                    return this.update(item);
                }
                return Promise.reject(error);
            });
    }
}
