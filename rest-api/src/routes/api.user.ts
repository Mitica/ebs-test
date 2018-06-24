
import { Router } from 'express';
import {
    getUsersController, createUserController
} from '../controllers/user.controller';
import { authenticateUser, isAdmin } from "../middlewares/auth";

const router = Router();

router.use('/users', authenticateUser, isAdmin);
router.post('/users', createUserController);
router.get('/users', getUsersController);

export default router;
