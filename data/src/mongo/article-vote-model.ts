import { Schema, Connection, Document } from "mongoose";
import { MongoModel, MongoUpdateData } from "./mongo-model";
import { ArticleVote } from 'test-domain';

export class ArticleVoteModel extends MongoModel<ArticleVote> {
    constructor(connection: Connection) {
        super(connection.model('ArticleVote', ModelSchema));
    }

    protected transformItem(item: Document): ArticleVote {
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

    protected beforeCreating(data: ArticleVote) {
        data.createdAt = data.createdAt || new Date();
        data.updatedAt = data.updatedAt || data.createdAt;

        return super.beforeCreating(data);
    }

    protected beforeUpdating(data: MongoUpdateData<ArticleVote>) {
        if (data.set) {
            delete data.set.createdAt;
            data.set.updatedAt = data.set.updatedAt || new Date();
        }
        return super.beforeUpdating(data);
    }
}

const ModelSchema = new Schema({
    _id: String,
    userId: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true,
    },
    articleId: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true,
    },
    type: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: true,
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
        collection: 'ebs_test_article_votes'
    });

ModelSchema.set('toObject', {
    getters: true
});
