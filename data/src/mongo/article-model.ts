import { Schema, Connection, Document } from "mongoose";
import { MongoModel, MongoUpdateData } from "./mongo-model";
import { Article } from 'test-domain';

export class ArticleModel extends MongoModel<Article> {
    constructor(connection: Connection) {
        super(connection.model('Article', ModelSchema));
    }

    protected transformItem(item: Document): Article {
        const data = super.transformItem(item);

        if (data) {
            if (data.createdAt) {
                data.createdAt = new Date(data.createdAt);
            }
            if (data.updatedAt) {
                data.updatedAt = new Date(data.updatedAt);
            }
        }

        return data;
    }

    protected beforeCreating(data: Article) {
        data.createdAt = data.createdAt || new Date();
        data.updatedAt = data.updatedAt || data.createdAt;

        return super.beforeCreating(data);
    }

    protected beforeUpdating(data: MongoUpdateData<Article>) {
        if (data.set) {
            delete data.set.createdAt;
            data.set.updatedAt = data.set.updatedAt || new Date();
        }
        return super.beforeUpdating(data);
    }
}

const ModelSchema = new Schema({
    _id: String,
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 500,
        unique: true,
    },
    body: {
        type: String,
    },
    userId: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true,
    },
    
    countUpVotes: {
        type: Number,
        required: true,
        default: 0,
    },
    countDownVotes: {
        type: Number,
        required: true,
        default: 0,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
}, {
        collection: 'ebs_test_articles'
    });

ModelSchema.set('toObject', {
    getters: true
});
