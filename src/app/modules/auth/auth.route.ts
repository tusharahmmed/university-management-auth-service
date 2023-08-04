import { Router } from 'express';
import { validateZod } from '../../middlewares/validateZod';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = Router();

router.post(
  '/login',
  validateZod(AuthValidation.loginZodSchema),
  AuthController.loginUser,
);
router.post(
  '/refresh-token',
  validateZod(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken,
);

export const AuthRoutes = router;
