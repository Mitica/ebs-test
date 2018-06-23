
import { Router } from 'express';
import {
    createArticleController,
    getArticlesController
} from '../controllers/article.controller';

const router = Router();

router.get('/articles', getArticlesController);
router.post('/articles', createArticleController);
