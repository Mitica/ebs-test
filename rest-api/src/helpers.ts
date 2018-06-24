
if (!process.env.JWT_SECRET) {
    throw 'Make sure you have JWT_SECRET in your .env file';
}

const JWT_SECRET: string = process.env.JWT_SECRET;

import { Request, Response } from "express";
import { User } from 'test-domain';
import * as jwt from 'express-jwt';
import { sign, decode } from 'jsonwebtoken';

export const jwtHandler = jwt({ secret: JWT_SECRET });

export function jwtSign(user: User) {
    return sign(JSON.stringify(user), JWT_SECRET as string);
}

export function jwtDecode(token: string) {
    return decode(token, { json: true });
}

export function sendResponse(res: Response, statusCode: number, data?: any) {
    res.status(statusCode);
    if (data !== undefined) {
        res.send(data);
    }
    res.end();
}

export function getRequestUser(req: Request): User {
    // console.log('user', req.user, req.headers)
    return req.user as User;
}


