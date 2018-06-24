
import { Response, Request, NextFunction } from 'express';
import { userModel, userRepository } from '../data';
import catchError from '../catch';
import { sendResponse, jwtSign } from '../helpers';
import { InputUser } from '../entities/input-user';
import { UserHelpers, User } from 'test-domain';
import { notFound } from 'boom';


export async function registerUserController(req: Request, res: Response) {
    let inputData = InputUser.fromRequest(req);

    try {
        inputData = UserHelpers.buildForCreate(inputData);
        const user = await userModel.create(inputData);
        user.token = jwtSign(user);
        sendResponse(res, 201, user);
    } catch (e) {
        catchError(req, res, e, 400);
    }
}

export async function loginUserController(req: Request, res: Response, next: NextFunction) {
    let inputData = InputUser.fromRequest(req);

    try {
        let user: User | null;
        if (inputData.facebookId) {
            user = await userRepository.getByFacebookId(inputData.facebookId);
            if (!user) {
                user = await userRepository.getByEmail(inputData.email as string);
                if (!user) {
                    inputData = UserHelpers.buildForCreate(inputData);
                    user = await userModel.create(inputData);
                } else {
                    user = await userRepository.update({ id: user.id, facebookId: inputData.facebookId });
                }
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
