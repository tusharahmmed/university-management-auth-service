import { Router } from 'express';
import { validateZod } from '../../middlewares/validateZod';
import { AcademicSemesterController } from './academicSemester.controller';
import academicSemesterZodSchema from './academicSemester.validation';

const router = Router();

router.post(
  '/create-semester',
  validateZod(academicSemesterZodSchema),
  AcademicSemesterController.createSemester,
);

export const AcademicSemesterRoutes = router;
