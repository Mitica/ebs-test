import { Router, Request } from 'express';
import * as passport from 'passport';
import { ApiClient } from '../api/api-client';
import config from '../config';
import { ApiUser } from '../api/api-user';

const router = Router();


router.get('/login', function (req, res) {
    res.locals.page = {
        title: 'Login'
    }
    res.locals.redirectUrl = req.query.redirectUrl || req.query.redirect || '/';
    res.cookie('loginurl', res.locals.redirectUrl, { maxAge: 1000 * 60 * 10 });
    res.render('login');
});
// GET /auth/facebook
router.get('/auth/facebook',
    passport.authenticate('facebook', {
        scope: ['public_profile', 'email']
    }));

// GET /auth/facebook/callback
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/login'
    }),
    function (req, res) {
        res.redirect(req.cookies.loginurl || '/');
    });

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.post('/login', function (req, res) {
    const apiClient = new ApiClient({ baseUrl: config.apiBaseUrl });
    apiClient.login(req.body)
        .then(user => login(req, user))
        .then(() => {
            res.redirect('/');
        })
        .catch(error => {
            res.locals.page = {
                title: 'Login'
            }
            res.locals.message = error.message;
            res.render('login');
        });
});

router.post('/register', function (req, res) {
    const apiClient = new ApiClient({ baseUrl: config.apiBaseUrl });
    apiClient.register(req.body)
        .then(user => login(req, user))
        .then(() => {
            res.redirect('/');
        })
        .catch(error => {
            res.locals.page = {
                title: 'Login'
            }
            res.locals.message = error.message;
            res.render('login');
        });
});

export default router;

function login(req: Request, user: ApiUser) {
    return new Promise((resolve, reject) => {
        req.login(user, error => {
            if (error) {
                return reject(error);
            }
            resolve();
        });
    });
}
