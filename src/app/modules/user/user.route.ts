import { Router } from 'express';
import { validateZod } from '../../middlewares/validateZod';
import { UserController } from './user.controller';
import { userZodSchema } from './user.validation';

const router = Router();

router.post(
  '/create-user',
  validateZod(userZodSchema),
  UserController.createUser,
);

export const UserRoutes = router;
