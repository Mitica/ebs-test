
import { createLogger, format, transports } from 'winston';
import { join } from 'path';

const logger = createLogger({
    level: 'info',
    format: format.json(),
    transports: [
        new transports.File({ filename: logFile('error.log'), level: 'error' }),
        new transports.File({ filename: logFile('logs.log') })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.simple()
    }));
}

function logFile(file: string) {
    return join(__dirname, '..', 'logs', file);
}

export interface ILogger {
    log(message?: any, ...optionalParams: any[]): void
    warn(message?: any, ...optionalParams: any[]): void;
    error(message?: any, ...optionalParams: any[]): void;
}

export default {
    log: (message?: any, ...optionalParams: any[]) => {
        logger.log('info', message, optionalParams);
    },
    warn: (message?: any, ...optionalParams: any[]) => {
        logger.log('warn', message, optionalParams);
    },
    error: (message?: any, ...optionalParams: any[]) => {
        logger.log('error', message, optionalParams);
    }
};
