import { Router } from 'express';
import { validateZod } from '../../middlewares/validateZod';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validation';

const router = Router();

// update
router.patch(
  '/:id',
  validateZod(StudentValidation.updateStudentZodSchema),
  StudentController.updateStudent,
);

// delete
router.delete('/:id', StudentController.deleteStudent);

// read
router.get('/:id', StudentController.getSingleStudent);
router.get('/', StudentController.getAllStudent);

export const StudentRoutes = router;
