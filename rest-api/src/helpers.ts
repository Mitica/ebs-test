import { Response } from "express-serve-static-core";

export function sendResponse(res: Response, statusCode: number, data?: any) {
    res.status(statusCode);
    if (data !== undefined) {
        res.send(data);
    }
    res.end();
}
