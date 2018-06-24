import { Model, Document } from 'mongoose';
import { badData, notFound } from 'boom';

export class MongoModel<T> {
    constructor(private model: Model<Document>) {
    }

    async create(data: T): Promise<T> {
        if (!data) {
            throw badData('Invalid data');
        }

        data = this.beforeCreating(data);

        const document = await this.model.create(data);

        return this.transformItem(document);
    }

    async update(data: MongoUpdateData<T>): Promise<T> {
        if (!data) {
            throw badData('Invalid data');
        }

        data = this.beforeUpdating(data);

        const updateData: any = {};
        if (data.set && Object.keys(data.set).length) {
            updateData['$set'] = data.set;
        }
        if (data.unset && Object.keys(data.unset).length) {
            updateData['$unset'] = data.unset;
        }

        const document = await this.model.findByIdAndUpdate(data.id, updateData);

        if (document) {
            return this.transformItem(document);
        } else {
            throw notFound(`Not found object id=${data.id}`, data);
        }
    }

    // updateMongo(condition: any, data: any, options?: any) {
    //     return new Promise<T>((resolve, reject) => {
    //         this.model.update(condition, data, options).then(get, reject).then(resolve);
    //     });
    // }

    async remove(where: MongoParamsWhere): Promise<number> {
        if (!where) {
            throw badData();
        }

        // see: https://docs.mongodb.com/manual/reference/method/db.collection.remove/#successful-results
        const writeResult: { nRemoved: number } = await this.model.remove(where);

        return writeResult && writeResult.nRemoved || 0;
    }

    async one(params: MongoParams): Promise<T | null> {
        if (!params) {
            throw badData();
        }

        const document = await this.model.findOne(params.where, params.select);
        if (document) {
            return this.transformItem(document);
        } else {
            return null;
        }
    }

    async count(where: MongoParamsWhere): Promise<number> {
        return await this.model.count(where);
    }

    async list(params: MongoParams): Promise<T[]> {
        if (!params) {
            throw badData();
        }

        let docs = await
            this.model
                .find(params.where)
                .select(params.select)
                .sort(params.sort)
                .skip(params.offset || 0)
                .limit(params.limit || 10)
                .exec();
        docs = docs || [];

        return docs.map(doc => this.transformItem(doc));
    }


    protected beforeCreating(data: T) {
        const ndata: any = data;
        for (let prop of Object.keys(ndata)) {
            if (~[null, undefined].indexOf(ndata[prop])) {
                delete ndata[prop];
            }
        }
        ndata._id = ndata._id || ndata.id;
        return data;
    }

    protected beforeUpdating(data: MongoUpdateData<T>) {
        return data;
    }

    protected transformItem(item: Document): T {
        return item.toJSON() as T;
    }
}

export type MongoParamsWhere = { [index: string]: string | number | string[] | number[] | MongoParamsWhere | any };
export type MongoParams = {
    where?: MongoParamsWhere
    select?: string
    offset?: number
    limit?: number
    sort?: string
}

export type MongoUpdateData<T> = {
    id: string | number
    set?: Partial<T>
    unset?: { [index: string]: string }
}

export type MongoOptions = {
    select?: string
}