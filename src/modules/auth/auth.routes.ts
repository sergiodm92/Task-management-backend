import { Router } from 'express';
import AuthController from './auth.controller';
import { LoginDTO, RegisterDTO } from './dtos';
import validateDTO from '@middleware/validation.middleware';
import authMiddleware from '@middleware/auth.middleware';
const router = Router();

router.post('/register', validateDTO(RegisterDTO), AuthController.register);
router.post('/login', validateDTO(LoginDTO), AuthController.login);
router.get('/user', authMiddleware, AuthController.getUser);

export default router;
