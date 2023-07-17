import { Router } from 'express';
import { validateZod } from '../../middlewares/validateZod';
import { AcademicSemesterController } from './academicSemester.controller';
import { SemesterValidationSchema } from './academicSemester.validation';

const router = Router();

router.post(
  '/create-semester',
  validateZod(SemesterValidationSchema.createSchema),
  AcademicSemesterController.createSemester,
);

router.get('/:id', AcademicSemesterController.getSingleSemester);

router.patch(
  '/:id',
  validateZod(SemesterValidationSchema.updateSchema),
  AcademicSemesterController.updateSemester,
);

router.get('/', AcademicSemesterController.getAllSemesters);
export const AcademicSemesterRoutes = router;
