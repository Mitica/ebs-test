
import logger from './logger';
import { Request, Response } from "express";
import * as Boom from 'boom';
import { isBoom, boomify } from 'boom';

export default function catchError(req: Request, res: Response, error: any, statusCode: number = 500) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    logger.error(error.message || 'errorHandler', {
        hostname: req.hostname,
        url: req.originalUrl,
        error: error,
        ip: ip,
        ref: req.get('Referrer')
    });

    if (!isBoom(error)) {
        error = boomify(error, { statusCode });
    }

    const boom: Boom = error;

    res.status(boom.output.statusCode).send(boom.output.payload).end();
}
