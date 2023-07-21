import { Router } from 'express';
import { validateZod } from '../../middlewares/validateZod';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validation';

const router = Router();

router.post(
  '/create-student',
  validateZod(StudentValidation.createStudentZodSchema),
  StudentController.createStudent,
);
router.get('/id', StudentController.getSingleStudent);
router.get('/', StudentController.getAllStudent);

export const StudentRoutes = router;
