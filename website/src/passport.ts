
import * as passport from 'passport';
var FacebookStrategy = require('passport-facebook').Strategy;
import config from './config';
import { ApiClient } from './api/api-client';
import { ApiUser } from './api/api-user';

passport.serializeUser(function (user: ApiUser, done) {
    // console.log('serializeUser', user);
    return done(null, user.token);
});

passport.deserializeUser(function (token, done) {
    // console.log('deserializeUser', token);
    const apiClient = new ApiClient({ baseUrl: config.apiBaseUrl, token: token as string });
    apiClient.me().then(user => {
        user.token = token as string;
        done(null, user);
    }, done);
});

passport.use(new FacebookStrategy({
    clientID: config.facebookClientId,
    clientSecret: config.facebookClientSecret,
    callbackURL: 'http://' + config.host + '/auth/facebook/callback',
    enableProof: false,
    profileFields: ['id', 'displayName', 'name', 'email'],
},
    function (_accessToken: any, _refreshToken: any, profile: any, done: any) {
        process.nextTick(function () {
            const apiClient = new ApiClient({ baseUrl: config.apiBaseUrl });
            apiClient.login({
                email: profile.emails[0].value,
                facebookId: profile.id,
            })
                .then(user => {
                    done(null, user)
                }, done);
        });
    }
));