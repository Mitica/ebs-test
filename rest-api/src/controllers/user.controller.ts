
import { Response, Request } from 'express';
import { userModel } from '../data';
import catchError from '../catch';
import { sendResponse, jwtSign } from '../helpers';
import { InputUser } from '../entities/input-user';
import { UserHelpers } from 'test-domain';


export async function getUsersController(req: Request, res: Response) {
    try {
        const users = await userModel.list({ limit: 10, sort: '-createdAt' });
        sendResponse(res, 200, users || []);
    } catch (e) {
        catchError(req, res, e);
    }
}

export async function createUserController(req: Request, res: Response) {
    const inputData = InputUser.fromRequest(req);

    inputData.id = UserHelpers.newId();

    try {
        const user = await userModel.create(inputData);
        user.token = jwtSign(user);
        sendResponse(res, 201, user);
    } catch (e) {
        catchError(req, res, e, 400);
    }
}
