import { Router } from 'express';
import { validateZod } from '../../middlewares/validateZod';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = Router();

router.post(
  '/create-user',
  validateZod(UserValidation.createStudentZodSchema),
  UserController.createStudent,
);

export const UserRoutes = router;
