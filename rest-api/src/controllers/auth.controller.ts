
import { Response, Request, NextFunction } from 'express';
import { userModel } from '../data';
import catchError from '../catch';
import { sendResponse, jwtSign } from '../helpers';
import { InputUser } from '../entities/input-user';
import { UserHelpers, User } from 'test-domain';
import { notFound } from 'boom';


export async function registerUserController(req: Request, res: Response) {
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

export async function loginUserController(req: Request, res: Response, next: NextFunction) {
    const inputData = InputUser.fromRequest(req);

    try {
        let user: User | null;
        if (inputData.facebookId) {
            user = await userModel.one({ where: { facebookId: inputData.facebookId } });
            if (!user) {
                inputData.id = UserHelpers.newId();
                user = await userModel.create(inputData);
            }
        } else {
            user = await userModel.one({ where: { email: inputData.email, password: inputData.password } });
        }
        if (!user) {
            return next(notFound());
        }
        user.token = jwtSign(user);
        sendResponse(res, 200, user);
    } catch (e) {
        catchError(req, res, e, 400);
    }
}
