
if (!process.env.JWT_SECRET) {
    throw 'Make sure you have JWT_SECRET in your .env file';
}

import { Response } from "express-serve-static-core";
import { Request } from "express";
import { User } from 'test-domain';
import * as jwt from 'express-jwt';
import { sign } from 'jsonwebtoken';

export const jwtHandler = jwt({ secret: process.env.JWT_SECRET });

export function jwtSign(user: User) {
    return sign(user, process.env.JWT_SECRET as string);
}

export function sendResponse(res: Response, statusCode: number, data?: any) {
    res.status(statusCode);
    if (data !== undefined) {
        res.send(data);
    }
    res.end();
}

export function getRequestUser(req: Request): User {
    return req.user as User;
}


