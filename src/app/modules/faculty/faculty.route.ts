import { Router } from 'express';
import { validateZod } from '../../middlewares/validateZod';
import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';

const router = Router();

// update
router.patch(
  '/:id',
  validateZod(FacultyValidation.facultyUpdateZodSchema),
  FacultyController.updateFaculty,
);

// read
router.get('/:id', FacultyController.getSingleFaculty);
router.get('/', FacultyController.getAllFaculty);

export const FacultyRoutes = router;
