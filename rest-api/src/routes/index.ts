import { Application } from "express";
import apiArticleRouter from './api.article';
import apiUserRouter from './api.user';
import authRouter from './auth';

export function mountRoutes(app: Application) {
    app.use('/auth', authRouter);
    app.use(apiArticleRouter);
    app.use(apiUserRouter);
}
