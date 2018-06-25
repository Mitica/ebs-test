
import { Router } from 'express';
import {
    getUsersController, createUserController, getMeController
} from '../controllers/user.controller';
import { authenticateUser } from "../middlewares/auth";

const router = Router();

router.get('/users/me', authenticateUser, getMeController);

router.use('/users', authenticateUser);
// router.use('/users', authenticateUser, isAdmin);
router.post('/users', createUserController);
router.get('/users', getUsersController);

export default router;
