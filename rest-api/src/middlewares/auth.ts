
import { Request, Response, NextFunction } from 'express';
import { getRequestUser, jwtHandler } from '../helpers';
import { unauthorized, boomify } from 'boom';
import { UserRole } from 'test-domain';


export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    jwtHandler(req, res, error => {
        if (error) {
            if (error.name === 'UnauthorizedError') {
                error = boomify(error, { statusCode: 401 });
            }
            return next(error);
        }
        next();
    })
}

export const isAdmin = async (req: Request, _res: Response, next: NextFunction) => {
    const user = await getRequestUser(req);
    if (!user || user.role !== UserRole.ADMIN) {
        return next(unauthorized())
    }
    next();
}
