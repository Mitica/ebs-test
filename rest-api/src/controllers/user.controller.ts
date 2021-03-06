
import { Response, Request } from 'express';
import { userModel } from '../data';
import catchError from '../catch';
import { sendResponse, jwtSign, getRequestUser } from '../helpers';
import { InputUser } from '../entities/input-user';
import { UserHelpers } from 'test-domain';

export async function getMeController(req: Request, res: Response) {
    try {
        const user = await getRequestUser(req);
        sendResponse(res, 200, user);
    } catch (e) {
        catchError(req, res, e);
    }
}

export async function getUsersController(req: Request, res: Response) {
    try {
        const users = await userModel.list({ limit: 10, sort: '-createdAt' });
        sendResponse(res, 200, users || []);
    } catch (e) {
        catchError(req, res, e);
    }
}

export async function createUserController(req: Request, res: Response) {
    let inputData = InputUser.fromRequest(req);

    try {
        inputData = UserHelpers.buildForCreate(inputData);
        const user = await userModel.create(inputData);
        user.token = jwtSign(user);
        sendResponse(res, 201, user);
    } catch (e) {
        catchError(req, res, e, 422);
    }
}
