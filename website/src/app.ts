require('dotenv').config();

import * as express from 'express';
import * as path from 'path';
const bodyParser = require('body-parser');
import catchError from './catch';
const ms = require('ms');
const cookieParser = require('cookie-parser');
import './passport';
var sessions = require('client-sessions');
import * as passport from 'passport';

import authRoute from './routes/auth';
import homeRoute from './routes/home';
import config from './config';

const isProduction = process.env.NODE_ENV === 'production';

function startApp() {

    const app = express();

    if (isProduction) {
        app.set('trust proxy', true);
    }

    app.disable('x-powered-by');
    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, '../views'));
    app.disable('etag');

    app.use(bodyParser.json()); // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
        extended: true
    }));
    app.use(cookieParser());

    app.use(express.static(path.join(__dirname, '../public'), {
        maxAge: isProduction ? ms('10d') : 0
    }));

    app.use(sessions({
		cookieName: 'sesck',
		requestKey: 'session', // requestKey overrides cookieName for the key name added to the request object.
		secret: process.env.SESSION_SECRET, // should be a large unguessable string or Buffer
		duration: 24 * 60 * 60 * 1000 // how long the session will stay valid in ms
	}));

	// passport
	app.use(passport.initialize());
    app.use(passport.session());
    
    app.locals.config = config;

    app.use(authRoute);
    app.use(homeRoute);

    // app.use(function (error: any, req: any, res: Response, _next: any) {
    //     catchError(req, res, error);
    // });

    app.all('*', function (req, res) {
        var error: any = new Error('Page not found');
        error.statusCode = 404;
        catchError(req, res, error);
    });

    app.listen(process.env.PORT, () => {
        console.log('Listening at %s', process.env.PORT);
    });
}

process.on('unhandledRejection', function (error: Error) {
    console.error('unhandledRejection: ' + error.message, error);
});

process.on('uncaughtException', function (error: Error) {
    console.error('uncaughtException: ' + error.message, error);
});

startApp();
