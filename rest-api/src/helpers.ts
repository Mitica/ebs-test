
if (!process.env.JWT_SECRET) {
    throw 'Make sure you have JWT_SECRET in your .env file';
}

const JWT_SECRET: string = process.env.JWT_SECRET;

import { Request, Response } from "express";
import { User } from 'test-domain';
import * as jwt from 'express-jwt';
import { sign } from 'jsonwebtoken';
import { userModel } from "./data";

export const jwtHandler = jwt({ secret: JWT_SECRET });

export function jwtSign(user: User) {
    return sign(user.id, JWT_SECRET as string);
}

export function sendResponse(res: Response, statusCode: number, data?: any) {
    res.status(statusCode);
    if (data !== undefined) {
        res.send(data);
    }
    res.end();
}

export async function getRequestUser(req: Request): Promise<User> {
    if (typeof req.user === 'string') {
        return await userModel.one({ where: { _id: req.user } }) as User;
    }
    return req.user as User;
}


