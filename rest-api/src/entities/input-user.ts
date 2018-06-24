import { Request } from "express";
import { User } from 'test-domain';

export class InputUser {
    static fromRequest(req: Request) {

        const user: User = {
            id: req.body.id,
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            displayName: req.body.displayName,
            facebookId: req.body.facebookId,
        }

        return user;
    }
}
