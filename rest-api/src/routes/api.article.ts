
import { Router } from 'express';
import {
    createArticleController,
    getArticlesController,
    voteArticleController
} from '../controllers/article.controller';
import { authenticateUser } from "../middlewares/auth";

const router = Router();

router.use('/articles', authenticateUser);

router.get('/articles', getArticlesController);
router.post('/articles', createArticleController);
router.post('/articles/:id/vote', voteArticleController);

export default router;
