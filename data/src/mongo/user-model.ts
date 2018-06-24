import { Schema, Connection, Document } from "mongoose";
import { MongoModel, MongoUpdateData } from "./mongo-model";
import { User } from 'test-domain';
import { isEmail } from 'validator';

export class UserModel extends MongoModel<User> {
    constructor(connection: Connection) {
        super(connection.model('User', ModelSchema));
    }

    protected transformItem(item: Document): User {
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

    protected beforeCreating(data: User) {
        data.createdAt = data.createdAt || new Date();
        data.updatedAt = data.updatedAt || data.createdAt;

        return super.beforeCreating(data);
    }

    protected beforeUpdating(data: MongoUpdateData<User>) {
        if (data.set) {
            delete data.set.createdAt;
            data.set.updatedAt = data.set.updatedAt || new Date();
        }
        return super.beforeUpdating(data);
    }
}

const ModelSchema = new Schema({
    _id: String,
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate: [isEmail, 'Invalid email'],
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    displayName: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
    },

    facebookId: {
        type: String,
        unique: true,
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
        collection: 'ebs_test_users'
    });

ModelSchema.set('toObject', {
    getters: true
});
