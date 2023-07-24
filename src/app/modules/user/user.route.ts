import { Router } from 'express';
import { validateZod } from '../../middlewares/validateZod';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = Router();

// create student
router.post(
  '/create-student',
  validateZod(UserValidation.createStudentZodSchema),
  UserController.createStudent,
);

// create faculty
router.post(
  '/create-faculty',
  validateZod(UserValidation.createFacultyZodSchema),
  UserController.createFaculty,
);

// create faculty
router.post(
  '/create-admin',
  validateZod(UserValidation.createAdminZodSchema),
  UserController.createAdmin,
);

export const UserRoutes = router;
