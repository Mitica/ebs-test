
import { Router } from 'express';
import { registerUserController, loginUserController } from '../controllers/auth.controller';

const router = Router();

router.use('/register', registerUserController);
router.post('/login', loginUserController);

export default router;
