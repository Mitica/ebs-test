
import { maxage } from './maxage';
import { Request, Response } from "express";

export default function catchError(_req: Request, res: Response, error: any) {

    maxage(res, 5);

    let statusCode = error.statusCode || error.code || 500;
    statusCode = statusCode < 200 ? 500 : statusCode;

    res.status(statusCode);

    const data = {
        statusCode: statusCode,
    };

    res.render('error', { page: { title: 'Error' }, error: error, data: data });
}
